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
valid.forEach(acc => {
  acc.addEventListener("click", e => {
    let id = e.target.parentElement.id;

    for (let i = 0; i < user.length; i++) {
      if (id == user[i].id) {
        if (!user[i].role) {
          alert("Add role");
        } else {
          user[i].status = "accepted";
        }
        console.log(user[i]);
      }
    }
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
        }
      }
      localStorage.setItem("user", JSON.stringify(user));
    },
    false
  );
});

let list_edit = document.querySelector(".employee_view");
// let modalHeaderColorPrimary = document.querySelector("#modalHeaderColorPrimary");
// let mod = document.getElementsByClassName("modal_view");
// let empl_view_gen_refresh = empl => {
//     return row = `
//         <tr >
//             <td>${empl.id}</td>
//             <td class="text-semibold text-dark">
//                 ${empl.username}
//             </td>
            
//             <td  class="text-center">
//                 <div id="${empl.id}">
//                   <i class="fa fa-trash-o trash btn modal-basic" onclick="getUser(${empl.id})" href="#modalHeaderColorPrimary"></i>
//                   <i class="fa fa-eye view"></i>
//                 </div>
//             </td>
//         </tr>
//         `;
//   };
let empl_view_gen = empl => {
  let row = `
      <tr >
          <td>${empl.id}</td>
          <td class="text-semibold text-dark">
              ${empl.username}
          </td>
          
          <td  class="text-center">
              <div id="${empl.id}">
                <i class="fa fa-trash-o trash btn modal-basic" " href="#modalHeaderColorPrimary"></i>
                <i class="fa fa-eye view"></i>
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

let r = 0;
// function deleteUser() {
//     const u = user.map(us => {return us.id}).indexOf(idUserTodelete);
//     user.splice(u,1);
//     localStorage.setItem("user", JSON.stringify(user));
//     // let html = '';
//     // user.forEach(users => {
//     //     html += empl_view_gen_refresh(users);
//     //   });
//       var el = document.getElementById(idUserTodelete);
//       el.parentElement.parentElement.innerHTML = "";
//       console.log(el.parentElement.parentElement);
      
//     //   list_edit.innerHTML = html;

//     //   window.location.reload();
//     //   var edit = document.getElementById("edit");
//     //   edit.className += " active";
// }
// function getUser (id) {
//     idUserTodelete = id
    
// }
del.forEach(trash => {
  trash.addEventListener("click", e => {
    let id = e.target.parentElement.id;
    var u = user.find(us => us.id == id)
    
    if (u) {
            confirm.addEventListener("click", () => {
                const i = user.indexOf(u);
                user.splice(i,1);
                e.target.parentElement.parentElement.parentElement.remove();
                localStorage.setItem("user", JSON.stringify(user));
                // new PNotify({
                //     title: 'Success!',
                //     text: 'Employee Removed.',
                //     type: 'success'

                // });
            });
        };
    });
});
//                 r++;
//                 let del = document.querySelectorAll(".trash");
// del = document.querySelectorAll(".trash");

//                 console.log(r);
                
//             });
//             cancel.addEventListener("click", () => {
//                 del = document.querySelectorAll(".trash");

//                 r = 0;
//                 console.log(r);
                
//             });

//         // });
//     }   
//   });
// });

// (function( $ ) {
//     $(document).on('click', '.modal-dismiss', function (e) {
// 		e.preventDefault();
// 		$.magnificPopup.close();
// 	});

// $(document).on('click', '.modal-confirm', function (e) {
//     e.preventDefault();
//     $.magnificPopup.close();

//     new PNotify({
//         title: 'Success!',
//         text: 'Employee Removed.',
//         type: 'success'
//     });
// });
// });

