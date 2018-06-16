const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UploadSchema = new Schema({
        originalName: { type: String, required: true },
        savedName: { type: String, required: true },
        description: String,
        size: Number,
        beenProcessed: { type: Boolean, default: false },
        uploadDate: { type: Date, default: '' },
        features: [{ type: Schema.ObjectId, ref: 'feature' }]
    },
    { timestamps: true })


UploadSchema.statics.findAll = () => {
    return Upload.find(
    	{},
        {_id: 0, originalName:1, description: 1, features:1, uploadDate: 1}
        ).sort('-uploadDate').lean().exec()
}

UploadSchema.statics.findById = function findById(id) {
    return Upload.findOne({ _id: id },
        { __v: 0 },
        {}
    ).lean().exec()
}

// this method returns the Map document with the Track document embedded. This is costly in speed and memory
UploadSchema.statics.findByIdAndPopulate = function findByIdAndPopulate(id) {
    return Upload.findOne({ _id: id })
        .populate('features')
        .exec()
}

const Upload = mongoose.model('upload', UploadSchema)
module.exports = Upload

