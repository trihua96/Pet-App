'use strict';

// Activate nav sidebar animation
activeSidebar;

// Handle data breed table
const renderBreedTable = function (breedArr) {
  // Check null
  if (!breedArr) return;

  tableBodyEl.innerHTML = '';

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr');

    row.innerHTML = `
              <td>${(breedArr[i].id = i + 1)}</td>
              <td>${breedArr[i].breed}</td>
              <td>${breedArr[i].type}</td>
              <td>
                  <button type="button" class="btn btn-danger" onclick="deleteData(${
                    breedArr[i].id
                  })">Delete</button>
              </td>
          `;

    tableBodyEl.appendChild(row);
  }
};

// Display data breed on table
renderBreedTable(breedArr);

// Delete breed
const deleteData = function (breedID) {
  // Confirm before delete
  const deleteConfirm = confirm('Are you sure?');
  if (deleteConfirm) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breedID === breedArr[i].id) {
        // Remove element from array
        breedArr.splice(i, 1);

        renderBreedTable(breedArr);

        // Update pet to localStorage
        saveToStorage('breedData', dataString(breedArr, convertDate));

        alert('Delete Success!');
      }
    }
  }
};

// Add breed submit event
btnSubmit.addEventListener('click', function () {
  const breedData = {
    breed: breedInput.value,
    type: typeInput.value,

    validateData() {
      let submitOk = true;
      if (!this.breed.trim()) {
        submitOk = false;
        alert('Empty breed value!');
      }
      if (this.type === 'Select Type') {
        submitOk = false;
        alert('Let select type value!');
      }
      return submitOk;
    },

    clearInput() {
      breedInput.value = '';
      typeInput.value = 'Select Type';
    },
  };

  // Check validate input
  if (breedData.validateData()) {
    alert('Add data success!');

    // Check null = true
    if (!breedArr) saveToStorage('breedData', '[]');
    breedArr = getFromStorage('breedData');

    // Add breed in array
    breedArr.push(breedData);

    renderBreedTable(breedArr);

    breedData.clearInput();

    // Update in local
    saveToStorage('breedData', dataString(breedArr, convertDate));
  } else {
    alert('Check again input!');
  }
});
