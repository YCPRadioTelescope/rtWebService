var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var config = require('./config.json');

//swagger stuff
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//aws ses stuff
AWS.config.update({region: config.region});
AWS.config.update({"accessKeyId": config.accessKeyId, "secretAccessKey": config.secretAccessKey });

//start mysql connection
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : '', //mysql database name
  debug: false
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected to ycp database...')
});


//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


//create app server
var server = app.listen(config.port ,  "0.0.0.0", function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("WebService listening at http://%s:%s", host, port)

});

//rest api to get users
app.get('/user', function (req, res) {
  connection.query('select * from radio_telescope.user', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//api to send email
app.post('/email', function (req, res){
  console.log(JSON.stringify(req.body));

  if(!req.body.destination || !req.body.message || !req.body.subject){
    res.statusMessage = "Request does not contain required fields";
    res.sendStatus(401);
  }
  else {

    let to = req.body.destination;
    let message = req.body.message;
    let subject = req.body.subject;

    let params = {
      Destination: { /* required */
        ToAddresses: [
          to,
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
            Charset: "UTF-8",
            Data: message
          },
          Text: {
            Charset: "UTF-8",
            Data: "TEXT_FORMAT_BODY"
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      Source: 'NO-REPLY@ycpradiotelescope.com', /* required */
    };

// Create the promise and SES service object
    let sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
    sendPromise.then(
      function (data) {
        console.log(data.MessageId);
      }).catch(
      function (err) {
        console.error(err, err.stack);
      });

    res.sendStatus(200);
  }
});
