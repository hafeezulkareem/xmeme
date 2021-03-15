const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const xmemeRoutes = require("./routes/xmeme");

dotenv.config();

const app = express();

// database connection
mongoose
   .connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
   })
   .then(() => {
      console.log("connected to database...");
   })
   .catch((err) => {
      console.log("error connecting to the database", err);
   });

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api", xmemeRoutes);

// frontend build connection
app.use(
   express.static(
      "/home/ubuntu/hafeezulkareem20-me_buildout_xmeme/frontend/build"
   )
);
app.get("/", (req, res) => {
   res.sendFile(
      "/home/ubuntu/hafeezulkareem20-me_buildout_xmeme/frontend/build/index.html"
   );
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
   console.log(`app running at ${port}...`);
});
