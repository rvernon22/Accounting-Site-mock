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
   database.ref('/Account').once('value').then(function(snapshot){
     var bodyTable = document.getElementById("tbody1"); //this is how we're calling table body element
     //snapshot loop
     snapshot.forEach(function(childSnapshot){
         var data = childSnapshot.val(); //calls the innerwards, and then gets the data
         const row = bodyTable.insertRow(); //make new table row 
         row.insertCell().innerHTML = data.accNum; //inserts account number
         row.insertCell().innerHTML = data.user_ID; //inserts user typed in ID
         row.insertCell().innerHTML = data.Initial; //inserts account initial value
         row.insertCell().innerHTML = data.desc; //inserts description value
         row.insertCell().innerHTML = data.Debit; //inserts debit value from account
         row.insertCell().innerHTML = data.Credit; //inserts credit value from account
         row.insertCell().innerHTML = data.Comment1; //inserts comment from account

         row.insertCell().innerHTML = data.Initial2; //inserts account initial value
         row.insertCell().innerHTML = data.desc2; //inserts description value
         row.insertCell().innerHTML = data.Debit2; //inserts debit value from account
         row.insertCell().innerHTML = data.Credit2; //inserts credit value from account
         row.insertCell().innerHTML = data.Comment2; //inserts comment from account

         row.insertCell().innerHTML = data.Initial3; //inserts account initial value
         row.insertCell().innerHTML = data.desc3; //inserts description value
         row.insertCell().innerHTML = data.Debit3; //inserts debit value from account
         row.insertCell().innerHTML = data.Credit3; //inserts credit value from account
         row.insertCell().innerHTML = data.Comment3; //inserts comment from account

         row.insertCell().innerHTML = data.Initial4; //inserts account initial value
         row.insertCell().innerHTML = data.desc4; //inserts description value
         row.insertCell().innerHTML = data.Debit4; //inserts debit value from account
         row.insertCell().innerHTML = data.Credit4; //inserts credit value from account
         row.insertCell().innerHTML = data.Comment4; //inserts comment from account
         
         row.insertCell().innerHTML = data.Initial5; //inserts account initial value
         row.insertCell().innerHTML = data.desc5; //inserts description value
         row.insertCell().innerHTML = data.Debit5; //inserts debit value from account
         row.insertCell().innerHTML = data.Credit5; //inserts credit value from account
         row.insertCell().innerHTML = data.Comment5; //inserts comment from account

         row.insertCell().innerHTML = data.Initial6; //inserts account initial value
         row.insertCell().innerHTML = data.desc6; //inserts description value
         row.insertCell().innerHTML = data.Debit6; //inserts debit value from account
         row.insertCell().innerHTML = data.Credit6; //inserts credit value from account
         row.insertCell().innerHTML = data.Comment6; //inserts comment from account
     })
   });
 
 
   window.onload = function() { //this is how to make windows load many functions at once
     userName(); //Roman, Don, Jitel don't delete the comment so the other can see
   } //add more below follow format