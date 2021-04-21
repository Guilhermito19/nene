const express = require('express');
const app = express();
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const produtoRoutes = require('./routes/produtos');
const mongoose = require('mongoose');
app.use(morgan('dev'));
mongoose.connect('mongodb+srv://unidesc:unidesc@unidesc.8ahbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true });




//tratando o CORS
app.use((req, res, next) => {
    res.header("Acess-Control-Allow-Origin", ".")
    res.header(
        "Acess-Control-Allow-headers",
        "Origin X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        req.header("Acess-Control-Allow-Methods", "PUT, POST, PATH, GET, DELETE")
        return res.status(200).json({});
    }
    next();


})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/produtos', produtoRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;

