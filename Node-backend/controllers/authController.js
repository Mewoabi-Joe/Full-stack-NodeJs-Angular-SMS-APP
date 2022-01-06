const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { secret } = require("../config/database");

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: "", password: "" };

	// incorrect email
	if (err.message === "incorrect email") {
		errors.email = "That email is not registered";
	}

	// incorrect password
	if (err.message === "incorrect password") {
		errors.password = "That password is incorrect";
	}

	// duplicate email error
	if (err.code === 11000) {
		errors.email = "that email is already registered";
		return errors;
	}

	// validation errors
	if (err.message.includes("user validation failed")) {
		// console.log(err);
		Object.values(err.errors).forEach(({ properties }) => {
			// console.log(val);
			// console.log(properties);
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, secret, {
		expiresIn: maxAge,
	});
};

// controller actions

module.exports.signup_post = async (req, res) => {
	try {
		const user = await User.create(req.body);
		const token = createToken(user._id);
		// res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res
			.status(201)
			.json({ user: { id: user._id, first_name: user.first_name }, token });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.login_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		// res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res
			.status(200)
			.json({ user: { id: user._id, first_name: user.first_name }, token });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

// module.exports.logout_get = (req, res) => {
// 	res.cookie("jwt", "", { maxAge: 1 });
// 	res.status(200).json({ message: "logout successful" });
// };
// module.exports.sendEmailToResetPassword = async (req, res) => {
// 	try {
// 		console.log(req.body)
// 		const { email } = req.body;
// 		// const { _id } = await User.findOne({ email });
// 		const result = await User.findOne({ email });
// 		console.log(result)
// 		const {_id} = result
// 		const transporter = nodemailer.createTransport({
// 			port: 465, // true for 465, false for other ports
// 			host: "smtp.gmail.com",
// 			auth: {
// 				user: "enspygi2023@gmail.com",
// 				pass: "promogi_2023",
// 			},
// 			secure: true,
// 		});

// 		const mailData = {
// 			from: "enspygi2023@gmail.com", // sender address
// 			to: email, // list of receivers
// 			subject: "Reset Your Password",
// 			text: "Click on the link below to reset your password",
// 			html: `<p>Click on the link below to reset your password</p><a href=http://localhost:4200/reset-password/${_id}> Reset my password</a>`,
// 		};

// 		const info = await transporter.sendMail(mailData);
// 		console.log(info);
// 	} catch (err) {
// 		const errors = handleErrors(err);
// 		res.status(400).json({ errors });
// 	}
// };

// module.exports.resetPassword = async (req, res) => {
// 	try {
// 		await User.findByIdAndUpdate(
// 			{ _id: req.params.userId },
// 			{ password: bcrypt.hashSync(req.body.newPassword, 10) }
// 		);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
