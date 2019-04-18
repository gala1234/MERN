const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const logger = require("morgan");
const Data = ("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// My MongoDB 
const mongoDB = "mongodb://gala:gala123@ds111455.mlab.com:11455/mern";

// conexion between my backend and DB
mongoose.connect(
    mongoDB,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));


// check if conection with the database is successful
db.on("error", console.log.bind(console, "MongoDB connection error:"));

// the following is only make for logging and bodyParser, parses the request body to be a readable json format:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// create method, this method adds new data in our database
router.post("/putData", (req, res) => {
    let data = new Data();
  
    const { id, message } = req.body;
  
    if ((!id && id !== 0) || !message) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

// get method, this method fetches all avaible data in the DB
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// update method, overwrites existing data in the DB
router.post("/updateData", (req, res) => {
    const {id, update} = req.body;
    Data.findByIdAndUpdate(id, update, err => {
        if(err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// delete method, remove existing data in the DB 
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findByIdAndDelete(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const product = require('./routes/product.route'); // Imports routes for the products

// // initialize our express app
// const app = express(); 

// // To connect with the DB
// let dev_db_url = 'mongodb://gala:1playaSoleada@ds163164.mlab.com:63164/productstutorial';
// let mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse requests of content-type - application/json
// app.use(bodyParser.json())
// app.use('/products', product);

// const port = 1234;

// app.listen(port, () => {
//     console.log('Server is up and running on port numner ' + port);
// });