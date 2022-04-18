import mongoose from "mongoose";
import express from 'express'
import Cards from './schema.js'
import Cors from 'cors'

// app config
const app = express()
const port = process.env.PORT || 5000
const connection_url = "mongodb+srv://shashwat:shashwat@cluster0.4c9jn.mongodb.net/tinderdb?retryWrites=true&w=majority"

// middleware
app.use(express.json())
app.use(Cors())

//db config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// api endpoints
app.get('/', (req, res) => res.status(200).send("hello world"))

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body

    Cards.create(dbCard, (err, data) => {
        if (err) res.status(500).send(err)
        else res.status(201).send(data)
    })
})

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) res.status(500).send(err)
        else res.status(200).send(data)
    })
})

app.delete('/tinder/cards/:id', (req, res) => {
    Cards.findByIdAndDelete(req.params.id)
        .then(res.status(200).json("item deleted"))
        .catch(err => res.status(500).send(err))
})


// listener
app.listen(port, () => console.log(`server running on port : ${port}`))