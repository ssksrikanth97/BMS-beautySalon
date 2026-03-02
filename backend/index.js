
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// Import and use your routes
app.use("/api/users", require("./routes/users"));
app.use("/api/services", require("./routes/services"));
app.use("/api/bookings", require("./routes/bookings"));

// Expose Express app as a Cloud Function
exports.api = functions.https.onRequest(app);

