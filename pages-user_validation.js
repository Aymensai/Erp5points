let list = document.querySelector(".employee_row");
let user = JSON.parse(localStorage.getItem("user"));
let empl_gen = empl => {
  let row = `
    <tr >
        <td>${empl.id}</td>
        <td class="text-semibold text-dark">
            ${empl.username}
        </td>
        <td class="text-center">
                          <select id="${empl.id}" class="roleUser">
                            <option value=""></option>
                            <option value="Superviser">Superviser</option>
                            <option value="Employee">Employee</option>
                          </select>
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

let valid = document.querySelectorAll(".btn-success");
valid.forEach(acc =>{
    acc.addEventListener("click", e=>{
        let id =   e.target.parentElement.id;
        
        for (let i = 0; i < user.length; i++) {
            
            if(id == user[i].id){
                if (!user[i].role) {
                    alert('Add role')
                } else {
                    user[i].status = "accepted";
                }
                console.log(user[i]);
                
            };
        };
        localStorage.setItem("user",JSON.stringify(user));
    });
});

let refuse = document.querySelectorAll(".btn-danger");
refuse.forEach(ref =>{
    ref.addEventListener("click", e=>{
        let id = e.target.parentElement.id;
        for (let i = 0; i < user.length; i++) {
            if(id == user[i].id){
                user[i].status  = "refused";
            };
        };
        localStorage.setItem("user",JSON.stringify(user));
    });
});

role.forEach(el =>{

    el.addEventListener("change", e=>{
        let post = el.options[el.selectedIndex].value;
        console.log(post);
        let id = e.target.id;
        for (let i = 0; i < user.length; i++) {
            if(id == user[i].id){
                user[i].role = post;
                
            }
            
        }
        localStorage.setItem("user",JSON.stringify(user));
    },false);
});