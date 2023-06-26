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

  window.onload = function() { //this is how to make windows load many functions at once
    userName(); //Roman, Don, Jitel don't delete the comment so the other can see
  } //add more below follow format