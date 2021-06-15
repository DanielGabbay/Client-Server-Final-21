var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser') //parse request parameters
// const db = require('./db')
const { Pool, Client } = require('pg');
var fs = require('fs');
app.use(express.static(__dirname));  //specifies the root directory from which to serve static assets [images, CSS files and JavaScript files]
app.use(bodyParser.urlencoded({ extended: true })); //parsing bodies from URL. extended: true specifies that req.body object will contain values of any type instead of just strings.
app.use(bodyParser.json()); //for parsing json objects

const connectionString = 'postgres://uilmimhmclcrod:2fab910866ee10b3175c9604cb14ce80b767ce6515e1ce7e08fd1c9eacba2897@ec2-18-214-195-34.compute-1.amazonaws.com:5432/d8bfv2tgn46i3b'

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});
const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})
client.connect()
/* database */

const get_insurance_table = (request, response) => {
    pool.query(`SELECT * FROM insurance;`, (err, res) => {
        if (err) {
            console.log("Error - Failed to select all from Users");
            console.log(err);
        }
        else {
            console.log(res.rows);
            response.status(200).json(res.rows);
        }
    });
}

const post_insurance = (request, response) => {
    const body = request.body;
    client.query(`INSERT INTO public.insurance(
        socialNumber, email, "firstName", "lastName", "insuranceAmount", "phoneNumber", "prevInsuranceCompany", "prevInsuranceID", "prevInsuranceNumber", comments)
        VALUES ($1, $2, $3, $4, $5 , $6, $7, $8, $9, $10);`,
        [body.socialNumber, body.email, body.firstName, body.lastName, body.insuranceAmount,
        body.phoneNumber, body.prevInsuranceCompany, body.prevInsuranceID, body.prevInsuranceNumber, body.comments
        ],
        (err, res) => {
            if (err) {
                console.log("\nerr: ", err);
                response.status(400)
                response.send(err.detail)
            } else {
                console.log("\nsuccess: ", res.rows)
                response.status(200)
                var requsetNumber = Math.floor(Math.random() * 100000);
                response.send(requsetNumber.toString())   //retuen the request number as response
            }
        });
}
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/sign-in/index.html");
});
/*******************************/
//sign-in page:
app.get("/sign-in", (req, res) => {
    res.sendFile(__dirname + "/pages/sign-in/index.html");
});

//end sign-in page
/*******************************/
//new insurance page:
app.get("/new_insurance", (req, res) => {
    res.sendFile(__dirname + "/pages/new-insurance/index.html");
})

app.get('/api/get_insurance_table', get_insurance_table)

app.post('/post_insurance', post_insurance)

//end new insurance page
/*******************************/
//dashboard page:
app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + "/pages/dashboard/index.html");
})

app.get("/api/get_policies_data", (req, res) => {
    let data = JSON.parse(fs.readFileSync('./jsons/Policy.json'));
    res.status(200).send(data)
})

usersJsons = ['IsraelIsraeli', 'MosheCohen', 'YossiLavi','1','2']
app.get("/api/get_users_data", (req, res) => {
    let data = []
    for (let i = 0; i < usersJsons.length; i++)
        data[i] = JSON.parse(fs.readFileSync('./jsons/' + usersJsons[i] + '.json'));

    res.status(200).send(data)
})

app.get('/get_dash_data', (req, res) => {
    let data = fs.readFileSync('./jsons/Policy.json')
    if (data) {
        response.status(200).json(data.rows);
    } else {
        console.log("Error in getpolicyjsondata")
    }
})
//end new insurance page
/*******************************/
//for 404
app.get('*', function (req, res) {
    res.status(404).sendFile(__dirname + "/pages/404.html");
});
app.listen(port, '0.0.0.0');
console.log('Server started! At http://localhost:' + port);