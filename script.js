

const dataurl = "./people.json";
const tbody = document.querySelector('tbody');
const container = document.querySelector('.tablebody');

// const response = fetch(dataurl);

// console.log(response);

// Fetch 
async function fetchPeople() {
  const response = await fetch(dataurl);
  console.log(response);
  const data = await response.json();
    return data;
}

// fetchPeople();

// Create html

async function displayDatalist() {
    const persons = await fetchPeople();
    // Sort the movie
    const sortePeople = await persons.sort((a, b) => {
      return b.birthday - a.birthday;
    })
    const html = await sortePeople.map(person => {
       return `
    <tr data-id= "${person.id}" class="row row-container">
    <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
    <td>${person.lastName}</td>
    <td>${person.firstName}</td>
    <td>${person.birthday}</td>
    <td class = "icons">
      <button class="edit" id="${person.id}">
        <img class = "icons__image" src="assets/icon_edit.png" alt="edit">
      </button>
      <button class="delete" id="${person.id}">
        <img class = "icons__image" src="assets/delete.png" alt="delete">
      </button>
    </td>
  </tr>
  `
    }).join('');

    tbody.innerHTML = html;
    

    // console.log(html);

}

displayDatalist();

// Editing the person's birhtday


const editPersonpopup = async function(id) {

  // const persons = await fetchPeople();
  const response = await fetch(dataurl);
  const data = await response.json();

  console.log(data);
  const result = data.find(person => person.id === id);

  const popup = document.createElement('form');
  popup.classList.add('.popupedit');
  popup.insertAdjacentHTML('afterbegin', `
  <fieldset style="border: none;">
    <label for="${result.picture}">Url image</label><br>
    <input type="url" value="${result.picture}" id="${result.id}">
  </fieldset>
  <fieldset style="border: none;">
    <label for="${result.id}">LastName</label><br>
    <input type="text" value="${result.lastName}" id="${result.id}">
  </fieldset>
  <fieldset style="border: none;">
    <label for="${result.id}">FisrtName</label><br>
    <input type="text" value="${result.firstName}" id="${result.id}">
  </fieldset style="border: none;">
  <fieldset style="border: none;">
    <label for="${result.id}">Birthday</label><br>
    <input type="text" value="${result.birthday}" id="${result.id}">
  </fieldset>
  <div class="button-sub">
    <button class="button__save">Save</button>
    <button class="button__cancel">Cancel</button>
  </div>
  `);

  document.body.appendChild(popup);
  popup.classList.add('open');
  console.log(popup);

}

async function editPerson(e) {
  const response = await fetch(dataurl);
  const data = await response.json();
  const editPersoninfo = data.filter(person => person.id !== id);
  e.preventDefault();
  editPersoninfo = e.target;
  const editChange = {

    picture: editPersoninfo.picture.value,
    lastName: editPersoninfo.lastName.value,
    firstName: editPersoninfo.firstName.value,
    birthday: editPersoninfo.birthday.value,

  }

  console.log();

  editPersoninfo.push(editChange);
  editconfirm.reset();

  container.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));

}

// Deleting the birthday

async function deletePerson (e) {

}

async function deletePersonPopup(id) {
  const response = await fetch(dataurl);
  const data = await response.json();

  const deleteOne = data.find(person => person.id === id);
  console.log(deleteOne);
  const popup = document.createElement('article');
  popup.classList.add('.confirm');
  popup.insertAdjacentHTML('afterbegin', `
    <p class="deleteparagraph">
      Are you sure you want to delete this person
    </p>
    <div class="container__buttom">
      <button class="confirm_buttom yes__sure"> Yes </button>
      <button class="confirm_buttom no__want"> No </button>
    </div>`);

    document.body.appendChild(popup);
    popup.classList.add('.confirm');

    console.log(popup);

  const confirm = async function(e) {

    const yes = e.target.closest('.yes__sure');
    const no = e.target.closest('.no__want');

    if (yes) {
      const response = await fetch(dataurl);
      const data = await response.json();
      e.preventDefault();
      const deleteCo = data.filter(person => person.id !== id);
      data = deleteCo.style.display = 'none';
      // fetchPeople(deleteCo);
      editPerson();
      // const remove = popup.style.display = 'none';
      // remove;
    }

    else if (no) {
      const remove = popup.style.display = 'none';
      remove;

    }

  }

  window.addEventListener('click', confirm)


}

// Local storage function

// Empty array

let peopleItems = [];

//  function recordToLocalStorage() {
    
// }

//  async function restoreLocalStorage() {
//   const response = await fetch(dataurl);
//   console.log(response);
//   const data = await response.json();
//   peopleItems.push(... data);
//   localStorage.setItem('peopleItems', JSON.stringify('peopleItems'));

//   //

//   container.dispatchEvent(new CustomEvent('itemUpdated'));

// }

//  async function recordeLocalStorage() {
//    e.preventDefault();
//    let restoreThePeopleItems = JSON.parse(localStorage.getItem('peopleItems')):[],
//    restoreThePeopleItems = outputs;

// //

//    container.dispatchEvent(new CustomEvent('itemUpdated'));

//  }

 

// Event listner function

async function handleClick(e){
    const editButton = e.target.closest('.edit');
    const deletButton = e.target.closest('.delete');
  

  

    if(editButton) {
      const id = e.target.closest(".row-container").dataset.id;
      editPersonpopup(id);
    
    }
   
    if(deletButton) {
      const id = deletButton.id;
      deletePersonPopup(id);

    }



}


  // Event listener

  // container.addEventListener('itemUpdated', restoreLocalStorage);
  container.addEventListener('pleaseUpdateTheList', editPerson);

  window.addEventListener('click', handleClick);

  // tbody.addEventListener('click', editPerson)
