import { toggleForm, clearForm } from "./form";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/index.css";
import { fetchCards } from "./card";

import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';
import { getDb, initdb, postDb, deleteDb, editDb } from "./database";

window.addEventListener('load', function() {
    initdb();
    fetchCards();

    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
});

const form = document.getElementById("formToggle");
const newContactButton = document.getElementById("new-contact");
const installBtn = document.getElementById('installBtn');
let submitBtnToUpdate = false;
let profileId;

newContactButton.addEventListener('click', event => {
  toggleForm()
 })

form.addEventListener('submit', event => {
  // Handle data
  event.preventDefault();
let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let email = document.getElementById("email").value;
let profile = document.querySelector('input[type="radio"]:checked').value;

  // Post form data to IndexedDB OR Edit an existing card in IndexedDB
if (submitBtnToUpdate == false) {
  postDb(name, email, phone, profile);
} else {

  fetchCards();
  editDb(profileId, name, email, phone, profile);
    // Toggles the submit button back to POST functionality
  submitBtnToUpdate = false;
}

// Clear form
clearForm();
// Toggle form
toggleForm();
// Reload the DOM
fetchCards();
});

window.deleteCard = (e) => {
    let id = parseInt(e.id);
    deleteDb(id);
    fetchCards();
};

window.editCard = (e) => {
    profileId = parseInt(e.dataset.id);

    let name = e.dataset.name;
    let phone = e.dataset.phone;
    let email = e.dataset.email;

    document.getElementById("name").value = name;
    document.getElementById("email").vale = email;
    document.getElementById("phone").value = phone;

    form.style.display = "block";
    submitBtnToUpdate = true;
};

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';

  installBtn.addEventListener('click', () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js');
    });
};