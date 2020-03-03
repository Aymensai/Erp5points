function login() {
  var object = JSON.parse(localStorage.getItem("user")) || [];
  var username = document.getElementById("username").value;
  var pwd = document.getElementById("password").value;
  var error = document.getElementById("error");
  
  var connect = false;
  var connecteduser;
 
 
  const user = object.find(u => u.username === username);
  if (!user) {
    error.innerText = 'user not found';
  } else {
    if (user.password !== pwd) {
      error.innerText = 'wrong password';
    } else if (user.status !== 'accepted') {
      error.innerText = 'you can not login';
    } else {
      connect = true;
      connecteduser = user;
    }
  }

  if (connect == true) {
    localStorage.setItem("connecteduser", JSON.stringify(connecteduser));
    window.location.href = "User-Profile.html";
  }   

  
}



