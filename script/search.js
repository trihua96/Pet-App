'use strict';

// Activate nav sidebar
activeSidebar;

// Handle data search
const renderSearchTable = function (petArr) {
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
        `;
    tableBodyEl.appendChild(row);
  }
};

// Display data searched on table
renderSearchTable(petArr);

// Click Search event
btnFind.addEventListener('click', function () {
  let petArrFind = petArr;

  // Filter id includes id input
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  // Filter value inlucdes name input
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  // Filter typeInput = type pet array
  if (typeInput.value != 'Select Type') {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  // Filter Breed
  if (breedInput.value != 'Select Breed') {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  ///////////////////
  // Filter vaccinated , dewormed, sterilized
  if (vaccinatedInput.checked) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInput.checked) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  if (sterilizedInput.checked) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }
  //////////////////

  // Display pet list is find out
  renderSearchTable(petArrFind);
});
