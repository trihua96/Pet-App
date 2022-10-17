'use strict';

// Save static data to File
const saveStaticDataToFile = function () {
  const blob = new Blob([JSON.stringify(getFromStorage('petData'), null, 2)], {
    type: 'application/json',
  });

  // Save file by FileSaver.js library
  saveAs(blob, 'petData.json');
};

// Click export event
btnExport.addEventListener('click', function () {
  const isExport = confirm('Do you want to Export!');
  if (isExport) {
    saveStaticDataToFile();
  }
});

// Click Import event
btnImport.addEventListener('click', function () {
  // Check file is selected
  if (btnInputFile.value) {
    const isImport = confirm('Do you want import?');
    if (isImport) {
      const file = btnInputFile.files[0];

      // Read file and save in localStorage
      if (file) {
        const readerFile = new FileReader();

        // Load data file
        readerFile.addEventListener(
          'load',
          function () {
            // Convert object string to object
            const dataReader = JSON.parse(readerFile.result);

            // Save local
            saveToStorage('petData', dataString(dataReader, convertDate));

            // Note after save ok
            alert('File is success imported!!');
          },
          false
        );

        readerFile.readAsText(file, 'UTF-8');
      }

      // Remove file select
      btnInputFile.value = '';
    }
  } else {
    alert('Please! let select file import.');
  }
});
