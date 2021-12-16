//getting started with express

const express = require('express')      //importing express
const format = require('date-format')       //for editing the date in better shape
const app = express()       //creating app from the express

//swagger docs related
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//A port number is a way to identify a specific process to which an internet or other network message is to be forwarded when it arrives at a server. All network-connected devices come equipped with standardized ports that have an assigned number
const PORT = process.env.PORT || 4000;     //use the port number as 4000 but if something is defined at the process.env(environment variable) use the port number from there



// app.get('/', (req, res) => {        //request and response
//     // res.send("Hello World");            //i want to send a response here, which is a string "Hello world"
//     res.send("<h1>Hello from the header tag</h1>");
// })


//As soon as you make request to the web, the web analyzs the request, process and maybe grab some data from the db and then get you a response back and not only the response ,it also get you the status or the status code

/**
 * 100-199  Informational response
 * 200-299  Successfull response            200-> ok
 * 300-399  Redirectional messages
 * 400-499  client error responses
 * 500-599  server error respones
 */

//now, these code aren't a governance body, you can decide which code to send i.e. you can even send 200 for client or server error but ofcourse it would be "horrible" for api design


//Using request we can access baseurl, cookies, body, fresh, ip, path, query etc

//res.sendstatus() will send just the status and res.status() will send status and you can bind stuff on top of that
app.get('/', (req, res) => {
    res.status(200).send("The request should be ok");
});



app.get("/api/v1/instagram",  (req, res) => {  
    // '/v1' is short form for version 1 of api, though its not mandatory to use but still its good to maintain versioning of the api              
    const instaSocial = {
        userName: "ananjay_gurjar",
        followers: 130,
        follows: 140,
        date : Date.now(),
    }
    res.status(200).json(instaSocial);      //since we want to send json data this time

});
//similiarly for facebook and instagram
app.get("/api/v1/facebook",  (req, res) => {             
    const instaSocial = {
        userName: "ananjaygurjar",
        followers: 0,
        follows: 0,
        date : new Date(),
    }
    res.status(200).json(instaSocial);

});

//date in both the case of insta and facebook are not in a great way
//here, we'll be installing third party library date-format from npmjs.com
app.get("/api/v1/linkdin",  (req, res) => {             
    const instaSocial = {
        userName: "ananjaygurjar",
        followers: 70,
        follows: 120,
        date : format.asString("dd|MM  hh:mm:ss", new Date()),      //one can edit the date and time format, however they want
    }
    res.status(200).json(instaSocial);

});

app.get("/api/v1/:token", (req, res) => {        //colon ':' is used to accept value in the url
    console.log(req.params.token);
    res.status(200).json({param: req.params.token});
});


//as soon as you create express and a app it allows you to listen
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});

//guide to push the code to heroku
/**
 * git init
 * add and commit to git
 * optionally push to github
 * 
 * create Heroku app
 * push code to heroku app
 * debug
 * push again
 */

//nodemon is dev dependency and dev depency is pruned(or deleted) and we are trying to run index.js using nodemon, so we must change it to node index.js