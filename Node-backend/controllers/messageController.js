const User = require("../models/User");
const axios = require("axios");

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

module.exports.messages_put = async (req, res) => {
	try {
		const user_id = req.params.id;
		console.log(user_id);

		const message = req.body;
        
		const { receiver_number, content } = req.body;

		let error;

		if (receiver_number < 600000000 || receiver_number > 700000000)
			res
				.status(400)
				.json({ error: { number: "number is not of valid format" } });

		const updatedUser = await User.updateOne(
			{ _id: user_id },
			{ $push: { messages: message } }
		);
		// const res = axios.post('http://proxysms.mufoca.com//api/v0/shortMessages',info, {
		//     headers: {
		//         'Content-Type': 'application/json',
		//         'Authorization': this.token
		//     }
		//   })
		res.status(201).json({ success: "Added new message" });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.messages_send = async (req, res) => {
	try {
		const info = req.body;
		console.log("info", info);

		const resp = axios.post(
			"http://proxysms.mufoca.com//api/v0/shortMessages",
			info,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"Basic ZjE2MTg3ZGE3MGI2OmI2OTAxZDQwLWYyMTEtOTMwYS04ZTBjLTFjZGFkN2E2NGY5OQ==",
				},
			}
		);
		res.status(201).json({ success: resp });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.messages_get = async (req, res) => {
	function paginator(arr, perPage) {
		if (perPage < 1 || !arr) return () => [];

		return function (page) {
			const basePage = page * perPage;

			return page < 0 || basePage >= arr.length
				? []
				: arr.slice(basePage, basePage + perPage);
		};
	}

	try {
		const user_id = req.params.id;
		console.log("user_id", user_id);
		const queryString = req.query;

		let messages = await User.findById(user_id).select("messages");
		messages = messages.messages;
		number = Math.floor(messages.length / 5) + 1;
		console.log(messages);
		console.log(number);
		const paginate = paginator(messages, 5);

		// console.log("messages", messages);

		//Is there a query string ?

		// Is it a filter
		if (queryString.page) {
			messages = paginate(queryString.page);
			res.status(201).json({ messages, number });
		}
		// if (queryString.filter) {
		// 	messages.sort((a, b) => {
		// 		if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
		// 		if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
		// 		return 0;
		// 	});
		// 	res.status(201).json({ messages });
		// }
		// //Is it a search
		// if (queryString.name) {
		// 	const searchName = queryString.name;
		// }

		// if (queryString.number) {
		// 	const searchNumber = queryString.number;
		// }

		res.status(201).json({ messages });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
