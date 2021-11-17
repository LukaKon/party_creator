console.log("js");
let exercise = document.querySelectorAll("#div_image");
let container = document.querySelector("#form_container");
let addButton = document.querySelector("#add_form");
let totalForms = document.querySelector("#id_form-TOTAL_FORMS");

let formNum = exercise.length - 1;
addButton.addEventListener("click", addForm);

function addForm(event) {
  event.preventDefault();

  let newForm = exercise[0].cloneNode(true);
  let formRegex = RegExp(`form-(\\d){1}-`, "g");

  formNum++;
  newForm.innerHTML = newForm.innerHTML.replace(formRegex, `form-${formNum}-`);
  container.insertBefore(newForm, addButton);

  totalForms.setAttribute("value", `${formNum + 1}`);
}
