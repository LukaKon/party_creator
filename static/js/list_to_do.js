import {getCookie} from "./getCsrftoken.js";

document.addEventListener("DOMContentLoaded", function () {
    const csrftoken = getCookie("csrftoken");

    class ListToDoHandling {
        constructor(listToDo) {
            this.listToDo = listToDo;
            this.init();
        }

        init() {
            this.buttonHandling();
        }

        buttonHandling() {
            let button = this.listToDo.querySelector("button#addName");
            button.addEventListener("click", () => {
                const form = document.createElement("form");
                const input = document.createElement("input");
                input.setAttribute("id", "name");
                const submit = document.createElement("input");
                submit.setAttribute("type", "submit");
                submit.setAttribute("value", "Edytuj");
                submit.setAttribute("id", "setName");
                form.appendChild(input);
                form.appendChild(submit);
                this.listToDo.insertBefore(form, button.nextElementSibling);
                this.setName();
            });
        }

        setName() {
            let submit = this.listToDo.querySelector("input#setName")
            submit.addEventListener("click", (event) => {
                event.preventDefault()
                let pk = this.listToDo.querySelector("input#pk").value;
                let name = this.listToDo.querySelector("input#name").value;
                let currentName = this.listToDo.querySelector("#currentName")
                currentName.innerText = "Nazwa: " + name
                const data = {"name": name}
                console.log('test')
                fetch('http://127.0.0.1:8000/update_form/' + pk + '/', {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrftoken,
                    },
                });
            });
        }
    }

    const listToDo = document.querySelector("div#listToDo");

    if (listToDo != null) {
        new ListToDoHandling(listToDo);
    }
});