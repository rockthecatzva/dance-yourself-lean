
var cors = require("cors");
const express = require("express");
require("dotenv").config();

//https://192.168.86.240:8080/audio

const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000; // default port to listen

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.set("views", __dirname + "/views");
app.set("view engine", "tsx");
app.engine("tsx", require("express-react-views").createEngine());

app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get("/hello", (req, res) => res.send("hello world"));

// start the express server
app.listen(port, async () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
