'use strict';

// Modules.
var path = require('path');
var express = require('express');

// Initializes port handling.
var app = express();
var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

// May set port in the project properties.
app.set('port', process.env.PORT || 3000);

// Listens to the chosen port.
var server = app.listen(app.get('port'), function () {});