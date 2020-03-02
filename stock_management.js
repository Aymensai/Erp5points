let stock_list = document.querySelector("#stock_list");
let add_row = document.querySelector("#add_row");
let stocks = JSON.parse(localStorage.getItem("stocks"));
let category = document.querySelector("#category");

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
        <a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
        </td>
    </tr>
    `;
  stock_list.innerHTML += row;
  newId++;
};
let newCat = document.querySelector(".new-cat");
let addNewCat = document.querySelector("#addNewCat");
// let pName = document.querySelector(".prod-name");

stock_list.addEventListener("click", e=>{
    console.log(e.target.classList.contains("prod-name"));
    if(e.target.classList.contains("prod-name")){
        let id = e.target.parentElement.children[0].innerText;
        let nameTd = e.target.parentElement.children[1];
        let currP = stocks.find(w=>w.prod_id == id);
        localStorage.setItem("currP", JSON.stringify(currP));
        nameTd.innerHTML += `<a href="javascript:myPopup('figure.html', 'team','700','600','500','50')"></a>`
        console.log(nameTd);
        
        
    }
    
})

function myPopup(url,windowname,w,h,x,y){
    window.open(url,windowname,"resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=n o,width="+w+",height="+h+",left="+x+",top="+y+"");    
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
