const express = require('express');
const router = express.Router();
const movieController = require('../controller/movieController');
const { verify, verifyAdmin, isLoggedIn } = require('../auth');

router.post('/addMovie', verify, verifyAdmin, movieController.createMovie);
router.get('/getMovies', movieController.getMovies);
router.get('/getMovie/:id', movieController.getMovieById);
router.put('/updateMovie/:id', verify, verifyAdmin, movieController.updateMovie);
router.delete('/deleteMovie/:id', verify, verifyAdmin, movieController.deleteMovie);
router.post('/addComment/:id', verify, isLoggedIn, movieController.addComment);
router.get('/getcomments/:id', verify, movieController.getCommentsByMovieId);


module.exports = router;
