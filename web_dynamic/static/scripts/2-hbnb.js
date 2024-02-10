$(document).ready(function () {
    function updateAmenitiesList() {
        const checkedList = {};
        $('input[type="checkbox"]:checked').each(function () {
            const key = $(this).data('id');
            const value = $(this).data('name');
            checkedList[key] = value;
            $(".amenities h4").text(Object.values(checkedList).join(', '));
        });
    }

    function checkAPIStatus() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    }

    checkAPIStatus();

    $('input[type="checkbox"]').change(function () {
        updateAmenitiesList();
    });
});
