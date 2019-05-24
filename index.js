//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mssql database
const sql = require('mssql');
const app = express();



//===============================
// database config and function
//===============================

//Initiallising connection string
var dbConfig = {
    user: "<username>",
    password: "<password>",
    server: "<server>",
    database: "<database>"
};

sql.connect(dbConfig, function (err) {
    if (err) {
        console.log("Error while connecting database :- " + err);
    }
    else {
        console.log("Database connected");
    }
});

//Function to connect to database and execute query
var executeQuery = function (res, query) {

    // create Request object
    var request = new sql.Request();
    // query to the database
    request.query(query, function (err, result) {
        if (err) {
            console.log("Error while querying database :- " + err);
            sql.close();
        }
        else {

            sql.close();
            return result.recordset[0];
        }
    });


}



//==================
// express configs
//==================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));



//=========
// routes
//=========

//route for homepage
app.get('/', (req, res) => {
    let query = "SELECT * FROM <your table> ORDER BY 1 ASC";

    var request = new sql.Request();
    request.query(query, function (err, results) {
        if (err) {
            console.log("Error while querying database :- " + err);
            throw err;
        }
        else {
            res.render('config_view', { results: results.recordset });
        }
    });

});

//route for insert data
app.post('/save', (req, res) => {

    var request = new sql.Request();
    request.input('Application', req.body.application);
    request.input('Component', req.body.component);
    request.input('Node', req.body.node);
    request.input('Environment', req.body.environment);
    request.input('URL', req.body.url);
    request.input('TextToFind', req.body.texttofind);
    request.input('Credentials', req.body.credentials);
    request.execute('<sp to add values>', (err, result) => {
        if (err) {
            console.log("Error while querying database :- " + err);
        }
        else {
            res.redirect('/');
        }
    });
});

//route for update data
app.post('/update', (req, res) => {
    
    var request = new sql.Request();
    request.input('Id', req.body.id);
    request.input('Application', req.body.application);
    request.input('Component', req.body.component);
    request.input('Node', req.body.node);
    request.input('Environment', req.body.environment);
    request.input('URL', req.body.url);
    request.input('TextToFind', req.body.texttofind);
    request.input('Credentials', req.body.credentials);
    request.execute('<sp to update values>', (err, result) => {
        if (err) {
            console.log("Error while querying database :- " + err);
        }
        else {
            res.redirect('/');
        }
    });

});

//route for delete data
app.post('/delete', (req, res) => {
    var request = new sql.Request();
    request.input('Id', req.body.id);
    request.execute('<sp to delete values>', (err, result) => {
        if (err) {
            console.log("Error while querying database :- " + err);
        }
        else {
            res.redirect('/');
        }
    });
});

//server listening
app.listen(8082, () => {
    console.log('Server is running at port 8082');
});