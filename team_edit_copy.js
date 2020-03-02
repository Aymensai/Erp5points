let user = JSON.parse(localStorage.getItem("user"));
let teams = JSON.parse(localStorage.getItem("teams"));
let teamId = JSON.parse(localStorage.getItem("currId"));
let addUser = document.querySelector("#addUser");

let team_row = document.querySelector(".team_body")
let gen_team = team =>{
    

    let row = `
    
    <tr class="gradeX">
    <td class="idteam">${team.id}</td>
    <td>${team.username}
    <select id="employ" class="hide">
    <option value=""></option>
    </select>
    </td>
    <td class="roleU">${team.role}</td>
    <td class="actions">
    <a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>
    <a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>
    <a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
    <a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
    </td>
    </tr>
    
    `;
    team_row.innerHTML += row;
    
};
    
let curr_team = user.filter(w=>w.team_id == teamId);
curr_team.forEach(curr=>{
    gen_team(curr);
});
let empl = document.querySelector("#employee");

let gen_emp = sel => {
    if (sel.role == "Employee" && !sel.team_id) {
      let sv = document.createElement("option");
      sv.text = sel.username;
      empl.add(sv);
    }
  };

addUser.addEventListener("click",e=>{
    let el = e.target.parentElement.children[1];
    el.classList.remove("hide");
    user.forEach(e=>{
        gen_emp(e);
    });
});


let gen_new_emp = team =>{
    

    let row = `
    <td class="idteam">${team.id}</td>
    <td>${team.username}</td>
    <td class="roleU">${team.role}</td>
    <td class="actions">
    <a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>
    <a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>
    <a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
    <a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
    </td>
    `;
    return row;
};
empl.addEventListener(
    "change",
    () => {
        let emp_name = empl.options[empl.selectedIndex].text;
        let one = user.find(x => x.username == emp_name);
        let id = one.id
        one.team_id = teamId
        console.log(one);
        i = user.indexOf(one);
        user[i] = one;
        localStorage.setItem("user", JSON.stringify(user));
        
      new_emp = document.createElement("tr");
      new_emp.setAttribute("id", "newEmp"+id);
      new_emp.innerHTML = gen_new_emp(one);
      
      team_row.append(new_emp);
      empl.remove(empl.selectedIndex);
  
          
        },false
);
  
let remove = document.querySelectorAll(".remove-row");

remove.forEach(del=>{

  del.addEventListener("click", e=>{
    let id = e.target.parentElement.parentElement.parentElement.children[0].innerText;
    let sup = user.find(w=>w.id == id)
    let i = user.indexOf(sup);
    sup.team_id = "";
    user[i] = sup;
    localStorage.setItem("user", JSON.stringify(user));
    
    
  })
})