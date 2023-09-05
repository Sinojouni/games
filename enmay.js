import frames from './frames.js';
export default class enamy extends frames {
    constructor(position,srcimg,blood)
    {
        super(position,srcimg,7,{x:0,y:0})
        this.hieght=100;
        this.with=100;
        this.rad=50;
        this.center={
            x:this.x+this.rad,
            y:this.y+this.rad
        }
        this.vx=0;
        this.vy=0;
        this.spped=4;
        this.index=1;
        this.bloodmax=blood;
        this.blood=blood;
    }
    drow(canvas){
        super.drow(canvas)
        canvas.fillStyle='red';
        canvas.fillRect(this.x,this.y-20,this.with,10)
        canvas.fillStyle='green';
        canvas.fillRect(this.x,this.y-20,(this.with*this.blood)/this.bloodmax,10)
    }
    update(canvas,points){
        this.drow(canvas);
        super.update(canvas);
        var angle=Math.atan2((points[this.index].y-this.center.y),(points[this.index].x)-this.center.x);
        this.vx=Math.cos(angle)*this.spped;
        this.vy=Math.sin(angle)*this.spped;
        this.x+=this.vx;
        this.y+=this.vy;
        this.center={
            x:this.x+this.rad,
            y:this.y+this.rad
        }
        if(Math.abs(Math.round(this.center.x)-Math.round(points[this.index].x))<Math.abs(this.vx) && Math.abs(Math.round(this.center.y)-Math.round(points[this.index].y))<Math.abs(this.vy) && this.index<points.length-1)
        {
            this.index++;
        }
    }
}