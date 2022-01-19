import { Volonter } from "./volonter.js";
import {Organizacija} from "./organizacija.js";
import {prikazOrganizacija} from "./PrikazOrganizacija.js";
import { prikazVolontera } from "./PrikazVolontera.js";


let v;





let levaStrana = document.createElement("div");
levaStrana.className="levaStrana";
document.body.appendChild(levaStrana);

let desnaStrana = document.createElement("div");
desnaStrana.className="desnaStrana";
document.body.appendChild(desnaStrana);

// fetch("https://localhost:5001/Volonter/PreuzmiVolontera/1",{
//     method:"GET"
// }).then(p=>{
//     if(p.ok){
//         p.json().then(data=>{
//             console.log(data);
//             v=new Volonter(data[0].id,data[0].ime,data[0].prezime,data[0].godine,data[0].jmbg);
//             console.log(v);
//             v.crtaj(desnaStrana);

//         })
//     }
// });


let listaOrganizacija=[];

fetch("https://localhost:5001/Organizacija/PreuzmiOrganizacije",{
    method:'GET'
})
.then(p=>{
    p.json().then(organizacije=>{
        organizacije.forEach(organizacija =>{
            var o = new Organizacija(organizacija.id,organizacija.matBr,organizacija.naziv,organizacija.godinaOtvaranja);
            listaOrganizacija.push(o);
        });
        let po= new  prikazOrganizacija(levaStrana,listaOrganizacija);
        let pv= new prikazVolontera(desnaStrana,listaOrganizacija);
    })
    
})




console.log(listaOrganizacija);

