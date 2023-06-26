// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase , set, update, ref } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyD-5nVphj5o2vXoDy6Ld1yFGc5phrhteNA",
  authDomain: "precisebooks-c6758.firebaseapp.com",
  databaseURL: "https://precisebooks-c6758-default-rtdb.firebaseio.com/",
  projectId: "precisebooks-c6758",
  storageBucket: "precisebooks-c6758.appspot.com",
  messagingSenderId: "107559096811",
  appId: "1:107559096811:web:bc76d562a34a2ba0de09ae",
  measurementId: "G-YNQ0G9QRCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseConfig);
const auth = getAuth(firebaseConfig);
const db = getFirestore(firebaseConfig);
const database = getDatabase(firebaseConfig);
const reference = ref(database, 'users/' + userId);

function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  first_name = document.getElementById('fname').value
  last_name = document.getElementById('lname').value
  address = document.getElementById('address').value
  //dob = document.getElementById('DateBirth').value //try to figure out date of birth later
  user_type = document.getElementById('user_Type').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('email or password is not valid')
    return
    // Don't continue running the code
  }
  if (validate_field(first_name) == false || validate_field(last_name) == false || validate_field(address) == false ) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      password : password,
      first_name : first_name,
      last_name : last_name,
      //dob : dob, date of birth comes last
      address : address,
      user_type : user_type,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('Account created')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
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