const firebaseConfig = {
 //private credentials
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()

  
  //holds a bunch of global values 
  var count = 0;
  var imageN, imageURL, reader; // these two are for file uploading
  var file = [];

  var today = new Date(); //these are for determing the date with months days, minutes, etc
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var day = new Date();
  var times = day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
  var dates = date + "--" + times;
  var id2 = Math.floor(Math.random() * 1000);// used for creating a random generated second id used for the journals
  var totall;

  function authState()
{
firebase.auth().onAuthStateChanged(user) // just in case I need to use a change state for logging
  if(user)
  {
    var uid = user.uid;
  }
  else{};
}
  // variables for the send function to grab all journal values
  var accNum, desc, Debit, Credit, date;
  var approval = false;
  var desc2, Debit2, Credit2, date2;
  var desc3, Debit3, Credit3, date3;
  var desc4, Debit4, Credit4, date4;
  var desc5, Debit5, Credit5, date5;
  var desc6, Debit6, Credit6, date6;
function Send()//function that grabs all values typed in the textboxes
{
  accNum = document.getElementById('accNum').value;
  date = document.getElementById('date').value;
  desc = document.getElementById('Description').value;
  Debit = document.getElementById('debit').value;
  Credit = document.getElementById('credit').value;

  date2 = document.getElementById('date2').value;
  desc2 = document.getElementById('Description2').value;
  Debit2 = document.getElementById('debit2').value;
  Credit2 = document.getElementById('credit2').value;

  date3 = document.getElementById('date3').value;
  desc3 = document.getElementById('Description3').value;
  Debit3 = document.getElementById('debit3').value;
  Credit3 = document.getElementById('credit3').value;

  date4 = document.getElementById('date4').value;
  desc4 = document.getElementById('Description4').value;
  Debit4 = document.getElementById('debit4').value;
  Credit4 = document.getElementById('credit4').value;

  date5 = document.getElementById('date5').value;
  desc5 = document.getElementById('Description5').value;
  Debit5 = document.getElementById('debit5').value;
  Credit5 = document.getElementById('credit5').value;

  date6 = document.getElementById('date6').value;
  desc6 = document.getElementById('Description6').value;
  Debit6 = document.getElementById('debit6').value;
  Credit6 = document.getElementById('credit6').value;



}
//because you get them from html many of the types are designated NaN not a number so you have to update them to be a number if they are not typed in
setInterval(() => {
  var debit = parseInt(document.getElementById('debit').value, 10);
  if(isNaN(debit)){debit = 0;}
  var debit2 = parseInt(document.getElementById('debit2').value, 10);
  if(isNaN(debit2)){debit2 = 0;}
  var debit3 = parseInt(document.getElementById('debit3').value, 10);
  if(isNaN(debit3)){debit3 = 0;}
  var debit4 = parseInt(document.getElementById('debit4').value, 10);
  if(isNaN(debit4)){debit4 = 0;}
  var debit5 = parseInt(document.getElementById('debit5').value, 10);
  if(isNaN(debit5)){debit5 = 0;}
  var debit6 = parseInt(document.getElementById('debit6').value, 10);
  if(isNaN(debit6)){debit6 = 0;}

  var credit = parseInt(document.getElementById('credit').value, 10);
  if(isNaN(credit)){credit = 0;}
  var credit2 = parseInt(document.getElementById('credit2').value, 10);
  if(isNaN(credit2)){credit2 = 0;}
  var credit3 = parseInt(document.getElementById('credit3').value, 10);
  if(isNaN(credit3)){credit3 = 0;}
  var credit4 = parseInt(document.getElementById('credit4').value, 10);
  if(isNaN(credit4)){credit4 = 0;}
  var credit5 = parseInt(document.getElementById('credit5').value, 10);
  if(isNaN(credit5)){credit5 = 0;}
  var credit6 = parseInt(document.getElementById('credit6').value, 10);
  if(isNaN(credit6)){credit6 = 0;}

  var dtotal = (debit + debit2 + debit3 + debit4 + debit5 + debit6);//gets the total debits and credits to use or store in later files
  var ctotal = (credit + credit2 + credit3 + credit4 +  credit5 + credit6);

  totall = dtotal - ctotal;
  document.getElementById('total').value = totall;// stores a total balance 

  
}, 1);

setInterval(() => {// if your credits are more than your debits it will alert you every 3k milliseconds

  if(totall < 0)
  {alert("debits do not equal credits!")}

}, 3000);



document.getElementById('Submit').onclick = function()//uses send function and submits all values in send function with submit button
  {
    Send();
    if(accNum =='') // if the account number typed in is nothing you cannot send it anywhere an account number neeeds to be tied
    {
      alert('Incorrect Account Number!')
      return;
    }
    firebase.database().ref('Journal/' + accNum).set({ // sets all values equal to a vlaue with a name in firebase DB
      accNum : accNum,
      date : date,
      desc : desc,
      Debit : Debit,
      Credit : Credit,
      approval : approval,
      balance : totall,

      date2 : date2,
      desc2 : desc2,
      Debit2 : Debit2,
      Credit2 : Credit2,

      date3 : date3,
      desc3 : desc3,
      Debit3 : Debit3,
      Credit3 : Credit3,

      date4 : date4,
      desc4 : desc4,
      Debit4 : Debit4,
      Credit4 : Credit4,

      date5 : date5,
      desc5 : desc5,
      Debit5 : Debit5,
      Credit5 : Credit5,

      date6 : date6,
      desc6 : desc6,
      Debit6 : Debit6,
      Credit6 : Credit6,

  });
  alert('Journal Submitted')

  firebase.database().ref('JournalLog/' + id2).set({//stores a log of date and time and accnum for changes in that account
    accNum : accNum,
        dates: dates
  });
  }

  

  function SelectData()
  {
    firebase.database().ref('Account')
  }

  document.getElementById('imgButton').onclick = function() // upload image function
{
  var input = document.createElement("input");
  input.type = 'file';

  input.onchange = e => {
    file = e.target.file;
    reader = new FileReader();
    reader.onload = function()
    {
      document.getElementById("img").src = reader.result;
    }
    reader.readAsDataURL(file[0]);
  }
  input.click();
}


document.getElementById('upButton').onclick = function()
{
  alert('Image uploaded')
}

  document.getElementById('Clear').onclick = function Clear()// function to clear every typed in value if wanted 
  {
      document.getElementById('date').value = null;
      document.getElementById('debit').value = null;
      document.getElementById('Description').value = null;
      document.getElementById('credit').value = null;

      document.getElementById('date2').value = null;
      document.getElementById('debit2').value = null;
      document.getElementById('Description2').value = null;
      document.getElementById('credit2').value = null;

      document.getElementById('date3').value = null;
      document.getElementById('debit3').value = null;
      document.getElementById('Description3').value = null;
      document.getElementById('credit3').value = null;

      document.getElementById('date4').value = null;
      document.getElementById('debit4').value = null;
      document.getElementById('Description4').value = null;
      document.getElementById('credit4').value = null;

      document.getElementById('date5').value = null;
      document.getElementById('debit5').value = null;
      document.getElementById('Description5').value = null;
      document.getElementById('credit5').value = null;

      document.getElementById('date6').value = null;
      document.getElementById('debit6').value = null;
      document.getElementById('Description6').value = null;
      document.getElementById('credit6').value = null;
  }
  

  document.getElementById('accbutt').onclick = function get()//function to get the values of accounts and fill in table
  {
    accNum = document.getElementById('accNum').value;

    var user_ref = database.ref('Account/' + accNum)
    user_ref.on('value', function(snapshot)
    {
      var data = snapshot.val()
      document.getElementById('debit').value = data.Debit;
      document.getElementById('Description').value = data.desc;
      document.getElementById('credit').value = data.Credit;

      document.getElementById('debit2').value = data.Debit2;
      document.getElementById('Description2').value = data.desc2;
      document.getElementById('credit2').value = data.Credit2;

      document.getElementById('debit3').value = data.Debit3;
      document.getElementById('Description3').value = data.desc3;
      document.getElementById('credit3').value = data.Credit3;

      document.getElementById('debit4').value = data.Debit4;
      document.getElementById('Description4').value = data.desc4;
      document.getElementById('credit4').value = data.Credit4;

      document.getElementById('debit5').value = data.Debit5;
      document.getElementById('Description5').value = data.desc5;
      document.getElementById('credit5').value = data.Credit5;

      document.getElementById('debit6').value = data.Debit6;
      document.getElementById('Description6').value = data.desc6;
      document.getElementById('credit6').value = data.Credit6;
      
    })
  }
  if(approval == false) // if statement to start out the approval button as red and not approved
  {
    document.getElementById('approve').style.backgroundColor = 'Red';
    document.getElementById('approve').textContent = "Not Approved";
  }
  

  document.getElementById('approve').onclick = function()// a method for the use of the approval button changing it to green and altering the value of the variable if you are admin or manager
{
  
  count = count + 1;
  //alert('help?')
 // approval = true;
  //alert(approval)
  

  
 var user = auth.currentUser;
 var currentUserUid = user.uid;

 database.ref('/users/' + currentUserUid).once('value').then(function(snapshot){ //go into database
  user_role = snapshot.val().user_type; //gets the user type/role
  if(user_role != "Admin"){ //if not admin
      alert('You do not have the credentials to use this.');
      return; //don't run the code anymore, cancel log in
  }
  else
  {
    approval = true;
    if(approval == true)
  {
    document.getElementById('approve').style.backgroundColor = 'Green';
    document.getElementById('approve').textContent = "Approved";
  }
  if(count % 2 == 0)
  {
    approval = false;
    document.getElementById('approve').style.backgroundColor = 'Red';
    document.getElementById('approve').textContent = "Not Approved";
  }
  }
});

  //if(user != null)
  //{
    //var type = user.user_type;
   // if(type == 'Manager' || type == 'Admin') 
   // {
   //   approval = true;
   // }else{alert('Not a Manager or Admin!')}
   // alert('its gone through')
  //}

  
  
}
