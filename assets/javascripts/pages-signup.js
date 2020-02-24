var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");

function newuser() {
  var neww = JSON.parse(localStorage.getItem("user")) || [];

  var userid = Math.floor(Math.random() * 1000);

  if (username.value === "" && password.value == "" && email.value == "") {
    alert("You must write something!");
  } else {
    var text = {
      id: userid,
      team_id:"",
      
      role: "",
      status: "",
      username: username.value,
      password: password.value,
      email: email.value,
      Nom:"",
      Prenom:"",
      Adresse:"",
      Poste:"",
      Tel:"",
      img:"",
    };
    neww.push(text);

    localStorage.setItem("user", JSON.stringify(neww));
  }
}

