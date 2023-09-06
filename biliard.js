import ball from './ball.js';
import stic from './stic.js';
import aim from './aim.js';
const siz=1482;
var playerone={
    name:"player 1",
    turn:true,
    class:'undifind',
    ballre:7
}
var playertwo={
    name:"player 2",
    turn:false,
    class:'undifind',
    ballre:7
}
const names=window.location.search;
const urlparams=new URLSearchParams(names);
if(urlparams.get('one')!='')
{
    playerone.name=urlparams.get('one');
}
if(urlparams.get('two')!='')
{
    playertwo.name=urlparams.get('two');
}


var pone=document.getElementById('name1');
var ptwo=document.getElementById('name2');

var text=document.getElementById('text');
var text2=document.getElementById('text2');

const myball =new ball(document.getElementById("ball"));
const mystic =new stic(document.getElementById("stic"));
const myaim=new aim(document.getElementById("aim"))
const balls=[];
const hols=[];
var j=0;
var stop;
var f=false;
var first=false;
var fol=false;
var undf=true;
var enterballs=[];
var tatches=[];
var firstshot=true;

var redc=0;
var yelc=0;
const plyonere=document.getElementsByClassName("ballre");
const plytwore=document.getElementsByClassName("ballre2");
var box=document.getElementById('gameplay').getBoundingClientRect();
const ball_class=document.getElementsByClassName("ballr");
for(let i=0 ;i<ball_class.length;i++)
{
    balls[i]=new ball(ball_class[i]);
    balls[i].class=ball_class[i].classList[1];
    myaim.balls[i]=balls[i].ball.getBoundingClientRect();
}

const hol=document.getElementsByClassName("hol");
for(let i=0 ;i<hol.length;i++)
{
    hols[i]=hol[i].getBoundingClientRect();
}


let lasttime;
function move(time){
    if(lasttime!=null){
        const deltatime=time-lasttime;
        myball.move(deltatime);

        pone.innerHTML=playerone.name;
        ptwo.innerHTML=playertwo.name;

        stop=true;
        for(let i=0 ;i<balls.length;i++)
        {
            balls[i].move(deltatime);
        }
        for(let i=0 ;i<balls.length;i++)
        {
            if(Math.sqrt(Math.pow(myball.x-balls[i].x,2)+Math.pow(myball.y-balls[i].y,2))<=2*myball.r && f==false)
            {
                colid(myball,balls[i]);
                tatches[tatches.length]=balls[i];
            }
        }
        for(let i=0;i<balls.length;i++)
        {
            for(j=i+1 ;j<balls.length;j++)
            {
                if(Math.sqrt(Math.pow(balls[i].x-balls[j].x,2)+Math.pow(balls[i].y-balls[j].y,2))<=2*myball.r )
                {
                    colid(balls[i],balls[j]);
                }
            }
        }

        for(let i=0;i<balls.length;i++)
        {
            for(let k=0 ;k<hols.length;k++)
            {
                if(Math.sqrt(Math.pow(balls[i].x-balls[i].vx-(hols[k].left+(hols[k].height/2)-box.left),2)+Math.pow(balls[i].y-balls[i].vy-((hols[k].top+(hols[k].height/2)-box.top)),2))<((hols[k].height/2)+myball.r) )
                {
                    enterballs[enterballs.length]=balls[i];
                    balls[i].v=0;
                    balls[i].remove();
                    balls.splice(i,1);
                    break;
                }
            }
        }
        for(let k=0 ;k<hols.length;k++)
        {
            if(Math.sqrt(Math.pow(myball.x-myball.vx-(hols[k].left+(hols[k].height/2)-box.left),2)+Math.pow(myball.y-myball.vy-(hols[k].top+(hols[k].height/2)-box.top),2))<((hols[k].height/2)+myball.r) &&  f==false &&shoot==false)
            {
                fol=true;
                myball.disaper();
                myball.v=0;
            }
        }

        for(let i=0 ;i<balls.length;i++)
        {
            if(balls[i].v!=0 || myball.v!=0)
            {
                stop=false;
            }
        }
        if(stop==true)
        {
            if(firstshot==true)
            {
                players(playerone,playertwo);
            }
            if(first==true)
            {
                if(fol==true)
                {
                    fole(myball);
                    alert("fole: white ball enter a hole");
                }

                if(tatches.length==0)
                {
                    fol=true;
                    alert("fole: white ball did not touch any ball ");
                }
                if(tatches.length!=0 && undf==false)
                {
                    if(playerone.turn==true)
                    {
                        if(tatches[0].class!=playerone.class)
                        {
                            if(tatches[0].class!='black')
                            {
                                fol=true;
                                alert("fole: white ball did not touch  "+playerone.class+" ball first");
                            }
                            if(tatches[0].class=='black' && playerone.ballre!=0)
                            {
                                fol=true;
                                alert("fole: white ball did not touch  "+playerone.class+" ball first");
                            }
                        }
                    }else{
                        if(tatches[0].class!=playertwo.class)
                        {
                            if(tatches[0].class!='black')
                            {
                                fol=true;
                                alert("fole: white ball did not touch  "+playertwo.class+" ball first");
                            }
                            if(tatches[0].class=='black' && playertwo.ballre!=0)
                            {
                                fol=true;
                                alert("fole: white ball did not touch  "+playertwo.class+" ball first");
                            }
                        }
                    }
                }


                if(enterballs.length!=0 && firstshot==true)
                {
                    for(let h=0;h<enterballs.length;h++)
                    {
                        if(enterballs[h].class=='red')
                        {
                            redc+=1;
                        }
                        if(enterballs[h].class=='yel')
                        {
                            yelc+=1;
                        }
                    }
                }


                if(enterballs.length!=0 && undf==false)
                {
                    let count=0;
                    if(playerone.turn==true)
                    {
                        for(let h=0;h<enterballs.length;h++)
                        {
                            if(enterballs[h].class==playerone.class)
                            {
                                playerone.ballre-=1;
                                count++;
                            }
                            else if(enterballs[h].class==playertwo.class)
                            {
                                playertwo.ballre-=1;
                            }
                            else if(enterballs[h].class=='black')
                            {
                                if(playerone.ballre!=0)
                                {
                                    gameover(playertwo);
                                }else{
                                    if(fol==true)
                                    {
                                        gameover(playertwo);
                                    }else
                                    {
                                        gameover(playerone);
                                    }
                                }
                            }
                        }
                        if(count==0 && fol==false)
                        {
                            playerone.turn=!playerone.turn;
                            playertwo.turn=!playertwo.turn;
                        }
                    }else
                    {
                        for(let h=0;h<enterballs.length;h++)
                        {
                            if(enterballs[h].class==playertwo.class)
                            {
                                playertwo.ballre-=1;
                                count++;
                            }
                            else if(enterballs[h].class==playerone.class)
                            {
                                playerone.ballre-=1;
                            }
                            else if(enterballs[h].class=='black')
                            {
                                if(playertwo.ballre!=0)
                                {
                                    gameover(playerone);
                                }else{
                                    if(fol==true)
                                    {
                                        gameover(playerone);
                                    }else
                                    {
                                        gameover(playertwo);
                                    }
                                }
                            }
                        }
                        if(count==0 && fol==false)
                        {
                            playerone.turn=!playerone.turn;
                            playertwo.turn=!playertwo.turn;
                        }
                    }
                }

                if(enterballs.length!=0 && firstshot==false && undf==true)
                {
                    if(playerone.turn==true)
                    {
                        if(enterballs[0].class=='red')
                        {
                            playerone.class=enterballs[0].class;
                            playertwo.class='yel';
                            playerone.ballre-=redc;
                            playertwo.ballre-=yelc;
                        }
                        if(enterballs[0].class=='yel')
                        {
                            playerone.class=enterballs[0].class;
                            playertwo.class='red';
                            playerone.ballre-=yelc;
                            playertwo.ballre-=redc;
                        }
                        if(enterballs[0].class=='black')
                        {
                            gameover(playertwo);
                        }
                        for(let h=0;h<enterballs.length;h++)
                        {
                            if(enterballs[h].class==playerone.class)
                            {
                                playerone.ballre-=1;
                            }
                            else if(enterballs[h].class==playertwo.class)
                            {
                                playertwo.ballre-=1;
                            }
                            else if(enterballs[h].class=='black')
                            {
                                gameover(playertwo);
                            }
                        }
                    }else{
                        if(enterballs[0].class=='red')
                        {
                            playertwo.class=enterballs[0].class;
                            playerone.class='yel';
                            playertwo.ballre-=redc;
                            playerone.ballre-=yelc;
                        }
                        if(enterballs[0].class=='yel')
                        {
                            playertwo.class=enterballs[0].class;
                            playerone.class='red';
                            playertwo.ballre-=yelc;
                            playerone.ballre-=redc;
                        }
                        if(enterballs[0].class=='black')
                        {
                            gameover(playerone);
                        }


                        for(let h=0;h<enterballs.length;h++)
                        {
                            if(enterballs[h].class==playertwo.class)
                            {
                                playertwo.ballre-=1;
                            }
                            else if(enterballs[h].class==playerone.class)
                            {
                                playerone.ballre-=1;
                            }
                            else if(enterballs[h].class=='black')
                            {
                                gameover(playerone);
                            }
                        }
                    }
                    undf=false;
                }
                if(enterballs.length==0 || fol==true)
                {
                    playerone.turn=!playerone.turn;
                    playertwo.turn=!playertwo.turn;
                }
                mystic.apear();
                myaim.balls=[];
                for(let i=0 ;i<balls.length;i++)
                {
                    myaim.balls[i]=balls[i].ball.getBoundingClientRect();;
                }
                myaim.o=mystic.o;
                myaim.apear();
                enterballs=[];
                tatches=[];
                first=false;
                firstshot=false;
                players(playerone,playertwo);
                ballrefun();
            }
            mystic.move(deltatime);
            myaim.move();
        }
    }
    lasttime=time;
    window.requestAnimationFrame(move);
}
window.requestAnimationFrame(move)

function colid(ball1 ,ball2)
{
    let dx= ball1.x - ball2.x;
    let dy= ball1.y - ball2.y;

    let d=Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));

    const mtdx=dx*(((2*myball.r)-d)/d);
    const mtdy=dy*(((2*myball.r)-d)/d);

    ball1.x+=mtdx/2;
    ball1.y+=mtdy/2;

    
    ball2.x-=mtdx/2;
    ball2.y-=mtdy/2;

    let collisionAngle = Math.atan2(dy, dx);

    let final_velocityx_1 = ball2.v * Math.cos(ball2.o - collisionAngle);
    let final_velocityx_2 = ball1.v * Math.cos(ball1.o - collisionAngle);
    let final_velocityy_1 = ball1.v * Math.sin(ball1.o - collisionAngle);
    let final_velocityy_2 = ball2.v * Math.sin(ball2.o - collisionAngle);


    let ball1velocityx = Math.cos(collisionAngle) * final_velocityx_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_1;
    let ball1velocityy = Math.sin(collisionAngle) * final_velocityx_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_1;
    let ball2velocityx = Math.cos(collisionAngle) * final_velocityx_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityy_2;
    let ball2velocityy = Math.sin(collisionAngle) * final_velocityx_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityy_2;


    ball1.v = Math.sqrt(ball1velocityx * ball1velocityx + ball1velocityy * ball1velocityy);
    ball2.v = Math.sqrt(ball2velocityx * ball2velocityx + ball2velocityy * ball2velocityy);
 
    ball1.o = Math.atan2(ball1velocityy, ball1velocityx);
    ball2.o = Math.atan2(ball2velocityy, ball2velocityx);
}

function mov(e){
    switch(e.keyCode)
    {
        case 37:
            mystic.o+=(Math.PI/600);
            myaim.o=mystic.o;
            break;
        case 39:
            mystic.o-=(Math.PI/600);
            myaim.o=mystic.o;
            break;
    }
}
document.addEventListener('keydown',mov,false)

var mouse=0;
var mousd=0;
var v;
let control=document.getElementById('control').getBoundingClientRect();
let speed=document.getElementById('speed');
var shoot=false;
document.addEventListener('mousedown', (event) => {
    if(event.button==0)
    {
        if(firstshot==true)
        {
            if(event.clientX-box.left>myball.x-myball.r && event.clientX-box.left<myball.x+myball.r)
            {
                if(event.clientY-box.top>myball.y-myball.r && event.clientY-box.top<myball.y+myball.r)
                {
                    shoot=true;
                    mystic.disepear();
                    myaim.disepear();
                }
            }
        }

        if(fol==true)
        {
            if(event.clientX-box.left>myball.x-myball.r && event.clientX-box.left<myball.x+myball.r)
            {
                if(event.clientY-box.top>myball.y-myball.r && event.clientY-box.top<myball.y+myball.r)
                {
                    f=true;
                    mystic.disepear();
                    myaim.disepear();
                }
            }
        }
        mouse+=1;
        mousd+=1;
        document.addEventListener('mousemove', (event) => {
            if(event.clientX<=(control.left+control.width) && event.clientX>control.left && mouse==1){
                if(event.clientY<=(control.top+control.height) && event.clientY>control.top)
                {
                  speed.style.top = event.clientY-control.top + 'px';
                  v=(((event.clientY-control.top)/control.height)*22)*(window.innerWidth/siz);
                  mystic.stic.style.right=(125+10*v)+'%';
                  mystic.stic.style.transformOrigin=(102.5+(v/3))+'%'+ '50%';
                }
            }
            if(event.clientX<=(box.left+box.width-myball.r) && event.clientX>box.left+myball.r && mousd==1){
                if(event.clientY<=(box.top+box.height-myball.r) && event.clientY>box.top+myball.r)
                {
                    if(f==true)
                    {
                        myball.x=event.clientX-box.left;
                        myball.y=event.clientY-box.top;
                    }
                    else{
                        let angle=Math.atan2(((event.pageY-box.top)-myball.y),((event.pageX-box.left)-myball.x));
                        if(angle>2*Math.PI)
                        {
                            angle-=2*Math.PI;
                        }
                
                        if(angle<0)
                        {
                            angle+=2*Math.PI;
                        }
                        mystic.o=angle;
                        myaim.o=mystic.o;
                    }
                }
            }

            if(event.clientX<=((box.left+box.width)/2.75) && event.clientX>(box.left+myball.r) && mousd==1){
                if(event.clientY<=(box.top+box.height-myball.r) && event.clientY>box.top+myball.r)
                {
                    if(shoot==true)
                    {
                        myball.x=event.clientX-box.left;
                        myball.y=event.clientY-box.top;
                    } 
                }
            }

        });
    }
});

document.addEventListener('mouseup', (event) => {

    if(event.button==0)
    {
        if(stop==true)
        {
            if(v>0.5)
            {
                myball.o=mystic.o;
                myball.v=v;
                mystic.disepear();
                myaim.disepear();
                first=true;
                fol=false;
            }
            speed.style.top = 1+ '%';
        }
        mouse=0;
        mousd=0;
        if(f==true || shoot==true)
        {
            let aimcount=0;
            let holcount=0;
            for(let i=0;i<balls.length;i++)
            {
                if(Math.sqrt(Math.pow(myball.x-balls[i].x,2)+Math.pow(myball.y-balls[i].y,2))<2*myball.r )
                {
                    aimcount++;
                }
            }
            for(let k=0;k<hols.length;k++)
            {
                if(Math.sqrt(Math.pow(myball.x-(hols[k].left+(hols[k].height/2)-box.left),2)+Math.pow(myball.y-(hols[k].top+(hols[k].height/2)-box.top),2))<(myball.r+(hols[k].height/2)) )
                {
                   holcount++;
                }
            }
            if(aimcount==0 && holcount==0)
            {
                mystic.apear();
                myaim.balls=[];
                for(let i=0 ;i<ball_class.length;i++)
                {
                    myaim.balls[i]=ball_class[i].getBoundingClientRect();
                }
                myaim.o=mystic.o;
                myaim.apear();
                f=false;
                shoot=false;
            }else{
                window.alert('you cant put the ball her put it somwher else');
            }
        }
    }
    v=0;
    mystic.stic.style.right='125%';
    mystic.stic.style.transformOrigin='102.5%'+ '50%';
});

function fole(ball)
{
    ball.apear();
}
function gameover(player)
{
    const url='winbil.html';
    window.location.href=`${url}?score=${player.name}`;
}

function players(player1, player2)
{
    if(player1.turn==true)
    {
        text.style.borderColor='green';
        text2.style.borderColor='black';
    }
    else{
        text.style.borderColor='black';
        text2.style.borderColor='green';
    }
}

function ballrefun()
{
    if(undf==false)
                {
                    for(let b=0;b<plyonere.length;b++)
                    {
                        if(b<=(playerone.ballre-1))
                        {
                            if(playerone.class=='red')
                            {
                                plyonere[b].style.backgroundImage='url(spr_redBall2.png)';
                                plyonere[b].style.backgroundPosition= 'center center';
                            }else{
                                plyonere[b].style.backgroundImage='url(spr_yellowBall2.png)';
                                plyonere[b].style.backgroundPosition= 'center center';
                            }
                        }else{
                            plyonere[b].style.backgroundColor='black';
                            plyonere[b].style.backgroundImage='none';
                        }
                    }

                    for(let b=0;b<plytwore.length;b++)
                    {
                        if(b<=(playertwo.ballre-1))
                        {
                            if(playertwo.class=='red')
                            {
                                plytwore[b].style.backgroundImage='url(spr_redBall2.png)';
                                plytwore[b].style.backgroundPosition= 'center center';
                            }else{
                                plytwore[b].style.backgroundImage='url(spr_yellowBall2.png)';
                                plytwore[b].style.backgroundPosition= 'center center';
                            }
                        }else{
                            plytwore[b].style.backgroundColor='black';
                            plytwore[b].style.backgroundImage='none';
                        }
                        
                    }
                }
}


window.onresize=() => {
    var wi=window.innerWidth;
    myball.x*=(wi/myball.siz);
    myball.y*=(wi/myball.siz);
    myball.res*=(wi/myball.siz);
    myball.v*=(wi/myball.siz);
    myball.box=document.getElementById('gameplay').getBoundingClientRect();
    myball.ball_rec=myball.ball.getBoundingClientRect();
    myball.r=myball.ball_rec.height/2;
    myball.top=document.getElementById('bart2').getBoundingClientRect();
    myball.top1=document.getElementById('bart1').getBoundingClientRect();
    myball.buttom=document.getElementById('barb2').getBoundingClientRect();
    myball.buttom1=document.getElementById('barb1').getBoundingClientRect();
    myball.right=document.getElementById('barr').getBoundingClientRect();
    myball.left=document.getElementById('barl').getBoundingClientRect();
    myball.to=document.getElementById('top').getBoundingClientRect();
    myball.bu=document.getElementById('buttom').getBoundingClientRect();
    myball.le=document.getElementById('left').getBoundingClientRect();
    myball.ri=document.getElementById('right').getBoundingClientRect();
    myball.siz=wi;
    for(let i=0 ;i<balls.length;i++)
    {
        balls[i].x*=(wi/balls[i].siz);
        balls[i].y*=(wi/balls[i].siz);
        balls[i].res*=(wi/balls[i].siz);
        balls[i].v*=(wi/balls[i].siz);
        balls[i].box=document.getElementById('gameplay').getBoundingClientRect();
        balls[i].ball_rec=balls[i].ball.getBoundingClientRect();
        balls[i].r=balls[i].ball_rec.height/2;
        balls[i].top=document.getElementById('bart2').getBoundingClientRect();
        balls[i].top1=document.getElementById('bart1').getBoundingClientRect();
        balls[i].buttom=document.getElementById('barb2').getBoundingClientRect();
        balls[i].buttom1=document.getElementById('barb1').getBoundingClientRect();
        balls[i].right=document.getElementById('barr').getBoundingClientRect();
        balls[i].left=document.getElementById('barl').getBoundingClientRect();
        balls[i].siz=wi;
    }

    myaim.box=document.getElementById('gameplay').getBoundingClientRect();
    myaim.ball=document.getElementById('ball').getBoundingClientRect();
    myaim.aim_rec=myaim.aim.getBoundingClientRect();
    myaim.r=myaim.ball.height/2;
    myaim.x=myaim.ball.left-myaim.box.left+(myaim.ball.height/2)+myaim.aim_rec.width;
    myaim.y=myaim.ball.top+(myaim.ball.height/2)-myaim.box.top;
    myaim.xr=myaim.box.right-myaim.ball.right+(myaim.ball.height/2);
    myaim.yb=myaim.box.bottom-myaim.ball.bottom+(myaim.ball.height/2);
    for(let i=0 ;i<balls.length;i++)
    {
        myaim.balls[i]=balls[i].ball.getBoundingClientRect();;
    }
    box=document.getElementById('gameplay').getBoundingClientRect();
    for(let i=0 ;i<hol.length;i++)
    {
        hols[i]=hol[i].getBoundingClientRect();
    }
    control=document.getElementById('control').getBoundingClientRect();
}







document.addEventListener('touchstart', (event) => {
    if(firstshot==true)
    {
        if(event.touches[0].clientX-box.left>myball.x-myball.r && event.touches[0].clientX-box.left<myball.x+myball.r)
        {
            if(event.touches[0].clientY-box.top>myball.y-myball.r && event.touches[0].clientY-box.top<myball.y+myball.r)
            {
                shoot=true;
                mystic.disepear();
                myaim.disepear();
            }
        }
    }

    if(fol==true)
    {
        if(event.touches[0].clientX-box.left>myball.x-myball.r && event.touches[0].clientX-box.left<myball.x+myball.r)
        {
            if(event.touches[0].clientY-box.top>myball.y-myball.r && event.touches[0].clientY-box.top<myball.y+myball.r)
            {
                f=true;
                mystic.disepear();
                myaim.disepear();
            }
        }
    }
    mouse+=1;
    mousd+=1;
    document.addEventListener('touchmove', (event) => {
        if(event.touches[0].clientX<=(control.left+control.width) && event.touches[0].clientX>control.left && mouse==1){
            if(event.touches[0].clientY<=(control.top+control.height) && event.touches[0].clientY>control.top)
            {
              speed.style.top = event.touches[0].clientY-control.top + 'px';
              v=(((event.touches[0].clientY-control.top)/control.height)*22)*(window.innerWidth/siz);
              mystic.stic.style.right=(125+10*v)+'%';
              mystic.stic.style.transformOrigin=(102.5+(v/3))+'%'+ '50%';
            }
        }
        if(event.touches[0].clientX<=(box.left+box.width-myball.r) && event.touches[0].clientX>box.left+myball.r && mousd==1){
            if(event.touches[0].clientY<=(box.top+box.height-myball.r) && event.touches[0].clientY>box.top+myball.r)
            {
                if(f==true)
                {
                    myball.x=event.touches[0].clientX-box.left;
                    myball.y=event.touches[0].clientY-box.top;
                }
                else{
                    let angle=Math.atan2(((event.touches[0].clientY-box.top)-myball.y),((event.touches[0].clientX-box.left)-myball.x));
                    if(angle>2*Math.PI)
                    {
                        angle-=2*Math.PI;
                    }
            
                    if(angle<0)
                    {
                        angle+=2*Math.PI;
                    }
                    mystic.o=angle;
                    myaim.o=mystic.o;
                }
            }
        }

        if(event.touches[0].clientX<=((box.left+box.width)/2.75) && event.touches[0].clientX>(box.left+myball.r) && mousd==1){
            if(event.touches[0].clientY<=(box.top+box.height-myball.r) && event.touches[0].clientY>box.top+myball.r)
            {
                if(shoot==true)
                {
                    myball.x=event.touches[0].clientX-box.left;
                    myball.y=event.touches[0].clientY-box.top;
                } 
            }
        }

    });
});


document.addEventListener('touchend', (event) => {
    if(stop==true)
    {
        if(v>0.5)
        {
            myball.o=mystic.o;
            myball.v=v;
            mystic.disepear();
            myaim.disepear();
            first=true;
            fol=false;
        }
        speed.style.top = 1+ '%';
    }
    mouse=0;
    mousd=0;
    if(f==true || shoot==true)
    {
        let aimcount=0;
        let holcount=0;
        for(let i=0;i<balls.length;i++)
        {
            if(Math.sqrt(Math.pow(myball.x-balls[i].x,2)+Math.pow(myball.y-balls[i].y,2))<2*myball.r )
            {
                aimcount++;
            }
        }
        for(let k=0;k<hols.length;k++)
        {
            if(Math.sqrt(Math.pow(myball.x-(hols[k].left+(hols[k].height/2)-box.left),2)+Math.pow(myball.y-(hols[k].top+(hols[k].height/2)-box.top),2))<(myball.r+(hols[k].height/2)) )
            {
               holcount++;
            }
        }
        if(aimcount==0 && holcount==0)
        {
            mystic.apear();
            myaim.balls=[];
            for(let i=0 ;i<ball_class.length;i++)
            {
                myaim.balls[i]=ball_class[i].getBoundingClientRect();
            }
            myaim.o=mystic.o;
            myaim.apear();
            f=false;
            shoot=false;
        }else{
            window.alert('you cant put the ball her put it somwher else');
        }
    }
    v=0;
    mystic.stic.style.right='125%';
    mystic.stic.style.transformOrigin='102.5%'+ '50%';
});