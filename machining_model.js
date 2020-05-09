const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//- string: Tool name (e.g. Jyrsin 10mm)
//- string: Material (e.g. S355)
//- number: Cutting speed (e.g. 100 m/min)
//- number: Feed rate (e.g. 0.25 mm/teeth)

const schema = new Schema({
    tool_name: {
        type: String, 
        require: true, 
        index: {
            unique: true
        }
    },
    tool_material: {
        type: String, 
        required: true
    },
    cut_speed: {
        type: Number, 
        required: true
    },
    feed_rate: {
        type: Number, 
        required: true
    },
});

module.exports = mongoose.model("machining", schema);
