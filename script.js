'use strict';

const renderTableData = function (petArr) {
  // Check list
  if (!petArr) return;
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < petArr.length; i++) {
    // Convert string to date object
    const date = new Date(petArr[i].date);

    // Create a row Element
    const row = document.createElement('tr');

    row.innerHTML = `
              <th scope="row">${petArr[i].id}</th>         
              <td>${petArr[i].name}</td>
              <td>${petArr[i].age}</td>
              <td>${petArr[i].type}</td>
              <td>${petArr[i].weight} kg</td>
              <td>${petArr[i].lengthValue} cm</td>
              <td>${petArr[i].breed}</td>
              <td>
                <i class="bi bi-square-fill" style="color: ${
                  petArr[i].color
                };"></i>            
              </td>
              <td>
                <i class="bi ${
                  petArr[i].vaccinated
                    ? 'bi-check-circle-fill'
                    : 'bi-x-circle-fill'
                }"></i>            
              </td>
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
              <td>
                ${String(date.getDate()).padStart(2, 0)} / ${String(
      date.getMonth() + 1
    ).padStart(2, 0)}/ ${date.getFullYear()}
              </td>
              <td>
                <button type="button"  class="btn btn-danger" onclick="deleteData('${
                  petArr[i].id
                }')">Delete</button>
              </td>
          `;
    tableBodyEl.appendChild(row);
  }
};

// Output Pet list
renderTableData(petArr);

// Delete data row
const deleteData = function (petID) {
  // Confirm before delete
  const deleteConfirm = confirm('Are you sure?');
  if (deleteConfirm) {
    for (let i = 0; i < petArr.length; i++) {
      if (petID === petArr[i].id) {
        // Remove element from array
        petArr.splice(i, 1);

        renderTableData(petArr);

        // Update pet to localStorage
        saveToStorage('petData', dataString(petArr, convertDate));

        alert('Delete Success!');
      }
    }
  }
};

//1. Event Click Submit
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

    date: new Date(),
    validateData() {
      let submitOk = true;
      //   "Check: ID must unique!"
      if (petArr) {
        for (let i = 0; i < petArr.length; i++) {
          if (this.id.toLowerCase() === petArr[i].id.toLowerCase()) {
            alert('ID must unique!');
            submitOk = false;
            break;
          }
        }
      }
      //Check ID: Empty
      if (this.id.trim() === '') {
        alert('Empty ID value!');
        submitOk = false;
      }
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
    //Delete Form values after submited
    clearInput: () => {
      idInput.value = '';
      nameInput.value = '';
      ageInput.value = '';
      weightInput.value = '';
      lengthInput.value = '';
      typeInput.value = 'Select Type';
      breedInput.value = 'Select Breed';
      colorInput.value = '#000000';
      vaccinatedInput.checked = false;
      dewormedInput.checked = false;
      sterilizedInput.checked = false;
    },
  };

  // 3.Run validate values then add in array
  if (data.validateData()) {
    alert('Add data success!');

    // Check null = true
    if (!petArr) saveToStorage('petData', '[]');
    petArr = getFromStorage('petData');
    //4.Add Pet
    petArr.push(data);

    renderTableData(petArr);

    data.clearInput();

    saveToStorage('petData', dataString(petArr, convertDate));
  } else {
    alert('Check again input!');
  }
}); // End submit event

//----- Event click Healthy Pet -----

//Check Show: Show All Pet / Show Healthy Pet
let healthyCheck = false;

btnHealthy.addEventListener('click', function () {
  const healthyPetArr = [];
  //Thay đổi nội dung phần tử thành: Show All Pet / Show Healthy Pet
  if (healthyCheck) {
    btnHealthy.textContent = 'Show Healthy Pet';
    healthyCheck = false;
    //Show All Pet
    renderTableData(petArr);
  } else {
    btnHealthy.textContent = 'Show All Pet';
    healthyCheck = true;

    for (let i = 0; i < petArr.length; i++) {
      //Check Pet đủ điều kiện sức khỏe
      if (
        petArr[i].vaccinated === true &&
        petArr[i].dewormed === true &&
        petArr[i].sterilized === true
      ) {
        //Thêm vào mảng healthy
        healthyPetArr.push(petArr[i]);
      }
    }

    //Show All healthy Pet
    renderTableData(healthyPetArr);
  }
});
