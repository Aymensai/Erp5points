function mail() {
    var users= JSON.parse(localStorage.getItem('user')) || [];
    var text= JSON.parse(localStorage.getItem('reclamations')) || [];
  

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < users.length; j++) {
           
            
      
       var ul = document.getElementById("ul-reclam");
       var name=users[j].Nom;
       var Prenom=users[j].Prenom;
       if (users[j].id==text[i].user) {
           
      
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
          
          </p>
          <p class="m-none mail-date"></p>
          </div>
          </a>
          </li>  `
          ul.innerHTML+=html;
        }
        }
} 
}

function transit(id) {
    
    localStorage.setItem("current-reclam", JSON.stringify(id));
    window.location.href="mailbox.mail.html";
   
    
}
function checkmail() {
    
    var id=JSON.parse(localStorage.getItem('current-reclam')) || "";
    var users= JSON.parse(localStorage.getItem('user')) || [];
    var text= JSON.parse(localStorage.getItem('reclamations')) || [];
    let s = text.find(w => w.id == id);
    let i = text.indexOf(s);
    let u =users.find(x => x.id==s.user);
    let j =users.indexOf(u);
   
    var div = document.getElementById('divreclam');
    
    
    if (users[j].id==text[i].user) {
        if (text[i].Recstatus=="Unresolved") {
            var html= `
   <div class="mailbox-email-header mb-lg">
   <h3 class="mailbox-email-subject m-none text-light">
   
   </h3>
   <p class="mt-lg mb-none text-md" id="name"> From ${users[j].Nom}</p>
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
   <p class="panel-title" id="">${users[j].Nom} <i class="fa fa-angle-right fa-fw"></i> You</p>
   </div>
   <div class="panel-body">
   
   <p>${text[i].txt}</p>
   <i class="fa fa-times"></i>
   </div>
   <div class="panel-footer">
   <button id="resolve" class="btn btn-primary modal-confirm" onclick="resolve()">Resolu</button>
  
   </div>
   </div>
   </div>
</div>
`
        } else if (text[i].Recstatus=="resolved") {
            var html= `
   <div class="mailbox-email-header mb-lg">
   <h3 class="mailbox-email-subject m-none text-light">
   
   </h3>
   <p class="mt-lg mb-none text-md" id="name"> From ${users[j].Nom}</p>
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
   <p class="panel-title" id="">${users[j].Nom} <i class="fa fa-angle-right fa-fw"></i> You</p>
   </div>
   <div class="panel-body">
   
   <p>${text[i].txt}</p>
   <i class="fa fa-check-square"></i>
   </div>
   <div class="panel-footer">
   <button id="resolve" class="btn btn-primary modal-confirm" onclick="resolve()">Resolu</button>
  
   </div>
   </div>
   </div>
</div>
`
        }
    
    div.innerHTML+=html;
}
}

function resolve() {
  
    var rec = JSON.parse(localStorage.getItem("reclamations")) || [];
    var reclams = JSON.parse(localStorage.getItem("reclamations")) || [];
    var current_reclam=JSON.parse(localStorage.getItem('current-reclam')) || "";
    let s = reclams.find(w => w.id == current_reclam);
    let i = reclams.indexOf(s)
   
    s.Recstatus="resolved"
    rec[i]=s;
    localStorage.setItem('reclamations', JSON.stringify(rec));
   
   
   
 
    
}
