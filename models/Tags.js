const mongoose = require ('mongoose');
const TagSchema = new mongoose.Schema({

    name: {
        type:String
    }
})

const Tags = mongoose.model('tags', TagSchema)
module.exports = Tags;