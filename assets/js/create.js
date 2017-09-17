var ref = new Firebase("https://lance-2233d.firebaseio.com");

function create(body, title) {
 
  description = document.getElementById('textbox').value;
  title = document.getElementById('title').value;
  client = document.getElementById('client').value;
  duedate = document.getElementById('duedate').value;
  wage = document.getElementById('wage').value;
  var seconds = 0 - Math.round(new Date().getTime() / 1000);

 
  firebase.database().ref('posts/' + seconds).set({
    
    title: title,
    client: client,
    description: description,
    duedate: duedate,
    wage: wage, 
    
    
  }, function() {
      location.reload();
  });
}



function view(){
    var ref = firebase.database().ref('posts/');
    ref.on('value', gotData, errData);

    function gotData(data) {
        console.log(data);
    }
    
    function errData(err) {
     console.log("Error!");
     console.log(err);
    }
}
 
 
 /////////////////////////////////////////////////////////

firebase.database().ref("/posts").once("value", function(snapshot) {
  var postCounter = 0;
  
  snapshot.forEach(function(childSnapshot) {
    var data = childSnapshot.val();
    var key = childSnapshot.key;
    var title = JSON.stringify(data.title);
    var titleParse = JSON.parse(title);
    var body = JSON.stringify(data.body);
    var bodyParse = JSON.parse(body);
    var date = JSON.stringify(data.date);
    var dateParse = JSON.parse(date);
    var profileName = JSON.stringify(data.userName);
    var profileNameParse = JSON.parse(profileName);
    var profilePhoto = JSON.stringify(data.userPhoto);
    var profilePhotoParse = JSON.parse(profilePhoto);
    var country = JSON.stringify(data.country);
    var countryParse = JSON.parse(country);
    
    var length = data.tag.length;
    var tags = "Tags: "
    
    for(var t = 0; t < length; t++){
              
      if(t == length - 1){
        var s = JSON.stringify(data.tag[t]);
        var p = JSON.parse(s);
        tags += "#" + p;
      } else {
        var s = JSON.stringify(data.tag[t]);
        var p = JSON.parse(s);
        console.log(p);
        tags += "#" + p + ", ";
      }
    }
    
    var storage = firebase.storage();
    var pathReference = storage.ref(profilePhotoParse);
      
    //console.log(postCounter)
    
    var i = postCounter;
    
    pathReference.getDownloadURL().then(function(url) {
      //JQuerry used to give ID to space in which data is displayed
      $("#data").append("<div class='index-post'> <h3>" + titleParse + "</h3>" + "<p>" + bodyParse + "</p>" + "<p>" + dateParse + " in " + countryParse  + "</p>" + "<p>" + tags + "</p>" + "<p class='right'> <img class='imgPost' id='imgPost" + i + "'></img>" + profileNameParse  + "</p> </div>");

      $("#imgPost" + i).attr("src", url);
    }).catch(function(error) {
      
    });
    
    postCounter++;
  })
})