const express = require('express');
const app = express();

const { config } = require('./config');
const moviesApi = require('./routes/movies');

const { 
  logErrors, 
  wrapError,
  errorHandler
} = require('./utils/middleware/errorHandler');

//body Parser
app.use(express.json());

moviesApi(app);

//Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);


app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`); //eslint-disable-line
});