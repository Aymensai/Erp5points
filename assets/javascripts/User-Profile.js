var imgFile = "";
let users = JSON.parse(localStorage.getItem("user"));

function openFile(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function() {
    imgFile = reader.result;
    console.log(imgFile);
  };
  reader.readAsDataURL(input.files[0]);
}

function Uinformation() {
  var Nom = document.getElementById("Nom");
  var Prenom = document.getElementById("Prenom");
  var Adresse = document.getElementById("Adresse");
  var Tel = document.getElementById("Tel");
  var Poste = document.getElementById("Poste");
  var image = document.getElementById("image");
  let id = JSON.parse(localStorage.getItem("connecteduser")).id;
  console.log(image);
  
  
  let user = users.find(w=>w.id == id);
  let i = users.indexOf(user);
    user.Nom = Nom.value;
    user.Prenom = Prenom.value;
    user.Adresse = Adresse.value;
    user.Poste = Poste.value;
    user.Tel = Tel.value;
    user.img = image
    users[i] = user;
    localStorage.setItem("connecteduser", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(users));

  // var text = {
  //   id: text.id,
  //   team_id: "",

  //   role: "",
  //   status: "",
  //   img: "",
  //   username: text.username,
  //   password: text.password,
  //   email: text.email,
  //   Nom: Nom.value,
  //   Prenom: Prenom.value,
  //   Adresse: Adresse.value,
  //   Poste: Poste.value,
  //   Tel: Tel.value
  // };

}
function Pinformation() {
  var user = JSON.parse(localStorage.getItem("connecteduser")) || "";

  document.getElementById("displayname").innerHTML = user.Nom;
  document.getElementById("mail").innerHTML = user.email;
  document.getElementById("displayprenom").innerHTML = user.Prenom;
  document.getElementById("Poccupe").innerHTML = user.Poste;
  document.getElementById("adresse").innerHTML = user.Adresse;
  document.getElementById("Numero").innerHTML = user.Tel;
}
function reclam() {
  var owner = JSON.parse(localStorage.getItem("connecteduser")) || "";
  var txt = document.getElementById("txt");
  var reclamations = JSON.parse(localStorage.getItem("reclamations")) || [];
  var id = Math.floor(Math.random() * 1000);
  var objet = {
    id: id,
    user: owner.id,
    Recstatus: "Unresolved",
    txt: txt.value
  };
  reclamations.push(objet);
  for (let i = 1; i < reclamations.length; i++) {
    if(reclamations[i-1].txt == reclamations[i].txt){
      reclamations.pop();
    }
    
  }
  localStorage.setItem("reclamations", JSON.stringify(reclamations));
}

function reclamation() {
  var owner = JSON.parse(localStorage.getItem("reclamations")) || [];
  var id = JSON.parse(localStorage.getItem("connecteduser")).id;

  for (let i = 0; i < owner.length; i++) {
    if (owner[i].user == id) {
      var node = document.createElement("li");
      var textnode = document.createTextNode(owner[i].txt);
      var reclam = document.getElementById("Reclam");

      node.appendChild(textnode);
      reclam.appendChild(node);
    }
  }
}
function profile() {
  var user = JSON.parse(localStorage.getItem("connecteduser")) || "";
  var name = user.Nom;
  var Prenom = user.Prenom;
  document.getElementById("Pname").innerHTML = name + " " + Prenom;
  document.getElementById("Pposte").innerHTML = user.Poste;
  document.getElementById("sname").innerHTML = name + " " + Prenom;
  document.getElementById("sPoste").innerHTML = user.Poste;
}

function loadFile() {
  var img = JSON.parse(localStorage.getItem("connecteduser")).img;
  document.getElementById("image").src = img;
  document.getElementById("im").src = img;
}
function Users() {
  var user = JSON.parse(localStorage.getItem("user")) || [];
  var connecteduser = JSON.parse(localStorage.getItem("connecteduser")) || "";
  let s = user.find(w => w.id == connecteduser.id);
  let i = user.indexOf(s);
  user[i] = connecteduser;
  localStorage.setItem("user", JSON.stringify(user));
}
function imgfun() {
  var connecteduser = JSON.parse(localStorage.getItem("connecteduser")) || "";

  connecteduser.img = imgFile;

  localStorage.setItem("connecteduser", JSON.stringify(connecteduser));
  window.location.reload();
}

function con_user() {
  var cur = JSON.parse(localStorage.getItem("user")) || [];
  var current_user = JSON.parse(localStorage.getItem("current_user")) || "";
  let s = cur.find(w => w.id == current_user);

  document.getElementById("displayname").innerHTML = s.Nom;
  document.getElementById("mail").innerHTML = s.email;
  document.getElementById("displayprenom").innerHTML = s.Prenom;
  document.getElementById("Poccupe").innerHTML = s.Poste;
  document.getElementById("adresse").innerHTML = s.Adresse;
  document.getElementById("Numero").innerHTML = s.Tel;
  document.getElementById("image").src = s.img;
  var name = s.Nom;
  var Prenom = s.Prenom;
  document.getElementById("Pname").innerHTML = name + " " + Prenom;
  document.getElementById("Pposte").innerHTML = s.Poste;
}
function profilee() {
  var user = JSON.parse(localStorage.getItem("connecteduser")) || "";
  var name = user.Nom;
  var Prenom = user.Prenom;

  document.getElementById("sname").innerHTML = name + " " + Prenom;
  document.getElementById("sPoste").innerHTML = user.Poste;
}
function loadimg() {
  var img = JSON.parse(localStorage.getItem("connecteduser")).img;

  document.getElementById("im").src = img;
}
