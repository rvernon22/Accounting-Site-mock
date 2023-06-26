const firebaseConfig = {
 //private credentials
};
 
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()

  var accNum;
  

  document.getElementById('accbutt').onclick = function get() //get the variables
  {
    accNum = document.getElementById('accNum').value;

    var user_ref = database.ref('Account/' + accNum)
    user_ref.on('value', function(snapshot)
    {
      var data = snapshot.val()
     
     //document.getElementById('accNum').value = data.Debit;
     
     
     var Debit1 = parseFloat(data.Debit);
     if(isNaN(Debit1)){Debit1 = 0;}

     var Debit2 = parseFloat(data.Debit2);
     if(isNaN(Debit2)){Debit2 = 0;}

     var Debit3 = parseFloat(data.Debit3);
     if(isNaN(Debit3)){Debit3 = 0;}

      var Debit4 = parseFloat(data.Debit4);
      if(isNaN(Debit4)){Debit4 = 0;}

      var Debit5 = parseFloat(data.Debit5);
      if(isNaN(Debit5)){Debit5 = 0;}

      var Debit6 = parseFloat(data.Debit6);
      if(isNaN(Debit6)){Debit6 = 0;}




     var Credit1 = parseFloat(data.Credit);
     if(isNaN(Credit1)){Credit1 = 0;}

     var Credit2 = parseFloat(data.Credit2);
     if(isNaN(Credit2)){Credit2 = 0;}

     var Credit3 = parseFloat(data.Credit3);
     if(isNaN(Credit3)){Credit3 = 0;}

     var Credit4 = parseFloat(data.Credit4);
     if(isNaN(Credit4)){Credit4 = 0;}

     var Credit5 = parseFloat(data.Credit5);
     if(isNaN(Credit5)){Credit5 = 0;}

     var Credit6 = parseFloat(data.Credit6);
     if(isNaN(Credit6)){Credit6 = 0;}

        var throwd = 0 + Credit1;
        throwd = throwd + Credit2;
        throwd = throwd + Credit3;
        throwd = throwd + Credit4;
        throwd = throwd + Credit5;
        throwd = throwd + Credit6;


     var currLiability = (Credit1 + Credit2 + Credit3 + Credit4 + Credit5 + Credit6);  //add it all up
     var currAssets = (Debit1 + Debit2 + Debit3 + Debit4 + Debit5 + Debit6);

     var currRatio = currAssets / currLiability;
     document.getElementById('crArea').value = currRatio.toFixed(2) + "%";

      //alert(currRatio)
     //document.getElementById('crArea').value = data.Debit;
     

      var income = currAssets - currLiability;
      document.getElementById('nIncome').value = income.toFixed(2);

      //alert(currAssets + " CURR ASSETS")
      var sales = document.getElementById('uSold').value; 
      sales = currAssets / sales;
      document.getElementById('gProfit').value = sales.toFixed(2) + "%";

      document.getElementById('gProfit').style.fontSize = "50px";
      document.getElementById('nIncome').style.fontSize = "50px";
      document.getElementById('crArea').style.fontSize = "50px";
      
      if(sales < 50) //depending on the number created throw the color
      {
         document.getElementById('gProfit').style.color = 'Red';
      }else{document.getElementById('gProfit').style.color = 'Green';}

     if(currRatio < 1.2)
     {
        document.getElementById('crArea').style.color = 'Red';
     }else{document.getElementById('crArea').style.color = 'Green';}

    // if(income > 99 || income < -99)
   //  {
   //     document.getElementById('nIncome').style.fontSize = 'x-small';
   //  }

     if(income < 100)
     {
        document.getElementById('nIncome').style.color = 'Red';
     }else{document.getElementById('nIncome').style.color = 'Green';}

    })
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

window.onload = function() { //this is how to make windows load many functions at once
   userName(); //Roman, Don, Jitel don't delete the comment so the other can see
 } //add more below follow format



  
