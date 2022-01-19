import { Organizacija } from "./organizacija.js";

export class Volonter{

    constructor(id,ime,prezime,godine,jmbg,pol){
        this.id=id;
        this.ime=ime;
        this.prezime=prezime;
        this.godine=godine;
        this.jmbg=jmbg;
        this.pol=pol;
    }

    upisi(host){
        if(!host) throw new Error("Roditeljski element ne postoji");

        let tr= document.createElement("tr");
        host.appendChild(tr);

        let el= document.createElement("td");
        el.innerHTML=this.ime;
        tr.appendChild(el);

        el= document.createElement("td");
        el.innerHTML=this.prezime;
        tr.appendChild(el);

        el= document.createElement("td");
        el.innerHTML=this.godine;
        tr.appendChild(el);


        tr.onclick=(ev)=>{
            this.detalji();
        }
    }

    detalji(){
        //alert(this.ime+" "+this.prezime+". Sa jmbg-om: "+this.jmbg+",broj godina: "+this.godine);

        
        let listaNjegovihOrganizacija=[];

        fetch("https://localhost:5001/Clanstvo/PreuzmiOrganizacijeVolontera/"+this.jmbg,{
            method:"GET"
            }).then(p=>{
                if(p.ok){
                    p.json().then(data=>{
                        data.forEach(el=>{
                            let o = new Organizacija(el.org.id,el.org.matBr,el.org.naziv,el.org.godinaOtvaranja);
                            listaNjegovihOrganizacija.push(o);
                        })
    
                        polje = document.body.querySelectorAll(".cb");
                        polje.forEach(el=>{
                            el.checked=false;
                            listaNjegovihOrganizacija.forEach(org=>{
                
                                if(el.value==org.matBr) {
                                    el.checked=true;
                                }
                
                            })            
                        })
    
                    })
                }
            });

        let polje = document.body.querySelector(".ime");
        polje.value=this.ime;

        polje = document.body.querySelector(".prezime");
        polje.value=this.prezime;

        polje = document.body.querySelector(".godine");
        polje.value=this.godine;

        polje = document.body.querySelector(".jmbg");
        polje.value=this.jmbg;


        if(this.pol==1){
            document.body.querySelector(".Musko").checked=true;
        }
        else {
            document.body.querySelector(".Zensko").checked=true;
        }

        console.log(this);




    }
}

