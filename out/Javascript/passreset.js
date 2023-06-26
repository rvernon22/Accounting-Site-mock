const firebaseConfig = {
  //private credentials
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  




  function reset()
  {
    email = document.getElementById('email').value;
    validate_email(email); //validates if email is valid
    var dbreference = database.ref("users/");
    //password = document.getElementById('password').value

    q1 =  document.getElementById('q1').value;
    q2 =  document.getElementById('q2').value;
    dbreference.orderByChild('email').equalTo(email).on('value', function(snapshot){ //orders by email to find the right one
      //then calls the data from it
      if(snapshot.exists()){ //if account exists
        snapshot.forEach(childSnapshot => { //for each snapshot of the child of user aka userID
          var currentUser = childSnapshot.val(); //current user info 

          if(currentUser.q1 == q1 && currentUser.q2 == q2){ //if right answers
            passwordReset(); //reset
          }
          else{
            alert("Answers are incorrect.") //else tell user answer is wrong
          }
        })
      }
      else{
        alert('Account does not exist') //can't find account
      }
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

  function passwordReset()
  {
    //var user = firebase.auth().currentUser;

    auth.sendPasswordResetEmail(email).then(() =>
    {
    // email sent 
    alert('Password Reset Email Sent')
    }).catch(error => {
        alert('error')
    });
  }

  function validate_password(password) {
    // Firebase only accepts lengths greater than 6;
    if (/^.{10,16}$\S*$(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
      alert('Password is either <8, start with #, or no special character')
      return false
    } else {
      return true
    }
  }
