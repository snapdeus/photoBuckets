require('dotenv').config();
const express = require('express');
const multer = require('multer')
// const ExpressError = require('./utils/ExpressError');
const path = require('path');
const { storage } = require("./cloudinary");
const ejsMate = require('ejs-mate');
const upload = multer({ storage });




const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/form', (req, res) => {
    res.render('form')
})

app.post('/form', upload.array('images'), (req, res, next) => {
    const images = req.files.map(f => ({ filename: f.filename }))
    console.log(images);
    res.send('it worked!');
})

app.get('/', (req, res) => {
    res.send("HELLO")
})


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving on Port 3000')
});