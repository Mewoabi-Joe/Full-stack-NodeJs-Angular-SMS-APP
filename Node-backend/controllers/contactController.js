const User = require("../models/User");

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

module.exports.contacts_get = async (req, res) => {
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

		let contacts = await User.findById(user_id).select("contacts");
		contacts = contacts.contacts;
		number =Math.floor(contacts.length/5)+1
		console.log(number)
		const paginate = paginator(contacts, 5);

		// console.log("contacts", contacts);

		//Is there a query string ?

		// Is it a filter
		if (queryString.page) {
			contacts = paginate(queryString.page);
			res.status(201).json({ contacts, number });
		}
		if (queryString.filter) {
			contacts.sort((a, b) => {
				if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
				if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
				return 0;
			});
			res.status(201).json({ contacts });
		}
		//Is it a search
		if (queryString.name) {
			const searchName = queryString.name;
		}

		if (queryString.number) {
			const searchNumber = queryString.number;
		}

		res.status(201).json({ contacts });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.contacts_put = async (req, res) => {
	try {
		const user_id = req.params.id;
		const contact = req.body;
		const { name, number } = req.body;
		let prevContacts;
		prevContacts = await User.findById(user_id).select("contacts");
		console.log(prevContacts);
		let error;
		prevContacts.contacts.every((contact) => {
			if (contact.name == name) {
				error = { name: "A contact with that name already exist" };
				return false;
			}
			if (contact.number == number) {
				error = { number: "A contact with that number already exist" };
				return false;
			}
			return true;
		});
		if (error) {
			res.status(400).json({ error });
		} else {
			if (number < 600000000 || number > 700000000)
				res
					.status(400)
					.json({ error: { number: "number is not of valid format" } });

			const updatedUser = await User.updateOne(
				{ _id: user_id },
				{ $push: { contacts: contact } }
			);
			res.status(201).json({ success: "Added new contact" });
		}
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.contacts_delete = async (req, res) => {
	try {
		const arrayId = req.params.arrayId;
		const user = await User.updateOne(
			{
				"contacts._id": arrayId,
			},
			{
				$pull: {
					contacts: { _id: arrayId },
				},
			}
		);
		res.status(201).json({ success: "deleted Contact" });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

module.exports.contacts_update = async (req, res) => {
	try {
		const arrayId = req.params.arrayId;
		const { name, number } = req.body;
		const user = await User.updateOne(
			{
				"contacts._id": arrayId,
			},
			{
				$set: {
					"contacts.$.name": name,
					"contacts.$.number": number,
				},
			}
		);
		res.status(201).json({ success: "Updated Contact" });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};
