import mongoose from "mongoose";

const Schema = mongoose.Schema({
    name: String,
    image_url: String
})

export default mongoose.model('card', Schema)