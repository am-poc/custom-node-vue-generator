/* eslint-disable no-use-before-define,arrow-body-style */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LayerSchema = new mongoose.Schema({
    name: String,
    visibility: Boolean,
    priority: { type: Number, default: 5 },
    features: [{ type: Schema.ObjectId, ref: 'feature' }],
    style: {
        lineThickness: Number,
        lineColor: String,
        fillColor: String,
        radius: Number,
        opacity: Number,
        fillOpacity: Number },
    featureType: { type: String, enum: ['line', 'poly', 'point'], default: 'point' }
},
{
    timestamps: true
})

LayerSchema.statics.findById = (id, callback) => {
    Layer.findOne({ _id: id },
        { __v: 0 },
        callback
    ).lean()
}

LayerSchema.statics.getFeatureList = (layerId, callback) => {
    Layer.findOne(
        { _id: layerId },
        { __v: 0 },
        (err, layer) => {
            // console.log(layer.features)
            if (err) callback(err, null)
            callback(null, layer.features)
        }
    )
}

LayerSchema.statics.getFeatureListPromise = function (layerId) {
    return Layer.findOne(
        { _id: layerId },
        { __v: 0 }
    ).lean().exec()
}


LayerSchema.statics.appendFeature = (sessionId, featureId, callback) => {
    Layer.update(
        { _id: sessionId },
        { $addToSet: { features: featureId } },
        callback
    )
}

LayerSchema.statics.updateStyle = (layerId, style, callback) => {
    Layer.update(
        { _id: layerId },
        { style },
        callback
    )
}

// Why did it stop working?
LayerSchema.statics.deleteLayer = layerId => {
    return Layer.remove(layerId, { _id: layerId }).exec()
}

// Wrote this callback function because promise was not working for some reason
LayerSchema.statics.deleteLayerCB = (layerId, callback) => {
    Layer.remove({ _id: layerId }, callback)
}

LayerSchema.statics.deleteFeatures = (id, featureIdList) => {
    const list = featureIdList.map(x => { return new mongoose.Types.ObjectId(x) })

    return Layer.update(
        { _id: id },
        { $pullAll: { features: list } }
    ).exec()
}

LayerSchema.statics.appendFeatureListP = (layerId, featureIdList) => {
    return Layer.update(
        { _id: layerId },
        { $addToSet: { features: { $each: featureIdList } } }
    ).exec()
}

// update the 'features' attribute of the Map with an array of features (bulk update)
LayerSchema.statics.appendFeatureList = (layerId, featureIdList, callback) => {
    Layer.update(
        { _id: layerId },
        { $addToSet: { features: { $each: featureIdList } } },
        callback
    )
}


LayerSchema.statics.changeVisibility = (layerID, visibility, callback) => {
    Layer.update(
        { _id: layerID },
        { visibility },
        callback
    )
}

LayerSchema.statics.changeVisAndPri = (layerID, visibility, pri, callback) => {
    Layer.update(
        { _id: layerID },
        { visibility, priority: pri },
        callback
    )
}


LayerSchema.statics.findByVisibility = (v, callback) => {
    Layer.find({ visibility: v },
        { __v: 0 },
        callback
    ).lean()
}

LayerSchema.statics.findByName = (name, callback) => {
    Layer.find({ name },
        { __v: 0 },
        callback
    ).lean()
}

LayerSchema.statics.findAll = callback => {
    Layer.find({},
        { __v: 0 },
        callback
    ).limit(500).lean()
}

LayerSchema.statics.findLayersWithFeature = featureID => {
    return Layer.find(
        { features: featureID },
        { __v: 0 },
        {}
    ).lean().exec()
}

const Layer = mongoose.model('layer', LayerSchema)
module.exports = Layer
