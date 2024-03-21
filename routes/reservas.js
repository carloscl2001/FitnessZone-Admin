'use strict';

const express = require('express');
const router = express.Router();
const reservasService = require('./reservas-service');



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
    reservasService.get(_id, (err, reserva) => {
            if (err) {
                res.status(500).send({
                	msg: err
            	});
            } else if (reserva.length == 0){
            	res.status(500).send({
                    msg: "No existe esa reserva"
                });
            } else {
                res.status(200).send(reserva);
            }
        }
    );
});


//Insertar una nueva reserva
router.post('/', function (req, res) {
    let movie = req.body;
    if (Object.entries(movie).length === 0){
        res.status(400).send({
            msg: 'Reserva no realizada, inserte datos.'
        });
    }
	else{
		reservasService.add(movie, (err, reserva) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } 
			else{
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
    const updatedReserva = req.body;
    reservasService.update(_id, updatedReserva, (err, numUpdates) => {
    if (err) {
        res.status(500).send({
            msg: err
        });
	} else if(numUpdates.modifiedCount === 0) {
            res.status(500).send({
                msg: "No existe la reserva para actualizar"
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
    reservasService.getAll((err, reservas) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (reservas.length === 0) {
            res.status(404).send({
                msg: 'No hay reservas para eliminar'
            });
        } else {
            reservasService.removeAll((err) => {
                if (err) {
                    res.status(500).send({
                        msg: err
                    });
                } else {
                    res.status(200).send({
                        msg: 'Reservas borradas'
                    });
                }
            });
        }
    });
});

//Eliminar una unica reserva existente por ID.
router.delete('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.remove(_id, (err, result) => {
        if (err) {
            res.status(500).send({
                msg: 'Error al eliminar la reserva'
            });
        } else if (result.deletedCount === 0) {
            res.status(404).send({
                msg: 'La reserva que intenta eliminar no existe'
            });
        } else {
            res.status(200).send({
                msg: 'Reserva cancelada'
            });
        }
    });
});

module.exports = router;
