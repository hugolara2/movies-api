const express = require('express');
const app = express();

const { config } = require('./config');
const moviesApi = require('./routes/movies');

const { 
  logErrors, 
  wrapError,
  errorHandler
} = require('./utils/middleware/errorHandler');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

//body Parser
app.use(express.json());

//routes
moviesApi(app);

//catch 404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);


app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`); //eslint-disable-line
});