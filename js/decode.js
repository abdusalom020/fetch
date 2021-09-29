const elCaeserForm = document.querySelector('.caeser-form');
const elCaeserInputTextarea = elCaeserForm.querySelector('.js-caeser-input-textarea');
const elCaeserClearBtn = elCaeserForm.querySelector('.js-caeser-clear-btn');
const elCaeserSelect = elCaeserForm.querySelector('.js-caeser-select');
const elCaeserRunbtn = elCaeserForm.querySelector('.js-caeser-run-btn');
const elCaeserOutputTextarea = elCaeserForm.querySelector('.js-caeser-output-textarea');
const elCaeserCopyBtn = elCaeserForm.querySelector('.js-caeser-copy-btn');



function showRotOptions() {
  const elRotFragment = document.createDocumentFragment();
  for (let rot = 25; rot >= 1; rot--) {
    const derot = 26;
    const elRotOption = document.createElement('option');
    elRotOption.textContent = `Rot - ${derot - rot}`;
    elRotOption.value = rot;
    elRotFragment.appendChild(elRotOption);
  };
  elCaeserSelect.appendChild(elRotFragment);
};

function Caser (str, amount) {
  // Wrap the amount
  if (amount < 0) {
    return caesarShift(str, amount + 26);
  }

  // Make an output variable
  var output = "";

  // Go through each character
  for (var i = 0; i < str.length; i++) {
    // Get the character we'll be appending
    var c = str[i];

    // If it's a letter...
    if (c.match(/[a-z]/i)) {
      // Get its code
      var code = str.charCodeAt(i);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      }

      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }

    // Append
    output += c;
  }

  if (str === '') {
    output = ''
  }
  // All done!
  elCaeserOutputTextarea.value = output;
};

showRotOptions();

elCaeserRunbtn.addEventListener('click', evt => {
  evt.preventDefault();
  const userInput = elCaeserInputTextarea.value;
  const userRot = Number(elCaeserSelect.value);

  Caser(userInput, userRot);
  elCaeserSelect.addEventListener('input', evt => {
    const userRot = Number(elCaeserSelect.value);
    Caser(userInput, userRot);
  });  
});

if (elCaeserClearBtn) {
  elCaeserClearBtn.addEventListener('click', evt => {
    elCaeserInputTextarea.value = '';
    elCaeserOutputTextarea.value = '';
  });
};

elCaeserCopyBtn.addEventListener('click', evt => {
  evt.preventDefault();
  elCaeserOutputTextarea.select(elCaeserOutputTextarea.value);
  document.execCommand('copy');
});


