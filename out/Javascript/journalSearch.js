const firebaseConfig = {
  //private credentials
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()


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
  //kinda similar to event log
  database.ref('/Journal').once('value').then(function(snapshot){
    var bodyTable = document.getElementById("tbody1"); //this is how we're calling table body element
    //snapshot loop
    snapshot.forEach(function(childSnapshot){
        var data = childSnapshot.val(); //calls the innerwards, and then gets the data
        const row = bodyTable.insertRow(); //make new table row 
        row.insertCell().innerHTML = data.accNum; //inserts account number
        row.insertCell().innerHTML = data.desc; //inserts description
        row.insertCell().innerHTML = data.balance; //inserts account number
        row.insertCell().innerHTML = data.approval; //inserts account number
    })
  });


  window.onload = function() { //this is how to make windows load many functions at once
    userName(); //Roman, Don, Jitel don't delete the comment so the other can see
  } //add more below follow format
 

    
