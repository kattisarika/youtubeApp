$(function () {
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    console.log($orders);
    console.log($name);
    console.log($drink);

    function addOrder(dataArrayValue) {
        $orders.append('<li>name: ' + dataArrayValue.name + ',drink:' + dataArrayValue.drink + '</li>');
        $orders.append('<button>' + 'X' + ' </button>')
    }

    $.ajax({

        type: 'GET',
        url: 'http://rest.learncode.academy/api/learncode/friends',
        success: function (data) {
            console.log(data);
            $.each(data, function (dataArrayKey, dataArrayValue) {
                if (typeof dataArrayValue.name !== 'undefined' && dataArrayValue.name !== '' && typeof dataArrayValue.drink !== 'undefined' && dataArrayValue.drink !== '') {
                    addOrder(dataArrayValue);
                }
            });
        },
        error: function () {
            alert("error loading orders");
        }

    });

    $('#add-order').on('click', function () {
        var order = {
            name: $name.val(),
            drink: $drink.val(),
        };
        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/learncode/friends',
            data: order,
            success: function (newOrder) {
                addOrder(newOrder);
            },
            error: function () {
                alert("error loading orders");
            }
        });
    });

});
