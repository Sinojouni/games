export default class ball {
    constructor (ball)
    {
        this.box=document.getElementById('gameplay').getBoundingClientRect();
        this.ball=ball;
        this.ball_rec=this.ball.getBoundingClientRect();
        this.class;
        this.r=this.ball_rec.height/2;
        this.o=0;
        this.x=this.ball_rec.left+this.r-this.box.left;
        this.y=this.ball_rec.top+this.r-this.box.top;
        this.v=0;
        this.vx=0;
        this.vy=0;
        this.windwi=1482;
        this.top=document.getElementById('bart2').getBoundingClientRect();
        this.top1=document.getElementById('bart1').getBoundingClientRect();
        this.buttom=document.getElementById('barb2').getBoundingClientRect();
        this.buttom1=document.getElementById('barb1').getBoundingClientRect();
        this.right=document.getElementById('barr').getBoundingClientRect();
        this.left=document.getElementById('barl').getBoundingClientRect();
        this.siz=window.innerWidth;

    }
    move(delta)
    {
        this.res=(0.06)*(window.innerWidth/this.windwi);
        if(this.o>2*Math.PI)
        {
            this.o-=2*Math.PI;
        }

        if(this.o<0)
        {
            this.o+=2*Math.PI;
        }

        if(this.v>0)
        {
            this.v-=(this.res);
        }else{
            this.v=0;
        }
        
        this.vx=this.v*Math.cos(this.o);
        this.vy=this.v*Math.sin(this.o);

        if(this.x+this.r+this.vx>=this.top.left-this.box.left +this.r && this.x-this.r+this.vx<=this.top.left+this.top.width-this.box.left-2*this.r)
        {
            if(this.y-this.r+this.vy<this.top.top+this.top.height-this.box.top && this.y-this.r-this.vy>this.top.top+this.top.height-this.box.top)
            {
                this.o*=-1;
            }
        }
        if(this.x+this.r+this.vx>=this.top1.left-this.box.left+2*this.r && this.x+this.vx<=this.top1.left+this.top1.width-this.box.left)
        {
            if(this.y-this.r+this.vy<this.top1.top+this.top1.height-this.box.top && this.y-this.r-this.vy>this.top1.top+this.top1.height-this.box.top)
            {
                this.o*=-1;
            }
        }
        if(this.x+this.r+this.vx>=this.buttom.left-this.box.left +this.r && this.x-this.r+this.vx<=this.buttom.left+this.buttom.width-this.box.left-2*this.r)
        {
            if(this.y+this.r+this.vy>=this.buttom.top-this.box.top && this.y+this.r-this.vy<=this.buttom.top-this.box.top)
            {
                this.o*=-1;
            }
        }
        if(this.x+this.r+this.vx>=this.buttom1.left-this.box.left +2*this.r && this.x+this.vx<=this.buttom1.left+this.buttom1.width-this.box.left)
        {
            if(this.y+this.r+this.vy>this.buttom1.top-this.box.top && this.y+this.r-this.vy<this.buttom1.top-this.box.top)
            {
                this.o*=-1;

            }
        }
        if(this.y+this.r+this.vy>=this.right.top-this.box.top+2*this.r && this.y-this.r+this.vy<=this.right.top+this.right.height-this.box.top-2*this.r)
        {
            if( this.x+this.r+this.vx>this.right.left-this.box.left && this.x+this.r-this.vx<this.right.left-this.box.left)
            {
                this.o=Math.PI-this.o;
            }
        }
        if(this.y+this.r+this.vy>=this.left.top-this.box.top+2*this.r && this.y-this.r+this.vy<=this.left.top+this.left.height-this.box.top-2*this.r)
        {
            if(this.x-this.r+this.vx<this.left.left+this.left.width-this.box.left && this.x-this.r-this.vx>this.left.left+this.left.width-this.box.left)
            {
                this.o=Math.PI-this.o;
            }
        }





        if(this.x+this.r+this.vx>this.top1.left-this.box.left  && this.x+this.r+this.vx<this.top1.left-this.box.left +2*this.r)
        {
            let a=Math.tan((Math.PI)/4);
            let b=(this.top1.top-this.box.top)-(a*(this.top1.left-this.box.left));
            let d=Math.abs(a*(this.x+this.vx)-(this.y+this.vy)+b)/Math.sqrt(Math.pow(a,2)+1);
            if(d<=this.r )
            {
                this.o=Math.PI+this.o;
            }
            let a1=Math.tan((7*Math.PI)/4);
            let b1=(this.buttom1.top-this.box.top+this.buttom1.height)-(a1*(this.buttom1.left-this.box.left));
            let d1=Math.abs(a1*(this.x+this.vx)-(this.y+this.vy)+b1)/Math.sqrt(Math.pow(a1,2)+1);
            if(d1<=this.r )
            {
                this.o=Math.PI+this.o;
            }
        }

        if((this.x-this.r+this.vx>this.top.left+this.top.width-this.box.left-2*this.r && this.x-this.r+this.vx<this.top.left+this.top.width-this.box.left))
        {
            let a=Math.tan((7*Math.PI)/4);
            let b=(this.top.top-this.box.top)-(a*(this.top.left-this.box.left+this.top.width));
            let d=Math.abs(a*(this.x+this.vx)-(this.y+this.vy)+b)/Math.sqrt(Math.pow(a,2)+1);
            if(d<=this.r )
            {
                this.o=Math.PI+this.o;
            }
            let a1=Math.tan((Math.PI)/4);
            let b1=(this.buttom.top-this.box.top+this.buttom.height)-(a1*(this.buttom.left-this.box.left+this.buttom.width));
            let d1=Math.abs(a1*(this.x+this.vx)-(this.y+this.vy)+b1)/Math.sqrt(Math.pow(a1,2)+1);
            if(d1<=this.r )
            {
                this.o=Math.PI+this.o;
            } 
        }



        if(this.x-this.r+this.vx>this.top1.left+this.top1.width-this.box.left-this.r && this.x-this.r+this.vx<this.top1.left+this.top1.width-this.box.left)
        {
            let a=Math.tan((13*Math.PI)/8);
            let b=(this.top1.top-this.box.top)-(a*(this.top1.left-this.box.left+this.top1.width));
            let d=Math.abs(a*(this.x+this.vx)-(this.y+this.vy)+b)/Math.sqrt(Math.pow(a,2)+1);
            if(d<=this.r )
            {
                this.o=Math.PI+this.o;
            }
            let a1=Math.tan((3*Math.PI)/8);
            let b1=(this.buttom1.top-this.box.top+this.buttom1.height)-(a1*(this.buttom1.left-this.box.left+this.buttom1.width));
            let d1=Math.abs(a1*(this.x+this.vx)-(this.y+this.vy)+b1)/Math.sqrt(Math.pow(a1,2)+1);
            if(d1<=this.r )
            {
                this.o=Math.PI+this.o;
            } 
        }

        if(this.x+this.r+this.vx>this.top.left-this.box.left  && this.x+this.r+this.vx<this.top.left-this.box.left +this.r )
        {
            let a=Math.tan((3*Math.PI)/8);
            let b=(this.top.top-this.box.top)-(a*(this.top.left-this.box.left));
            let d=Math.abs(a*(this.x+this.vx)-(this.y+this.vy)+b)/Math.sqrt(Math.pow(a,2)+1);
            if(d<=this.r )
            {
                this.o=Math.PI+this.o;
            }
            let a1=Math.tan((13*Math.PI)/8);
            let b1=(this.buttom.top-this.box.top+this.buttom.height)-(a1*(this.buttom.left-this.box.left));
            let d1=Math.abs(a1*(this.x+this.vx)-(this.y+this.vy)+b1)/Math.sqrt(Math.pow(a1,2)+1);
            if(d1<=this.r )
            {
                this.o=Math.PI+this.o;
            } 
        }

        if(this.y+this.r+this.vy>this.right.top-this.box.top && this.y+this.r+this.vy<this.right.top-this.box.top+2*this.r)
        {
            let a=Math.tan((Math.PI)/4);
            let b=(this.left.top-this.box.top)-(a*(this.left.left-this.box.left));
            let d=Math.abs(a*(this.x+this.vx)-(this.y+this.vy)+b)/Math.sqrt(Math.pow(a,2)+1);
            if(d<=this.r )
            {
                this.o=Math.PI+this.o;
            }
            let a1=Math.tan((7*Math.PI)/4);
            let b1=(this.right.top-this.box.top)-(a1*(this.right.left-this.box.left+this.right.width));
            let d1=Math.abs(a1*(this.x+this.vx)-(this.y+this.vy)+b1)/Math.sqrt(Math.pow(a1,2)+1);
            if(d1<=this.r )
            {
                this.o=Math.PI+this.o;
            }
        }



        if(this.y-this.r+this.vy>this.right.top+this.right.height-this.box.top-2*this.r && this.y-this.r+this.vy<this.right.top+this.right.height-this.box.top)
        {
            let a=Math.tan((7*Math.PI)/4);
            let b=(this.left.top-this.box.top+this.left.height)-(a*(this.left.left-this.box.left));
            let d=Math.abs(a*(this.x+this.vx)-(this.y+this.vy)+b)/Math.sqrt(Math.pow(a,2)+1);
            if(d<=this.r )
            {
                this.o=Math.PI+this.o;
            }
            let a1=Math.tan((Math.PI)/4);
            let b1=(this.right.top-this.box.top+this.right.height)-(a1*(this.right.left-this.box.left+this.right.width));
            let d1=Math.abs(a1*(this.x+this.vx)-(this.y+this.vy)+b1)/Math.sqrt(Math.pow(a1,2)+1);
            if(d1<=this.r )
            {
                this.o=Math.PI+this.o;
            }
        }




        this.x=this.x+this.vx;
        this.y=this.y+this.vy;

        this.ball.style.top=this.y-this.r +'px';
        this.ball.style.left=this.x-this.r +'px';

        
    }
    remove()
    {
        this.ball.remove();
    }
    disaper()
    {
        this.ball.style.display="none";
        this.ball.style.top=0+'%';
        this.ball.style.left=0+'%';
        this.ball.style.display="block";
        this.ball_rec=this.ball.getBoundingClientRect();
        this.x=this.ball_rec.left+this.r-this.box.left;
        this.y=this.ball_rec.top+this.r-this.box.top;
    }
    apear(){
        this.ball.style.top=49+'%';
        this.ball.style.left=20+'%';
        this.ball.style.display="block";
        this.ball_rec=this.ball.getBoundingClientRect();
        this.x=this.ball_rec.left+this.r-this.box.left;
        this.y=this.ball_rec.top+this.r-this.box.top;
    }
}