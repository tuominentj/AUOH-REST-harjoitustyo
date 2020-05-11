const express = require('express');
//localhost port 8080, PORT capital works in server
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const app = express();
const machining_controller = require('./machining_controller');
const body_parser = require('body-parser');

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended:true
}));
app.use( (req, res, next)=>{
    console.log(req.method, ' ', req.path);
    next();
} );

// REST api, CRUD operations
// CREATE
app.post("/api/machining-parameter-set", machining_controller.api_post_parameter);

// READ all
app.get("/api/machining-parameter-sets", machining_controller.api_get_parameters);
// READ one by id
app.get("/api/machining-parameter-set/:id", machining_controller.api_get_parameter);

// UPDATE
//app.put replaces all fields, app.patch replaces selected fields
app.put("/api/machining-parameter-set/:id", machining_controller.api_put_parameter);

// DELETE
app.delete("/api/machining-parameter-set/:id", machining_controller.api_delete_parameter);

const database_uri = "mongodb+srv://admin:Bzxwbu5l5P9aDFhi@cluster0-iklya.mongodb.net/machiningdb?retryWrites=true&w=majority";
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
