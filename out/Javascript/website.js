//Functions
function sidebarToggle(){
    let sidebar = document.querySelector(".sidebar");   //selects which id to use as a varible
    let sidebarBtn = document.querySelector(".bx-arrow-from-left");   //same thing again, selects an icon or pic to use a variable for this fucntion
    sidebarBtn.addEventListener("click", ()=>{    //gives btton click an action on clcik for the sidebar icon
      sidebar.classList.toggle("close");    //on click switches the css from being the normal pushed out side nav bar to the closed one
    }); 
}

// function login(){
//   login.addEventListner('click', (e) =>  //click listener for when you click submit
//     {
//         var email = document.getElementById('email').value; //DB values for whats typed in the html inputs
//         var password = document.getElementById('password').value;

//         signInWithEmailAndPassword(auth, email, password)  //authenticates users creds, logs in with those creds
//             .then((userCredential) => 
//             {
//                 // Signed in 
//                 const date = new Date(); //creates date variable
//                 update(ref(database, 'users/ '+ user.uid),{  //updates database
//                     login_date : date //logs the date of every log in
//                 })

//                 alert('Logged in successfully')  //shows a logged in alert on page
//                 const user = userCredential.user;  //user variable
//             })
//             .catch((error) => 
//             {
//                 const errorCode = error.code;  //error codes if it doesnt work 
//                 const errorMessage = error.message;
//                 alert(errorMessage);
//             });
//     });
// }

// function register(){
//   register.addEventListner('click', (e) =>  //gives register button a click event
//   {
//       var email = document.getElementById('email').value;
//       var password = document.getElementById('password').value; //DB valeus for signing in from html forms

      
//       /*--MAKE ALL THE VARIABLES LATER*/
//       const auth = getAuth();
//       createUserWithEmailAndPassword(auth, email, password)   //authenticates user
//           .then((userCredential) => 
//           {
//               // Signed in 
//               const user = userCredential.user;  //sets database variables up as those previous variables
//               // set(ref(database, 'users/ '+ user.uid),{
//               //     email : email,
//               //     password : password
//               // })

//               alert('account succesfully created') //account creation alert
//           })
//           .catch((error) => //error if something goes wrong
//           {
//               const errorCode = error.code;
//               const errorMessage = error.message;
//               alert(errorMessage);
//           });
//   });
// }

function passwordToggle() { //password encyption toggle
    let passwordToggle = document.getElementById("password"); //gets the password html element
    if (passwordToggle.type === "password") { //if input type = password then
      passwordToggle.type = "text"; //switch to type = text to reveal
    } else {
      passwordToggle.type = "password"; //else keep encrypted
    }
  }