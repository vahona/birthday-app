//  Grabe some element I might need

const dataurl = "./people.json";
const list = document.querySelector("ul");
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




function displayDatalist(peopleStore) {

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

      // Converting date 

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
      let newDay = "";

      if (MoreDay > -1) {
        newDay = MoreDay;
      } if (MoreDay < 0) {
        newDay = 365 + MoreDay;
      }



      const Alldate = `${DateNow}${nthDate(DateNow)} / ${month + 1} / ${year}`;
      const age = yearForNow - year + 1;
      const birthdayMonth = getMonthName(month);




      // Variable to store the day

      let day = "";

      // Condition for the incication of the date

      if (DateNow.getDate() === 1 || DateNow.getDate() === 21 || DateNow.getDate() === 31) {
        day = `${DateNow.getDate()}st`;
      }

      if (DateNow.getDate() === 2 || DateNow.getDate() === 22) {
        day = `${DateNow.getDate()}nd`;
      }

      if (DateNow.getDate() === 3 || DateNow.getDate() === 23) {
        day = `${DateNow.getDate()}rd`;
      }

      if (DateNow.getDate() !== 1 && DateNow.getDate() !== 21 && DateNow.getDate() !== 31 && DateNow.getDate() !== 2 && DateNow.getDate() !== 22 && DateNow.getDate() !== 3 && DateNow.getDate() !== 23) {
        day = `${DateNow.getDate()}th`;
      }


      function getMonthName(month) {
        const d = new Date();
        d.setMonth(month);
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
             <li data-id= "${personList.id}" class=" row-container list-of-people">
               <div>
             <img src="${personList.picture}" alt="${personList.firstName + " " + personList.lastName
      }"/>
           </div>
             <div class="name-birthday">
                <div class="name">
                   ${personList.lastName} - ${personList.firstName}
                 </div>
                 <time class="birthday"> Turns <span class="age"> ${personList.age} </span> on ${personList.birthdayMonth} <span> ${personList.DateNow} </span> </time>
             </div>
             <div class="days">
             <div class="left-day"> In
             ${personList.MoreDay <= 1
        ? personList.MoreDay + "" + "day"
        : personList.MoreDay + "days"
      } 
      ${personList.MoreDay === 0 ? "" + "🎂 Happy birthday 🍰 " : ""}
            </div>
              <p class = "icons">
                <button class="edit" id="${personList.id}"></button>  
                <button class="delete" id="${personList.id}"></button>
              </p>
                
            </div>

           </li>
     `


  }).join("")

  list.innerHTML = displayList;
}

displayDatalist();


const nameInput = document.getElementById("input-name")
const month = document.getElementById("month-select")

function filterByNameMonth() {
  const nameValue = nameInput.value

  const filteredPeople = peopleStore.filter(person => person.firstName.toLowerCase().includes(nameValue.toLowerCase()) || person.lastName.toLowerCase().includes(nameValue.toLowerCase()));

  const selectvalue = month.value;

  if (selectvalue.toString() === "empty") {
    displayDatalist(filteredPeople)
    return
  }

  const filterByMonthAndName = filteredPeople.filter(person => {
    const birthdayDate = new Date(person.birthday);
    const month = birthdayDate.getMonth().toString();
    const condition = month === selectvalue.toString() || selectvalue.toString() === "empty";
    
    return condition
  })


  // const selectvalue = month.value;
  // const filterByMonthAndName = filteredPeople.filter(person => {
  //   const birthdayDate = new Date(person.birthday);
  //   const month = birthdayDate.getMonth().toString();
  //   const condition = month === selectvalue.toString() || selectvalue.toString() === "empty";
  //   //  debugger
  //   return condition
  // })

  displayDatalist(filterByMonthAndName)


}


// Filtering the list by first name and the lastname

const nameValue = nameInput.value
inputs.addEventListener("input", e => {
  e.preventDefault()
  filterByNameMonth()

})

// Filtering by month

month.addEventListener("change", function () {
  filterByNameMonth()

})



//  Popup for editing people

const editPersonpopup = async function (id) {

  const selectedPerson = peopleStore.find((person) => person.id === id);
  const formatedDate = new Date(selectedPerson.birthday).toISOString().slice(0, 10)

  const maxDate = new Date().toISOString().slice(0, 10)
  const popup = document.createElement("form");
  popup.classList.add("popupedit");
  document.body.style.overflow = "hidden"
  popup.insertAdjacentHTML(
    "afterbegin",
    ` <div class="container__edit">
       <button class="close1">X</button>
       <h2 class="TitleEdite"> Edit Sherwood Keeling </h2>
       <div class="second__container">
        <fieldset style="border: none;">
         <label class="edit__label" for="picture1">Url image</label><br>
          <input class="edit-input" type="url" value="${selectedPerson.picture}" id="picture1">
        </fieldset>
        <fieldset style="border: none;">
          <label class="edit__label" for="lastname1">LastName</label><br>
          <input class="edit-input" type="text" value="${selectedPerson.lastName}" id="lastname1">
        </fieldset>
        <fieldset style="border: none;">
          <label class="edit__label" for="firstname1">FisrtName</label><br>
          <input class="edit-input" type="text" value="${selectedPerson.firstName}" id="firstname1">
        </fieldset style="border: none;">
        <fieldset style="border: none;">
          <label class="label__date"  for="birthday1">Birthday</label><br>
          <input class="edit-input input__date" type="date" max="${maxDate}" value="${formatedDate}" id="birthday1">
        </fieldset>
        <div class="button-sub">
          <button class="button__save" type="submit">Save changes</button>
          <button class="button__cancel cancel" type="button">Cancel</button>
        </div>
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

    selectedPerson.picture = popup.picture1.value;
    selectedPerson.lastName = popup.lastname1.value;
    selectedPerson.firstName = popup.firstname1.value;
    selectedPerson.birthday = popup.birthday1.value;
    selectedPerson.id = id;
    displayDatalist(peopleStore);

    saveChange;
    const remove = (popup.style.display = "none");
    remove;
    document.body.style.overflow = "auto"
    list.dispatchEvent(new CustomEvent("itemUpdated"));

  });




  //  Close the popup when the user does not want the change they have made in the person's information


  document.addEventListener(
    "click",
    function (event) {
      if (
        event.target.matches(".button__cancel") ||
        event.target.matches(".popupedit") ||  event.target.matches(".close1")
      ) {
        closeModal();
      }
    },
    false
  );

  function closeModal() {
    document.querySelector(".popupedit").style.display = "none";
  }

};







//  Function for deleting the birthday

async function deletePersonPopup(id) {
  const deleteOne = peopleStore.find((person) => person.id === id);
  console.log(deleteOne);
  const popup = document.createElement("article");
  popup.classList.add(".confirm");
  document.body.style.overflow = "hidden"
  popup.insertAdjacentHTML(
    "afterbegin",
    `
       <div class="confirme">
        <p class="deleteparagraph">
          Are you sure you want to delete this person
        </p>
        <div class="container__buttom">
          <button class="confirm_buttom yes__sure"> Yes </button>
          <button class="confirm_buttom no__want"> No </button>
        </div>
        </div>
        `
  );

  document.body.appendChild(popup);
  popup.classList.add(".confirm");





  //  Fuction to confirm the deletion of the birthday

  const confirm = async function (e) {
    //  Grabing all the button

    const removeEl = e.target.closest(".yes__sure");
    document.body.style.overflow = "auto"
    const no = e.target.closest(".no__want");
    const outside = e.target.matches("article")

    //  Condition for all the button

    if (removeEl) {
      e.preventDefault();
      const deletePeople = peopleStore.filter((person) => person.id !== id);
      peopleStore = deletePeople;
      console.log(deletePeople);
      displayDatalist(deletePeople);
      const changeRemove = (popup.style.display = "none");
      changeRemove;
    } else if (no || outside) {
      const remove = (popup.style.display = "none");
      remove;

    }
  };

  window.addEventListener("click", confirm);
  list.dispatchEvent(new CustomEvent("itemUpdated"));
}


//  Adding the list


addButon.addEventListener("click", function addNewPeople() {



  const maxDate = new Date().toISOString().slice(0, 10)

  const popup = document.createElement("form");
  popup.classList.add("popupadd");
  document.body.style.overflow = "hidden"
  popup.insertAdjacentHTML(    "afterbegin",

    // ` <div class = "popup">
    `
      <div class="container__add">
        <button class="close2" type="button" name="close">X</button>
       <h2 class="add__title"> Add new person </h2>
        <fieldset style="border: none;">
          <label class="add__label" for="picture">Url image</label><br>
          <input class="add_input" type="url" value="" id="picture" required>
        </fieldset>
        <fieldset style="border: none;">
          <label class="add__label" for="lastname">LastName</label><br>
          <input class="add_input" type="text" value="" id="lastname" required>
        </fieldset>
        <fieldset style="border: none;">
          <label class="add__label" for="firstname">FisrtName</label><br>
          <input class="add_input" type="text" value="" id="firstname" required>
        </fieldset style="border: none;">
        <fieldset style="border: none;">
          <label class="add__label date__label__add" for="birthdaya">Birthday</label><br>
          <input class="add_input add__date" type="date" max="${maxDate}" value="" id="birthday" required>
        </fieldset>
        <div class="button-sub add__submit">
          <button class="add__button" type="button">Add</button>
          <button class="close" type="button" id="cancel__button" name="close"> Close </button>
        </div>
        </div>
        </div>
  `
  );

  // hideScroll()
  document.body.appendChild(popup);
  // popup.classList.add("add");

  const addButon = document.querySelector(".add__button");
  addButon.addEventListener("click", (e) => {
    // e.preventDefault();
    const addNewOne = e.currentTarget;
    const newList = {
      id: Date.now().toString(),
      picture: popup.picture.value,
      lastName: popup.lastname.value,
      firstName: popup.firstname.value,
      birthday: popup.birthday.value,
    };


    peopleStore.push(newList);
    displayDatalist(peopleStore);
    popup.reset();
    // addNewPeople();
    list.dispatchEvent(new CustomEvent("itemUpdated"));
  });

  // Close the popup when the user does need to add a new person


  popup.addEventListener("click", (e) => {
    // e.preventDefault()

    const isCloseButton = e.target.matches("#cancel__button");
    const isCloseX = e.target.matches(".close2");
    // const isInputBar = e.target.matches(".add_input");
    const isAddButton = e.target.matches(".add__button")
    // || !e.target.closest(".popupadd")
    const shouldClose = isCloseButton || isCloseX || isAddButton;
    if (shouldClose) {
      closeModal()

    }
  },

  );

  function closeModal() {
    console.log(popup)
    // popup.classList.remove("add");
    document.querySelector(".popupadd").style.display = "none";
    document.body.style.overflow = "visible"
  }

});





//  Local storage function

const recordeLocalStorage = () => {
  const isItems = JSON.parse(localStorage.getItem("peopleStore"));
  if (isItems) {
    peopleStore = isItems;
    displayDatalist();
  }
  list.dispatchEvent(new CustomEvent("itemUpdated"));
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
list.addEventListener("itemUpdated", restoreLocalStorage);
