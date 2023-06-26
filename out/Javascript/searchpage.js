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

  const dbreference = database.ref('accounts/'); //database reference

  //create search function here

  function search() {

    search_query = document.getElementById('search_bar').Value; 
    const docRef = doc(dbreference, 'accounts', search_query); //grabs a single item from the 'accounts' collection using the search_query

    getDoc(docRef)
      .then((doc) => {
        console.log(doc.data(), doc.id)
      })

  }