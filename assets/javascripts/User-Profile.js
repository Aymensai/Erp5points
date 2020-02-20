
function Uinformation() {
    
    var text= JSON.parse(localStorage.getItem('connecteduser')) || "";
    var Nom=document.getElementById('Nom');
    var Prenom=document.getElementById('Prenom');
    var Adresse=document.getElementById('Adresse');
    var Tel=document.getElementById('Tel');
    var Poste=document.getElementById('Poste');
  
var email = document.getElementById("email");
  
    var text = {
        id: text.id,
      role: "",
      status: "",
      username: text.username,
      password: text.password,
      email: text.email,
 Nom:Nom.value,
 Prenom:Prenom.value,
 Adresse:Adresse.value,
 Poste:Poste.value,
 Tel:Tel.value,

       }
       console.log(text);
       
    
 
 localStorage.setItem('connecteduser', JSON.stringify(text));
 }
 function Pinformation() {
    var user=JSON.parse(localStorage.getItem('connecteduser')) || "";

    document.getElementById('displayname').innerHTML=user.Nom;
    document.getElementById('mail').innerHTML=user.email;
    document.getElementById('displayprenom').innerHTML=user.Prenom;
    document.getElementById('Poccupe').innerHTML=user.Poste;
    document.getElementById('adresse').innerHTML=user.Adresse;
    document.getElementById('Numero').innerHTML=user.Tel;
   
   
 }
    
