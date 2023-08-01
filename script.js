let id = "";
//initial function call to display local storage data
selectData();

//this function is called when we click on submit button
function manageData() {
  document.getElementById("msg").innerHTML = "";
  //value entered
  let name = document.getElementById("name").value;
  //If no name entered
  if (name === "") {
    document.getElementById("msg").innerHTML = "Please enter your name";
    //If name received
  } else {
    //new name to add
    if (id === "") {
      let arr = getCrudData();
      //if array is empty
      if (arr == null) {
        let data = [name];
        localStorage.setItem("crud", JSON.stringify(data));
        //if array already has some names
      } else {
        arr.push(name);
        //localStorage.setItem("crud", JSON.stringify(arr));
        setCrudData(arr);
      } //to clear input field after adding data

      document.getElementById("msg").innerHTML = "Name Added";
      //name to edit
    } else {
      let arr = getCrudData();
      arr[id] = name;
      setCrudData(arr);
      document.getElementById("msg").innerHTML = "Name Updated";
    }
    document.getElementById("name").value = "";

    selectData();
  }
}

function selectData() {
  let arr = getCrudData();
  if (arr != null) {
    let html = "";
    let sno = 1;
    for (let k in arr) {
      html =
        html +
        `<tr><td>${sno}</td><td>${arr[k]}</td><td><a href="javascript:void(0)" onclick="editData(${k})">Edit</a>&nbsp;<a href="javascript:void(0)" onclick="deleteData(${k})">Delete</a></td></tr>`;
      sno++;
    }
    document.getElementById("root").innerHTML = html;
  }
}

function editData(rid) {
  id = rid;
  let arr = getCrudData();
  document.getElementById("name").value = arr[rid];
}

function deleteData(rid) {
  let arr = getCrudData();
  //removing a particular data
  arr.splice(rid, 1);
  //updating data
  setCrudData(arr);
  //displaying data
  selectData();
}

function getCrudData() {
  let arr = JSON.parse(localStorage.getItem("crud"));
  return arr;
}

function setCrudData(arr) {
  localStorage.setItem("crud", JSON.stringify(arr));
}

// localStorage.clear();
