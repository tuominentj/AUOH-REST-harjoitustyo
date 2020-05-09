const machining_model = require('./machining_model');

//HELPERS
const machining_data = (req) =>{
    let data = {
        tool_name: req.body.tool_name,
        tool_material: req.body.tool_material,
        cut_speed: req.body.cut_speed,
        feed_rate: req.body.feed_rate
    };
    return data;
};

// CREATE
const api_post_parameter = (req, res, next)=>{
    //puuttuu rivi
    let data = machining_data(req);
    let new_machining = machining_model(data);

    new_machining.save().then(()=>{
        console.log(new_machining);
        res.send(JSON.stringify(new_machining));
    }).catch(err => {
        res.status(500);
        //välitetään virhetieto myös postmanille
        res.send(err.errmsg);
        console.log(err);
    });

    //console.log(data);
    //alla oleva lähettää ja päättää lähetyksen samalla rivillä
    //res.send(JSON.stringify(data));
};

// READ
const api_get_parameters = (req, res, next)=>{
    //console.log('api_get_materials');
    material_model.find({})
    .lean()
    .then(materials => {
        res.send(JSON.stringify(materials));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
    //res.send(JSON.stringify([]));
};

// UPDATE
//PUT /api/material/5e87739680a811535c242661
const api_put_parameter = (req, res, next) => {
    //console.log('put osio')
    let id = req.params.id;
    let data = material_data(req);

    material_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((material)=> {
        res.send(material);
    }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
    });
};

// DELETE
//delete /api/material/5e87739680a811535c242661
const api_delete_parameter = (req, res, next) => {
    let id = req.params.id;
    material_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// exports
module.exports.api_post_parameter = api_post_parameter;
module.exports.api_get_parameters = api_get_parameters;
module.exports.api_get_parameter = api_get_parameter;
module.exports.api_put_parameter = api_put_parameter;
module.exports.api_delete_parameter = api_delete_parameter;
