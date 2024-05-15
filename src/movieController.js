const express = require('express');
const router = express.Router();
const {User, Movie} = require('../models/index.js');


router.use((req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.redirect('/login');
    }
});

router.get('/', async (req, res) => {
    let movies = await Movie.findAll({
        include: User
    });
    res.render('movies/index.njk',{movies: movies});
});

router.get('/add', (req, res) => {
    res.render('movies/add.njk');
});

router.post('/add', async (req, res) => {
    req.files.image.mv('./public/images/' + req.files.image.name);
    await Movie.create({
        name:req.body.movie,
        year: req.body.year,
        description: req.body.description,
        user_id: req.session.user.id,
        image: '/images/' + req.files.image.name
    });
    res.redirect('/movies/');
});

router.get('/view', async (req, res) => {
    let movie = await Movie.findOne({
        where: {
            id: req.query.id
        }
    });
    res.render('movies/view.njk', {movie: movie});
});

router.get('/edit/:id',async (req, res) => {
    let movie = await Movie.findOne({
        where: {
            id: req.params.id
        }
    });
    res.render('movies/edit.njk', {movie: movie});
});

router.post('/edit/:id', async (req, res) => {
    await Movie.update({
        name:req.body.movie,
        year: req.body.year,
        description: req.body.description
    },{
        where: {
            id: req.params.id
        }
    });
    res.redirect('/movies/');
});

router.get('/delete/:id',async (req, res) => {
    await Movie.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/movies/');
});

module.exports = router; 