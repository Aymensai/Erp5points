let stock_list = document.querySelector("#stock_list");
let add_row = document.querySelector("#add_row");
let stocks = JSON.parse(localStorage.getItem("stocks"));
let category = document.querySelector("#category");
let confirm = document.querySelector("#dialogConfirm");

let now = new Date();

let gen_stock = s => {
  let row = `
    <tr class="gradeX">
        <td id="id${s.prod_id}" class="not-editable">${s.prod_id}</td>
        <td class="prod-name">${s.prod_name}</td>
        <td>${s.prod_qt}</td>
        <td class="center category">${s.prod_cat}</td>
        <td class="center not-editable">${dateFns.distanceInWords(
          now,
          s.prod_time,
          { addSuffix: true }
        )}</td>
        <td class="actions">
        <a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>
        <a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>
        <a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
        <a href="#" id="${
          s.prod_id
        }" class="on-default remove-row"><i class="fa fa-trash-o trash"></i></a>
        <a href="javascript:myPopup('figure.html', 'team','700','600','500','50')" class="on-default view"><i class="fa fa-eye view"></i></a>
        </td>
    </tr>
    `;
  stock_list.innerHTML += row;
  newId++;
};
let newCat = document.querySelector(".new-cat");
let addNewCat = document.querySelector("#addNewCat");
// let pName = document.querySelector(".prod-name");

stock_list.addEventListener("click", e => {
  if (e.target.classList.contains("view")) {
    let id =
      e.target.parentElement.parentElement.parentElement.children[0].innerText;
    let currP = stocks.find(w => w.prod_id == id);
    localStorage.setItem("currP", JSON.stringify(currP));
  }
});

function myPopup(url, windowname, w, h, x, y) {
  window.open(
    url,
    windowname,
    "resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=n o,width=" +
      w +
      ",height=" +
      h +
      ",left=" +
      x +
      ",top=" +
      y +
      ""
  );
}

let st = {
  prod_id: "",
  prod_name: "",
  prod_cat: "",
  prod_qt: "",
  prod_time: "",
  prod_init_qt: ""
};

let gen_new_cat = () => {
  let cat = document.createElement("option");
  cat.text = newCat.categ.value;
  category.add(cat);
};

addNewCat.addEventListener("click", e => {
  console.log(newCat.categ.value);
  e.preventDefault();
  let cat = newCat.categ.value;

  if (cat.length) {
    gen_new_cat(cat);
    newCat.reset();
    let categ = JSON.parse(localStorage.getItem("category")) || [];
    categ.push(cat);
    localStorage.setItem("category", JSON.stringify(categ));
  }
});
let categ = JSON.parse(localStorage.getItem("category"));
let gen_cat = i => {
  let cat = document.createElement("option");
  cat.text = i;
  category.add(cat);
};

categ.forEach(cat => {
  gen_cat(cat);
});

let addToStock = document.querySelector("#addToStock");
let newName = document.querySelector("#n_name_p");
let newQt = document.querySelector("#n_qt_p");

let newId = 1;

addToStock.addEventListener("click", () => {
  if (newName.value && newQt.value) {
    st.prod_name = newName.value;
    st.prod_qt = newQt.value;
    st.prod_id = newId;
    st.prod_cat = category.options[category.selectedIndex].text;
    st.prod_init_qt = newQt.value;

    let be = new Date(new Date());
    st.prod_time = be;
    console.log(st);
    let stocks = JSON.parse(localStorage.getItem("stocks")) || [];
    stocks.push(st);
    localStorage.setItem("stocks", JSON.stringify(stocks));
    console.log(st);

    gen_stock(st);
  }
  window.location.reload(false);
});
stocks.forEach(stock => {
  gen_stock(stock);
});

let stock_hist = document.querySelector("#stock_hist");

let gen_st_hist = s => {
  let row = `
    <tr class="gradeX">
        <td id="id${s.prod_id}" class="not-editable">${s.prod_id}</td>
        <td>${s.prod_name}</td>
        <td>${s.prod_qt}</td>
        <td class="center hidden-phone category">${s.prod_cat}</td>
        <td class="center hidden-phone not-editable">${s.prod_time}</td>
        <td class="actions hide">
        <a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>
        <a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>
        <a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
        <a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
        </td>
    </tr>
    `;
  stock_hist.innerHTML += row;
};

let stockHist = JSON.parse(localStorage.getItem("stockHist"));

stockHist.forEach(stock => {
  gen_st_hist(stock);
});

stock_list.addEventListener("click", e => {
  let temp_del = [];
  let id = 0;
  console.log(e.target);

  if (e.target.classList.contains("trash")) {
    id = e.target.parentElement.id;
  }
  // console.log(id);
  var u = stocks.find(us => us.prod_id == id);
  let tr = e.target.parentElement.parentElement.parentElement.rowIndex;
  console.log(e.target.parentElement.id);
  temp_del.push(u);
  temp_del.push(tr);
  // console.log(tr);
  // console.log(temp_del);
  localStorage.setItem("temp_del_st", JSON.stringify(temp_del));
});

let temp_del = JSON.parse(localStorage.getItem("temp_del_st"));

setInterval(() => {
  temp_del = JSON.parse(localStorage.getItem("temp_del_st"));
}, 500);
// console.log(temp_del);

if (temp_del[0]) {
  confirm.addEventListener("click", el => {
    // el.preventDefault;
    let n = stocks.filter(w => w.prod_id != temp_del[0].prod_id);
    stocks = n;
    let i = temp_del[1] - 1;
    // console.log(temp_del);

    // console.log(n);

    let nstockHist = stockHist.filter(w => w.prod_id != temp_del[0].prod_id);
    stockHist = nstockHist;

    stock_list.children[i].remove();
    // console.log(stock_list.children[i]);

    localStorage.setItem("stocks", JSON.stringify(stocks));
    localStorage.setItem("stockHist", JSON.stringify(stockHist));
    // new PNotify({
    //   title: 'Success!',
    //   text: 'Product Removed.',
    //   type: 'success'

    // });
  });
}
let search = document.querySelector(".data_filter input");
let searchTable = term => {
  let tr = stock_hist.getElementsByTagName("tr");
  let filter = search.value.toUpperCase();
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

search.addEventListener("keyup", () => {
  const term = search.value.trim();
  searchTable(term);
});
