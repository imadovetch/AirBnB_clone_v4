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
                loadPlaces();
            } else {
                $('#api_status').removeClass('available');
            }
        });
    }

    function loadPlaces() {
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search",
            contentType: "application/json",
            data: JSON.stringify({}),
            success: function (response) {
                displayPlaces(response);
            },
            error: function (error) {
                console.error("Error loading places:", error);
            }
        });
    }

    function displayPlaces(places) {
        $(".places").empty();

        places.forEach(function (place) {
            const article = $('<article></article>');
            article.append($('<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>'));
            const information = $('<div class="information"></div>');
            information.append($('<div class="max_guest">' + place.max_guest + ' Guests</div>'));
            information.append($('<div class="number_rooms">' + place.number_rooms + ' Bedrooms</div>'));
            information.append($('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom</div>'));
            article.append(information);
            article.append($('<div class="description">' + place.description + '</div>'));
            $(".places").append(article);
        });
    }

    checkAPIStatus();

    $('input[type="checkbox"]').change(function () {
        updateAmenitiesList();
    });
});

