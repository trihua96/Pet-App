'use strict';

// Button element
const btnSubmit = document.getElementById('submit-btn');
const btnHealthy = document.getElementById('healthy-btn');
const btnFind = document.getElementById('find-btn');
const btnExport = document.getElementById('export-btn');
const btnImport = document.getElementById('import-btn');
const btnInputFile = document.getElementById('input-file');

// Form element
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

// DOM element
const tableBodyEl = document.getElementById('tbody');
const sidebar = document.getElementById('sidebar');
const containerForm = document.getElementById('container-form');

// Activate nav sidebar
const activeSidebar = function () {
  sidebar.addEventListener('click', () => sidebar.classList.toggle('active'));
};

activeSidebar();

// Code on MDN convert to local date
const convertDate = function (key, value) {
  if (this[key] instanceof Date) {
    return this[key].toString();
  }
  return value;
};

// Convert object to string to save
const dataString = (key, convertDate) => JSON.stringify(key, convertDate);

// Save storage
const saveToStorage = function (key, dataString) {
  localStorage.setItem(key, dataString);
};

// Retrieve the object from LocalStorage
const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

// Group pet in list
let petArr = getFromStorage('petData');
let breedArr = getFromStorage('breedData');

// Retrieve breed types to select element
const renderBreed = function (breedTypes) {
  // Reset when breed selected
  breedInput.innerHTML = '<option>Select Breed</option>';

  const breedDogs = breedArr.filter((breeds) => breeds.type === 'Dog');
  const breedCats = breedArr.filter((breeds) => breeds.type === 'Cat');

  // Filter breed type
  const breed = breedTypes.value === 'Dog' ? breedDogs : breedCats;

  // Display
  breed.forEach((breedItem) => {
    const option = document.createElement('option');
    option.innerHTML = `
            ${breedItem.breed}
        `;
    breedInput.appendChild(option);
  });
};
