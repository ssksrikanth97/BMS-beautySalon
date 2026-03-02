const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// Import and use your routes
const usersRoutes = require("./routes/users");
const servicesRoutes = require("./routes/services");
const bookingsRoutes = require("./routes/bookings");

app.use("/api/users", usersRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/bookings", bookingsRoutes);

// Expose Express app as a Cloud Function
exports.api = functions.https.onRequest(app);