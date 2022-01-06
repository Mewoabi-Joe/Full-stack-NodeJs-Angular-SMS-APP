const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");
const config = require("./config/database");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
// , checkUser 
const {requireAuth} = require("./middleware/authMiddleware");

// var TeleSignSDK = require('telesignsdk');

// const customerId = "3CB099CE-1835-4988-844A-DEB378FFBA30";
// const apiKey = "CtaSp72NsSO+lYNw2B5O/7b72h4fFhwtr6uEQMflW6OTslPOmy4nC+UAekgrA6UeUS7GdpinYypSEGMtjYWYlg==";
// const rest_endpoint = "https://rest-api.telesign.com";
// const timeout = 10*1000; // 10 secs

// const client = new TeleSignSDK( customerId,
// 	apiKey,
// 	rest_endpoint,
// 	timeout // optional
// 	// userAgent
// );

// const phoneNumber = "237677662876";
// const message = "You're scheduled for a dentist appointment at 2:30PM.";
// const messageType = "ARN";

// console.log("## MessagingClient.message ##");

// function messageCallback(error, responseBody) {
// 	if (error === null) {
// 		console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
// 			` => code: ${responseBody['status']['code']}` +
// 			`, description: ${responseBody['status']['description']}`);
// 	} else {
// 		console.error("Unable to send message. " + error);
// 	}
// }
// client.sms.message(messageCallback, phoneNumber, message, messageType);


const app = express();

// middleware
app.use(cors());
app.use(express.json());
// app.use(cookieParser());

//Setting static folder
app.use(express.static(path.join(__dirname, "public")));

// view engine
// app.set('view engine', 'ejs');

// database connection
mongoose
	.connect(config.database, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		console.log("connection made to mogodb");
		app.listen(4000);
	})
	.catch((err) => console.log(err));

// // routes
// app.get('*', checkUser);
// app.get("/", (req, res) => res.send("Invalid endpoint"));
//  
app.get('/main',requireAuth,(req, res) => res.json({message:'success'}));
app.use("/auth",authRoutes);
app.use("/contacts",contactRoutes);
app.use("/messages",messageRoutes);
