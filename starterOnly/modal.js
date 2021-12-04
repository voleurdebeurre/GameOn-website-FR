function editNav() {
  var navTrigger = document.querySelector(".main-navbar");
  if (navTrigger.style.display === "block") {
    navTrigger.style.display = "none";
  } else {
    navTrigger.style.display = "block";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");

const submitBtn = document.querySelector(".btn-submit");
const formToValidate = document.querySelector(".userform");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal events
modalCloseBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  clearFormFieldsFeedback()
}

function clearFormFieldsFeedback(){
  let getAllFormFields = document.querySelectorAll('.formData');
  let getAllFormFeedbacks = document.querySelectorAll('.invalidfeedback');
  for( i = 0; i < getAllFormFeedbacks.length; i++){
    getAllFormFeedbacks[i].innerHTML = "";
  }
  for( j = 0; j < getAllFormFields.length; j++){
    getAllFormFields[j].classList.remove("invalid");
  }
}

function clearFormFields(){
  document.querySelector('.userform').reset();
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}


// get form inputs
// first name
let userFirstName = document.querySelector("#first"),
// last name
userLastName = document.querySelector("#last"),
// email
userEmail = document.querySelector("#email"),
// birthdate
userBirth = document.querySelector("#birthdate"),
// quantity
userTournamentQuantity = document.querySelector("#quantity"),
// cities
userTournamentCities = document.getElementsByName("location"),
// terms & conditions
userTermsAndConditions = document.querySelector("#checkbox1"),
// newsletter
userNewsletter = document.querySelector("#checkbox2");

// submit button event
formToValidate.addEventListener("submit", (e) => {
  // prevents default behaviour on submit
  e.preventDefault();
  // validate fields
  let isFirstNameValid = checkFirstName(),
      isLastNameValid = checkLastName(),
      isEmailValid = checkEmail(),
      isBirthDateValid = checkBirthDate(),
      isTournamentQuantityValid = checkTournamentQuantity(),
      isCityValid = checkCities(),
      isTermsValid = checkTerms();

  let isFormValid = isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isBirthDateValid &&
      isTournamentQuantityValid &&
      isCityValid &&
      isTermsValid;


  // submit to the server if the form is valid
  if (isFormValid) {
    console.log("Send to back end")

  }
})

// returns true if input is empty
const isRequired = value => value === "" ? false : true;

// returns false if length is not higher than min value
const isMinimum = (length, min) => length < min ? false : true;

//uses regex to check if input contains letters only
const isOnlyLetters = (value) => {
  const regex = /[^a-zA-Z]/;
  return regex.test(value);
}

// uses regex to check if email formatting is valid
const isEmailValid = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

// Handles the error messages and visual feedback
const validationError = (field, message) => {
  // targets the parent div of the field => (div class formData)
  const getField = field.parentElement;

  // adds the class to display the error
  getField.classList.remove("valid");
  getField.classList.add("invalid");
  // shows the error error message in the div class invalid
  const errorMessage = getField.querySelector(".invalidfeedback");
  errorMessage.textContent = message
}

// Handles the case where a input is valild
const validationSuccess = (field) => {
    // targets the parent div of the field => (div class formData)
    const getField = field.parentElement;

    // removes the class that displays the error
    getField.classList.remove('invalid');
    // adds the class that displays the valid state of a field
    getField.classList.add('valid');

    // hides the error message
    const errorMessage = getField.querySelector(".invalidfeedback");
    errorMessage.textContent = '';
}

// Checks if first name is valid
const checkFirstName = () => {
  // by default, the input isn't valid
  let valid = false;
  // sets the minimum value for the first and last name length
  const min = 2;
  // gets the contents of the input
  const firstName = userFirstName.value.trim();

  // checks if field is empty
  if (!isRequired(firstName)){
    validationError(userFirstName, "This field can not be empty.")
  // checks if field is min 2 characters
  }else if (!isMinimum(firstName.length, min)){
    validationError(userFirstName, "This field should contain at least 2 characters.")
  // checks if field only contains letters
  }else if (isOnlyLetters(firstName)){
    validationError(userFirstName, "This field should only contain letters")
  // considers the input valid
  }else{
    validationSuccess(userFirstName);
    valid = true;
  }

  return valid;
}

// Checks if last name is valid
const checkLastName = () => {
  // by default, the input isn't valid
  let valid = false;
  // sets the minimum value for the first and last name length
  const min = 2;
  // gets the contents of the input
  const lastName = userLastName.value.trim();

  // checks if field is empty
  if (!isRequired(lastName)){
    validationError(userLastName, "This field can not be empty.")
  // checks if field is min 2 characters
  }else if (!isMinimum(lastName.length, min)){
    validationError(userLastName, "This field should contain at least 2 characters.")
  // checks if field only contains letters
  }else if (isOnlyLetters(lastName)){
    validationError(userLastName, "This field should only contain letters")
  // considers the input valid
  }else{
    validationSuccess(userLastName);
    valid = true;
  }
  return valid;
}

// Checks if email is valid
const checkEmail = () => {
    // by default, the input isn't valid
    let valid = false;
    // gets the contents of the input
    const email = userEmail.value.trim();

    // checks if field is empty
    if (!isRequired(email)) {
        validationError(userEmail, 'Email cannot be empty.');
    // checks if email syntax is valid
    } else if (!isEmailValid(email)) {
        validationError(userEmail, 'Email is not valid.')
    // considers the input valid
    } else {
        validationSuccess(userEmail);
        valid = true;
    }
    return valid;
}

// Checks if tournament quantity is valid
const checkTournamentQuantity = () => {
  // by default, the input isn't valid
  let valid = false;
  // gets the contents of the input
  const tournamentQuantity = userTournamentQuantity.value.trim();

  // checks if field is empty
  if (!isRequired(tournamentQuantity)){
    validationError(userTournamentQuantity, "This field can not be empty.")
  // checks if field only contains numbers
  }else if (!isOnlyLetters(tournamentQuantity)){
    validationError(userTournamentQuantity, "This field should only contain numbers")
  // considers the input valid
  }else{
    validationSuccess(userTournamentQuantity);
    valid = true;
  }
  return valid;
}

// Checks if birthdate is valid
const checkBirthDate = () => {
  // by default, the input isn't valid
  let valid = false;
  // gets the contents of the input
  const birthdate = userBirth.value;

  // checks if field is empty
  if (birthdate.length === 0){
    validationError(userBirth, "Please set your birth date")
  // checks if field only contains numbers
  }else{
    validationSuccess(userBirth);
    valid = true;
  }
  return valid;
}

const checkCities = () => {
  let valid = false;

  let i = 0;
  while (i < userTournamentCities.length) {
    if (userTournamentCities[i].checked) valid = true;
    i++;
  }

  if(!valid){
    validationError(userTournamentCities[0], "Please choose a city")
  }else{
    validationSuccess(userTournamentCities[0]);
    valid = true;
  }
  return valid;
}

const checkTerms = () => {
  let valid = false;

  if(!userTermsAndConditions.checked){
    validationError(userTermsAndConditions, "You must accept the terms & conditions")
  }else{
    validationSuccess(userTermsAndConditions);
    valid = true;
  }
  return valid;
}
