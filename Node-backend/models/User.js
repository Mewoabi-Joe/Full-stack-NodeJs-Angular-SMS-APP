const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please enter the person's name"],
		unique: true,
		lowercase: true,
		trim: true,
		sparse: true,
	},
	number: {
		type: Number,
		min: [600000000, "Number is not of correct format"],
		max: [700000000, "Number is not of correct format"],
		required: [true, "Please enter the person's phone number"],
		unique: true,
		sparse: true,
	},
	// email: {
	// 	type: String,
	// 	unique: true,
	// 	lowercase: true,
	// 	validate: [isEmail, "Please enter a valid email"],
	// 	trim:true,
	// 	sparse:true

	// },
	group: String,
});

const messageSchema = new Schema({
	content: {
		type: String,
		required: [true, "Please enter a message name"],
		trim: true,
	},
	receiver_number: {
		type: Number,
		min: [600000000, "Number is not of correct format"],
		max: [700000000, "Number is not of correct format"],
		required: [true, "Please enter your receivers number"],
	},
});

const userSchema = new Schema({
	first_name: {
		type: String,
		required: [true, "Please enter your first name"],
		lowercase: true,
		trim: true,
	},
	last_name: {
		type: String,
		lowercase: true,
		trim: true,
	},

	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate: [isEmail, "Please enter a valid email"],
		trim: true,
	},
	number: {
		type: Number,
		min: [600000000, "Number is not of correct format"],
		max: [700000000, "Number is not of correct format"],
		required: [true, "Please enter your phone number"],
		unique: true,
	},
	contacts: {
		type: [contactSchema],
		sparse: true,
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum password length is 6 characters"],
		trim: true,
	},
	messages: {
		type: [messageSchema],
		sparse: true,
	},
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error("incorrect password");
	}
	throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);
module.exports = User;
