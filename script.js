

const dataurl = "./people.json";
const tbody = document.querySelector('tbody');
const container = document.querySelector('.tablebody');
const response = fetch(dataurl);

console.log(response);

// Fetch 
async function fetchPeople() {

await fetch('./people.json').then(response => {
    return response.json();
}).then(data => {
    document.getElementsByClassName(".tablebody").innerHTML = data;
    console.log(data)
}).catch(function () {
   this.dataError = true
});

}

fetchPeople()


// Create html

async function displayDatalist() {
    const persons = await fetchPeople();

    // const sortPeople = persons.sort((a, b) => {
    //     return b.birthday - a.birthday;
    // });

    const html = persons.map(person => {
       return `
    <tr data-id="${person.id}" class="">
    <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
    <td>${person.id}</td>
    <td>${person.lastName}</td>
    <td>${person.firstName}</td>
    <td>${person.birthday}</td>
    <td>
      <button class="edit">
        <img src="./assets/icon_edit" alt="edit">
      </button>
      <button class="delete">
        <img src="./assets/delete.png/" alt="delete">
      </button>
    </td>
  </tr>
  `;
    }).join('');

    tbody.innerHTML = html;
    

    console.log(html);

}

displayDatalist();
