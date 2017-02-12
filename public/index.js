$(document).ready(function() {

    $.ajax({
        url: "/data",
        type: "GET",
        dataType: "json",
        success: crm,
        error: function() {
            // alert("404 Not Found - Oops something went wrong !");
        }
    });

    function crm(data) {
        var customers = data.customers;
        for (var i = 0; i < data.customers.length; i++) {
            var customer = customers[i];
            var template =
                "{{id}} {{first_name}} {{last_name}}<br>" +
                "{{company}}<br>" +
                "{{role}}<br>" +
                "{{phone}}<br>" +
                "{{email}}<br>" +
                "{{description}}<br><hr>";
            var rendered = Mustache.render(template, customer);
            $('#crm').append(rendered);
        };
    };

    $.getJSON("/data", function(data) {
        $(".btn").click(function() {
            location.href = '/post';
        });
    });


});