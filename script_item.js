// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = "52.1.164.79:3000";

let itemsData, courses = [];
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

// TODO #2.4: Show items in table (Sort itemsData variable based on created_date in ascending order)
const showItemsInTable = (itemsData) => {
  const table_body = document.getElementById("main-table-body");
  table_body.innerHTML = "";

  itemsData.sort((a, b) => {
    return a.deadline - b.deadline;
  })

  itemsData.map((item) => {
    table_body.innerHTML += `
        <tr id="${item.item_id}">
            <td>${item.course_name}</td>
            <td>${item.title}</td>
            <td>${item.deadline}</td>
            <td>${item.score}</td>
        </tr>
        `;
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

const getCid = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_courses`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      temp = data.data.student
      
      for(let i=0;i<temp.length;i++){
        // console.log(temp[i],i);
        if(temp[i].semester == 2)
          courses = courses.concat(temp[i]);
      }
    })
    .catch((error) => console.error(error));
    // console.log(courses);
  // console.log(
  //   "This function should fetch 'get courses' route from backend server and find cv_cid value of Comp Eng Ess."
  // );
};

const createAssignmentTable = async () => {
  const table_body = document.getElementById("main-table-body");
  table_body.innerHTML = "";

  const options = {
    method: "GET",
    credentials: "include",
  };
  let allAssignments = [];
  for(let i=0; i<courses.length; i++){
    await fetch(
      `http://${backendIPAddress}/courseville/get_course_assignments/${courses[i].cv_cid}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {assignment = data.data;})
      .catch((error) => console.error(error));
      // console.log(assignment);
      for(let j=0; j<assignment.length; j++){
        await fetch(
          `http://${backendIPAddress}/courseville/get_assignment_detail/${assignment[j].itemid}`,
          options
        )
          .then((response) => response.json())
          .then((data2) => {
            // console.log(data2.data);
            deadline = data2.data.duedate;
          })
        allAssignments = allAssignments.concat([[courses[i].course_no, assignment[j].title, deadline]])
        // console.log(assignment);
        // console.log([courses[i].course_no, assignment[j].title, deadline]);
      }
  }
  console.log(allAssignments);
  // allAssignments.map(item) => {
  for(let i=0;i<allAssignments.length;i++){
    table_body.innerHTML += `
      <tr>
          <td>${allAssignments[i][0]}</td>
          <td>${allAssignments[i][1]}</td>
          <td>${allAssignments[i][2]}</td>
          <td>1</td>
      </tr>
    `;
  }
};
const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
};

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};

document.addEventListener("DOMContentLoaded", async function (event) {
  console.log("Getting items from database.");
  await getItemsFromDB();
  console.log("Creating assignments table.");
  await getCid();
  await createAssignmentTable();
  // console.log("Showing items from database.");
  // showItemsInTable(itemsData);
  console.log("Success");
});
