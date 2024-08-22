const Movie = require('../model/Movie');

exports.createMovie = async (req, res, next) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).send( movie );
    } catch (error) {
        next(error);
    }
};

exports.getMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.status(200).send({ movies });
    } catch (error) {
        next(error);
    }
};

exports.getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send({ message: 'Movie not found' });
        res.status(200).send(movie);
    } catch (error) {
        next(error);
    }
};

exports.updateMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) return res.status(404).send({ message: 'Movie not found' });
        res.status(200).send({ message: 'Movie updated successfully!', movie });
    } catch (error) {
        next(error);
    }
};

exports.deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).send({ message: 'Movie not found' });
        res.status(200).send({ message: 'Movie deleted successfully!' });
    } catch (error) {
        next(error);
    }
};

exports.addComment = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send({ message: 'Movie not found' });

        movie.comments.push({ user: req.user.id, comment: req.body.comment });
        await movie.save();

        res.status(200).send({ message: 'Comment added successfully!', movie });
    } catch (error) {
        next(error);
    }
};


exports.getCommentsByMovieId = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('comments.user', '_id');
        if (!movie) return res.status(404).send({ message: 'Movie not found' });

        const filteredComments = movie.comments.map(comment => ({
            user: comment.user._id,
            comment: comment.comment,
            movieId: movie._id
        }));

        res.status(200).send(filteredComments);
    } catch (error) {
        next(error);
    }
};
