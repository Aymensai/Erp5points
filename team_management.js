let b_new = document.querySelector("#new_team");
let lead = document.getElementById("team_lead");
let empl = document.querySelector("#employee");
let user = JSON.parse(localStorage.getItem("user"));
let lead_name = document.querySelector(".lead_name");
let emp_name = document.querySelector(".username");
let team_list = document.querySelector("#team_list");

let gen_lead = sel => {
  if (sel.role == "Superviser") {
    let sv = document.createElement("option");
    sv.text = sel.username;
    lead.add(sv);
  }
};
user.forEach(le => {
  gen_lead(le);
});
let gen_emp = sel => {
  if (sel.role == "Employee") {
    let sv = document.createElement("option");
    sv.text = sel.username;
    empl.add(sv);
  }
};
user.forEach(em => {
  gen_emp(em);
});

let row_gen = document.querySelector("#row_gen");
let table = document.querySelector("#table");

let empl_gen = emp => {
  let row = `
    <tr>
  <td>${emp.id}</td>
  <td></td>
  <td></td>
  <td class="username">${emp.username}</td>
  <td class="actions-hover">
<a href="#"><i class="fa fa-pencil"></i></a>
<a href="#" class="delete-row"><i class="fa fa-trash-o"></i></a>
</td>
  </tr>
    `;
  team_list.innerHTML += row;
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
  <h4></h4>
  <h2 class="panel-title">Team Lead</h2>
  <span class="lead_name panel-title"></span>
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
  <th>Actions</th>
  </tr>
  </table>
  </div>
  </div>
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
    lead_name.innerText = lead.options[lead.selectedIndex].text;
    lead.remove(lead.selectedIndex);
  },
  false
);

empl.addEventListener(
  "change",
  () => {
    emp_name.innerText = empl.options[empl.selectedIndex].text;
    let one = user.find(x => x.username == emp_name.innerText);
    empl_gen(one);
    empl.remove(empl.selectedIndex);
  },
  false
);

b_new.addEventListener("click", () => {
  let t = document.createElement("li");
  t.innerHTML = gen_team();
  row_gen.prepend(t);
});
