// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = "127.0.0.1:3000";

let itemsData;
// TODO #2.3: Send Get items ("GET") request to backend server and store the response in itemsData variable
const getItemsFromDB = async () => {
  const options = {
    method: "GET",
    credentials: "include"
  }
  await fetch(`http://${backendIPAddress}/items`, options)
    .then((response) => response.json())
    .then((data) => {
      itemsData = data
    })
    .catch((error) => console.error(error));
};

const getPoints = async () => {
  const options = {
    method: "GET",
    credentials: "include"
  }
  await fetch(`http://${backendIPAddress}/items/point`, options)
    .then((response) => response.json())
    .then((data) => {
      itemsData = data
    })
    .catch((error) => console.error(error));
};

// TODO #2.4: Show items in table (Sort itemsData variable based on created_date in ascending order)
const showItemsInTable = (itemsData) => {
  const table_body = document.getElementById("main-table-body");
  table_body.innerHTML = "";
  // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
  itemsData.sort((a, b) => {
    return a.deadline - b.deadline;
  })
  // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
  itemsData.map((item) => {
    // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
    table_body.innerHTML += `
        <tr id="${item.item_id}">
            <td>${item.course_name}</td>
            <td>${item.title}</td>
            <td>${item.deadline}</td>
            <td>${item.score}</td>
        </tr>
        `;
    // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
  });
};

// TODO #2.5: Send Add an item ("POST") request to backend server and update items in the table
const addItem = async () => {
  const item = document.getElementById("item-to-add").value;
  const name = document.getElementById("name-to-add").value;
  const price = document.getElementById("price-to-add").value;

  console.log(
    "This function should fetch 'add item' route from backend server and update items in the table."
  );
};

// TODO 2.6: Send Delete an item ("DELETE") request to backend server and update items in the table
const deleteItem = async (item_id) => {
  console.log(
    "This function should fetch 'delete item' route in backend server and update items in the table."
  );
};

const getUserProfile = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.user);
    })
    .catch((error) => console.error(error));
};

const getCompEngEssCid = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_courses`,
    options
  )
    .then((response) => response.json())
    .then((data) => {console.log(data.data.student);})
    .then((course) => {

    })
    .catch((error) => console.error(error));
  // document.getElementById("ces-cid-value").innerHTML = "";
  // console.log(
  //   "This function should fetch 'get courses' route from backend server and find cv_cid value of Comp Eng Ess."
  // );
};

const redrawDOM = () => {
  window.document.dispatchEvent(
    new Event("DOMContentLoaded", {
      bubbles: true,
      cancelable: true,
    })
  );
  document.getElementById("item-to-add").value = "";
  document.getElementById("name-to-add").value = "0";
  document.getElementById("price-to-add").value = "";
};

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};

// document.getElementById("point").innerHTML = getPoints();

document.addEventListener("DOMContentLoaded", async function (event) {
  // await authorizeApplication();
  console.log("Getting items from database.");
  await getItemsFromDB();
  console.log("Showing items from database.");
  showItemsInTable(itemsData);
});
