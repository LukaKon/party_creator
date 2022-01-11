$.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBMvS96FedoeGa8Ec7HeygGYiSPWVNyzhY&libraries=places")
            .done(function (script, textStatus) {
                google.maps.event.addDomListener(window, "load", initMap);
            });

        export function initMap() {

            const options = {
                componentRestrictions: {country: 'pl'}
            };
            const input = document.getElementById("location")
            const autocomplete = new google.maps.places.Autocomplete(input, options);

        }