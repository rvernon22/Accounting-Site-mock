// Your web app's Firebase configuration
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
  //variable creation
  var accNum, desc, desc2, desc3, desc4, desc5, desc6, desc7, desc8, desc9, desc10;
  var Subcategory, Subcategory2, Subcategory3, Subcategory4, Subcategory5, Subcategory6, Subcategory7, Subcategory8, Subcategory9, Subcategory10; 
  var Initial, Initial2, Initial3, Initial4, Initial5, Initial6, Initial7, Initial8, Initial9, Initial10;
  var Debit, Debit2, Debit3, Debit4, Debit5, Debit6, Debit7, Debit8, Debit9, Debit10;
  var Credit, Credit2, Credit3, Credit4, Credit5, Credit6, Credit7, Credit8, Credit9, Credit10;
  var Balance, Balance2 , Balance3 , Balance4 , Balance5 , Balance6 , Balance7 , Balance8 , Balance9 , Balance10;
  var Time, Time2 , Time3 , Time4 , Time5 , Time6 , Time7 , Time8 , Time9 , Time10;
  var user_ID//, user_ID2 , user_ID3 , user_ID4 , user_ID5 , user_ID6 , user_ID7 , user_ID8 , user_ID9 , user_ID10;
  var Order, Order2 , Order3 , Order4 , Order5 , Order6 , Order7 , Order8 , Order9 , Order10;
  var RE, RE2 , RE3 , RE4 , RE5 , RE6 , RE7 , RE8 , RE9 , RE10;
  var Comment1, Comment2 , Comment3 , Comment4 , Comment5 , Comment6 , Comment7 , Comment8 , Comment9 , Comment10;
    // Get all our input fields
    function Send() //goal here is to send all of the input values to firebase
    {   
        accNum = document.getElementById('accNum').value;
        desc = document.getElementById('desc').value;
        Subcategory = document.getElementById('Subcategory').value;
        Initial = document.getElementById('Initial').value;
        Debit = document.getElementById('Debit').value;
        Credit = document.getElementById('Credit').value;
        Balance = document.getElementById('Balance').value;
        Time = document.getElementById('Time').value;
        user_ID = document.getElementById('user_ID').value;
        Order = document.getElementById('Order').value;
        RE = document.getElementById('RE').value;
        Comment1 = document.getElementById('Comment1').value;

        desc2 = document.getElementById('desc2').value;
        Subcategory2 = document.getElementById('Subcategory2').value;
        Initial2 = document.getElementById('Initial2').value;
        Debit2 = document.getElementById('Debit2').value;
        Credit2 = document.getElementById('Credit2').value;
        Balance2 = document.getElementById('Balance2').value;
        Time2 = document.getElementById('Time2').value;
        user_ID = document.getElementById('user_ID2').value;
        Order2 = document.getElementById('Order2').value;
        RE2 = document.getElementById('RE2').value;
        Comment2 = document.getElementById('Comment2').value; 

        desc3 = document.getElementById('desc3').value;
        Subcategory3 = document.getElementById('Subcategory3').value;
        Initial3 = document.getElementById('Initial3').value;
        Debit3 = document.getElementById('Debit3').value;
        Credit3 = document.getElementById('Credit3').value;
        Balance3 = document.getElementById('Balance3').value;
        Time3 = document.getElementById('Time3').value;
        user_ID = document.getElementById('user_ID3').value;
        Order3 = document.getElementById('Order3').value;
        RE3 = document.getElementById('RE3').value;
        Comment3 = document.getElementById('Comment3').value; 

desc4 = document.getElementById('desc4').value;
        Subcategory4 = document.getElementById('Subcategory4').value;
        Initial4 = document.getElementById('Initial4').value;
        Debit4 = document.getElementById('Debit4').value;
        Credit4 = document.getElementById('Credit4').value;
        Balance4 = document.getElementById('Balance4').value;
        Time4 = document.getElementById('Time4').value;
        user_ID = document.getElementById('user_ID4').value;
        Order4 = document.getElementById('Order4').value;
        RE4 = document.getElementById('RE4').value;
        Comment4 = document.getElementById('Comment4').value; 

        desc5 = document.getElementById('desc5').value;
        Subcategory5 = document.getElementById('Subcategory5').value;
        Initial5 = document.getElementById('Initial5').value;
        Debit5 = document.getElementById('Debit5').value;
        Credit5 = document.getElementById('Credit5').value;
        Balance5 = document.getElementById('Balance5').value;
        Time5 = document.getElementById('Time5').value;
        user_ID = document.getElementById('user_ID5').value;
        Order5 = document.getElementById('Order5').value;
        RE5 = document.getElementById('RE5').value;
        Comment5 = document.getElementById('Comment5').value; 

        desc6 = document.getElementById('desc6').value;
        Subcategory6 = document.getElementById('Subcategory6').value;
        Initial6 = document.getElementById('Initial6').value;
        Debit6 = document.getElementById('Debit6').value;
        Credit6 = document.getElementById('Credit6').value;
        Balance6 = document.getElementById('Balance6').value;
        Time6 = document.getElementById('Time6').value;
        user_ID = document.getElementById('user_ID6').value;
        Order6 = document.getElementById('Order6').value;
        RE6 = document.getElementById('RE6').value;
        Comment6 = document.getElementById('Comment6').value; 

        desc7 = document.getElementById('desc7').value;
        Subcategory7 = document.getElementById('Subcategory7').value;
        Initial7 = document.getElementById('Initial7').value;
        Debit7 = document.getElementById('Debit7').value;
        Credit7 = document.getElementById('Credit7').value;
        Balance7 = document.getElementById('Balance7').value;
        Time7 = document.getElementById('Time7').value;
        user_ID = document.getElementById('user_ID7').value;
        Order7 = document.getElementById('Order7').value;
        RE7 = document.getElementById('RE7').value;
        Comment7 = document.getElementById('Comment7').value; 

        desc8 = document.getElementById('desc8').value;
        Subcategory8 = document.getElementById('Subcategory8').value;
        Initial8 = document.getElementById('Initial8').value;
        Debit8 = document.getElementById('Debit8').value;
        Credit8 = document.getElementById('Credit8').value;
        Balance8 = document.getElementById('Balance8').value;
        Time8 = document.getElementById('Time8').value;
        user_ID = document.getElementById('user_ID8').value;
        Order8 = document.getElementById('Order8').value;
        RE8 = document.getElementById('RE8').value;
        Comment8 = document.getElementById('Comment8').value; 

        desc9 = document.getElementById('desc9').value;
        Subcategory9 = document.getElementById('Subcategory9').value;
        Initial9 = document.getElementById('Initial9').value;
        Debit9 = document.getElementById('Debit9').value;
        Credit9 = document.getElementById('Credit9').value;
        Balance9 = document.getElementById('Balance9').value;
        Time9 = document.getElementById('Time9').value;
        user_ID = document.getElementById('user_ID9').value;
        Order9 = document.getElementById('Order9').value;
        RE9 = document.getElementById('RE9').value;
        Comment9 = document.getElementById('Comment9').value; 

        desc10 = document.getElementById('desc10').value;
        Subcategory10 = document.getElementById('Subcategory10').value;
        Initial10 = document.getElementById('Initial10').value;
        Debit10 = document.getElementById('Debit10').value;
        Credit10 = document.getElementById('Credit10').value;
        Balance10 = document.getElementById('Balance10').value;
        Time10 = document.getElementById('Time10').value;
        user_ID = document.getElementById('user_ID10').value;
        Order10 = document.getElementById('Order10').value;
        RE10 = document.getElementById('RE10').value;
        Comment10 = document.getElementById('Comment10').value; 
        
    }
    document.getElementById('Submit').onclick = function(){

        var user = auth.currentUser;
        var currentUserUid = user.uid;
        var user_role; //user role variable
        var existing_account_number;
        var duplicate_acc_num = false;
        database.ref('/users/' + currentUserUid).once('value').then(function(snapshot){ //go into database
        user_role = snapshot.val().user_type; //gets the user type/role
        if(user_role != "Admin"){ //if not admin
            alert('You do not have the credentials to use this.');
            return; //don't run the code anymore, cancel log in
        }
        else{
            accNum = document.getElementById('accNum').value;//to check acc numbers
            database.ref('/Account/').once('value').then(function(snapshot){
            if(snapshot.exists()){ //if account exists
                snapshot.forEach(childSnapshot => { //for each snapshot of the child of account
                  existing_account_number = childSnapshot.val().accNum; //current account number info
                  if(existing_account_number == accNum){ //if the same
                    console.log(duplicate_acc_num);
                    duplicate_acc_num = true; //marks true, because i can't just send a return here like with user role
                  } //as I need to let the portion below not be bound by this database.ref
                  console.log(duplicate_acc_num);
                });
              }
            if(duplicate_acc_num == true){ //checks for duplicate number
              alert('Duplicate account number found. Try a different number');
            } 
            else{
                Send();
                firebase.database().ref('Account/'+accNum).set({
                    accNum : accNum,
                    desc: desc,
                    Subcategory : Subcategory,
                    Initial: Initial,
                    Debit: Debit,
                    Credit: Credit,
                    Balance: Balance,
                    Time: Time,
                    user_ID: user_ID,
                    Order : Order,
                    RE: RE,
                    Comment1: Comment1,
                
                    desc2: desc2,
                Subcategory2 : Subcategory2,
                Initial2: Initial2,
                Debit2: Debit2,
                Credit2: Credit2,
                Balance2: Balance2,
                Time2: Time2,
                user_ID2: user_ID2,
                Order2 : Order2,
                RE2: RE2,
                Comment2: Comment2,

                desc3: desc3,
                Subcategory3 : Subcategory3,
                Initial3: Initial3,
                Debit3: Debit3,
                Credit3: Credit3,
                Balance3: Balance3,
                Time3: Time3,
                user_ID3: user_ID3,
                Order3 : Order3,
                RE3: RE3,
                Comment3: Comment3,
                
        desc4: desc4,
                Subcategory4 : Subcategory4,
                Initial4: Initial4,
                Debit4: Debit4,
                Credit4: Credit4,
                Balance4: Balance4,
                Time4: Time4,
                user_ID4: user_ID4,
                Order4 : Order4,
                RE4: RE4,
                Comment4: Comment4,

        desc5: desc5,
                    Subcategory5 : Subcategory5,
                    Initial5: Initial5,
                    Debit5: Debit5,
                    Credit5: Credit5,
                    Balance5: Balance5,
                    Time5: Time5,
                    user_ID5: user_ID5,
                    Order5 : Order5,
                    RE5: RE5,
                    Comment5: Comment5,

                    
        desc6: desc6,
                    Subcategory6 : Subcategory6,
                    Initial6: Initial6,
                    Debit6: Debit6,
                    Credit6: Credit6,
                    Balance6: Balance6,
                    Time6: Time6,
                    user_ID6: user_ID6,
                    Order6 : Order6,
                    RE6: RE6,
                    Comment6: Comment6,

        desc7: desc7,
                    Subcategory7 : Subcategory7,
                    Initial7: Initial7,
                    Debit7: Debit7,
                    Credit7: Credit7,
                    Balance7: Balance7,
                    Time7: Time7,
                    user_ID7: user_ID7,
                    Order7 : Order7,
                    RE7: RE7,
                    Comment7: Comment7,

        desc8: desc8,
                    Subcategory8 : Subcategory8,
                    Initial8: Initial8,
                    Debit8: Debit8,
                    Credit8: Credit8,
                    Balance8: Balance8,
                    Time8: Time8,
                    user_ID8: user_ID8,
                    Order8 : Order8,
                    RE8: RE8,
                    Comment8: Comment8,

        desc9: desc9,
                    Subcategory9 : Subcategory9,
                    Initial9: Initial9,
                    Debit9: Debit9,
                    Credit9: Credit9,
                    Balance9: Balance9,
                    Time9: Time9,
                    user_ID9: user_ID9,
                    Order9 : Order9,
                    RE9: RE9,
                    Comment9: Comment9,

        desc10: desc10,
                    Subcategory10 : Subcategory10,
                    Initial10: Initial10,
                    Debit10: Debit10,
                    Credit10: Credit10,
                    Balance10: Balance10,
                    Time10: Time10,
                    user_ID10: user_ID10,
                    Order10 : Order10,
                    RE10: RE10,
                    Comment10: Comment10,

                });
                alert('Account Created')
            } /*End else #1 */
        });/*End firebase database for same account number */
        } /* end else #2*/
    }); /*end firebase database user role*/
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
