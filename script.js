

const dataurl = "./people.json";
const tbody = document.querySelector('tbody');
const container = document.querySelector('.tablebody');
const response = fetch(dataurl);

console.log(response);

// Fetch 
async function fetchPeople() {
const response = await fetch(dataurl);
const data = await response.json();
return data;


}

fetchPeople();


// Create html

async function displayDatalist() {
    const persons = await fetchPeople();

    const html = persons.map(person => {
       return `
    <tr data-id="${person.id}" class="">
    <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
    <td>${person.id}</td>
    <td>${person.lastName}</td>
    <td>${person.firstName}</td>
    <td>${person.birthday}</td>
    <td class = "icons">
      <button class="edit">
        <img class = "icons__image" src="assets/icon_edit.png" alt="edit">
      </button>
      <button class="delete">
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

const editPerson = e => {

}


const ediPerson = id => {
  const same = data.find(person => person.id === id);

  console.log(same)
}



// Editing function

const handleClick = e => {
    const editButton = e.target.closest('.edit');
    const deleteButton = e.target.closest('.delete');

    if(editButton) {

    }

    if (deleteButton) {

    }
}
