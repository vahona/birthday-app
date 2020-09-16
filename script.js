
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
    <tr data-id= "${person.id}" class="row">
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

// async function editPerson (e) {
  
// }

const editPersonpopup = async function(id) {

  // const persons = await fetchPeople();
  const response = await fetch(dataurl);
  const data = await response.json();

  console.log(data);
  const result = await data.find(person => person.id === id);
  // debugger
  // bug result is undefine
  console.log(result);
  const popup = document.createElement('form');
  popup.classList.add('.popupedit');
  popup.insertAdjacentHTML('afterbegin', `
  <fieldset style="border: none;">
    <label for="">LastName</label><br>
    <input type="text" value="klkjsdfj" id="">
  </fieldset>
  <fieldset style="border: none;">
    <label for="">FisrtName</label><br>
    <input type="text" value="sajd" id="">
  </fieldset style="border: none;">
  <fieldset style="border: none;">
    <label for="">Birthday</label><br>
    <input type="text" value="123478454959" id="">
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

  const confirm = e => {

    const yes = e.target.matches('.yes__sure');
    const no = e.target.matches('.no__want');

    if (yes) {
      e.preventDefault();
      const deleteCo = data.filter(person => person.id !== id);
      persons = deleteCo;
      fetchPeople(deleteCo);
      console.log(deleteCo);
      const remove = popup.style.display = 'none';
      remove;
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

 function recordToLocalStorage () {
   localStorage.setItem('peopleItems', JSON.stringify(peopleItems));
}

function restoreLocalStorage () {

  const IspeopleItems = JSON.parse(localStorage.getItem('peopleItems'));

  if(IspeopleItems) {
    peopleItems.push(... peopleItems);
  }

  container.dispatchEvent(new CustomEvent('itemUpdated'))
}



// Event listner function

async function handleClick(e){
    const editButton = e.target.matches('.edit');
    const deletButton = e.target.matches('.delete');
  

    if(editButton) {
      const id = editButton.id;
      editPersonpopup(id);
    }
   
    if(deletButton) {
      const id = deletButton.id;
      deletePersonPopup(id);

    }

}

// Event listener

container.addEventListener('itemUpdated', restoreLocalStorage);

window.addEventListener('click', handleClick);

// tbody.addEventListener('click', editPerson)
