const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secret } = require("../config/database");

const requireAuth = (req, res, next) => {
	const token = req.headers.authorization;
	console.log('AUTH MIDDLEWARE, token:',token);
	// check json web token exists & is verified
	if (token) {
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.json({ error_msg: "invalid or tampered token" });
			} else {
				console.log('AUTH MIDDLEWARE, decoded-token:',decodedToken);
				next();
			}
		});
	} else {
	console.log('AUTH MIDDLEWARE, error:',"No token sent");
		// console.log(err.message);
		res.json({ error_msg: "no token" });
	}
};

// // check current user
// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };
// , checkUser

module.exports = { requireAuth };
