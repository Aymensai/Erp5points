var img = "";

function openFile(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        img = reader.result;
        console.log(img);

    };
    reader.readAsDataURL(input.files[0]);

}
//
function Uinformation() {
    
    var text= JSON.parse(localStorage.getItem('connecteduser')) || "";
    var Nom=document.getElementById('Nom');
    var Prenom=document.getElementById('Prenom');
    var Adresse=document.getElementById('Adresse');
    var Tel=document.getElementById('Tel');
    var Poste=document.getElementById('Poste');
    

  
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
function reclam() {
    var owner = JSON.parse(localStorage.getItem("connecteduser"))|| ""; 
    var txt=document.getElementById('txt');
    var reclamations=JSON.parse(localStorage.getItem("reclamations")) || [];
    var id= Math.floor(Math.random() * 1000); 
var objet = {
id:id,
user:owner.id,
txt:txt.value

}
    reclamations.push(objet);
    localStorage.setItem('reclamations', JSON.stringify(reclamations));
}


 function reclamation() {
     
  var owner=JSON.parse(localStorage.getItem("reclamations")) || [];
  var id=JSON.parse(localStorage.getItem("connecteduser")).id;
   
   

    for (let i = 0; i < owner.length; i++) {
      
        
     if (owner[i].user==id) {
        var node = document.createElement("li");
        var textnode =  document.createTextNode(owner[i].txt);
          var reclam =document.getElementById("Reclam");
    
   
    node.appendChild(textnode);
    reclam.appendChild(node);
    
    
}
 }
 
} 
