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
            autocomplete = new google.maps.places.Autocomplete(input, options);

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


        class FormHandling {
            constructor(form) {
                this.form = form;
                this.steps = form.querySelectorAll("#nextStep,#previousStep,#save");
                this.init();
            }

            init() {
                this.events();
            }

            events() {
                this.steps.forEach(step => {
                    step.addEventListener("click", (step) => this.updateStep(step));
                });
            }

            getValues() {
                let inputs = this.form.querySelectorAll("input.formSave")
                let dict = {}
                inputs.forEach(input => {
                    dict[input.getAttribute("id")] = input.value
                })
                return dict
            }

            compareNumbers(a, b) {
                return parseFloat(a.innerText) - parseFloat(b.innerText)
            }

            sortPlaces(sort_type) {
                let div_step_2 = this.form.querySelector("div[data-step='2'] div#places");
                if (sort_type === "priceDescending" || sort_type === "priceAscending") {
                    var all_places = div_step_2.querySelectorAll('#price_level');
                } else if (sort_type === "ratingDescending" || sort_type === "ratingAscending") {
                    var all_places = div_step_2.querySelectorAll("#rating");
                }
                let with_info = [];
                let without_info = [];
                all_places.forEach(element => {
                    if (element.innerText === "undefined") {
                        without_info.push(element.parentElement);
                    } else {
                        with_info.push(element);
                    }
                });

                if (sort_type === "ratingDescending" || sort_type === "priceDescending") {
                    with_info.sort(this.compareNumbers).reverse();
                } else {
                    with_info.sort(this.compareNumbers);
                }

                let with_info_parent_element = []
                with_info_parent_element.forEach(element => {
                    test.push(element.parentElement)
                });
                this.addPlacesToHtmlAfterSort(with_info_parent_element, without_info);
            }

            sortType() {
                let option = this.form.querySelector("select#sortBy");
                option.addEventListener("change", (event) => {
                    this.sortPlaces(event.currentTarget.value)
                });
            }

            addPlacesToHtmlAfterSort(with_price, without_price) {
                let div_step_2 = this.form.querySelector("div[data-step='2'] div#places");
                div_step_2.innerText = "";
                with_price.forEach(element => {
                    div_step_2.appendChild(element);
                });

                let new_h2 = document.createElement("h2");
                new_h2.innerText = "Brak danych na temat cen";
                div_step_2.appendChild(new_h2);

                without_price.forEach(element => {
                    div_step_2.appendChild(element);
                });

            }

            addPlacesToHtml(data) {
                let div_step_2 = this.form.querySelector("div[data-step='2'] div#places");
                data.data.results.forEach(element => {
                    let new_div = document.createElement("div");

                    let new_p = document.createElement("p");
                    new_p.innerText = "Name : " + element.name;

                    let new_img = document.createElement("img");
                    new_img.setAttribute('src', "https://maps.googleapis.com/maps/api/place/photo" +
                        "?maxwidth=200" + "&maxheight=200" +
                        "&photo_reference=" + element.photos[0].photo_reference +
                        "&key=AIzaSyBMvS96FedoeGa8Ec7HeygGYiSPWVNyzhY");

                    let new_price = document.createElement("p");
                    new_price.setAttribute('id', "price_level");
                    new_price.innerText = "Price level " + element.price_level;

                    let new_rating = document.createElement("p");
                    new_rating.setAttribute('id', "rating");
                    new_rating.innerText = "Rating " + element.rating;


                    new_div.appendChild(new_p);
                    new_div.appendChild(new_img);
                    new_div.appendChild(new_price);
                    new_div.appendChild(new_rating);
                    div_step_2.appendChild(new_div);
                });
            }

            updateStep(button) {
                let active = document.querySelector("div.active");
                let step = button.currentTarget.getAttribute('id');
                if (step === 'nextStep') {
                    if (active.getAttribute('data-step') === '1') {
                        this.form.querySelector("div[data-step='2'] div#places").innerHTML = "";
                        let values = this.getValues();

                        fetch('http://127.0.0.1:8000/nearby/', {
                            method: 'POST',
                            body: JSON.stringify(values),
                            headers: {
                                "Content-Type": "application/json",
                                "X-CSRFToken": csrftoken,
                            },
                        }).then(response => response.json())
                            .then(data => this.addPlacesToHtml(data))
                        this.sortType()

                    }
                    active.nextElementSibling.classList.add("active");
                    active.classList.remove("active");
                } else if (step === "previousStep") {
                    active.previousElementSibling.classList.add("active");
                    active.classList.remove("active");
                } else if (step === "save") {
                    this.save();
                }
            }

            save() {
                let values = this.getValues();
                let pk = this.form.querySelector("#pk").value;

                let data = JSON.stringify({
                    is_open: true,
                    form_party: values,
                    name: "test"
                });

                fetch('http://127.0.0.1:8000/update_form/' + pk + '/', {
                    method: 'PATCH',
                    body: (data),
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
);
