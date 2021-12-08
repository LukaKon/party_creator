document.addEventListener("DOMContentLoaded", function () {
        $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBMvS96FedoeGa8Ec7HeygGYiSPWVNyzhY&libraries=places")
            .done(function (script, textStatus) {
                google.maps.event.addDomListener(window, "load", initMap);
            });

        function initMap() {
            const options = {
                componentRestrictions: {country: 'pl'}
            };
            const input = document.getElementById("location")
            autocomplete = new google.maps.places.Autocomplete(input ,options);
        }

        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        const csrftoken = getCookie('csrftoken');

        function getSelectValues(select) {
            let result = [];
            let options = select && select.options;
            let opt;

            for (let i = 0, iLen = options.length; i < iLen; i++) {
                opt = options[i];

                if (opt.selected) {
                    result.push(opt.value || opt.text);
                }
            }
            return result;
        }


        class FormHandling {
            constructor(form) {
                this.form = form;
                this.steps = form.querySelectorAll("#nextStep,#previousStep,#save");
                this.init();
            }

            init() {
                this.events();
                // this.googleAPI();
            }

            events() {
                this.steps.forEach(step => {
                    step.addEventListener("click", (step) => this.updateStep(step));
                });
            }


            googleAPI() {
                let input = form.querySelector('#location')
                initMap(input)
            }

            updateStep(button) {
                let active = document.querySelector("div.active");
                let step = button.currentTarget.getAttribute('id');
                if (step === 'nextStep') {
                    active.nextElementSibling.classList.add("active");
                    active.classList.remove("active");
                } else if (step === "previousStep") {
                    active.previousElementSibling.classList.add("active");
                    active.classList.remove("active");
                } else if (step === "save") {
                    this.save()
                    console.log('saveForm');
                }
            }

            save() {
                let location = this.form.querySelector("#location").value
                let radius = this.form.querySelector("#radius").value
                let price = this.form.querySelector("#price").value

                let data = JSON.stringify({
                    form_party: {
                        "seite_1": {
                            "location": location,
                            "radius": radius,
                            "price": price
                        }
                    },
                    is_open: true
                });

                fetch('http://127.0.0.1:8000/add_form/', {
                    method: 'POST',
                    body: data,
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrftoken,
                    },
                });
            }
        }

        const
            form = document.querySelector(".form--steps");

        if (form !== null) {
            new FormHandling(form);
        }
    }
)
;

// fetch('http://127.0.0.1:8000/update_form/{{dynamincznie_pobierane_z_html}}/', {
//     method: 'PATCH',
//     body: JSON.stringify({form_party: {"test": "test_bez_dodatkow"}}),
//     headers: {
//         "Content-Type": "application/json",
//         "X-CSRFToken": csrftoken,
//     },
// });
