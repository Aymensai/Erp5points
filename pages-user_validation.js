let list = document.querySelector(".employee_row");
let user = JSON.parse(localStorage.getItem("user"));
let empl_gen = empl => {
  let row = `
    <tr >
        <td>${empl.id}</td>
        <td class="text-semibold text-dark">
            ${empl.username}
        </td>
        <td class="text-center d-flex align-items-center">
                          <select id="${empl.id}" class="roleUser" style="float: left;">
                            <option value=""></option>
                            <option value="Superviser">Superviser</option>
                            <option value="Employee">Employee</option>
                          </select>
                          <div id="chips${empl.id}" class="badge badge-primary text-wrap chips">${empl.role}</div>
                        </td>
        <td class="text-center">
            <div class="d-flex justify-content-end" id="${empl.id}">
            <button type="button" class="mb-xs mt-xs mr-xs btn btn-success">Validate</button>
            <button type="button" class="mb-xs mt-xs mr-xs btn btn-danger">Refuse</button>
            
            </div>
        </td>
    </tr>
    `;
  list.innerHTML += row;
};
user.forEach(users => {
  empl_gen(users);
});
let role = document.querySelectorAll(".roleUser");

let gen_chpis = (el,id)=>{
    let chips = document.querySelector("#chips"+id);
        
        let chip = `
        <div id="chips${id.id}" class="badge badge-primary text-wrap chips">
        ${el.role}
        </div>
        `;
        chips.innerHTML = chip;
};



let valid = document.querySelectorAll(".btn-success");
valid.forEach(acc => {
  acc.addEventListener("click", e => {
    let id = e.target.parentElement.id;

    for (let i = 0; i < user.length; i++) {
      if (id == user[i].id) {
        if (!user[i].role) {
          alert("Add role");
        //   window.location.reload();
        } else {
          user[i].status = "accepted";
          new PNotify({
            title: 'Success!',
            text: `${user[i].role} accepted.`,
            type: 'success'
        });
        };
        console.log(user[i]);
      };
    };
    localStorage.setItem("user", JSON.stringify(user));
  });
});

let refuse = document.querySelectorAll(".btn-danger");
refuse.forEach(ref => {
  ref.addEventListener("click", e => {
    let id = e.target.parentElement.id;
    for (let i = 0; i < user.length; i++) {
      if (id == user[i].id) {
        user[i].status = "refused";
        new PNotify({
			title: 'Notice',
			text: `refused.`,
			type: 'error'
        });
        user[i].role = "";
        let elem = e.target.parentElement.parentElement.previousElementSibling.children[1];
        elem.classList.add("hide");
        console.log(elem.classList.add("hide"));
        
        gen_chpis(user[i],user[i].id);
        
      }
    }
    localStorage.setItem("user", JSON.stringify(user));
  });
});

role.forEach(el => {
  el.addEventListener("change", e => {
      let post = el.options[el.selectedIndex].value;
      console.log(post);
      let id = e.target.id;
      for (let i = 0; i < user.length; i++) {
        if (id == user[i].id) {
          user[i].role = post;
          let elem = e.target.nextElementSibling;
          if (elem.classList.contains("hide")){
            elem.classList.remove("hide")
          }
          elem = gen_chpis(user[i],user[i].id);
        // console.log(e.target.nextElementSibling);
        
        }
      }
      localStorage.setItem("user", JSON.stringify(user));
    },
    false
  );
});

let list_edit = document.querySelector(".employee_view");
let empl_view_gen = empl => {
  let row = `
      <tr >
          <td>${empl.id}</td>
          <td class="text-semibold text-dark">
              ${empl.username}
          </td>
         
          <td  class="text-center">
              <div id="${empl.id}">
                <i class="fa fa-trash-o trash btn modal-basic" href="#modalHeaderColorPrimary"></i>
                <a href="javascript:myPopup('user-profile.html', 'team','1100','700','300','50')" class="on-default view"><i class="fa fa-eye view"></i></a>
              </div>
          </td>
      </tr>
      `;
  list_edit.innerHTML += row;
};

user.forEach(users => {
  empl_view_gen(users);
});
var idUserTodelete = null;
let del = document.querySelectorAll(".trash");
let affi = document.querySelectorAll(".view");
let confirm = document.querySelector("#modal-confirm");
let cancel = document.querySelector("#modal-cancel");
// let conUser = JSON.parse(localStorage.getItem("connecteduser"));

  list_edit.addEventListener("click", e => {
    let temp_del= [];
    let id = 0;
    if (e.target.classList.contains("trash")){
      
      id = e.target.parentElement.id;
    }
    // console.log(id);
    var u = user.find(us => us.id == id);
    let tr = e.target.parentElement.parentElement.parentElement.rowIndex;
    console.log(e.target.classList.contains("trash"));
    temp_del.push(u);
    temp_del.push(tr);
    // console.log(tr);
    // console.log(temp_del);
    localStorage.setItem("temp_del", JSON.stringify(temp_del));
    if (e.target.classList.contains("view")){
      id = e.target.parentElement.parentElement.id;
      let conUser = user.find(us => us.id == id);
      localStorage.setItem("userId", JSON.stringify(conUser));
    }
    
  });
  function myPopup(url,windowname,w,h,x,y){
    window.open(url,windowname,"resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=n o,width="+w+",height="+h+",left="+x+",top="+y+"");    
}
    
    let temp_del =  JSON.parse(localStorage.getItem("temp_del"));
    
    setInterval(() => {
      
      temp_del =  JSON.parse(localStorage.getItem("temp_del"));
      
    }, 500);
    if (temp_del[0]) {
      confirm.addEventListener("click", el => {
        // el.preventDefault;
        let n = user.filter(w=> w.id != temp_del[0].id);
        user = n;
        let i = temp_del[1] - 1;
        // console.log(temp_del);
        
        // console.log(n);
        
        list_edit.children[i].remove();
        // console.log(list_edit.children[i]);
        
        localStorage.setItem("user", JSON.stringify(user));
        new PNotify({
          title: 'Success!',
          text: 'Employee Removed.',
          type: 'success'
          
        });
        
      });
    };