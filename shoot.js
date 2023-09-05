import frames from './frames.js';
export default class shoot extends frames {
    constructor(position,tar,shootsrc,dam)
    {
        super({x:position.x-20,y:position.y-110},shootsrc,1,{x:0,y:0})
        this.vx=0;
        this.vy=0;
        this.siz=10;
        this.color='yellow';
        this.speed=8;
        this.target=tar;
        this.dis;
        this.damage=dam;
    }
    drow(canvas){
        super.drow(canvas);
    }
    update(canvas)
    {
        this.drow(canvas);
        super.update(canvas);
        var angle=Math.atan2((this.target.center.y-this.y),(this.target.center.x)-this.x);
        this.vx=Math.cos(angle)*this.speed;
        this.vy=Math.sin(angle)*this.speed;
        this.x+=this.vx;
        this.y+=this.vy;

        let dx=this.x-this.target.center.x;
        let dy=this.y-this.target.center.y;
        this.dis=Math.hypot(dx,dy);
    }
}