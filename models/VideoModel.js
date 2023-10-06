const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
duration: {type :String},
title:{type: String},
thumbnail :{type: String},
Video_url :{type: String},
channel_img :{type: String},
views :{type: String},
upload_time :{type: String},
type :{type: Array}


})

const VideoModel = mongoose.model('videos',VideoSchema)
module.exports = VideoModel;