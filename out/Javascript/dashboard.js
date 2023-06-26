const firebaseConfig = {
 //private credentials
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()

    let rankNumber = 0;
    let tbody = document.getElementById('tbody1');

 function AddItemToTable(username, email, role) {  //the function adds a single row to the body of the table on the dashboard page
    let trow = document.createElement("tr"); //creates a row in the table, below are the cells of the row

    trow.setAttribute('rank', email); //adds a rank as like an id attribute for the row when used to edit, as email is unique
    let td0 = document.createElement("td");   //td0 is the cell that has the status
    let td1 = document.createElement("td");   //td1 is the cell that has the number rank
    let td2 = document.createElement("td");   //td2 is the cell that has the username
    let td3 = document.createElement("td");   //td3 is the cell that has the email
    let td4 = document.createElement("td");   //td4 is the cell that has the role
    let td5 = document.createElement("td");   //td5 is the cell that has the add button
    let td6 = document.createElement("td");   //td6 is the cell that has the edit button
    let td7 = document.createElement("td");   //td7 is the cell that has the remove button
    let activeSelector = document.createElement("select"); 
    let active = document.createElement("option");
    let deactivated = document.createElement("option");
    let addButton = document.createElement("button");
    let editButton = document.createElement("button");
    let removeButton = document.createElement("button");

    activeSelector.appendChild(active);
    activeSelector.appendChild(deactivated);
    active.innerHTML = 'Active';
    deactivated.innerHTML = 'Deactivated';

    addButton.innerHTML = 'Add';
    editButton.innerHTML = 'Edit';
    removeButton.innerHTML = 'Suspend';

    addButton.onclick = function() { openPopupAdd(); } //if user clicks on add
    editButton.onclick = function() { openPopupEdit(email); }; //if user clicks on edit
  
    activeSelector.addEventListener("change", function(){
      //gets current value of active selector
      let Disabled_Status = activeSelector.value;
      var dbreference = database.ref("users/"); //gets database ready
      var currentUserID; //for user ID
      dbreference.orderByChild('email').equalTo(email).on('value', function(snapshot){ //orders by email to find the right one
        //then calls the data from it
        if(snapshot.exists()){ //if account exists
          snapshot.forEach(childSnapshot => { //for each snapshot of the child of user aka userID
            currentUserID = childSnapshot.key; //current user info 
          });
        }
      });

      var updatedValues = { //stuff being passed in for the database soon
        disabled: Disabled_Status
      }
      dbreference.child(currentUserID).update(updatedValues); //sets it in the database
    }); //end active selector

    td1.innerHTML = ++rankNumber; //takes in parameters passed in by function into cells and creates a rank
    td2.innerHTML = username; 
    td3.innerHTML = '<a href="mailto:' + email + '">' + email + '</a>';
    td4.innerHTML = role;
  
    td0.appendChild(activeSelector); //adds selectors and buttons to these cells
    td5.appendChild(addButton); 
    td6.appendChild(editButton);
    td7.appendChild(removeButton);
  
    trow.appendChild(td0);
    trow.appendChild(td1); //combines the cells into the row
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
  
    tbody.appendChild(trow); //adds the row to the body of the table
  
  }
  
  //the function passes in database as an array and uses the AddItemToTable function to add each array element 1 by 1
  function AddAllItemsToTable(databaseArray) {

    rankNumber = 0;
    tbody.innerHTML=""; //empties the table so that duplicate data is not added
    databaseArray.forEach(element => { //for each element
      AddItemToTable(element.username, element.email, element.user_type) //add it to the table.
    })
  }
  
  
  function GetAllDataRealTime() {
    const dbreference = database.ref('users/'); //database reference
  
    dbreference.on('value', (snapshot) => { //.on to look for changes, snapshot is the current database info at the time
      let databaseArray = []; //array
      snapshot.forEach(childSnapshot => { //for each snapshot of the child of user aka userID
        databaseArray.push(childSnapshot.val()); //push the info into the array
      })
      AddAllItemsToTable(databaseArray); //then call this method with the info as a parameter
    });
  }

  let Address, DOB, Email, FirstName, LastName, Password, Role, Username,q1,q2;
  function Ready(){ //gets all the variables ready here for mainly sending
    Address= document.getElementById('Address').value;
    DOB= document.getElementById('DOB').value;
    Email= document.getElementById('Email').value;
    FirstName= document.getElementById('FirstName').value;
    LastName= document.getElementById('LastName').value;
    Password= document.getElementById('Password').value;
    Role= document.getElementById('Role').value;
    Username= document.getElementById('Username').value;
    q1 = document.getElementById('q1').value
    q2 = document.getElementById('q2').value
  }

  function eReady(){ //for the edit popup text
    Address= document.getElementById('eAddress').value;
    DOB= document.getElementById('eDOB').value;
    Email= document.getElementById('eEmail').value;
    FirstName= document.getElementById('eFirstName').value;
    LastName= document.getElementById('eLastName').value;
    Password= document.getElementById('ePassword').value;
    Role= document.getElementById('eRole').value;
    Username= document.getElementById('eUsername').value;
    q1 = document.getElementById('eq1').value
    q2 = document.getElementById('eq2').value
  }

  function closePopup() {
    popup.classList.remove("open-popup");
  }
  
  function addButton(){// Adds information to the user database
    Ready();
    if (validate_email(Email) == false || validate_password(Password) == false) {
      alert('email or password is not valid')
      return
      // Don't continue running the code
    }
    if (validate_field(FirstName) == false || validate_field(LastName) == false || validate_field(Address) == false ) {
      alert('field left open')
      return
    }
    auth.createUserWithEmailAndPassword(Email, Password)
    .then(function() {
      var user = auth.currentUser
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        email : Email,
        password : Password,
        first_name : FirstName,
        last_name : LastName,
        dob : DOB, //date of birth comes last
        address : Address,
        user_type : Role,
        q1 : q1,
        q2 : q2,
        username : Username,
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  

        
      // Done
      alert('Account created');

      send_verification();
      
    })

    closePopup();
  }
  
  function editButton(){ //in case you were wondering e in front of the functions/ids is for edit
    var updatedEmail = document.getElementById('eEmail').value; //gets current email
    var dbreference = database.ref("users/");
    var uid;
    dbreference.orderByChild('email').equalTo(updatedEmail).on('value', function(snapshot){ //orders by email to find the right one
      //then calls the data from it
      if(snapshot.exists()){ //if account exists
        uid = Object.keys(snapshot.val())[0]; //get the current user id after you found the account
        //console.log(uid) for debugging
      }
    });
    document.getElementById('esubmitButton').setAttribute("onClick", "editButton()"); //changes to the submit button to use the editButton() function

    eReady();
    if (validate_email(Email) == false || validate_password(Password) == false) {
      alert('email or password is not valid')
      return
      // Don't continue running the code
    }
    if (validate_field(FirstName) == false || validate_field(LastName) == false || validate_field(Address) == false ) {
      alert('field left open')
      return
    }
    dbreference.child(uid).update({//Updates a user in the database
      address: Address, 
      dob: DOB, 
      email: Email,
      first_name: FirstName,
      last_name: LastName, 
      password: Password, 
      user_type : Role,
      q1 : q1,
      q2 : q2,
      username: Username
    });
    alert('Account updated');
    closePopup();
  }
  function removeButton(){
    Ready();
    firebase.database().ref('user/'+user.uid).remove()//Deletes from database
  }

  let popup = document.getElementById("add-popup"); //initializes a variable to reference the popup element
  function openPopupAdd() {
    popup.classList.add("open-popup");
    document.getElementById('submitButton').setAttribute("onClick", "addButton()"); //changes the onclick event of the submit button to use the addButton() function
  }
  let edit_popup = document.getElementById("edit-popup"); //initializes a variable to reference the popup element
  function openPopupEdit(email) {
    edit_popup.classList.add("open-popup");
    var dbreference = database.ref("users/"); //this is taken from passreset.js file
    var currentUser;
    dbreference.orderByChild('email').equalTo(email).on('value', function(snapshot){ //orders by email to find the right one
      //then calls the data from it
      if(snapshot.exists()){ //if account exists
        snapshot.forEach(childSnapshot => { //for each snapshot of the child of user aka userID
          currentUser = childSnapshot.val(); //current user info 
          updateInformationEditButton(currentUser);
        });
      }
    });
    document.getElementById('esubmitButton').setAttribute("onClick", "editButton()"); //changes to the submit button to use the editButton() function
  }

  function updateInformationEditButton(currentUser){
          document.getElementById('eFirstName').value = currentUser.first_name; //appends each one to the 
          document.getElementById('eLastName').value = currentUser.last_name; //correct id in the html
          document.getElementById('eDOB').value = currentUser.dob;
          document.getElementById('eUsername').value = currentUser.username;
          document.getElementById('ePassword').value = currentUser.password;
          document.getElementById('eEmail').value = currentUser.email;
          document.getElementById('eAddress').value = currentUser.address;
          document.getElementById('eq1').value = currentUser.q1;
          document.getElementById('eq2').value = currentUser.q2;
          document.getElementById('eRole').value = currentUser.user_type;
  }

  //window.onload = GetAllDataRealTime;
  window.onload = function() { //this is how to make windows load many functions at once
    GetAllDataRealTime(); 
    userName(); //Roman, Don, Jitel don't delete the comment so the other can see
  } //add more below follow format

  function sidebarToggle(){
    let sidebar = document.querySelector(".sidebar");   //selects which id to use as a varible
    let sidebarBtn = document.querySelector(".bx-arrow-from-left");   //same thing again, selects an icon or pic to use a variable for this fucntion
    sidebarBtn.addEventListener("click", ()=>{    //gives btton click an action on clcik for the sidebar icon
      sidebar.classList.toggle("close");    //on click switches the css from being the normal pushed out side nav bar to the closed one
    }); 
  }

  function userName(){
    firebase.auth().onAuthStateChanged(function(user){ //checks for current status of user login
      if(user){ //if user is login
      var CurrentUsername = firebase.auth().currentUser; //gets current user object info
      var currentUserUid = CurrentUsername.uid; //gets the userId
      database.ref('/users/' + currentUserUid).once('value').then(function(snapshot){ //go into database
        CurrentUsername = snapshot.val().username; //gets the username from database
        document.getElementById("username").innerHTML = CurrentUsername; //sets to it in html
      });
    }
    else{
      //user is signed out
    }
  });
  }

  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6;
    var pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(pattern)) {
      return true
    } else {
      alert('Password is either <8, start with #, or no special characte, or has no capital letters')
      return false 
    }
  }

  function validate_field(field) { //check if fields empty
    if (field == null) { //if empty
      return false //end
    }
  
    if (field.length <= 0) { //if field length is not empty
      return false
    } else { //if field is empty but not null
      return true
    }
  }

  function send_verification()
  {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function()
    {
    // email sent 
    alert('An email verification has been reviewed and sent!')
    }).catch(function(error) {

    });
  }
