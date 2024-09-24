const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');//configuring pug as view engine for rendering views

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);

//launch in port
const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
