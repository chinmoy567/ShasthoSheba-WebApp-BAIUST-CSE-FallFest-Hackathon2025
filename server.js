// coremodules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { seedVolunteers } = require("./controllers/volunteerController");


// External modules
const storeRoute = require("./routes/storeRouter");
const authRoute = require("./routes/authRouter");
const profileRoute = require("./routes/profileRouter");
const dashboardRoute = require("./routes/dashboardRouter");
const checkinRoute = require("./routes/checkinRouter");
const chatRoute = require("./routes/chatRouter");
const symptomRoute = require("./routes/symptomRouter");
const voiceRoute = require("./routes/voiceRouter");
const maternalVoiceRoute = require("./routes/maternalVoiceRouter");
const volunteerRoute = require("./routes/volunteerRouter");
const healthMapRoute = require("./routes/healthMapRouter");
const healthEventRoute = require("./routes/healthEventRouter");
const seasonalRoute = require("./routes/seasonalRouter");







const app = express();
const port = process.env.SERVER_PORT;


// Session management
app.use(
  session({
    secret: "superSecretKey", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions", 
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    },
  })
);


// //  for display the  session 
// app.use((req, res, next) => {
//   if (req.session) {
//     console.log("🧠 Session Data:");
//     console.log(req.session);
//   } else {
//     console.log("⚠️ No session found for this request.");
//   }
//   next();
// });



//for views
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log(" Connected to MongoDB Atlas");
    await seedVolunteers(); // Seed initial data from JSON
  })
  .catch((err) => console.error(" MongoDB connection error:", err));



// Middlewares
app.use((req, res, next) => {
  res.locals.currentPath = req.path; 
  next();
});
app.use("/", storeRoute);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);

app.use("/dashboard", dashboardRoute);
app.use("/dashboard/checkin", checkinRoute);
app.use("/dashboard/chat", chatRoute);
app.use("/dashboard/symptom", symptomRoute);
app.use("/dashboard/voice", voiceRoute);
app.use("/dashboard/maternalvoice", maternalVoiceRoute);
app.use("/dashboard/volunteer", volunteerRoute);
app.use("/dashboard/healthmap", healthMapRoute);
app.use("/dashboard/events", healthEventRoute);
app.use("/dashboard/seasonal", seasonalRoute);







// Start the server
app.listen(port, () => {
  console.log(` Server running on: http://localhost:${port}`);
});
