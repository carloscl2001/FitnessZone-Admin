//Recuperar todas las reservas.
function getAllReservas() {
    let myUrl = "http://localhost:8080/reservas";
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            mostrarTabla(data);
	    	//$("#resPelicula").html(JSON.stringify(data));
        },
        error: function(res) {
            console.error("ERROR:", res.status, res.statusText);
        }
    });
}


//Recuperar una única reserva existente por ID.
function getReserva(reservaId) {
    let myUrl = "http://localhost:8080/reservas/" + reservaId;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: myUrl,
        success: function(data) {
	        mostrarTabla(data);
            //$("#resPelicula").html(JSON.stringify(data[0]));
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}


//Insertar una nueva reserva
function postReserva() {
    var data = {
        "nombre": $('#nombre').val(),
        "apellidos": $('#apellidos').val(),
        "pilates": $('#sala').val() === 'Pilates', // Si selecciona Pilates, establecer pilates como true
        "trx": $('#sala').val() === 'Trx', // Si selecciona TRX, establecer trx como true
        "yoga": $('#sala').val() === 'Yoga',// Si selecciona Yoga, establecer yoga como true
        "personas": $('#personas').val(),
        "fecha": $('#fecha').val(),
        "tramo": $('#tramo').val()
    };

    

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/reservas",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify(data),
        success: function(data) {
           //$("#resReserva").html(data);
           getAllReservas();
        },
        error: function(res) {
            alert("ERROR: " + res.statusText);
        }
    })
}

//Actualizar una reserva existente por ID.
function putReserva(reservaId) {
    var data = {
        "nombre": $('#nombre2').val(),
        "apellidos": $('#apellidos2').val(),
        "pilates": $('#sala2').val() === 'Pilates', // Si selecciona Pilates, establecer pilates como true
        "trx": $('#sala2').val() === 'Trx', // Si selecciona TRX, establecer trx como true
        "yoga": $('#sala2').val() === 'Yoga',// Si selecciona Yoga, establecer yoga como true
        "personas": $('#personas2').val(),
        "fecha": $('#fecha2').val(),
        "tramo": $('#tramo2').val(),
    };
    var myUrl = "http://localhost:8080/reservas/" + reservaId;
    $.ajax({
        type: "PUT",
        dataType: "json",
        url: myUrl,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(data) {
            //$("#resReserva").html(JSON.stringify(data));
            getAllReservas();
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}


//Eliminar todas las reservas.
function deleteAllReservas() {
    var myUrl = "http://localhost:8080/reservas/";
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            getAllReservas();
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}


//Eliminar una unica reserva existente por ID.
function deleteReserva(reservaId) {
    var myUrl = "http://localhost:8080/reservas/" + reservaId;
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: myUrl,
        success: function(data) {
            //$("#resReserva").html("Reserva eliminada correctamente");
            getAllReservas();
        },
        error: function(res) {
            let mensaje = JSON.parse(res.responseText);
            alert("ERROR: " + mensaje.msg);
        }
    });
}


//Funcion para mostrar una tabla con los data
function mostrarTabla(data){
    var tabla = "<table><thead><tr><th>ID</th><th>Nombre</th><th>Apellidos</th><th>Número de personas</th><th>Tipo</th><th>Fecha</th><th>Hora de inicio</th></tr></thead><tbody>";
    for (var i = 0; i < data.length; i++) {
        var tipoSala = '';
        if (data[i].pilates === true) {
            tipoSala = 'Pilates';
        } else if (data[i].trx === true) {
            tipoSala = 'TRX';
        } else if (data[i].yoga === true) {
            tipoSala = 'Yoga';
        }
        tabla += "<tr><td>" + data[i]._id + "</td><td>" + data[i].nombre + "</td><td>" + data[i].apellidos + "</td><td>" + data[i].personas + "</td><td>" + tipoSala + "</td><td>" + data[i].fecha + "</td><td>" + data[i].tramo + "</td></tr>";
    }
    tabla += "</tbody></table>";
    $("#resReserva").html(tabla);
}