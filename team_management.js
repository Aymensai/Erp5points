let b_new = document.querySelector("#new_team");
let lead = document.getElementById("team_lead");
let empl = document.querySelector("#employee");
let user = JSON.parse(localStorage.getItem("user"));
let lead_name = document.querySelector(".lead_name");
let team_table = document.querySelector(".team-table");
let emp_name = document.querySelector(".username");
let team_list = document.querySelector("#team_list");
let chips_list = document.querySelector("#chips_list");
let team_name = document.querySelector("#team_name");
let list = [];
let sup = [];
let id_t = Math.floor(Math.random() * 1000);

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

let gen_chpis = el => {
  if (el) {
    let chip = `
        <div class="chip">
        ${el.username}
        <span class="closebtn btn" onclick="this.parentElement.style.display='none'">&times;</span>
        </div>
        `;
    chips_list.innerHTML += chip;
  } else {
    chips_list.innerHTML = "";
  }
};


let row_gen = document.querySelector("#row_gen");
let table = document.querySelector("#table");

let empl_gen = (emp, team_id) => {
  const team_body = document.querySelector("#team_list_" + team_id);
  let row = `
        <tr>
            <td>${emp.id}</td>
            <td></td>
            <td></td>
            <td class="username">${emp.username}</td>
            <td>${emp.role}</td>
        </tr> 
    `;
  team_body.innerHTML += row;
};
let gen_team = tab => {
  let row = `
    
  <div class="row">
    <div id="table" class="col-md">
        <section class="panel">
            <header class="panel-heading">
                <div class="panel-actions">
                    <a href="#" class="fa fa-caret-down"></a>
                    <a href="#" class="fa fa-times"></a>
                </div>
                <div>
                    <span class="panel-title"># ${id_t}</span>
                    <span id="t_name" class="panel-title">Team Name</span>
                </div>
            </header>
            <div class="panel-body">
                <div class="table-responsive">
                    <table class="table mb-none">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody id="team_list_${tab[0].id}">
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
  </div>
  
    `;
  return row;
};

// user.forEach(em => {

//   gen_team(em);
// });
lead.addEventListener(
  "change",
  () => {
    emp_name.innerText = lead.options[lead.selectedIndex].text;
    let on = user.find(x => x.username == emp_name.innerText);
    sup.push(on);

    gen_chpis(on);
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
    emp_name.innerText = empl.options[empl.selectedIndex].text;
    let one = user.find(x => x.username == emp_name.innerText);
    // empl_gen(one);
    list.push(one);

    gen_chpis(one);
    let close = document.querySelectorAll(".closebtn");
    empl.remove(empl.selectedIndex);
    close.forEach((butt, i) => {
      butt.addEventListener("click", e => {
        // console.log(i);

        if (e.target) {
          let ch = e.target.parentElement.innerText;
          let name = ch.split("");
          let f = name.filter(x => x != " ");
          console.log(f);

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
team_name.addEventListener("submit",e=>{
    e.preventDefault();
    let name = team_name.name.value;
    // console.log(gen_chpis());
    // if(){
    //     alert("select user");
    // };
    let t = document.createElement("li");
  // console.log(list);
  // console.log(sup);
  t.innerHTML = gen_team(sup);
  row_gen.prepend(t);
  list.unshift(sup[0]);
  console.log(sup);

  setTimeout(() => {
    list.forEach(user => {
      empl_gen(user, list[0].id);
      user.team_id = id_t;
    });
  }, 10);
  user.forEach(us => {
    if (us.username == sup[0].username) {
      us.team_id = sup[0].team_id;
    }
    if (us.username == list.username) {
      us.team_id = list.team_id;
    }
  });
  let t_name = document.querySelector("#t_name");
  t_name.innerText = name;
  let team = {
      team_id: id_t,
      team_name: t_name.innerText
  };
  let teams = JSON.parse(localStorage.getItem("teams")) || [];
  teams.push(team);
  setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("teams", JSON.stringify(teams));
  }, 10);
  setTimeout(() => {
    list = [];
    sup = [];
    gen_chpis(null);
  }, 100);

    
});
