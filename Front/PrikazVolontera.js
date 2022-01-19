export class prikazVolontera{


    constructor(host, listaOrganizacija){
        this.kontejner=host;
        this.listaOrganizacija=listaOrganizacija;
        this.trenutniVolonter=null;
        this.faza=0;
        

        let naslov = document.createElement("h3");
        naslov.innerHTML="Dodaj/Izmeni/Obrisi volontera";
        this.kontejner.appendChild(naslov);

        let forma = document.createElement("div");
        forma.className="forma";
        this.kontejner.appendChild(forma);


        let deoZaLabele = document.createElement("div");
        deoZaLabele.className="deoZaLabele";
        forma.appendChild(deoZaLabele);

        let deoZaPolja = document.createElement("div");
        deoZaPolja.className="deoZaPolja";
        forma.appendChild(deoZaPolja);


        let labele=["ime","prezime","godine","jmbg"];
        let tipovi=["text","text","number","string"];
        let ltmp;
        let ptmp;

        labele.forEach((el,i)=>{
            ltmp = document.createElement("label");
            ltmp.innerHTML=el;
            deoZaLabele.appendChild(ltmp);

            ptmp= document.createElement("input");
            ptmp.classList.add(el);
            ptmp.classList.add("inactive");

        
            ptmp.type=tipovi[i];
            
            
            ptmp.setAttribute("readonly","readonly");            
            deoZaPolja.appendChild(ptmp);
        });

        //----- radio buttons

        let nizRbt=["Musko","Zensko"];

        let divzaRbt = document.createElement("div");
        deoZaPolja.appendChild(divzaRbt);
        divzaRbt.className="poloviRB";

        nizRbt.forEach((el,i)=>{
            let l= document.createElement("label");
            l.innerHTML=el;
            divzaRbt.appendChild(l);
            let rbt= document.createElement("input");
            rbt.type="radio";
            rbt.value=i;
            rbt.className=el;
            rbt.name="polovi";

            divzaRbt.appendChild(rbt);
        })

        // organizacije u checkboxovima


        let poljeZaOrg = document.createElement("div");
        this.kontejner.appendChild(poljeZaOrg);
        poljeZaOrg.className="organizacijeCB";

        let orgs=document.createElement("h4");
        orgs.innerHTML="Organizacije u koje je uclanjen:";
        poljeZaOrg.appendChild(orgs);

        let divzaCb = document.createElement("div");
        poljeZaOrg.appendChild(divzaCb);




        listaOrganizacija.forEach((el,i)=>{

            let d = document.createElement("div");
            poljeZaOrg.appendChild(d);

            let rbt= document.createElement("input");
            rbt.type="checkbox";
            rbt.value=el.matBr;
            rbt.className="cb";
            d.appendChild(rbt);

            let l= document.createElement("label");
            l.innerHTML=el.naziv;
            d.appendChild(l);
        })



        //deo za dugmice

        let dugmad= document.createElement("div");
        dugmad.className="triDugmeta";
        this.kontejner.appendChild(dugmad);


        let Dodaj = document.createElement("button");
        Dodaj.innerHTML="Dodavanje";
        dugmad.appendChild(Dodaj);
        Dodaj.onclick=(ev=>this.FazaDodavanja());

        let Izmeni = document.createElement("button");
        Izmeni.innerHTML="Izmene";
        dugmad.appendChild(Izmeni);
        Izmeni.onclick=(ev=>this.FazaIzmene());

        let Brisanje = document.createElement("button");
        Brisanje.innerHTML="Brisanje";
        dugmad.appendChild(Brisanje);
        Brisanje.onclick=(ev=>this.FazaBrisanja());

        let zadnjeDugme = document.createElement("div");
        zadnjeDugme.className="zadnjeDugme";
        this.kontejner.appendChild(zadnjeDugme);

        let Ok= document.createElement("button");
        Ok.className="potvrdi";
        Ok.innerHTML="Potvrdi";
        Ok.hidden = true;
        zadnjeDugme.appendChild(Ok);   
        Ok.onclick=(ev=>this.KontaktiranjeBaze());
    
    
    }


    FazaDodavanja(){
        this.faza=1;
        let Ok= this.kontejner.querySelector(".potvrdi");
        Ok.hidden=false;

        let polja = this.kontejner.querySelectorAll("input");
        polja.forEach(el=>{
            el.value="";
            el.removeAttribute("readonly");
            el.classList.remove("inactive");
        })
    }

    FazaBrisanja(){
        this.faza=2;

        let Ok= this.kontejner.querySelector(".potvrdi");
        Ok.hidden=false;

        //provere radi
        let jmbg = this.kontejner.querySelector(".jmbg");
        //jmbg.value="proba";

    }

    FazaIzmene(){
        this.faza=3;

        let Ok= this.kontejner.querySelector(".potvrdi");
        Ok.hidden=false;

        let polja = this.kontejner.querySelectorAll("input");
        polja.forEach(el=>{
            el.removeAttribute("readonly");
            el.classList.remove("inactive");
        })

        let jmbg = this.kontejner.querySelector(".jmbg");
        jmbg.setAttribute("readonly",true);
        jmbg.classList.add("inactive");

    }

    FazaCekanja(){
        this.faza=0;
        let Ok= this.kontejner.querySelector(".potvrdi");
        Ok.hidden=true;

        let polja = this.kontejner.querySelectorAll("input");
        polja.forEach(el=>{
            el.setAttribute("readonly",true);
            el.classList.add("inactive");

        })

        //odraditi zapravo trazenu operaciju

        polja.forEach(el=>{
            el.value="";
        })

    }

    KontaktiranjeBaze(){
        if(this.faza==1){ //DODAVANJE
            let ime = this.kontejner.querySelector(".ime");
            let prezime = this.kontejner.querySelector(".prezime");
            let jmbg = this.kontejner.querySelector(".jmbg");
            let god = this.kontejner.querySelector(".godine");

            let pol;
            let polVal = this.kontejner.querySelector(".Musko");
            if(polVal.checked=true) pol=1;
            else pol=2;

            let orgs = document.body.querySelectorAll(".cb");
            let organizacije="";
            var prazan=true;
            //console.log(orgs);
            orgs.forEach((el,i)=>{
                //console.log(el+" "+el.value.innerHTML+" "+el.value.checked);

                if(el.checked==true&&prazan==true){
                    organizacije+=this.listaOrganizacija[i].matBr;
                    prazan=false;
                }
                else if(el.checked==true&&prazan==false){
                   
                    organizacije+='%2B';
                    organizacije+=this.listaOrganizacija[i].matBr;
                }
            })
            
            if(organizacije=="") alert("Kako bi volonter bio upamcen u bazi mora biti uclanjen u barem jednu poznatu organizaciju.");
            //alert(`https://localhost:5001/Volonter/DodajVolontera?ime=${ime.value}&prezime=${prezime.value}&jmbg=${jmbg.value}&godine=${god.value}&pol=${pol}&organizacije=${organizacije}`);
            
            fetch(`https://localhost:5001/Volonter/DodajVolontera?ime=${ime.value}&prezime=${prezime.value}&jmbg=${jmbg.value}&godine=${god.value}&pol=${pol}&organizacije=${organizacije}`,{
                method:'POST'
            })
            .then(p=>p.text())
            .then(p=>alert(p));

            // fetch(`https://localhost:5001/Volonter/DodajVolontera?ime=Jovan&prezime=Jovanovicko&jmbg=7777777777778&godine=23&pol=1&organizacije=12345678%2B2222222`,{
            //     method:'POST'
            // })
            // .then(p=>p.text())
            // .then(p=>alert(p));


        }else if(this.faza==2){ //BRISANJE
            
            let jmbg = this.kontejner.querySelector(".jmbg");
            fetch("https://localhost:5001/Volonter/IzbrisiVolontera/"+jmbg.value,{
                method:'DELETE'
            })
            .then(p=>p.text())
            .then(p=>console.log(p));            


        }else if(this.faza==3){ //IZMENA

             
                let ime = this.kontejner.querySelector(".ime");
                let prezime = this.kontejner.querySelector(".prezime");
                let jmbg = this.kontejner.querySelector(".jmbg");
                let god = this.kontejner.querySelector(".godine");
    
                let pol;
                let polVal = this.kontejner.querySelector(".Musko");
                if(polVal.checked==true) pol=1;
                else pol=2;
    
                let orgs = document.body.querySelectorAll(".cb");
                let organizacije="";
                var prazan=true;
               
                orgs.forEach((el,i)=>{
                   
    
                    if(el.checked==true&&prazan==true){
                        organizacije+=this.listaOrganizacija[i].matBr;
                        prazan=false;
                    }
                    else if(el.checked==true&&prazan==false){
                       
                        organizacije+='%2B';
                        organizacije+=this.listaOrganizacija[i].matBr;
                    }
                })
                
                if(organizacije=="") alert("Kako bi volonter bio upamcen u bazi mora biti uclanjen u barem jednu poznatu organizaciju.");
               
                
                //https://localhost:5001/Volonter/PromeniVolontera?jmbg=8888888888888&ime=Nikola&prezime=Nikolov&godine=24&pol=1&organizacije=2222222%2B12345678

                fetch(`https://localhost:5001/Volonter/PromeniVolontera?ime=${ime.value}&prezime=${prezime.value}&jmbg=${jmbg.value}&godine=${god.value}&pol=${pol}&organizacije=${organizacije}`,{
                    method:'PUT'
                })
                .then(p=>p.text())
                .then(p=>alert(p));
            



            }else{
                 alert("Doslo je do greske");
             }
        
        location.reload();

        this.FazaCekanja();
    }

}