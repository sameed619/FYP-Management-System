
const express = require('express')
const app = express()
const connectDb = require('./database')

connectDb()

app.listen(4000, () => {
    console.log("Up and Running")
})