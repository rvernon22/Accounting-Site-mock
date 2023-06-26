const firebaseConfig = {
  //private credentials
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
