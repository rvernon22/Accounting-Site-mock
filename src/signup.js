// Your web app's Firebase configuration
const firebaseConfig = {
 //private credentials
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    first_name = document.getElementById('fname').value
    last_name = document.getElementById('lname').value
    address = document.getElementById('address').value
    //dob = document.getElementById('DateBirth').value //try to figure out date of birth later
    user_type = document.getElementById('user_Type').value
    q1 = document.getElementById('q1').value
    q2 = document.getElementById('q2').value


    var fn = first_name;
    var fn_two = fn.slice(0,2);
    var ln = last_name;
    var date_cur = new Date();
    var year = date_cur.getUTCFullYear();
    var year = year.toString();
    var year2 = year.slice(0,2);
    
    var month = date_cur.getUTCMonth() + 1 ;
  	var month = month.toString();
    
    var newdate = year + month ;
    var use_date = newdate.toString();



    var username = fn_two + ln + use_date;
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('email or password is not valid')
      return
      // Don't continue running the code
    }
    if (validate_field(first_name) == false || validate_field(last_name) == false || validate_field(address) == false ) {
      alert('feild left open')
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
        q1 : q1,
        q2 : q2,
        username : username,
        last_login : Date.now()
        
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  

        
      // Done
      alert('Account created');

      send_verification();
      
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
    // Firebase only accepts lengths greater than 6;
    var pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(pattern)) {
      return true
    } else {
      alert('Password is either <8, start with #, or no special characte, or has no capital letters')
      return false 
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
