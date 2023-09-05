import shoot from './shoot.js';
import frames from './frames.js';
export default class build extends frames {
    constructor(position,imagsrc,shotsrc,dam,off)
    {
        super(position,imagsrc,19,{x:0,y:off})
        this.siz=64;
        this.center={
            x:this.x+this.siz,
            y:this.y+this.siz/2
        }
        this.color='green';
        this.bullets=[];
        this.target;
        this.range=250;
        this.shotsrc=shotsrc;
        this.damage=dam;
    }
    drow(canvas){
        super.drow(canvas);
    }
    update(canvas)
    {
        super.update(canvas);
    }
    shoot(tar)
    {
        let bull=new shoot({x:this.center.x,y:this.center.y},tar,this.shotsrc,this.damage);
        this.bullets.push(bull);
    }
}