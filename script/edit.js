'use strict';

// Activate nav sidebar
activeSidebar;

// Handle Display Form UI
const dataFormEdit = function (petID) {
  // Search petEdit ID
  const petEdit = petArr.find((pets) => pets.id === petID);

  // Info petEdit datas = ID
  typeInput.value = petEdit.type;
  idInput.value = petEdit.id;
  nameInput.value = petEdit.name;
  ageInput.value = petEdit.age;
  weightInput.value = petEdit.weight;
  lengthInput.value = petEdit.lengthValue;
  colorInput.value = petEdit.color;
  vaccinatedInput.checked = petEdit.vaccinated;
  dewormedInput.checked = petEdit.dewormed;
  sterilizedInput.checked = petEdit.sterilized;

  // Handle option selected then display valid breed
  renderBreed(typeInput);
  breedInput.value = petEdit.breed;
};

// Click edit event
const startEditPet = function (petID) {
  // Ative Form when click edit
  containerForm.classList.remove('hide');

  // Display Form with ID selected
  dataFormEdit(petID);
  //
};

// Display edit table
const renderEditTable = function (petArr) {
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr');
    const date = new Date(petArr[i].date);
    row.innerHTML = `
            <th scope="row">${petArr[i].id}</th>
            <td>${petArr[i].name}</td>
            <td>${petArr[i].age}</td>
            <td>${petArr[i].type}</td>
            <td>${petArr[i].weight}</td>
            <td>${petArr[i].lengthValue}</td>
            <td>${petArr[i].breed}</td>
            <td>
                <i class="bi bi-square-fill" style="color: ${
                  petArr[i].color
                };"></i>
            </td>
            <td><i class="bi ${
              petArr[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
            }"></i></td>
            <td>
                <i class="bi ${
                  petArr[i].dewormed
                    ? 'bi-check-circle-fill'
                    : 'bi-x-circle-fill'
                }"></i>            
              </td>        
              <td>
                <i class="bi ${
                  petArr[i].sterilized
                    ? 'bi-check-circle-fill'
                    : 'bi-x-circle-fill'
                }"></i>         
              </td>
            <td>${String(date.getDate()).padStart(2, 0)} /${String(
      date.getMonth() + 1
    ).padStart(2, 0)} /${date.getFullYear()}</td>
            <td>
                <button type="button" class="btn btn-warning" onclick="startEditPet('${
                  petArr[i].id
                }')">Edit</button>
            </td>
        `;
    tableBodyEl.appendChild(row);
  }
};

renderEditTable(petArr);

btnSubmit.addEventListener('click', function () {
  const data = {
    //2. Get Value from Input
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthValue: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,

    // date: new Date(),
    validateData() {
      let submitOk = true;
      //Check Name
      if (this.name.trim() === '') {
        alert('Empty name value!');
        submitOk = false;
      }
      // "Age must be between 1 and 15!".
      if (this.age < 1 || this.age > 15 || isNaN(this.age)) {
        alert('Age must be between 1 and 15!');
        submitOk = false;
      }

      // "Weight must be between 1 and 15!".
      if (this.weight < 1 || this.weight > 15 || isNaN(this.weight)) {
        alert('weight must be between 1 and 15!');
        submitOk = false;
      }
      //   "Length must be between 1 and 100!".
      if (
        this.lengthValue < 1 ||
        this.lengthValue > 100 ||
        isNaN(this.lengthValue)
      ) {
        alert('Length must be between 1 and 100!');
        submitOk = false;
      }

      //   "Please select Type!".
      if (this.type === 'Select Type') {
        alert('Please select Type!');
        submitOk = false;
      }

      //"Please select Breed!".
      if (this.breed === 'Select Breed') {
        alert('Please select Breed!');
        submitOk = false;
      }
      return submitOk;
    },
  };
  //  Run validate values then add in array
  if (data.validateData()) {
    alert('Add data success!');

    // Check null
    if (!petArr) saveToStorage('petData', '[]');
    petArr = getFromStorage('petData');

    // Find address index = ID edit
    const indxPetFound = petArr.findIndex((pet) => pet.id === idInput.value);

    for (let i = 0; i < petArr.length; i++) {
      // Check Index ID of petArr = indxFound
      if (i === indxPetFound) {
        // Use spread operator to update data of ID editing
        petArr[i] = { ...petArr[i], ...data };
        break; // Immediately out after update.
      }
    }

    renderEditTable(petArr);

    // Hidden Form input
    containerForm.classList.add('hide');

    // Update in local
    saveToStorage('petData', dataString(petArr, convertDate));
  } else {
    alert('Check again input!');
  }
});
