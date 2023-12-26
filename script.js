// ADDING DATA TO THE DATABASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-1ff7e-default-rtdb.firebaseio.com/",
};

const data = initializeApp(appSettings);
const database = getDatabase(data);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.querySelector(".input-field");
const shopList = document.querySelector(".shopping-list");
const addBtn = document.querySelector(".add-botton");

const displayInput = () => {
  const InputValue = inputFieldEl.value;

  if (InputValue) {
    // ///// get the data from the database

    onValue(shoppingListInDB, function (snapshot) {
      if (snapshot.exists()) {
        let currentShop = Object.entries(snapshot.val());

        // clear listed items anytime there a changes
        clearShoppingListEl();

        // for loop the list all the items in the array
        for (let i = 0; i < currentShop.length; i++) {
          const shop = currentShop[i];


          let currentID = shop[0];
          let currentValue = shop[1];
          // console.log(currentID);
          console.log(currentValue);

          showList(shop);
        }
      } else {
        shopList.innerHTML = `No items here ... yet!!`
      }
    });

    clearInputField();
    push(shoppingListInDB, InputValue);

    // console.log(`${InputValue} added to database`);
  }

  function clearInputField() {
    inputFieldEl.value = "";
  }
  function clearShoppingListEl() {
    shopList.innerHTML = "";
  }

  function showList(items) {
    // shopList.innerHTML += `<li>${inputItems}</li>`;
    let itemsID = items[0];
    let itemsValue = items[1];

    const newEl = document.createElement("li");

    newEl.textContent = itemsValue;

    newEl.addEventListener("click", function () {
      let exactLocationOfItemInDB = ref(database, `shoppingList/${itemsID}`);
      remove(exactLocationOfItemInDB);
    });
    shopList.append(newEl);
  }
};

addBtn.addEventListener("click", displayInput);

// ////////////////////////////////////CONVERTING AN OBJECT TO AN ARRAY//////////////
// let scrimberUser = {

//   "01" : "damz@gmail.com",0
//   "02" : "daz@gmail.com",
//   "03" : "amz@gmail.com"
// }
// let scrimberEmails = Object.values(scrimberUser)

// console.log(scrimberEmails)
// console.log(Object.keys(scrimberUser))
// console.log(Object.entries(scrimberUser));

// /////////////////////////////PRACTICE////////////////

// const element = document.querySelector(".list-items");

// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

// import {
//   getDatabase,
//   ref,
//   push,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//   databaseURL: "https://my-to-do-app-88b5d-default-rtdb.firebaseio.com/",
// };

// const app = initializeApp(appSettings);
// const database = getDatabase(app);

// const ItemsDB = ref(database, "Items");

// // ///// GET THE DATA FROM DATABASE
// onValue(ItemsDB, function (snapshot) {
//   let ItemsArr = Object.values(snapshot.val());

//   clearElement();

//   // Loop throught all the  iteams from the database and print to the DOM
//   for (let i = 0; i < ItemsArr.length; i++) {
//     let currentItem = ItemsArr[i];
//     listItemEl(currentItem);
//   }
//   console.log(ItemsArr);
// });
// function listItemEl(items) {
//   element.innerHTML += `<li>${items}</li>`;
// }

// console.log(app);
// // //////// clear current list item if any change is made
// function clearElement() {
//   element.innerHTML = "";
// }
//   function listItemEl() {

//     const li = document.createElement("li");
//     element.appendChild(li)

// li.innerHTML = `${currentItem}`
//   }

// console.log(currentItem);
