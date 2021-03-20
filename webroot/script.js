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
  if (!peopleStore) {
    return
  }

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

      const MoreDay = Math.ceil(RealDate / aday) - 31;
      let newDay = "";

      if (MoreDay > -1) {
        newDay = MoreDay;
      } if (MoreDay < 0) {
        newDay = 365 + MoreDay;
      }

    
      

      const Alldate = `${DateNow}${nthDate(DateNow)} / ${month + 1} / ${year}`;
      const age = yearForNow - year + 1;
      const birthdayMonth = getMonthName(month);
      // console.log(DateNow);
      let day = "";

      if (DateNow.getDate() === 1 || DateNow.getDate() === 21 || DateNow.getDate() === 31) {
        day = `${DateNow.getDate()}st`;
      }
      if (DateNow.getDate() === 2 || DateNow.getDate() === 22) {
        day = `${DateNow.getDate()}nd`;
      } if (DateNow.getDate() === 3 || DateNow.getDate() === 23) {
        day = `${DateNow.getDate()}rd`;
      } if (DateNow.getDate() !== 1 && DateNow.getDate() !== 21 && DateNow.getDate() !== 31 && DateNow.getDate() !== 2 && DateNow.getDate() !== 22 && DateNow.getDate() !== 3 && DateNow.getDate() !== 23) {
        day = `${DateNow.getDate()}th`;
      }
      function getMonthName(month) {
        const d = new Date();
        d.setMonth(month - 1);
        const monthName = d.toLocaleString("default", { month: "long" });
        return monthName;
      }
      const persons = {
        firstName: person.firstName,
        lastName: person.lastName,
        picture: person.picture,
        id: person.id,
        age: age,
        birthdayMonth: birthdayMonth,
        Nowday: Nowday,
        DateNow: day,
        MoreDay: newDay,
      }
      return persons;
    })

  const sortedPeople = html.sort((a, b) => ((a.MoreDay) - b.MoreDay));
  const displayList = sortedPeople.map((personList) => {
    return `
             <tr data-id= "${personList.id}" class="row row-container">
               <td>
             <img src="${personList.picture}" alt="${personList.firstName + " " + personList.lastName
      }"/>
           </td>
             <td>
                <div class="name">
                   ${personList.lastName} - ${personList.firstName}
                 </div>
                 <time class="birthday"> Turns <span class="age"> ${personList.age} </span> on ${personList.birthdayMonth} ${personList.DateNow} </time>
             </td>
             <td class="days"> In 
             ${personList.MoreDay < 0
        ? personList.MoreDay * -1 + " " + "days ago"
        : personList.MoreDay <= 1
          ? personList.MoreDay + "" + "day"
          : personList.MoreDay + "days"
      }
             <p class = "icons">
             <button class="edit" id="${personList.id}">
             </button>
             <button class="delete" id="${personList.id}">
             </button>
           </p>
                 ${personList.MoreDay === 0 ? "" + "🎂 Happy birthday 🍰 " : ""}
             </td>

           </tr>
     `


  }).join("")
  tbody.innerHTML = displayList;
}

displayDatalist();




// Filtering the list by first name and the lastname


inputs.addEventListener("input", e => {
  e.preventDefault()
  const input = e.target;
  const inputValue = input.value;
  const filteredPeople = peopleStore.filter(person => person.firstName.toLowerCase().includes(inputValue.toLowerCase()) || person.lastName.toLowerCase().includes(inputValue.toLowerCase()));
  displayDatalist(filteredPeople);

})


// Filtering by month

const month = document.getElementById("month-select")

month.addEventListener("change", function () {
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

 

  const selectedPerson = peopleStore.find((person) => person.id === id);

  const formatedDate = new Date(selectedPerson.birthday).toISOString().slice(0, 10)
  

  const maxDate = new Date().toISOString().slice(0, 10)
  const popup = document.createElement("form");
  popup.classList.add("popupedit");
  popup.insertAdjacentHTML(
    "afterbegin",
    ` <div class="container">
       <h2 class="TitleEdite"> Edit Sherwood Keeling </h2>
        <fieldset style="border: none;">
         <label class="edit__label" for="picture">Url image</label><br>
          <input class="edit-input" type="url" value="${selectedPerson.picture}" id="picture">
        </fieldset>
        <fieldset style="border: none;">
          <label class="edit__label" for="lastname">LastName</label><br>
          <input class="edit-input" type="text" value="${selectedPerson.lastName}" id="lastname">
        </fieldset>
        <fieldset style="border: none;">
          <label class="edit__label" for="firstname">FisrtName</label><br>
          <input class="edit-input" type="text" value="${selectedPerson.firstName}" id="firstname">
        </fieldset style="border: none;">
        <fieldset style="border: none;">
          <label  for="birthday">Birthday</label><br>
          <input class="edit-input" type="date" max="${maxDate}" value="${formatedDate}" id="birthday">
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

    selectedPerson.picture = popup.picture.value;
    selectedPerson.lastName = popup.lastname.value;
    selectedPerson.firstName = popup.firstname.value;
    selectedPerson.birthday = popup.birthday.value;
    selectedPerson.id = id;
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

// const InputDate = document.querySelector('input[]')

addButon.addEventListener("click", function addNewPeople() {

  // const formatedDate = new Date().toISOString().slice(0, 10)
  

  const maxDate = new Date().toISOString().slice(0, 10)

  const popup = document.createElement("form");
  popup.classList.add("popupadd");
  popup.insertAdjacentHTML(
    "afterbegin",
    ` <div class="container">
       <h2> Add new person </h2>
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
          <input class="add_input" type="date" max="${maxDate}" value="" id="birthday" required>
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
