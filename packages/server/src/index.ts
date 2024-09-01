console.log('** started');

// // import {cors} from "cors"
var cors = require('cors');

// // import { basic } from "./component/component";

// // import {} from "./views"

const express = require('express');
require('dotenv').config();

// const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // default port to listen

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
app.use(cors());

// Configure Express to use EJS
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.set('views', __dirname + '/views');
app.set('view engine', 'tsx');
app.engine('tsx', require('express-react-views').createEngine());

app.use(express.static(__dirname + '/public'));

//!! instead of using start/end dates, should just pass number of days diff
// then using rank & sort so we get actual 200 day moving avg instead of 200 days including weekends

app.get('/reactview', (req, res) =>
  res.render('index', { msg: 'TypeScript + Node = ❤' })
);

// app.use('/dates', dates);
// app.use('/comparison', comparison);
// app.use('/rankcount', rankcount);
// app.use('/consecutive', consecutive);
// app.use('/tickers', tickers);
// app.use('/', root);
// app.use('/email', email);

// start the express server
app.listen(port, async () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
