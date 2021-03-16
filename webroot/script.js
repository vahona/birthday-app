//  Grabe some element I might need

const dataurl = "./people.json";
const tbody = document.querySelector("tbody");
const container = document.querySelector(".tablebody");
const addButon = document.querySelector(".add-people");
const input = document.getElementById("filter_user");
const inputs = document.querySelector(".namefilter")

//  Create an empty array to store the people.json

let peopleStore = [];

//  Fetch the file in the people.json
async function fetchPeople() {
  const response = await fetch(dataurl);
  const data = await response.json();
  peopleStore = [...data];
  displayDatalist(peopleStore);

  return data;
}

fetchPeople();


async function displayDatalist(peopleStore) {
  const html = peopleStore
    .map((person) => {
      function nthDate(days) {
        if (days > 3 && days < 21) return "th";
        switch (days % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      }

      const DateNow = new Date(person.birthday);
      const Now = new Date();
      const month = DateNow.getMonth();
      const Nowday = DateNow.getDate();
      const year = DateNow.getFullYear();

      const yearForNow = Now.getFullYear();
      const birthdayTime = new Date(yearForNow, month, Nowday);
      const aday = 1000 * 60 * 60 * 24;
      const RealDate = birthdayTime.getTime() - Now.getTime();
      const MoreDay = Math.ceil(RealDate / aday);

      const Alldate = `${DateNow}${nthDate(DateNow)} / ${month + 1} / ${year}`;
      const age = yearForNow - year + 1;
      const birthdayMonth = getMonthName(month);
      
      // console.log(DateNow);

      function getMonthName(month){
        const d = new Date();
        d.setMonth(month-1);
        const monthName = d.toLocaleString("default", {month: "long"});
        return monthName;
      }
      
     


      return `
          <tr data-id= "${person.id}" class="row row-container">
            <td>
          <img src="${person.picture}" alt="${
        person.firstName + " " + person.lastName
      }"/>
        </td>
          <td>
             <div class="name">
                ${person.lastName} - ${person.firstName}
              </div>
              <time class="birthday"> Turns <span class="age"> ${age} </span> on ${birthdayMonth}   ${Nowday} ${nthDate(DateNow)} </time>
          </td>
          <td class="days"> In ${
            MoreDay < 0
              ? MoreDay * -1 + " " + "days ago"
              : MoreDay <= 1
              ? MoreDay + "" + "day"
              : MoreDay + "days"
          }

          ${MoreDay === 0 ? "" + "🎂 Happy birthday 🍰 " : ""}

          <p class = "icons">
          <button class="edit" id="${person.id}">
          </button>
          <button class="delete" id="${person.id}">
          </button>
        </p>
         
          </td>
         
        </tr>
  `;
    })
    .join("");

  tbody.innerHTML = html;
}

displayDatalist();



 
// Filtering the list by first name and the lastname


inputs.addEventListener("input", e => {
  e.preventDefault()
  const input = e.target; 
   const  inputValue = input.value;
  const filteredPeople = peopleStore.filter(person => person.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||  person.lastName.toLowerCase().includes(inputValue.toLowerCase()));
  displayDatalist(filteredPeople);


})


// Filtering by month

const month = document.getElementById("month-select")

month.addEventListener("change", function() {
  const selectvalue = month.value;
  console.log(selectvalue);
  const filterByMonth = peopleStore.filter(person => {
      const DateNow = new Date(person.birthday);
      const month = DateNow.getMonth();
      const condition = month.toString() === selectvalue.toString();
      console.log(condition);
      return condition

  })
  displayDatalist(filterByMonth)
  
})

//  Popup for editing people

const editPersonpopup = async function (id) {
  const result = peopleStore.find((person) => person.id === id);
  const popup = document.createElement("form");
  popup.classList.add("popupedit");
  popup.insertAdjacentHTML(
    "afterbegin",
    ` <div class="container">
        <fieldset style="border: none;">
         <label for="picture">Url image</label><br>
          <input class="edit-input" type="url" value="${result.picture}" id="picture">
        </fieldset>
        <fieldset style="border: none;">
          <label for="lastname">LastName</label><br>
          <input class="edit-input" type="text" value="${result.lastName}" id="lastname">
        </fieldset>
        <fieldset style="border: none;">
          <label for="firstname">FisrtName</label><br>
          <input class="edit-input" type="text" value="${result.firstName}" id="firstname">
        </fieldset style="border: none;">
        <fieldset style="border: none;">
          <label for="birthday">Birthday</label><br>
          <input class="edit-input" type="date" value="${result.birthday}" id="birthday">
        </fieldset>
        <div class="button-sub">
          <button class="button__save" type="submit">Save</button>
          <button class="button__cancel" type="button">Cancel</button>
        </div>
        </div>
        `
  );

  document.body.appendChild(popup);
  popup.classList.add("open");

  //  Add event listener for the edit and save or not save the change

  popup.addEventListener("submit", (e) => {
    const saveChange = e.currentTarget;
    e.preventDefault();

    result.picture = popup.picture.value;
    result.lastName = popup.lastname.value;
    result.firstName = popup.firstname.value;
    result.birthday = popup.birthday.value;
    result.id = id;
    displayDatalist(peopleStore);
    console.log(birthday);
    saveChange;
    const remove = (popup.style.display = "none");
    remove;
    tbody.dispatchEvent(new CustomEvent("itemUpdated"));
  });





  //  Close the popup when the user does not want the change they have made in the person's information

  popup.addEventListener("click", (e) => {
    const cancelTheChange = e.target.closest(".button__cancel");
    if (cancelTheChange) {
      const remove = (popup.style.display = "none");
      remove;
    }
  });
};





//  Function for deleting the birthday

async function deletePersonPopup(id) {
  const deleteOne = peopleStore.find((person) => person.id === id);
  console.log(deleteOne);
  const popup = document.createElement("article");
  popup.classList.add(".confirm");
  popup.insertAdjacentHTML(
    "afterbegin",
    `
        <p class="deleteparagraph">
          Are you sure you want to delete this person
        </p>
        <div class="container__buttom">
          <button class="confirm_buttom yes__sure"> Yes </button>
          <button class="confirm_buttom no__want"> No </button>
        </div>`
  );

  document.body.appendChild(popup);
  popup.classList.add(".confirm");





  //  Fuction to confirm the deletion of the birthday

  const confirm = async function (e) {
    //  Grabing all the button

    const removeEl = e.target.closest(".yes__sure");
    const no = e.target.closest(".no__want");

    //  Condition for all the button

    if (removeEl) {
      e.preventDefault();
      const deletePeople = peopleStore.filter((person) => person.id !== id);
      peopleStore = deletePeople;
      console.log(deletePeople);
      displayDatalist(deletePeople);
      const changeRemove = (popup.style.display = "none");
      changeRemove;
    } else if (no) {
      const remove = (popup.style.display = "none");
      remove;
    }
  };

  window.addEventListener("click", confirm);
  tbody.dispatchEvent(new CustomEvent("itemUpdated"));
}






//  Adding the list

addButon.addEventListener("click", function addNewPeople() {
  const popup = document.createElement("form");
  popup.classList.add("popupadd");
  popup.insertAdjacentHTML(
    "afterbegin",
    ` <div class="container">
        <fieldset style="border: none;">
          <label for="picture">Url image</label><br>
          <input class="add_input" type="url" value="" id="picture" required>
        </fieldset>
        <fieldset style="border: none;">
          <label for="lastname">LastName</label><br>
          <input class="add_input" type="text" value="" id="lastname" required>
        </fieldset>
        <fieldset style="border: none;">
          <label for="firstname">FisrtName</label><br>
          <input class="add_input" type="text" value="" id="firstname" required>
        </fieldset style="border: none;">
        <fieldset style="border: none;">
          <label for="birthday">Birthday</label><br>
          <input class="add_input" type="date" value="2000/05/12" id="birthday" required>
        </fieldset>
        <div class="button-sub">
          <button class="add__button" type="submit">Add</button>
          <button class="close" type="button"> Close </button>
        </div>
        </div>
  `
  );





  document.body.appendChild(popup);
  popup.classList.add("add");

  popup.addEventListener("submit", (e) => {
    e.preventDefault();
    const addNewOne = e.currentTarget;
    const newList = {
      id: addNewOne.id,
      picture: addNewOne.picture.value,
      lastName: addNewOne.lastname.value,
      firstName: addNewOne.firstname.value,
      birthday: addNewOne.birthday.value,
    };

    console.log(addNewOne);
    peopleStore.push(newList);
    displayDatalist(peopleStore);
    addNewOne.reset();
    addNewPeople();
    tbody.dispatchEvent(new CustomEvent("itemUpdated"));
    //  editPersonpopup(result);
  });






  // Close the popup when the user does need to add a new person

  popup.addEventListener("click", (e) => {
    const cancelTheChange = e.target.closest(".close");
    if (cancelTheChange) {
      const remove = (popup.style.display = "none");
      remove;
    }
  });
});





//  Local storage function

const recordeLocalStorage = () => {
  const isItems = JSON.parse(localStorage.getItem("peopleStore"));
  if (isItems) {
    peopleStore = isItems;
    displayDatalist();
  }
  tbody.dispatchEvent(new CustomEvent("itemUpdated"));
};




// restoreLocalStorage();

function restoreLocalStorage() {
  localStorage.setItem("peopleStore", JSON.stringify(peopleStore));
}





// Event listner function

async function handleClick(e) {
  const editButton = e.target.closest(".edit");
  const deletButton = e.target.closest(".delete");

  if (editButton) {
    const id = e.target.closest(".row-container").dataset.id;
    editPersonpopup(id);
  }

  if (deletButton) {
    const id = deletButton.id;
    deletePersonPopup(id);
  }
}

window.addEventListener("click", handleClick);
tbody.addEventListener("itemUpdated", restoreLocalStorage);
