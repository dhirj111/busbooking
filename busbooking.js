document.getElementById("filter").addEventListener("change", function () {
  const selectedValue = this.value;
  // <label for="filter">Filter</label>
  // <select name="type" id="filter">
  //   <option value="0">All</option>
  //   <option value="Bus1">Bus1</option>
  //   <option value="Bus2">Bus2</option>
  //   <option value="Bus3">Bus3</option>
  // </select>
  //this this.value passed 0 ,bus1 or so on to selectedvalue  ,next we will implement show and hide by for loop
  console.log("Selected option value:", selectedValue);
  
  // Get all li items with class "bookings"
  const bookings = document.getElementsByClassName("bookings");
  console.log(bookings);

  // Check if the selected value is not 0
  if (selectedValue != 0) {
    for (let i = 0; i < bookings.length; i++) {
      // Compare the selectedValue with the data-ut attribute
      if (selectedValue == bookings[i].dataset.ut) {
        bookings[i].style.display = "flex";         // Show matching items
        bookings[i].style.listStyleType = "dotted"; // Set list-style to dotted
      } else {
        bookings[i].style.display = "none";         // Hide non-matching items
      }
    }
  } else {
    // Reset all items when the selected value is 0
    for (let i = 0; i < bookings.length; i++) {
      bookings[i].style.display = "flex";           // Show all items
      bookings[i].style.listStyleType = "dotted";   // Set list-style to dotted
    }
  }
});

function addperson(us, em, pa, ut, id) {
  const ulElements = document.querySelector("ul");
  let liitem = document.createElement("li");
console.log(us)
  liitem.innerHTML = `${us}-${em}-${pa}-${ut}<button class= "edt" type="button">edit</button> <button class="del" type="button">delete</button>`;
  liitem.classList.add("bookings");
  liitem.dataset.ut = ut;
  // Append the new list item to the unordered list
  ulElements.appendChild(liitem);

  // Now that the element is in the DOM, we can safely query for the delete button
  const deleteButton = liitem.querySelector(".del");
  const editbutton = liitem.querySelector(".edt");
  editbutton.addEventListener("click", function (event) {
    const listItem = event.target.parentElement;

    axios
      .get(
        `https://crudcrud.com/api/8095144348864506830ae47fc0992868/appointmentData/${id}`
      )
      .then((res) => {
        document.getElementById("username").value = res.data.username;
        document.getElementById("email").value = res.data.email;
        document.getElementById("phone").value = res.data.phone;
        listItem.remove();
        axios.delete(
          `https://crudcrud.com/api/8095144348864506830ae47fc0992868/appointmentData/${id}`
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });
  deleteButton.addEventListener("click", function (event) {
    const listItem = event.target.parentElement;
    axios
      .delete(
        `https://crudcrud.com/api/8095144348864506830ae47fc0992868/appointmentData/${id}`
      )
      .then(() => {
        // If successful, remove from UI
        if (listItem && listItem.tagName === "LI") {
          listItem.remove();
        } else {
          console.log("Parent LI element not found");
        }
      })
      .catch((error) => console.log("Error deleting item:", error));
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  //selecting  type id for getting inside category
  let selectElement = document.querySelector("#type");
  //stored value in category
  let etype =
    selectElement.options[selectElement.options.selectedIndex].textContent;
    //  here this will store bus1 ,bus2 or bus3 or in etype from below html code in html file
    // <option value="Bus1">Bus1</option>
    // <option value="Bus2">Bus2</option>
    // <option value="Bus3">Bus3</option>
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
    type: etype,
  };
  axios
    .post(
      "https://crudcrud.com/api/8095144348864506830ae47fc0992868/appointmentData",
      userDetails
    )
    .then((response) => {
      let uname = response.data.username;
      let umail = response.data.email;
      let uphone = response.data.phone;
      let utype = response.data.type;
      let uid = response.data._id; // Add this line to get the ID
      addperson(uname, umail, uphone, utype, uid); // Pass the ID here
    })
    .catch((error) => console.log(error));

  
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/8095144348864506830ae47fc0992868/appointmentData"
    )
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        let uname = res.data[i].username;
        let umail = res.data[i].email;
        let uphone = res.data[i].phone;
        let utype = res.data[i].type;
        let uid = res.data[i]._id; // Add this line to get the ID
        addperson(uname, umail, uphone, utype, uid); // Pass the ID here
      }
    })
    .catch((error) => console.log(error));
});
