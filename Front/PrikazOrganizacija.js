import { Projekat } from "./projekat.js";
import { Volonter } from "./volonter.js";


export class prikazOrganizacija{


    constructor(host, listaOrganizacija){



        this.kontejner=host;
        this.listaOrganizacija=listaOrganizacija;
        this.trenutnaOrganizacija=null;




        //let pv= new prikazVolontera(desnaStrana,listaOrganizacija);

        //----------------------------gornji deo

        let celaStrana = document.createElement("div");
        celaStrana.className="celaStrana";
        this.kontejner.appendChild(celaStrana);

        let gornjiDeo = document.createElement("div");
        gornjiDeo.className="gornjiDeo";        
        celaStrana.appendChild(gornjiDeo);

        // let l = document.createElement("label");
        // l.innerHTML="Organizacije:";
        // gornjiDeo.appendChild(l);

        let seOrg= document.createElement("select");
        seOrg.className="bigSelect"
        gornjiDeo.appendChild(seOrg);

        let op;

        op=document.createElement("option");
        op.innerHTML="Izaberite organizaciju...";
        op.value=listaOrganizacija.length+1;
        seOrg.appendChild(op);

        this.listaOrganizacija.forEach(el => {
            op= document.createElement("option");
            op.innerHTML=el.naziv;
            op.value=el.id;
            seOrg.appendChild(op);            
        });

        seOrg.onchange=(ev)=>this.crtajOrganizaciju(this.listaOrganizacija[seOrg.selectedIndex-1]);

        let naslov =document.createElement("h4");
        naslov.innerHTML="Za sada nije odabrana ni jedna organizacija";
        gornjiDeo.appendChild(naslov);  

        //--------------------------------- srednji deo
        
        let srednjiDeo = document.createElement("div");
        srednjiDeo.className="srednjiDeo";
        celaStrana.appendChild(srednjiDeo);

        let proj = document.createElement("label");
        proj.innerHTML="Projekti:";
        srednjiDeo.appendChild(proj);

        let seProj= document.createElement("select");
        seProj.className="listaProjekata";
        srednjiDeo.appendChild(seProj);


        let opisBox = document.createElement("div");
        opisBox.className="opisBox";
        srednjiDeo.appendChild(opisBox);
        
        let opisProjekta= document.createElement("label");
        opisProjekta.innerHTML="Nije jos uvek odabran ni jedan projekat";
        opisProjekta.className="opisProjekta";
        opisBox.appendChild(opisProjekta);

        


        //------------------------------donji deo
        let donjiDeo=document.createElement("div");
        donjiDeo.className="donjiDeo";
        //celaStrana.appendChild(donjiDeo);     

        let dolePlusStat=document.createElement("div");
        dolePlusStat.className="dolePlusStat";
        celaStrana.appendChild(dolePlusStat);
        dolePlusStat.appendChild(donjiDeo);
        
        let naslovTabele= document.createElement("h4");
        naslovTabele.innerHTML="Spisak volontera organizacije:";
        donjiDeo.appendChild(naslovTabele);

        naslovTabele.onclick=(ev=>this.probnaFja());

        let tabela = document.createElement("table");
        tabela.className="tabelaVolontera";
        donjiDeo.appendChild(tabela);

        let tabelaHead= document.createElement("thead");
        tabela.appendChild(tabelaHead);

        let tr= document.createElement("tr");
        tabelaHead.appendChild(tr);

        let tabelaBody = document.createElement("tbody");
        tabelaBody.className="tabelaPodaci";
        tabela.appendChild(tabelaBody);

        let th;
        let zag=["ime","prezime","godine"];
        zag.forEach(el=>{
            th=document.createElement("th");
            th.innerHTML=el;
            tabelaHead.appendChild(th);
        })
        let statistika = document.createElement("div");
        dolePlusStat.appendChild(statistika);
        statistika.className="kutijaZaStats";

        let sts= document.querySelectorAll(".stat");
        sts.forEach(st=>{
            statistika.appendChild(st);
        })


    }

    crtajOrganizaciju(org){

        if(org!=null){

            this.trenutnaOrganizacija=org;
            let nas = this.kontejner.querySelector("h4");
            nas.innerHTML=org.naziv+ " je organizacija osnovana "+ org.godinaOtvaranja;

            let opis = document.querySelector(".opisProjekta");
            opis.innerHTML="Nije jos uvek odabran ni jedan projekat";

            let listaProjekata=[];

            fetch("https://localhost:5001/Projekti/PreuzmiProjekte?matBr="+org.matBr)
            .then(p=>{
                p.json().then(Projekti=>{
                    Projekti.forEach(projekat =>{
                        var p = new Projekat(projekat.naziv, projekat.opis,projekat.aktivan);
                        listaProjekata.push(p);
                    });

                    let sel = document.querySelector(".listaProjekata");

                    this.removeOptions(sel);

                    let op;
                    op=document.createElement("option");
                    op.innerHTML="Izaberite projekat...";
                    op.value=listaProjekata.length+1;
                    sel.appendChild(op);


                    if(listaProjekata!=null){    
                        listaProjekata.forEach(el => {
                            op= document.createElement("option");
                            op.innerHTML=el.naziv;
                            op.value=el.id;
                            sel.appendChild(op);            
                        });
                    }

                    sel.onchange=(ev)=>this.opisiProjekat(listaProjekata[sel.selectedIndex-1]);
                
                })

            })

            let brM=0;
            let brZ=0;
            let brojke=[0,0,0,0,0];

            //let proc=[];

            fetch("https://localhost:5001/Clanstvo/PreuzmiVolontereOrganizacije?matBr="+org.matBr)
            .then(p=>{
                p.json().then(spojevi=>{
                    let teloTabele = this.obrisiSadrzajTabele();                

                    spojevi.forEach(spoj=>{
                        var v = new Volonter(spoj.vol.id,spoj.vol.ime,spoj.vol.prezime,spoj.vol.godine,spoj.vol.jmbg,spoj.vol.pol);
                        v.upisi(teloTabele);


                        if(v.pol===1) brM++; else brZ++;
                        console.log(v.godine);

                        switch(v.godine){
                            case 16:
                            case 17:
                            case 18:
                                brojke[0]++;
                                break;
                            case 19:
                            case 20:
                            case 21:
                                brojke[1]++;
                                break;
                            case 22:
                            case 23:
                            case 24:
                                brojke[2]++;
                                break;
                            case 25:
                            case 26:
                            case 27:
                                brojke[3]++;
                                break;
                            case 28:
                            case 29:
                            case 30:
                                brojke[4]++;
                                break;
                            default:
                                console.log("ima nekga greska sa godinama");
                                break;
                        }

                    })

                    console.log(brM+" "+brZ);
                    console.log(brojke);
                    this.prilagodiPogacu(myChart1,brM,brZ);
                    this.prilagodiStubove(myChart2,brojke);
                    let sts=document.body.querySelectorAll(".stat");
                    sts.forEach(st=>{
                        st.style.visibility="visible";

                    })

                    
                })
            })
        }
     else location.reload();

        



    }

    opisiProjekat(p){
        let opis = document.querySelector(".opisProjekta");
        if(p!=null)
        opis.innerHTML=p.opis;
        else 
        opis.innerHTML="Nije odabran ni jedan projekat";

    }

    removeOptions(selectElement) {
        var i, L = selectElement.options.length - 1;
        for(i = L; i >= 0; i--) {
           selectElement.remove(i);
        }
    }

    obrisiSadrzajTabele(){
        
        let teloTabele=this.kontejner.querySelector(".tabelaPodaci");
        let roditelj = teloTabele.parentNode;
        roditelj.removeChild(teloTabele);

        teloTabele= document.createElement("tbody");
        teloTabele.className="tabelaPodaci";
        roditelj.appendChild(teloTabele);
        return teloTabele;


    }

    // probnaFja(){


    //     this.addData(myChart1,17);
        
    // }

    prilagodiPogacu(chart, br1,br2) {
        
        chart.data.datasets.forEach((dataset) => {
            dataset.data[0]=br2;
            dataset.data[1]=br1;
        });
        chart.update();
    }

    prilagodiStubove(chart,brojke){
        
        chart.data.datasets[0].data[0]=brojke[0];
        chart.data.datasets[0].data[1]=brojke[1];
        chart.data.datasets[0].data[2]=brojke[2];
        chart.data.datasets[0].data[3]=brojke[3];
        chart.data.datasets[0].data[4]=brojke[4];    
        chart.update();

    }




}

//pogaca

var data = {
    labels: [
      'Zene',
      'Muskarci',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }]
  };
  var config = {
    type: 'pie',
    data: data,
  };

  var myChart1 = new Chart(
    document.getElementById('myChart'),
    config
  );

  //stubici

const labels2 = ["<18","19-21","22-24","25-27","28-30"];
const data2 = {
  labels: labels2,
  datasets: [{
    label: 'Broj clanova po godinama',
    data: [65, 59, 80, 81, 56],
    backgroundColor: [
      'rgba(255, 99, 132, 0.9)',
      'rgba(255, 159, 64, 0.9)',
      'rgba(255, 205, 86, 0.9)',
      'rgba(75, 192, 192, 0.9)',
      'rgba(54, 162, 235, 0.9)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)'
    ],
    borderWidth: 1
  }]
};
const config2 = {
    type: 'bar',
    data: data2,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  var myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
  );