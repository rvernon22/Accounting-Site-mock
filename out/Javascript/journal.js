const firebaseConfig = {
  //private credentials
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  const storageReference = firebase.storage().ref(); //NOTE: The ref is already created do not do it again

  var imageN, imageURL, reader; //not sure which one is used and which is not or used later in the future.... Roman please check
  var file = [];

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var day = new Date();
  var times = day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
  var dates = date + "--" + times;
  var id2 = Math.floor(Math.random() * 1000);
  var totall;


  
  var accNum, desc, Debit, Credit, date, approval;
function Send() //get the variables ready to send
{
  accNum = document.getElementById('accNum').value;
  date = document.getElementById('date').value;
  desc = document.getElementById('Description').value;
  Debit = document.getElementById('debit').value;
  Credit = document.getElementById('credit').value;
  approval = false;
}

setInterval(() => {
  var debit = document.getElementById('debit').value;
  var credit = document.getElementById('credit').value;

  totall = debit - credit; //calculate total
  document.getElementById('total').value = totall;

  
}, 1);

setInterval(() => {

  if(totall < 0)
  {alert("debits do not equal credits!")} //debits and credits do not equal

}, 3000);


document.getElementById('Submit').onclick = function() //when you hit the submit button
  {
    Send(); //get variables ready
    if(accNum =='') 
    {
      alert('Incorrect Account Number!')
      return;
    }
    firebase.database().ref('Journal/' + accNum).set({ //throw the variables in firebase database
      accNum : accNum,
      date : date,
      desc : desc,
      Debit : Debit,
      Credit : Credit,
      approval : approval,
      balance : totall,

  });
  alert('Journal Submitted')

  firebase.database().ref('JournalLog/' + id2).set({ //throw the items in the database
    accNum : accNum,
        dates: dates
  });
  }

  

  function SelectData()
  {
    firebase.database().ref('Account') //database reference area honestly not sure why this is here... Cough Roman
  }

  document.getElementById('fileButton').onclick = function() //Frank commenting for Roman or doing his best
{ //since im trying to use this
  // var input = document.createElement("input"); //create input element
  // input.type = 'file'; //sets type to file

  // input.onchange = e => { //file selected in input element
  //   //document.getElementById('fileInput').files[0]; other tested stuff may be used later
  //   file = e.target.files[0]; //get the first file that the user uploaded e.target.files targets the file input in html.
  //   reader = new FileReader(); //file reader to read file
  //   reader.onload = function() //when file is uploaded
  //   {
  //     document.getElementById("img").src = reader.result; //set source as img element
  //   }
  //   reader.readAsDataURL(file); //read as data url
  // }
  // input.click(); //creates a click on the input element from earlier.

  //this doesn't work? Making new one below

  var input = document.getElementById('fileInput');
  input.click(); //simulates click to get file
}

//TO DO - Roman has not actually done any uploading here to firebase. It looks like it works but doesn't
document.getElementById('upButton').onclick = function()
{
  var file = document.getElementById('fileInput').files[0]; //get file
  var fileName = document.getElementById('imageN').value; //get file name
  var fileReference = storageReference.child('files/' + fileName); 
  //storage reference is the reference to the firebase storage earlier in the code.
  //.child is for the child reference, used the same as realtime database
  //+fileName is to add it to the file with the name
  //reference used later for convenience then having to type this each time updated as there was to much code of that here

  fileReference.put(file).then(function(snapshot) { //add files here
    alert("File added");
  }).catch(function(error){
    console.error(error + 'occurred');
  });  

}


document.getElementById('fileInput').addEventListener('change', function(event) {
  var file = event.target.files[0];
  var name = file.name; //self explanatory
  var fileType = name.substr(name.lastIndexOf('.') + 1); // get the file type
  //This is the logic
  //https://www.w3schools.com/jsref/jsref_substr.asp
  //https://www.w3schools.com/jsref/jsref_indexof.asp
  //To explain it simply you go to the last location of the period using last index of the period to get the part after it
  //then substr goes location of period + 1 to get the file type after the period.
  fileType = fileType.toLowerCase(); //make it lower case to accomodate below array
  var FileTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'jpg', 'jpeg', 'png']; // what is allowed listed here

  // check if file type is allowed
  //https://www.w3schools.com/jsref/jsref_includes.asp
  if (!FileTypes.includes(fileType)) {  //if the file type is not allowed
    //checking array to the file type we got earlier
    alert('File type not allowed. Please upload another document'); 
    document.getElementById('fileInput').value = ''; // clear the file input field
    return;
  }
});

  document.getElementById('Clear').onclick = function Clear() //clear the fields
  {
    document.getElementById('date').value = null;
    document.getElementById('debit').value = null;
      document.getElementById('Description').value = null;
      document.getElementById('credit').value = null;
  }
  

  document.getElementById('accbutt').onclick = function get() //get the info
  {
    accNum = document.getElementById('accNum').value;

    var user_ref = database.ref('Account/' + accNum)
    user_ref.on('value', function(snapshot)
    {
      var data = snapshot.val()
      document.getElementById('debit').value = data.Debit;
      document.getElementById('Description').value = data.desc;
      document.getElementById('credit').value = data.Credit;
      
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
