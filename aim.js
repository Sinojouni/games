export default class aim {
    constructor (aim)
    {
        this.box=document.getElementById('gameplay').getBoundingClientRect();
        this.ball=document.getElementById('ball').getBoundingClientRect();
        this.aim=aim;
        this.aim_rec=this.aim.getBoundingClientRect();
        this.o=0;
        this.r=this.ball.height/2;
        this.x=this.ball.left-this.box.left+(this.ball.height/2)+this.aim_rec.width;
        this.y=this.ball.top+(this.ball.height/2)-this.box.top;
        this.xr=this.box.right-this.ball.right+(this.ball.height/2);
        this.yb=this.box.bottom-this.ball.bottom+(this.ball.height/2);
        this.first=true;
        this.balls=[];
        this.siz=window.innerWidth;

    }
    move(delta)
    {
        this.first=true;
        this.target=0;
        this.targetd=0;
        this.j=0;
        this.a=Math.tan(this.o);
        this.b=this.ball.top-this.box.top+this.r-(this.a*(this.ball.left-this.box.left+this.r));

        this.o1=Math.atan((this.yb)/(this.xr));
        this.o2=Math.atan((this.x-this.aim_rec.width)/(this.yb))+(Math.PI/2);
        this.o3=Math.atan((this.y)/(this.x-this.aim_rec.width))+(Math.PI);
        this.o4=Math.atan((this.xr)/(this.y))+(3*Math.PI/2);

        for(let i=0;i<this.balls.length;i++)
        {
            let angle=Math.atan2((this.balls[i].top-this.ball.top),(this.balls[i].left-this.ball.left));

            if(this.o>Math.PI)
            {
                this.do=Math.abs((this.o-2*Math.PI)-angle);
            }
            else{
                this.do=Math.abs(this.o-angle);
            }

            this.d=Math.abs(this.a*(this.balls[i].left-this.box.left+this.r)-(this.balls[i].top-this.box.top+this.r)+this.b)/Math.sqrt(Math.pow(this.a,2)+1);
            
            if(this.d<2*this.r && this.do<Math.PI/2)
            {
                if(this.first==true)
                {
                    this.target=this.balls[i];
                    this.targetd=this.d;
                    this.first=false;
                }else{
                    if(Math.sqrt(Math.pow(this.balls[i].left-this.ball.left,2)-Math.pow(this.balls[i].top-this.ball.top,2))<Math.sqrt(Math.pow(this.target.left-this.ball.left,2)-Math.pow(this.target.top-this.ball.top,2)))
                    {
                        this.target=this.balls[i];
                        this.targetd=this.d;
                    }
                }
            }else{
                this.j++;
            }
        }
        if(this.first==false)
        {
            this.l=Math.sqrt(Math.pow(Math.sqrt(Math.pow(this.target.left-this.ball.left,2)+Math.pow(this.target.top-this.ball.top,2)),2)-Math.pow(this.targetd,2))-Math.sqrt(Math.pow(2*this.r,2)-Math.pow(this.targetd,2));
            this.aim.style.width=this.l+'px';
        }
        if(this.j==this.balls.length){
            if(this.o>this.o1 && this.o<this.o2)
            {
                this.aim.style.width=Math.abs((this.yb)/Math.sin(this.o))-Math.abs((this.ball.width/2)/Math.sin(this.o))+'px';
            }else if(this.o>this.o2 && this.o<this.o3)
            {
                this.aim.style.width=Math.abs((this.x-this.aim_rec.width)/Math.cos(this.o))-Math.abs((this.ball.width/2)/Math.cos(this.o))+'px'
            }else if(this.o>this.o3 && this.o<this.o4)
            {
                this.aim.style.width=Math.abs((this.y)/Math.sin(this.o))-Math.abs((this.ball.width/2)/Math.sin(this.o))+'px';
            }else if(this.o>this.o4 && this.o<2*Math.PI){
                this.aim.style.width=(Math.abs((this.xr)/Math.cos(this.o)))-Math.abs((this.ball.width/2)/Math.cos(this.o))+'px';
            }else if(this.o>=0 && this.o<=this.o1){
                this.aim.style.width=Math.abs((this.xr)/Math.cos(this.o))-Math.abs((this.ball.width/2)/Math.cos(this.o))+'px';
            }

        }
        
        this.aim.style.rotate=this.o+'rad';
    }
    disepear()
    {
        this.aim.style.display="none";
    }
    apear()
    {
        this.ball=document.getElementById('ball').getBoundingClientRect();
        this.x=this.ball.left-this.box.left+(this.ball.height/2)+this.aim_rec.width;
        this.y=this.ball.top+(this.ball.height/2)-this.box.top;
        this.xr=this.box.right-this.ball.right+(this.ball.height/2);
        this.yb=this.box.bottom-this.ball.bottom+(this.ball.height/2);
        this.aim.style.display="block";
    }
}