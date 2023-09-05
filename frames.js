export default class frames {
    constructor(position,img,frame,offset)
    {
        this.x=position.x;
        this.y=position.y;
        this.img=new Image();
        this.img.src=img;
        this.fram=frame;
        this.count=0;
        this.offset=offset;
        this.wait=3;
        this.framcount=1;
        this.canshoot=false;
        this.waitcount=0;
    }
    drow(canvas)
    {
        const withimg=this.img.width/this.fram;
        const crop={
            x:withimg*this.count,
            y:0,
            with:withimg,
            height:this.img.height,
        }
        canvas.drawImage(this.img,crop.x,crop.y,crop.with,crop.height,this.x+this.offset.x,this.y+this.offset.y,crop.with,crop.height);
    }
    update(canvas)
    {
        if(this.count==5 && this.waitcount==0)
        {
            this.canshoot=true;
            this.waitcount++;
        }else{
            this.canshoot=false;
        }
        if(this.framcount % this.wait==0)
        {
            this.count++;
            this.waitcount=0;
        }
        if(this.count>=this.fram)
        {
            this.count=0;
        }
        this.framcount+=1;

    }
}
