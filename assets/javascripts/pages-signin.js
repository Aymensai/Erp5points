function login() {
  var object = JSON.parse(localStorage.getItem("user")) || [];
  var user = document.getElementById("username").value;
  var pwd = document.getElementById("password").value;
  
  var connect = false;
  var connecteduser;
 
 
  for (let i = 0; i < object.length; i++) {
    if (object[i].username == user && object[i].password == pwd) {
      connect = true;
      connecteduser = object[i]; 
      
    }
  }
  if (connect == true) {
   
    localStorage.setItem("connecteduser", JSON.stringify(connecteduser));
    window.location.href = "User-Profile.html";
  }   

}


