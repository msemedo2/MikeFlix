const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Movie Schema
let movieSchema = mongoose.Schema({
	Title: { type: String, required: true },
	Description: { type: String, required: true },
	Genre: {
		Name: String,
		Description: String,
	},
	Director: {
		Name: String,
		Bio: String,
	},
	ImagePath: String,
	Featured: Boolean,
});

// User Schema
let userSchema = mongoose.Schema({
	Username: { type: String, required: true },
	Password: { type: String, required: true },
	FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

/**
 * Function that returns a hashed password
 * @param {*} password
 *
 */
userSchema.statics.hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

/**
 * Functions that compares submitted hashed passwords with the hashed passwords stored in database.
 * @param {*} password
 *
 */
userSchema.methods.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
