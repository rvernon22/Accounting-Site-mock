const firebaseConfig = {
  //private credentials
};
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Initialize variables
    const auth = firebase.auth()
    const database = firebase.database()
    const storageReference = firebase.storage().ref(); //NOTE: The ref is already created do not do it again
    var debit=1;
    var credit=1;
    var value=0;
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    database.ref('11hSjfq7vT6GsIhA38o_KcJeKJCylID93ee-29OiGxUc/Cash_Account/1/Debit').once('value').then(function(snapshot){ //go into database
        value= snapshot.val().Debit;
        console.log(Value);
        debit= debit+Value;
        
      });
      console.log(debit);
    function drawChart() {
        database.ref('11hSjfq7vT6GsIhA38o_KcJeKJCylID93ee-29OiGxUc/Cash_Account/1/Debit').once('value').then(function(snapshot){ //go into database
            Value= snapshot.val().Debit;
            console.log(Value);
            debit= debit+Value;
            var piechart = google.visualization.arrayToDataTable([
                ['Finances', 'Amount'],
                ['Credit',     credit],
                ['Debit',      debit],
              ]);
        
              var options = {
                title: 'My Finances',
                pieHole: 0.4,
              };
        
              var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
              chart.draw(piechart, options);
          });
    }
