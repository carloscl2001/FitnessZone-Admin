'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;
const Reservas = function () {
};

Reservas.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://test:carlosrobe@cacl-pnet-2023-2024.ssviwhi.mongodb.net/?retryWrites=true&w=majority&appName=cacl-pnet-2023-2024",
        {useNewUrlParser: true, useUnifiedTopology: true},
        function (err, database) {
            if (err) {
				console.log(err);
				callback(err);
            }

			db = database.db('cacl-pnet-2023-2024').collection('reservas');
			console.log("Conexión correcta");

            callback(err, database);
        });
};

//Recuperar todas las reservas.
Reservas.prototype.getAll = function (callback) {
    return db.find({}).toArray(callback);
};


//Recuperar una única reserva existente por ID.
Reservas.prototype.get = function (_id, callback) {
    return db.find({_id: ObjectId(_id)}).toArray(callback);
};

//Insertar una nueva reserva
Reservas.prototype.add = function (movie, callback) {
    return db.insertOne(movie, callback);
};

//Actualizar una reserva existente por ID.
Reservas.prototype.update = function (_id, updatedMovie, callback) {
    delete updatedMovie._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedMovie}, callback);
};

//Eliminar todas las reservas.
Reservas.prototype.remove = function (_id, callback) {
    return db.deleteOne({_id: ObjectId(_id)}, callback);
};

//Eliminar una unica reserva existente por ID.
Reservas.prototype.removeAll = function (callback) {
    return db.deleteMany({}, callback);
};

module.exports = new Reservas();