let user = JSON.parse(localStorage.getItem("user"));
let teams = JSON.parse(localStorage.getItem("teams"));

let id_t = Math.floor(Math.random() * 1000);

let team_name = document.querySelector(".team_name");
let nameTeam = document.querySelector("#team-name")
let mod = document.querySelector("#mod");
let chips_employee = document.querySelector("#chips_employee");
let chips_lead = document.querySelector("#chips_lead");
let lead = document.querySelector("#team_lead");
let empl = document.querySelector("#employee");

let list = [];
let sup = [];

let gen_lead = sel => {
    if (sel.role == "Superviser" && !sel.team_id) {
      let sv = document.createElement("option");
      sv.text = sel.username;
      lead.add(sv);
    }
  };
  user.forEach(le => {
    gen_lead(le);
  });
  let gen_emp = sel => {
    if (sel.role == "Employee" && !sel.team_id) {
      let sv = document.createElement("option");
      sv.text = sel.username;
      empl.add(sv);
    }
  };
  user.forEach(em => {
    gen_emp(em);
  });
  

  let gen_chpis_sup = el => {
    if (el) {
      let chip = `
          <span class="chip">
          ${el.username}
          <span class="closebtn btn" onclick="this.parentElement.style.display='none'">&times;</span>
          </span>
          `;
      chips_lead.innerHTML += chip;
    } else {
      chips_lead.innerHTML = "";
    }
  };
  let gen_chpis_empl = el => {
    if (el) {
      let chip = `
          <span class="chip">
          ${el.username}
          <span class="closebtn btn" onclick="this.parentElement.style.display='none'">&times;</span>
          </span>
          `;
      chips_employee.innerHTML += chip;
    } else {
      chips_employee.innerHTML = "";
    }
  };

  lead.addEventListener(
    "change",
    () => {
      let sup_name = lead.options[lead.selectedIndex].text;
      let on = user.find(x => x.username == sup_name);
      sup.push(on);
  
      gen_chpis_sup(on);
      let close = document.querySelectorAll(".closebtn");
      lead.remove(lead.selectedIndex);
      close.forEach(butt => {
        butt.addEventListener("click", e => {
          if (e.target) {
            let option = document.createElement("option");
            option.text = on.username;
            lead.add(option);
          }
          if (sup.find(w => w.username == on.username)) {
            n = sup.filter(x => x.username != on.username);
            sup = n;
          }
        });
      });
      let new_list = [...new Set(sup)];
      sup = new_list;
      // console.log(sup);
    },
    false
  );
  
  empl.addEventListener(
    "change",
    () => {
      let empl_name = empl.options[empl.selectedIndex].text;
      let one = user.find(x => x.username == empl_name);
      // empl_gen(one);
      list.push(one);
  
      gen_chpis_empl(one);
      let close = document.querySelectorAll(".closebtn");
      empl.remove(empl.selectedIndex);
      close.forEach((butt) => {
        butt.addEventListener("click", e => {
          // console.log(i);
  
          if (e.target) {
            let ch = e.target.parentElement.innerText;
            let name = ch.split("");
            let f = name.filter(x => x != " ");
            // console.log(f);
  
            f.shift();
            for (let i = 0; i < 3; i++) {
              f.pop();
            }
            let l = f.join("");
            if (list.find(w => w.username == l)) {
              n = list.filter(x => x.username != l);
              list = n;
            }
            // console.log(list.find(w=>w.username ==l));
  
            let option = document.createElement("option");
            option.text = l;
            empl.add(option);
          }
        });
      });
      // console.log(list);
      let new_list = [...new Set(list)];
      // console.log(new_list);
      list = new_list;
    },
    false
  );
  nameTeam.addEventListener("submit",e=>{
    //   e.preventDefault();
      let name = nameTeam.name.value;
      list.unshift(sup[0]);
      console.log(sup);
      console.log(list);
  
    let team = {
        team_id: id_t,
        team_name: name
    };
      list.forEach(user => {
        user.team_id = id_t;
      });
    let teams = JSON.parse(localStorage.getItem("teams")) || [];
    teams.push(team);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("teams", JSON.stringify(teams));
    setTimeout(() => {
      list = [];
      sup = [];
      gen_chpis_empl(null);
      gen_chpis_sup(null);
    }, 100);
  
      
  });
  

let gen_name = name =>{
    let row = `
    
    <tr class="gradeA">
    <td class="idteam">${name.team_id}</td>
    <td><a href="javascript:myPopup('team_edit copy.html', 'team','700','600','500','50')">${name.team_name}</a></td>
    <td style="display: none;"></td>
    <td class="actions">
    <a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>
    <a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>
    <a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
    <a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
    </td>
    </tr>
    `;
    team_name.innerHTML += row;
}
teams.forEach(team=>{
    gen_name(team);
});

team_name.addEventListener("click", e=>{
    let id = e.target.parentElement.previousElementSibling.innerText;
    
      localStorage.setItem("currId", JSON.stringify(id));
})

function myPopup(url,windowname,w,h,x,y){
    window.open(url,windowname,"resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=n o,width="+w+",height="+h+",left="+x+",top="+y+"");    
}


let del = document.querySelectorAll(".remove-row");
let conf = document.querySelector("#dialogConfirm")
del.forEach(d=>{
    d.addEventListener("click", e=>{
        let id = e.target.parentElement.parentElement.parentElement.children[0].textContent;
        let id_t = teams.find(w=>w.team_id == id);
        let temp=id_t;
        console.log(temp);
        localStorage.setItem("temp", JSON.stringify(temp));
    })
})
conf.addEventListener('click',()=>{
    let temp = JSON.parse(localStorage.getItem("temp"));
    console.log(temp);
    let noTeam = user.filter(w=>w.team_id == temp.team_id);
    console.log(noTeam);
    noTeam.forEach(u=> {u.team_id = "";})
    
    // teams = temp;
    teams = teams.filter(t=>t.team_id != temp.team_id);

    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem("user", JSON.stringify(user));

})