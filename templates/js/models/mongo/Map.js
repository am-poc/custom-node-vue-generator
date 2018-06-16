/* eslint-disable arrow-parens,no-use-before-define,arrow-body-style,object-shorthand */
const mongoose = require('mongoose')
const slugify = require('slugify')

const Schema = mongoose.Schema

const MapSchema = new Schema({
        name: { type: String, required: true },
        slug: { type: String, lowercase: true, unique: true, dropDups: true },
        description: String,
        owner: String,
        isPrivate: { type: Boolean, default: true },
        isFeatured: { type: Boolean, default: false },
        image: {
            _id: false,
            url: String,
            caption: String
        },
        defaultStyle: {
            lineThickness: Number,
            lineColor: String,
            fillColor: String,
            radius: Number,
            opacity: Number,
            fillOpacity: Number },
        tags: [String],
        mode: { type: String, default: 'none' }, // to show clusters vs tooltips vs none: values are 'cluster', 'tooltips', 'none'
        features: [{ type: Schema.ObjectId, ref: 'feature' }],
        layers: [{ type: Schema.ObjectId, ref: 'layer' }],
        duplicateOrigID: { type: Schema.ObjectId },
        deleted:  { type: Boolean, default: false }
        // layerPresets: [{ type: Schema.ObjectId, ref: 'layergroups' }]
    },
    {
        timestamps: true
    })

/*
ISSUE: the function definition       MapSchema.pre('save', (next) => { } is incorrect. It doesn't bind 'this' correctly
SOLUTION: Must use this instead:    MapSchema.pre('save', function(next) { }
SOURCE:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
https://stackoverflow.com/questions/39166700/the-this-object-is-empty-in-presave
https://derickbailey.com/2015/09/28/do-es6-arrow-functions-really-solve-this-in-javascript/
 */

MapSchema.pre('save', function (next) {
    this.slug = slugify(this.name)
    next()
})

MapSchema.pre('duplicate', function(next) {
    this.slug = slugify(this.name)
    next()
})

MapSchema.statics.duplicate = function(name, origDoc, callback)  {
    this.slug = slugify(this.name)
    callback()
}

MapSchema.statics.appendLayer = (sessionId, layerId, callback) => {
    Map.update(
        { _id: sessionId },
        { $addToSet: { layers: layerId } },
        callback
    )
}

MapSchema.statics.appendLayerUsingSlug = (slug, layerId) => {
    return Map.update(
        { slug },
        { $addToSet: { layers: layerId } }
    ).exec()
}

// update the 'features' attribute of the Map by appending one feature at a time
MapSchema.statics.appendFeature = (sessionId, featureId, callback) => {
    Map.update(
        { _id: sessionId },
        { $addToSet: { features: featureId } },
        callback
    )
}


// update the 'features' attribute of the Map with an array of features (bulk update)
MapSchema.statics.addFeatures = (sessionId, featureList, callback) => {
    Map.update(
        { _id: sessionId },
        {
            $push: {
                features: {
                    $each: featureList
                }
            }
        },
        callback
    )
}


MapSchema.statics.appendFeatureListUsingSlug = (slug, featureIdList) => {
    return Map.update(
        { slug },
        { $addToSet: { features: { $each: featureIdList } } }
    ).exec()
}

MapSchema.statics.appendFeatureList = (mapId, featureIdList) => {
    return Map.update(
        { _id: mapId },
        { $addToSet: { features: { $each: featureIdList } } }
    ).exec()
}

MapSchema.statics.deleteMap = function (mapId) {
    return Map.remove({ _id: mapId }).exec()
}


MapSchema.statics.deleteMapUsingSlug = slug => {
    /*permanent delete*/
    //return Map.remove({ slug }).exec()

    /*soft delete*/
    return Map.update(
        { slug: slug },
        { deleted: true }
    ).lean().exec()

}

MapSchema.statics.removeLayer = function (mapSlug, layerId) {
    return Map.collection.update(
        { slug: mapSlug },
        { $pull: { layers: layerId } }
    ).exec()
}

MapSchema.statics.deleteLayerArray = (mapId, layerObjIdArrayList, callback) => {
    const list = layerObjIdArrayList.map(x => { return new mongoose.Types.ObjectId(x) })
    return Map.update(
        { _id: mapId },
        { $pullAll: { layers: list } }
        , callback
    )
}

MapSchema.statics.deleteFeatures = (slug, featureIdList) => {
    const list = featureIdList.map(x => { return new mongoose.Types.ObjectId(x) })
    return Map.update(
        { slug: slug },
        { $pullAll: { features: list } }
    ).exec()
}

MapSchema.statics.findById = (id, callback) => {
    Map.findOne({ _id: id },
        callback
    )
}

// this method returns the Map document without embedding the actual Track document
MapSchema.statics.findBySlug = (slug, callback) => {
    Map.findOne({ slug },
        callback
    )
}

MapSchema.statics.findBySlugPromise = (slug) => {
    return Map.findOne({ slug }).exec()
}


MapSchema.statics.findByIdAndPopulate = mapId => {
    return Map.findOne({ _id: mapId })
        .populate('features')
        .populate('layers')
        .lean()
        .exec()
}


MapSchema.statics.findBySlugAndPopulate = (slug) => {
	console.log(slug)
    return Map.findOne({ slug })
        .populate('features')
        .populate('layers')
        .lean()
        .exec()
}

MapSchema.statics.findBySlugAndPopulateLayers = slug => {
    return Map.findOne({ slug })
        .populate('layers')
        .lean()
        .exec()
}

MapSchema.statics.findAll = () => {
    return Map.find({},
        { __v: 0 },
        {}
    ).limit(20).lean().exec()
}

MapSchema.statics.findAllPromise = (limit = 100, skip = 0) => {
    return Map.find({},
        { __v: 0 },
        {}
    ).skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

// returns array of map names of the whole collection
MapSchema.statics.findAllNames = (callback) => {
    Map.find({},
        { name: 1, slug: 1, _id: 0 },
        callback
    ).sort({ slug: 1 }).limit(20).lean()
}

/*returns the name and slug of maps which are not 'deleted'
without owner, OR
those with owners only if
    the owner matches current user OR
    the isPrivate is false
*/
MapSchema.statics.findAuthorizedMapNames = (user) =>{
    return Map.find({
            $and: [
                {$or: [
                        {deleted: undefined},
                        {deleted: false}
                    ]},
                {$or: [
                        { owner: undefined },
                        { owner: '' },
                        { owner: user },
                        { isPrivate: false }
                    ]}
            ]
        },
        { name: 1, slug: 1, _id: 0},
        {}
    ).limit(20).lean().exec()
}


/* returns the IDs of maps which are not 'deleted'
without owner, OR
those with owners only if
    the owner matches current user OR
    the isPrivate is false
*/
MapSchema.statics.findAuthorized = (user) => {
    return Map.find({
            $and: [
                {$or: [
                    {deleted: undefined},
                    {deleted: false}
                ]},
                {$or: [
                    { owner: undefined },
                    { owner: '' },
                    { owner: user },
                    { isPrivate: false }
                ]}
            ]
        },
        {_id: 0, name: 1, slug: 1, description: 1, owner: 1, features: 1}
    ).limit(20).lean().exec()
}


MapSchema.statics.findMapsWithFeature = (featureID) => {
    return Map.find(
        { features: featureID },
        { __v: 0 },
        {}
    ).lean().exec()
}

MapSchema.statics.getFeatured = (limit = 10, offset = 0) => {
    return Map.find(
        { isFeatured: true },
        { __v: 0 },
        {}
    ).skip(offset)
        .limit(limit)
        .lean()
        .exec()
}

MapSchema.statics.getLayerList = slug => {
    return Map.findOne({ slug }, { layers: 1 }).lean().exec()
}


const Map = mongoose.model('map', MapSchema)
module.exports = Map

