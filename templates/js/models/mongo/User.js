const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
		username: { type: String, required: true, index: { unique: true } },
		password: { type: String, required: true },
		email: String,
		userType: { type: String, enum: ['viewer', 'admin', 'editor'], default: 'viewer' },
		permissions: {
			addMaps: { type: Boolean, default: false },
			addFeatures: { type: Boolean, default: false },
			addUsers: { type: Boolean, default: false },
			uploadGeojson: { type: Boolean, default: false },
			editMaps: { type: Boolean, default: false },
			editFeatures: { type: Boolean, default: false },
			editGeojson: { type: Boolean, default: false },
			editUser: { type: Boolean, default: false },
			deleteMaps: { type: Boolean, default: false },
			deleteFeatures: { type: Boolean, default: false },
			deleteUser: { type: Boolean, default: false }
		}
	},
	{ timestamps: true })


UserSchema.statics.insert = (values) =>{
	const user = new User(values)
	return user.save()
}

UserSchema.statics.findAll = function () {
	return User.find({},
		{ __v: 0 },
		{}
	).lean().exec()
}

UserSchema.statics.findById = (id) => {
	return User.findOne({ _id: id},
		{ __v: 0 },
		{}
	).lean().exec()
}

UserSchema.statics.findByUsername = (_username) => {
	return User.findOne({ username: _username},
		{ __v: 0 },
		{}
	).lean().exec()
}

const User = mongoose.model('User', UserSchema)
module.exports = User