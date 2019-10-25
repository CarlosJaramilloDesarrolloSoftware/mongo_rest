const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: {
        type: String,
        require: [true, "'Name' is required"],
    },
    branch: {
        type: String,
        require: [true, "'Branch' is required"]
    },
    description: {
        type: String,
        require: false,
        default: 'With out description'
    },
    color: {
        type: String,
        require: false,
        default: 'With out color'
    },
    cost: {
        type: Number,
        require: [true, "'Cost' is required"]
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Product", productSchema);