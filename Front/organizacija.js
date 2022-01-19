export class Organizacija{

    constructor(id,matBr,naziv,godinaOtvaranja){
        this.id=id;
        this.matBr=matBr;
        this.naziv=naziv;
        this.godinaOtvaranja=godinaOtvaranja;
        this.kontejner=null;
    }

    crtaj(host){
        this.kontejner=document.createElement("div");
        this.kontejner.className="organizacija";
        host.appendChild(this.kontejner);

        let prikaz = document.createElement("div");
        prikaz.className="prikaz";
        this.kontejner.appendChild(prikaz);

        this.crtajPrikaz(prikaz);
    }

    crtajPrikaz(host){
        let l = document.createElement("label");
        l.innerHTML="Ovde ce da pisu stvari za organizacije";
        host.appendChild(l);
    }


}