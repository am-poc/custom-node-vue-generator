/* eslint-disable no-use-before-define */
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const FeatureSchema = new mongoose.Schema({
    name: { type: String, index: true },
    description: { type: String, index: true },
    town: { type: String, index: true },
    label: { type: String, index: true },
    perimeter: { type: String },
    area: { type: String },
    address: { type: String },
    link: { type: String },
    owner: { type: String },
    farmer: { type: String },
    dateCollected: { type: String },
    population: { type: String },
    featureType: { type: String, enum: ['line', 'poly', 'point'], default: 'point', index: true },
    style: {
        lineThickness: Number,
        lineColor: String,
        fillColor: String,
        radius: Number,
        opacity: Number,
        fillOpacity: Number
    },
    multimedia: [{
        mediaType: {
            type: String, enum: ['image', 'audio', 'video', 'pdf'], default: 'image', index: true
        },
        url: { type: String, index: true },
        caption: { type: String, index: true }
    }],
    images: [{
        _id: false,
        url: String,
        caption: String
    }],
    videos: [{
        _id: false,
        url: String,
        caption: String
    }],
    audios: [{
        _id: false,
        url: String,
        caption: String
    }],
    pdfs: [{
        _id: false,
        url: String,
        caption: String
    }],
    extra: Mixed,
    coord: [Number], // [longitude,latitude]
    coordList: Mixed,
    tags: [String],
    deleted: { type: Boolean, default: 'false' },
    sourceFile: String, // holds the name of the geoJson file on server(!= originalName and != Upload._id)
    source: String, //
    foundIn: [{
        mapSlug: String,
        labelIDs: [{ type: Schema.ObjectId, ref: 'layer' }]
    }]
},
{
    timestamps: true /* thsi somehow generates two additonal variables namely 'updatedAt' and 'createdAt' !!!!  */
})

// add a text index to the tags array
FeatureSchema.index({ '$**': 'text'}, {default_language: "none" })

FeatureSchema.statics.search = function (searchText, callback) {
    Feature.find(
        {$text: { $search: searchText, $language: "none"}},
        { __v: 0 },
        { sort: { createdAt: -1 } },
        callback
    ).limit(500).lean()
}

FeatureSchema.statics.findById = function (id, callback) {
    Feature.findOne({ _id: id },
        { __v: 0 },
        callback
    ).lean()
}

FeatureSchema.statics.findByTag = function (tag, callback) {
    Feature.find({ tags: tag },
        { __v: 0 },
        callback
    ).lean()
}

FeatureSchema.statics.findAll = (limit = 100, skip = 0) => {
    return Feature.find({},
        { __v: 0 },
        { sort: { createdAt: -1 } }
    ).skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

FeatureSchema.statics.removeMultimedia = (featureId, url, type) => {
    return Feature.update(
        { _id: featureId },
        { $pull: { images: { url }, videos: { url }, audios: { url }, pdfs: { url } }
        }
    ).exec()
}

FeatureSchema.statics.addMapToFeatureP = (featureId, mapSlug) => {
    return Feature.update(
        { _id: featureId, 'foundIn.mapSlug': { $ne: mapSlug } },
        { $addToSet: { foundIn: { mapSlug } } }
    ).exec()
}

FeatureSchema.statics.addMapToFeature = (featureId, mapSlug, callback) => {
    Feature.update(
        { _id: featureId, 'foundIn.mapSlug': { $ne: mapSlug } },
        { $addToSet: { foundIn: { mapSlug } } },
        callback
    )
}

FeatureSchema.statics.addLabelsToMapP = (featureId, mapSlug, labelIDs) => {
    return Feature.update(
        { _id: featureId, 'foundIn.mapSlug': mapSlug },
        { $addToSet: { 'foundIn.$.labelIDs': { $each: labelIDs } } }
    ).exec()
}

FeatureSchema.statics.addLabelsToMap = (featureId, mapSlug, labelIDs, callback) => {
    Feature.update(
        { _id: featureId, 'foundIn.mapSlug': mapSlug },
        { $addToSet: { 'foundIn.$.labelIDs': { $each: labelIDs } } },
        callback
    )
}

FeatureSchema.statics.removeMap = (featureId, mapSlug, callback) => {
    Feature.update(
        { _id: featureId },
        { $pull: { foundIn: { mapSlug } } },
        callback
    )
}

FeatureSchema.statics.deleteFeature = function (featureId) {
    return Feature.remove({ _id: featureId }).exec()
}

FeatureSchema.statics.addImage = (featureId, url, caption) => {
    return Feature.update(
        { _id: featureId },
        { $addToSet: { images: { url, caption } } }
    ).exec()
}

FeatureSchema.statics.replaceImage = (featureId, index, url, caption) => {
    return Feature.update(
        { _id: featureId },
        { $set: { ["images." + index]: { url, caption } } }
    ).exec()
}

FeatureSchema.statics.addAudio = (featureId, url, caption) => {
    return Feature.update(
        { _id: featureId },
        { $addToSet: { audios: { url, caption } } }
    ).exec()
}

FeatureSchema.statics.replaceAudio = (featureId, index, url, caption) => {
    return Feature.update(
        { _id: featureId },
        { $set: { ["audios." + index]: { url, caption } } }
    ).exec()
}

FeatureSchema.statics.addVideo = (featureId, url, caption) => {
    return Feature.update(
        { _id: featureId },
        { $addToSet: { videos: { url, caption } } }
    ).exec()
}

FeatureSchema.statics.replaceVideo = (featureId, index, url, caption) => {
    return Feature.update(
        { _id: featureId },
        { $set: { ["videos." + index]: { url, caption } } }
    ).exec()
}

FeatureSchema.statics.addPDF = (featureId, url, caption) => {
    return Feature.update(
        { _id: featureId },
        { $addToSet: { pdfs: { url, caption } } }
    ).exec()
}

FeatureSchema.statics.replacePDF = (featureId, index, url, caption) => {
    return Feature.update(
        { _id: featureId },
        { $set: { ["pdfs." + index]: { url, caption } } }
    ).exec()
}


const Feature = mongoose.model('feature', FeatureSchema)
module.exports = Feature
