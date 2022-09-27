const { moviesMock } = require('../utils/mocks/movies');

class MoviesService {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie(id) {
    const movie = await Promise.resolve(moviesMock[id]);
    return movie || {};
  }

  async createMovie() {
    const createdMovie = await Promise.resolve(moviesMock[0].id);
    return createdMovie;
  }

  async updateMovie() {
    const updateMovieId = await Promise.resolve(moviesMock[0].id);
    return updateMovieId;
  }

  async patchMovie() {
    const patchedMovieId = await Promise.resolve(moviesMock[0].id);
    return patchedMovieId;
  }

  async deleteMovie() {
    const deletedMovieId = await Promise.resolve(moviesMock[0].id);
    return deletedMovieId;
  }

}

module.exports = MoviesService;