import {getCookie} from "./getCsrftoken.js";
// import {initMap} from "./city_autocomplete.js";

document.addEventListener("DOMContentLoaded", function () {

        const csrftoken = getCookie("csrftoken");

        // initMap();
        $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBMvS96FedoeGa8Ec7HeygGYiSPWVNyzhY&libraries=places")
            .done(function (script, textStatus) {
                google.maps.event.addDomListener(window, "load", initMap);
            });

        function initMap() {

            const options = {
                componentRestrictions: {country: 'pl'}
            };
            const input = document.getElementById("location")
            const autocomplete = new google.maps.places.Autocomplete(input, options);

        }

        class FormHandling {
            constructor(form) {
                this.form = form;
                this.steps = form.querySelectorAll("#nextStep,#previousStep,#save");
                this.init();
                this.pk = this.form.querySelector("#pk").value;
            }

            init() {
                this.events();
            }

            events() {
                this.steps.forEach(step => {
                    step.addEventListener("click", (step) => this.updateStep(step));
                });
            }


            async getValues() {
                const response = await fetch("http://127.0.0.1:8000/get_form/" + this.pk + "/")
                let allData = await response.json();
                let dict = await allData['form_party']

                let inputs = this.form.querySelectorAll("input.formSave");
                let service_category = this.form.querySelector("#serviceCategory").value;

                await inputs.forEach(input => {
                    if (dict[service_category]) {
                        dict[service_category][input.getAttribute("id")] = input.value;
                    } else {
                        dict[service_category] = {}
                        dict[service_category][input.getAttribute("id")] = input.value;
                    }
                })

                let place_id = this.form.querySelector("input[name=placeID]:checked");
                if (place_id) {
                    dict[service_category]["place_id"] = (place_id.value);
                }

                return dict;
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
                let div_step2 = this.form.querySelector("div[data-step='2'] div#places");
                let helper = 0;

                data.forEach((element, index) => {

                    if(index===helper){
                        let new_row = document.createElement('div');
                        new_row.setAttribute("class", "row");
                        div_step2.appendChild(new_row);
                        helper+=4;
                    }

                    let new_row = document.querySelector("div.row:last-child");

                    let article = document.createElement("article");
                    article.setAttribute("class", "card col-sm-4");
                    article.setAttribute("style", "width: 18rem;");
                    // article.addEventListener("click", (event)=>{
                    //     console.log(event.currentTarget)
                        // location.href = "http://127.0.0.1:8000/announcement_details/" + element.slug + "/"
                    // })



                    let new_image = document.createElement("img");
                    new_image.setAttribute("src",
                        "/media/"+element.image);
                    new_image.setAttribute("class", "card-img-top");
                    article.appendChild(new_image);

                    let div_body = document.createElement("div");
                    div_body.setAttribute("class", "card-body");
                    article.appendChild(div_body);

                    let h5 = document.createElement("h5")
                    h5.innerText = element.title;
                    h5.setAttribute("class", "card-title");
                    div_body.appendChild(h5);

                    let p = document.createElement("p");

                    p.innerText = element.description.substr(0,60);
                    p.setAttribute("class", "card-text");
                    div_body.appendChild(p);

                    // let buttons = document.createElement("div");
                    // buttons.setAttribute("class", "btn btn-group");
                    // div_body.appendChild(buttons);

                    let a = document.createElement("a");
                    a.setAttribute("class", "btn btn-primary")
                    a.innerText = 'Submit'
                    div_body.appendChild(a)

                    new_row.appendChild(article);
                });


            }

            async getPlaces() {
                let places = null
                this.form.querySelector("div[data-step='2'] div#places").innerHTML = "";

                let service_category = this.form.querySelector("#serviceCategory").value;
                let location = this.form.querySelector("input.formSave#location").value;
                let radius = this.form.querySelector("input.formSave#radius").value;

                let data = {
                    "service_category": service_category,
                    "location": location,
                    "radius": radius,
                }

                await fetch('http://127.0.0.1:8000/nearby/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrftoken,

                    },
                }).then(response => response.json())
                    .then(data => places = data)
                return places
            }

            async updateStep(button) {
                let active = document.querySelector("div.active");
                let step = button.currentTarget.getAttribute('id');
                if (step === 'nextStep') {
                    if (active.getAttribute('data-step') === '1') {
                        let places = await this.getPlaces()
                        this.addPlacesToHtml(places)
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

            async save() {
                let values = await this.getValues()
                let data = JSON.stringify({
                    is_open: true,
                    form_party: values,
                });

                fetch('http://127.0.0.1:8000/update_form/' + this.pk + '/', {
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

