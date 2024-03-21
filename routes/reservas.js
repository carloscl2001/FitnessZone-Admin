'use strict';

const express = require('express');
const router = express.Router();
const reservasService = require('./reservas-service');

router.get('/', function (req, res) {
    reservasService.getAll((err, reservas) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (reservas.length == 0){
            	res.status(500).send({
                    msg: "reservas null"
                });
            } else {
                res.status(200).send(reservas);
            }
        }
    );
});

router.post('/', function (req, res) {
    let movie = req.body;
    if (Object.entries(movie).length === 0){
        res.status(400).send({
            msg: 'Empty movie'
        });
    }
	else{
		reservasService.add(movie, (err, movie) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } 
			else
			{
                res.status(201).send({
                    msg: 'Film created!'
                });
            }
        });
	}
});


router.delete('/', function (req, res) {
    reservasService.removeAll((err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Films deleted!'
            });
        }
    });
});


router.get('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.get(_id, (err, movie) => {
            if (err) {
                res.status(500).send({
                	msg: err
            	});
            } else if (movie.length == 0){
            	res.status(500).send({
                    msg: "movie is null"
                });
            } else {
                res.status(200).send(movie);
            }
        }
    );
});


router.put('/:_id', function (req, res) {
    const _id = req.params._id;
    const updatedMovie = req.body;
    reservasService.update(_id, updatedMovie, (err, numUpdates) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
	} else if(numUpdates.modifiedCount === 0) {
            res.status(500).send({
                msg: "Not updated"
            });
        } else {
            res.status(200).send({
                msg: 'Film updated!'
            });
        }
    });
});


/* COMPLETAR:
router.delete('COMPLETAR', function (req, res) {
    let _id = COMPLETAR;
    reservasService.COMPLETAR(_id, (err) => {
       COMPLETAR
    });
});*/

module.exports = router;
