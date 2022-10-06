const express = require('express');
const morgan = require('morgan');

const fs = require('fs');
var accessLogStream = fs.createWriteStream('logs/access.log',{flags: 'a'});
const MoviesService = require('../services/movies');

const { config } = require('../config');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
  const router = express.Router();
  if(config.dev) {
    app.use(morgan('combined'));
  } else {
    app.use(morgan('combined', {stream: accessLogStream}));
  }
  
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get("/", async (req, res, next) => {
    const { tags } = req.query;

    try{
      const movies = await moviesService.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch(err) {
      next(err);
    }
  });

  router.get("/:movieId", validationHandler({movieId: movieIdSchema}, 'params'), async (req, res, next) => {
    const { movieId } = req.params;

    try{
      const movie = await moviesService.getMovie({ movieId });
      res.status(200).json({
        data: movie,
        message: 'Movie retrieved'
      });
    } catch(err) {
      next(err);
    }
  });

  router.post("/", validationHandler(createMovieSchema), async (req, res, next) => {
    const { body: movie } = req;

    try{
      const createMovieId = await moviesService.createMovie({ movie });
      res.status(201).json({
        data: createMovieId,
        message: 'Movie Created'
      });
    } catch(err) {
      next(err);
    }
  });

  router.put("/:movieId", validationHandler({movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;

    try{
      const updatedMovieId = await moviesService.updateMovie({ movieId, movie });
      res.status(200).json({
        data: updatedMovieId,
        message: 'Movie updated'
      });
    } catch(err) {
      next(err);
    }
  });

  // router.patch('/:movieId', async (req, res, next) => {
  //   const { movieId } = req.params;
  //   const { body: movie} = req;

  //   try{
  //     const patchedMovieId = await moviesService.patchMovie({ movieId, movie });
  //     res.status(200).json({
  //       data: patchedMovieId,
  //       message: 'movie patched'
  //     });
  //   } catch(err) {
  //     next(err);
  //   }
  // });

  router.delete("/:movieId", validationHandler({movieId: movieIdSchema}, 'params'), async (req, res, next) => {
    const { movieId } = req.params;

    try{
      const deleteMovieId = await moviesService.deleteMovie({ movieId });
      res.status(200).json({
        data: deleteMovieId,
        message: 'Movie Deleted'
      });
    } catch(err) {
      next(err);
    }
  });

}

module.exports = moviesApi;