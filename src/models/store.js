let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/data-for-api')

let storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Store', storeSchema)