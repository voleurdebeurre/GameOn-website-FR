//-------------------------- //
// -- NAVBAR DECLARATIONS -- //
//-------------------------- //

const navBlock = document.querySelector(".main-navbar");
const navTrigger = document.querySelector(".icon");


// handles nav mobile open/close events
navTrigger.onclick = function() {
  if(navBlock.classList.contains("nav-open")){
    navBlock.classList.remove("nav-open");
  }else{
    navBlock.classList.add("nav-open");
  } 
}

//------------------------------ //
// -- NAVBAR DECLARATIONS END -- //
//------------------------------ //

//--------------------------//
// -- MODAL DECLARATIONS -- //
//------------------------- //

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");
const modalCloseBtnValid = document.querySelector(".form-valid-close");

const formFeedbackMessage = document.querySelector(".content-valid");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal events
modalCloseBtn.addEventListener("click", closeModal);
modalCloseBtnValid.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  // displays the modal
  modalbg.style.display = "block";
  // makes sure that the feedback once form is hidden is valid
  formFeedbackMessage.classList.remove("toggle-form-valid");
  // clears all fields
  clearFormFieldsFeedback();
}

// Function to remove all feedbacks on the fields
function clearFormFieldsFeedback(){
  // Targets the fields
  let getAllFormFields = document.querySelectorAll('.formData');
  // Targets the messages
  let getAllFormFeedbacks = document.querySelectorAll('.invalidfeedback');
  // For each error message
  for( i = 0; i < getAllFormFeedbacks.length; i++){
    // Empty the div
    getAllFormFeedbacks[i].innerHTML = "";
  }
  // For each field
  for( j = 0; j < getAllFormFields.length; j++){
    // Removes the class that outlines it red
    getAllFormFields[j].classList.remove("invalid");
  }
}

// Function to reset the form inputs
function clearFormFields(){
  document.querySelector('.userform').reset();
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
  // Clears all the fields on modal close
  clearFormFields()
}

//----------------------------- //
// -- END MODAL DECLARATIONS -- //
//----------------------------- //

//----------------------------------- //
// -- FORM VALIDATION DECLARATIONS -- //
//----------------------------------- //

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

const submitBtn = document.querySelector(".btn-submit");
const formToValidate = document.querySelector(".userform");

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
    console.log("Send to back end");
    // Displays thank you message
    formFeedbackMessage.classList.add("toggle-form-valid");
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

//uses regex to check if input contains numbers only
const isOnlyNumbers = (value) => {
  const regex = /^[0-9]+$/;
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
}else if (!isOnlyNumbers(tournamentQuantity)){
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

// Checks if a city is checked
const checkCities = () => {
  // by default the input is not valid
  let valid = false;
  // set iterator
  let i = 0;
  // while i is smaller than the number of radio buttons
  while (i < userTournamentCities.length) {
    // checks if a radio button is checked
    if (userTournamentCities[i].checked) valid = true;
    // if not, iterates
    i++;
  }

  // if no radio button has been checked
  if(!valid){
    validationError(userTournamentCities[0], "Please choose a city")
  }else{
    validationSuccess(userTournamentCities[0]);
    valid = true;
  }
  return valid;
}

// Checks if terms and conditions checkbox is checked
const checkTerms = () => {
  // by default the input is not valid
  let valid = false;
  // Checks if checkbox has attribute checked
  if(!userTermsAndConditions.checked){
    validationError(userTermsAndConditions, "You must accept the terms & conditions")
  }else{
    validationSuccess(userTermsAndConditions);
    valid = true;
  }
  return valid;
}
