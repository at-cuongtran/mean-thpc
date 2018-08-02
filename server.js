const express = require('express');
const path = require('path');
const http = require('http');
const createError = require('http-errors');
const mongoose = require('mongoose');

const config = require('./config/database');

// make bluebird default Promise
Promise = require('bluebird');

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;
mongoose.connect(config.database);
const X = mongoose.model('X', { x: String });
const newX = new X({x: 'Behold... lorum Ipsem'});
newX.save();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// angular distribution folder
app.use(express.static(path.join(__dirname, 'dist')));

// Server Api resource
app.get('/api', (req, res) => {
  X.find((err, data) => {
    res.json(data);
  })
})

// Response to others urls with angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3300');
app.set('port', port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
  console.info(`server started on port ${port}`); // eslint-disable-line no-console
});

module.exports = app;
