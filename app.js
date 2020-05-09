const express = require('express');
//paikallisesti 8080-portti, PORT isolla niin toimii serverillä
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const app = express();
const machining_controller = require('./machining_controller');
const body_parser = require('body-parser');

app.use(body_parser.json()); //req.body.name
app.use(body_parser.urlencoded({
    extended:true
})); //material/id

app.use( (req, res, next)=>{
    console.log(req.method, ' ', req.path);
    next();
} ); //GET api/materials

// GET /index.html
// --> /public/index.html
app.use("/", express.static("public"));

// RESTful api
// CRUD operations
// CREATE
app.post("/api/machining-parameter-set", machining_controller.api_post_parameter);

// READ
//app.get("/api/materials", machining_controller.api_get_materials);

//kysy kaikki
app.get("/api/machining-parameter-sets", machining_controller.api_get_parameters);
//kysy tietty
app.get("/api/machining-parameter-set/:id", machining_controller.api_get_parameter);

// UPDATE
//app.patch korvaa vain tietyt kentät
//app.put korvaa kaikki kentät
app.put("/api/machining-parameter-set/:id", machining_controller.api_put_parameter);

// DELETE
app.delete("/api/machining-parameter-set/:id", machining_controller.api_delete_parameter);

// npm install mongoose
//"mongodb+srv://admin:Bzxwbu5l5P9aDFhi@cluster0-iklya.mongodb.net/test?retryWrites=true&w=majority" /test? alikansio databasessa
//muutettiin materialdb:ksi
const database_uri = "mongodb+srv://admin:Bzxwbu5l5P9aDFhi@cluster0-iklya.mongodb.net/machiningdb?retryWrites=true&w=majority";
// Bzxwbu5l5P9aDFhi
mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then( ()=>{
    console.log('database connected');
    app.listen(port);
}).catch(err=> {
    console.log(err);
});
