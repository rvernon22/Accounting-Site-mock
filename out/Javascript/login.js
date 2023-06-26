// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-5nVphj5o2vXoDy6Ld1yFGc5phrhteNA",
  authDomain: "precisebooks-c6758.firebaseapp.com",
  databaseURL: "https://precisebooks-c6758-default-rtdb.firebaseio.com",
  projectId: "precisebooks-c6758",
  storageBucket: "precisebooks-c6758.appspot.com",
  messagingSenderId: "107559096811",
  appId: "1:107559096811:web:bc76d562a34a2ba0de09ae",
  measurementId: "G-YNQ0G9QRCM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
var counter = 0;
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  //To Do check if disabled or not. If disabled fail their login.
  
   //Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('email or password is incorrect')

    var user = auth.currentUser
    var database_ref = database.ref()
  
    counter = counter + 1;
    if(counter > 3) //counter kept for amount of login attempts
      {
        var user_data = {disabled: true}
        database_ref.child('users/' + user.uid).update(user_data)
        alert('User account has been suspended') //if login to many times you get your account disabled
      }
    return
     //Don't continue running the code
  }



  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser
    var currentUserUid = user.uid;

    var disable_status; //check if disabled
    database.ref('/users/' + currentUserUid).once('value').then(function(snapshot){ //go into database
      disable_status = snapshot.val().disabled; //gets the disabled status from database
      if(disable_status == "Deactivated"){ //if disabled
        alert('User account is currently disabled. Contact an admin if you believe this is an error.');
        auth.signOut();
        return; //don't run the code anymore, cancel log in
      }
      else{
        // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
        last_login : Date.now()
    }


    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)
    var user_role;
    database.ref('/users/' + currentUserUid).once('value').then(function(snapshot){ //go into database
      user_role = snapshot.val().user_type; //gets the user type/role
      if(user_role == "User"){ //if user role is user
        alert('Logged in')
        window.location.assign('../HTML/homepage.html')
      }
      else if(user_role == "Admin"){//if admin
        alert('Logged in')
        window.location.assign('../HTML/homepage admin.html')
      }
      else{
        alert('Logged in') //if manager
        window.location.assign('../HTML/homepage manager.html')
      }
    });
    // DOne

      }
    });

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
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
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

function passwordToggle() { //password encyption toggle
  let passwordToggle = document.getElementById("password"); //gets the password html element
  if (passwordToggle.type === "password") { //if input type = password then
    passwordToggle.type = "text"; //switch to type = text to reveal
  } else {
    passwordToggle.type = "password"; //else keep encrypted
  }
}