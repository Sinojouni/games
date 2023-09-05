export default class stic {
    constructor (stic)
    {
        this.stic=stic;
        this.o=0;
        this.run=false;

    }
    move(delta)
    {
        if(this.o>2*Math.PI)
        {
            this.o-=2*Math.PI;
        }

        if(this.o<0)
        {
            this.o+=2*Math.PI;
        }
        this.stic.style.rotate=this.o+'rad';
        
    }
    disepear()
    {
        this.stic.style.display="none";
    }
    apear()
    {
        this.o=0;
        this.stic.style.rotate=this.o+'rad';
        this.stic.style.display="block";
    }
}