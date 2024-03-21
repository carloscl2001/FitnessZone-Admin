'use strict';

const express = require('express');
const router = express.Router();
const reservasService = require('./reservas-service');

//Prueba de reservas
/*let reservas = [
    {
        "nombre": "Daniel Garcia",
        "apellidos": "dg001@gmail.com",
        "num_personas": "zumba",
        "personas": 2,
        "pilates": false,
        "trx": true,
        "yoga" : false,
        "fecha": "23/08/2023",
        "tramo": "10:55"
    },
    {
        "nombre": "Pedro José",
        "apellidos": "pj002@gmail.com",
        "num_personas": "zumba",
        "personas": 2,
        "pilates": false,
        "trx": true,
        "yoga" : false,
        "fecha": "23/08/2023",
        "tramo": "10:55"
    },
    {
        "nombre": "Manuel Perez",
        "apellidos": "mp003@gmail.com",
        "num_personas": "zumba",
        "personas": 2,
        "pilates": false,
        "trx": true,
        "yoga" : false,
        "fecha": "23/08/2023",
        "tramo": "10:55"
    }
    
];*/



//Recuperar todas las reservas.
router.get('/', function (req, res) {
    reservasService.getAll((err, reservas) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (reservas.length == 0){
            	res.status(500).send({
                    msg: "No hay reservas actualmente"
                });
            } else {
                res.status(200).send(reservas);
            }
        }
    );
});


//Recuperar una única reserva existente por ID.
router.get('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.get(_id, (err, movie) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (movie.length == 0){
                res.status(500).send({
                    msg: "No existe esa reserva"
                });
            } else {
                res.status(200).send(movie);
            }
        }
    );
});


//Insertar una nueva reserva
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
                    msg: 'Reserva realizada'
                });
            }
        });
	}
});


//Actualizar una reserva existente por ID.
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
                msg: "Reserva no actualizada"
            });
        } else {
            res.status(200).send({
                msg: 'Reserva actualizada'
            });
        }
    });
});


//Eliminar todas las reservas.
router.delete('/', function (req, res) {
    reservasService.removeAll((err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Reserva cancelada'
            });
        }
    });
});


//Eliminar una unica reserva existente por ID.
router.delete('/:_id', function (req, res) {
    let _id = req.params._id;;
    reservasService.remove(_id, (err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Reservas canceladas'
            });
        }
    });
});

module.exports = router;
