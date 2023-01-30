// const express = require('express');
import express from 'express';
// const app = express();
const app = express();
// const db = require('./models');
import db from './models';
// const path = require('path');
import path from 'path';
import {Routes} from './routes/routers';

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.redirect("/todos");
});

// const apiRoutes = require('./routes/apiRoutes')
// app.use('/todos', apiRoutes);
Routes.initializeRoutes(app);



/* db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on http://localhost:${PORT}`);
    });
}) */

db.sequelize.sync();
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });

module.exports = app;