const express = require('express');
const app = express();

const { config } = require('./config');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler} = require('./utils/middleware/errorHandler');

app.use(express.json());

moviesApi(app);

app.use(logErrors);
app.use(errorHandler);


app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`); //eslint-disable-line
});