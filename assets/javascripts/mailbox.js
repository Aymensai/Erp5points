function mail() {
    var users= JSON.parse(localStorage.getItem('connecteduser')) || "";
    var text= JSON.parse(localStorage.getItem('reclamations')) || [];
    var name=users.Nom;
    var Prenom=users.Prenom;

    for (let i = 0; i < text.length; i++) {
       var ul = document.getElementById("ul-reclam");
 
        if (users.id==text[i].user) {
          var html=`<li class="unread">
          <a onclick="transit(${text[i].id})">
          <div class="col-sender">
          <div class="checkbox-custom checkbox-text-primary ib">
          <input type="checkbox" id="mail1">
          <label for="mail1"></label>
          </div>
          <p class="m-none ib" id="name">${name+" "+Prenom}</p>
          </div>
          <div class="col-mail">
          <p class="m-none mail-content">
          <span class="subject" id="subject-${text[i].id}">${text[i].txt}</span>
          <span class="mail-partial" id="subjects">${text[i].txt}</span>
          </p>
          <p class="m-none mail-date"></p>
          </div>
          </a>
          </li>  `
          ul.innerHTML+=html;
           
    }  
}
}

function transit(id) {
    
    localStorage.setItem("current-reclam", JSON.stringify(id));
    window.location.href="mailbox.mail.html";
   
    
}
function checkmail() {
    
    var id=JSON.parse(localStorage.getItem('current-reclam')) || "";
    var users= JSON.parse(localStorage.getItem('connecteduser')) || "";
    var text= JSON.parse(localStorage.getItem('reclamations')) || [];
    let s = text.find(w => w.id == id);
    let i = text.indexOf(s);
    
    var name=users.Nom;
    var Prenom=users.Prenom;
    var div = document.getElementById('divreclam');
    if (users.id==text[i].user) {
    var html= `
   <div class="mailbox-email-header mb-lg">
   <h3 class="mailbox-email-subject m-none text-light">
   
   </h3>
   <p class="mt-lg mb-none text-md" id="name"> From ${name+" "+Prenom}</p>
   </div>
   <div class="mailbox-email-container">
   <div class="mailbox-email-screen">
   <div class="panel">
   <div class="panel-heading">
   <div class="panel-actions">
   <a href="#" class="fa fa-caret-down"></a>
   <a href="#" class="fa fa-mail-reply"></a>
   <a href="#" class="fa fa-mail-reply-all"></a>
   <a href="#" class="fa fa-star-o"></a>
    </div>
   <p class="panel-title" id="">${name+" "+Prenom} <i class="fa fa-angle-right fa-fw"></i> You</p>
   </div>
   <div class="panel-body">
   
   <p>${text[i].txt}</p>
 
   </div>
   <div class="panel-footer">
   <button id="modal-confirm" class="btn btn-primary modal-confirm">Resolu</button>
  
   </div>
   </div>
   </div>
</div>
`
    div.innerHTML+=html;
}
}
