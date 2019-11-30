'use strict';

function loadCar() {
    $("#content").load("cars.html");
}

function loadManufacturer() {
    $("#content").load("manufacturers.html");
}

function loadAddCar() {
    $("#content").load("addCar.html");
}

function loadAddManufacturer() {
    $("#content").load("addManufacturer.html");
}

function getCarTable() {
    $.getJSON( "/cars", function(cars) {
            var car_data = '';
            $.each(cars, function(key, value) {
                car_data += "<tr>";
                car_data += "<td>"+value.name+"</td>";
                car_data += "<td>"+value.consumption+"</td>";
                car_data += "<td>"+value.color+"</td>";
                car_data += "<td>"+value.manufacturer+"</td>";
                car_data += "<td>"+value.available+"</td>";
                car_data += "<td>"+value.year+"</td>";
                car_data += "<td>"+value.horsepower+"</td>";
                car_data += "</tr>"; 
            });
            $('#car_table').append(car_data);
        });
}

function getManufacturerTable() {
    $.getJSON( "/manufacturers", function(manufacturers) {
            var man_data = '';
            $.each(manufacturers, function(key, value) {
                man_data += "<tr>";
                man_data += "<td><a id="+value.name+" onclick='getCarByManufacturer(this.id)'>"+value.name+"</a></td>";
                man_data += "<td>"+value.country+"</td>";
                man_data += "<td>"+value.founded+"</td>";
                man_data += "</tr>"; 
            });
            $('#man_table').append(man_data);
    });
}

function getManufacturerName() {
    $.getJSON("/manufacturers", function(manufacts) {
       var man_names = '';
        $.each(manufacts, function(key, value) {
           man_names += "<option value='"+value.name+"'>"+value.name+"</option>"; 
        });
        $("#manufacturer").append(man_names);
    });
}

function getCarByManufacturer(id) {
    document.cookie = "name = " + String.empty;
    document.cookie = "name = " + id;
    $('#carByManu_table').children().remove();
    var th = "<tr><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>";
    $('#carByManu_table').append(th);
    $.getJSON("/manufacturer", function(c) {
        var car_data = '';
        $.each(c, function(key, value) {
            car_data += "<tr>";
            car_data += "<td>"+value.name+"</td>";
            car_data += "<td>"+value.consumption+"</td>";
            car_data += "<td>"+value.color+"</td>";
            car_data += "<td>"+value.manufacturer+"</td>";
            car_data += "<td>"+value.available+"</td>";
            car_data += "<td>"+value.year+"</td>";
            car_data += "<td>"+value.horsepower+"</td>";
            car_data += "</tr>"; 
        });
        $('#carByManu_table').append(car_data);
    });
}

$(function() {
    var form = $('#addCar');
    $(form).submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: form.serialize()
        })
    });
});

$(function() {
    var form = $('#addManu');
    $(form).submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: form.serialize()
        })
    });
});
