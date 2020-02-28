var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");
var confirm=document.getElementById("confirm");
function newuser() {
  var neww = JSON.parse(localStorage.getItem("user")) || [];

  var userid = Math.floor(Math.random() * 1000);

  if (username.value == "" && password.value == "" && email.value == "" ) {
    alert("You must write something!");
  } else if (password.value!=confirm.value) { 
    alert('Verifiez Votre MDP!')
  } else{
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
    window.location.href = "pages-signin.html";
  } 
}

