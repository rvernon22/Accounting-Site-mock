const firebaseConfig = {
 //private credentials
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
    eventLogTable();
  } //add more below follow format

  //Using the auto table generation code Don made, but with improvements from the video he used.
  function eventLogTable(){
    const tableBody = document.querySelector("#event_log tbody"); //what you didn't do Don
    //instead of clogging up the whole thing with repeat code. Do this query selector to get the
    //id, and the specifics from the table. I do not expect you to redo all of that when
    //we have more stuff to do instead. https://www.w3schools.com/jsref/met_document_queryselector.asp
    database.ref('Event_Log').once('value').then(function(snapshot){ //into the event log database
      snapshot.forEach(function(childSnapshot){ //loops for each child in that certain snapshot
        const data = childSnapshot.val(); //get the data
        const row = tableBody.insertRow(); //make new table row
        row.insertCell().innerHTML = data.EventID; // Add the event ID
        row.insertCell().innerHTML = data.UserID; // Add the user ID 
        row.insertCell().innerHTML = data.Date_Time; // Add the date/time
        row.insertCell().innerHTML = JSON.stringify(data.OldData); // Add the old data
        row.insertCell().innerHTML = JSON.stringify(data.NewData); //add the new data https://www.w3schools.com/js/js_json_stringify.asp
      });
    });

  }
