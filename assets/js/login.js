function login() {
  // Define Variables
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  
  // Login Event if Button Clicked
  btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    
    // Sign In
    //Checks with the firebase
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => window.alert(e.message));
    loginTimeout();
  });


  // Login Event if Enter is Pressed  
  var btnDown = document.getElementById("txtPassword");
  btnDown.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => window.alert(e.message));   
      loginTimeout();
    }
  });
}

// Login Timer
function loginTimeout() {
  var timer = setTimeout(confirmedLogin, 1000);
}

//Confirming Login After Stored in User Storage
function confirmedLogin() {
    firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
      //Page redirect
      window.open("dashboard.html", "_self");
      //Display btnLogout if Login
      //btnLogout.classList.remove('hide');
    } else {
      //Error Alert
      window.alert('Error, Login Not Successful. Try Again.');
      //No Display btnLogout if Logout
      //btnLogout.classList.add('hide');
      }
      
    });
  
}

function signUp() {
  //Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnSignUp = document.getElementById('btnSignup');

  // Signup Event if Button Clicked 
  btnSignUp.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // SignUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => window.alert(e.message));
    signUptimeout();
  });
  
  // Signup Event if Enter is Pressed 
  txtPassword.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      // SignUp
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => window.alert(e.message));
      signUptimeout();
    }
  });
}


// Signup Timer
function signUptimeout() {
  var timer = setTimeout(confirmedSignUp, 1000);
}

//Confirming Signup After Stored in User Storage
function confirmedSignUp() {
  firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser) {
      //Page redirect
      window.open("acc-create.html", "_self");
      //Display btnLogout if Login
      //btnLogout.classList.remove('hide');
    } else {
      //Error Alert
      window.alert('Error, Sign Up Not Successful. Try Again.');
      //No Display btnLogout if Logout
      //btnLogout.classList.add('hide');
    }
  });
}

function createProfile(){
  // Initializes Variables (includes current user, display name, profile image, etc.)
  var user = firebase.auth().currentUser;
  var id = user.uid;
  var name = document.getElementById("profileName").value;
  var bio = document.getElementById("profileBio").value;
  
  // Sets Bio
  firebase.database().ref('users/' + id + "/").set({
      bio: bioIn,
    });

  //Firebase Update Profile
  user.updateProfile({
    displayName: name,
  }).then(function() { 
    
    // Creation Successful
    // Page Relocation
    window.location="dashboard.html";
  }, function(error) {
    // An error happened.
  });
}