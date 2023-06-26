// Your web app's Firebase configuration
const firebaseConfig = {
 //private credentials
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

    
     //Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('email or password is incorrect')

      var user = auth.currentUser
      var database_ref = database.ref()
    
      counter = counter + 1;
      if(counter > 3)
        {
          var user_data = {disabled: true}
          database_ref.child('users/' + user.uid).update(user_data)
          alert('User account has been suspended')
        }
      return
       //Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
          last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('Logged in')
      window.location.assign('../dashboard.html')
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
