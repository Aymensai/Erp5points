let currProd = JSON.parse(localStorage.getItem("currP"));
let stockHist = JSON.parse(localStorage.getItem("stockHist"));
let stocks = JSON.parse(localStorage.getItem("stocks"));
let prodI = document.querySelector("#prodI");
let newVal = [];
let newValTime = [];


let gen_time = val =>{

    let tab = `${dateFns.format(val.prod_time, 'DD/MM/YY H:mm')}`
    
    return tab;
}
let gen_val = val =>{

    let tab = [`${val.prod_qt}`]
    
    return tab;
}

let firstProd = stocks.find(w=>w.prod_id == currProd.prod_id);
console.log(firstProd);
let newV = [];
let s = parseInt(firstProd.prod_init_qt);
console.log(s);


let firstValueT = [`${dateFns.format(firstProd.prod_time, 'DD/MM/YY H:mm')}`];
let firstValue = [`${firstProd.prod_init_qt}`];
let prod = stockHist.filter(w=>w.prod_id == currProd.prod_id);
prod.forEach(p=>{
    // let q = p.prod_qt.split('');
    console.log(p.prod_qt.slice(0,1));
    if(p.prod_qt.slice(0,1) == "+"){
        p.prod_qt.slice(1,p.prod_qt.length)
        let v = parseInt(p.prod_qt.slice(1,p.prod_qt.length))
        s =s+ + v;
        newV.push(s)
        console.log(newV);
        
    }else if(p.prod_qt.slice(0,1) == "-"){
        p.prod_qt.slice(1,p.prod_qt.length)
        let v = parseInt(p.prod_qt.slice(1,p.prod_qt.length))
        s =s+ - v;
        newV.push(s)
        console.log(newV);
        
    }
})

prod.forEach(p=>{
    //gen_val(p);
    newVal.push(gen_val(p));
});
prod.forEach(p=>{
    //gen_time(p);
    newValTime.push(gen_time(p));
});

newVal.unshift(firstValue);
newValTime.unshift(firstValueT);
console.log(newVal);
// newVal.forEach((n,i)=>{
//     n[0] = newV[i];
// });
let j = 0;    
for (let i = 1; i < newVal.length; i++) {
    newVal[i] = newV[j]
    j++;
}
newVal[0] = parseInt(newVal[0])
console.log(newValTime);
localStorage.setItem("chart", JSON.stringify(newVal));
localStorage.setItem("chart_time", JSON.stringify(newValTime));
window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

