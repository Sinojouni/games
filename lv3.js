import enamy from './enmay.js';
import placement from './placement.js';
import build from './build.js';
import frames from './frames.js';

const canvas=document.querySelector('canvas');
const helth=document.getElementById('blood');
const mony=document.getElementById('coin');
const can=canvas.getContext('2d');
const score=document.getElementById('score');
var wavecount=0;
score.innerHTML=wavecount;

canvas.width=1464;
canvas.height=768;
can.fillRect(0,0,canvas.width,canvas.height);
const points=[ 
    {
     x:-164.647872226391,
     y:133.019937828277
    }, 
    {
     x:1055.11844785079,
     y:157.787544216958
    }, 
    {
     x:1055.11844785079,
     y:411.619680565977
    }, 
    {
     x:212.670168292421,
     y:414.36381176975
    }, 
    {
     x:214.042233894308,
     y:672.312144924429
    }, 
    {
     x:1426.94822596205,
     y:672.312144924429
    }]

const plac=[14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 0, 0, 0, 14, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    14, 0, 0, 0, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 14, 0, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const towers=['./tower.png','./tower2.png','./tower3.png','./tower4.png'];
    const proj=['./projectile.png','./projectile2.png','./projectile3.png','./projectile4.png'];
    const pic=['./untitled1.png','./untitled2.png','./untitled3.png','./untitled4.png','./untitled5.png'];
    const p=['./p2.png','./p3.png','./p4.png','./p5.png'];



    const picimg=[];
    const pimg=[];
    
    for(let i=0 ;i<pic.length;i++)
    {
        let imgp=new Image();
        imgp.src=pic[i];
        picimg.push(imgp);
    }
    
    for(let i=0 ;i<p.length;i++)
    {
        let imgp=new Image();
        imgp.src=p[i];
        pimg.push(imgp);
    }
    
    let img2=new Image();
    img2.src='./p1.png';



    const ind={tower:towers,projec:proj};
    const damage=[20,30,40,50];
    var index=null;
    const off=64;
    const h=176;
    var picindex=0;

    const wavebut=document.getElementById('wave');
    
    const place=[];
    for(let j=0;j<plac.length;j+=20)
    {
        place.push(plac.slice(j,j+20));
    }
    var mouse={
        x:0,
        y:0
    }
    const img=new Image();
    img.onload=()=>{
        can.drawImage(img,0,0)
    }
    img.src='map3.png';
    
    const enm=[];
    const placements=[];
    const building=[];
    const explosion=[];
    var life=10;
    var coin=150;
    
    place.forEach((row,y)=>{
        row.forEach((index,x)=>{
            if(index==14)
            {
                const location=new placement({x:x*64,y:y*64})
                placements.push(location);
            }
        })
    });
    var enmycount=5;
    var enmycount2=-1;
    var enmycount3=-2;
    function wave(count,count2,count3)
    {
        for(let i=0;i<count;i++)
        {
            let offset=i*150;
            const enamy1=new enamy({x:points[0].x-offset,y:points[0].y},'./orc.png',100);
            enm.push(enamy1);
        }
        for(let j=0;j<count2;j++)
        {
            let offset=(count+j)*150;
            const enamy1=new enamy({x:points[0].x-offset,y:points[0].y},'./orc2.png',150);
            enm.push(enamy1);
        }
        for(let k=0;k<count3;k++)
        {
            let offset=(count2+count+k)*150;
            const enamy1=new enamy({x:points[0].x-offset,y:points[0].y},'./orc3.png',200);
            enm.push(enamy1);
        }
        wavecount++;
        score.innerHTML=wavecount;
    }
    
    let lasttime=0;
    let fram=0;
    mony.innerHTML=coin;
    helth.innerHTML=life;
    function move(time){
        if(lasttime!=null){
            if(enm.length!=0)
            {
                wavebut.style.opacity='0';
            }else{
                wavebut.style.opacity='1';
            }
            if(coin<50)
            {
                picindex=0;
            }else if(coin<100)
            {
                picindex=1;
            }else if(coin<150)
            {
                picindex=2;
            }else if(coin<200)
            {
                picindex=3;
            }else
            {
                picindex=4;
            }
            drow();
            can.drawImage(img,0,0)
            if(life==0){
                gameover();
                window.cancelAnimationFrame();
            }
            for(let i=0;i<enm.length;i++)
            {
                let remove=false;
                enm[i].update(can,points);
                if(enm[i].blood<=0)
                {
                    remove=true;
                    coin+=25;
                }
                if(enm[i].x>1280)
                {
                    remove=true;
                    life-=1;
                    helth.innerHTML=life;
                }
                if(remove)
                {
                    enm.splice(i,1);
                    mony.innerHTML=coin;
                }
            }
            for(let i=0;i<explosion.length;i++)
            {
                explosion[i].drow(can);
                explosion[i].update(can);
                if(explosion[i].framcount>explosion[i].fram)
                {
                    explosion.splice(i,1);
                }
            }
            for(let i=0;i<placements.length;i++)
            {
                placements[i].update(can,mouse);
            }
            for(let i=0;i<building.length;i++)
            {
                building[i].drow(can);
                building[i].target=null;
                for(let k=0;k<enm.length;k++)
                {
                    let dx=building[i].center.x-enm[k].center.x;
                    let dy=building[i].center.y-enm[k].center.y;
                    let dis=Math.hypot(dx,dy);
                    if(dis<building[i].range)
                    {
                        building[i].target=enm[k];
                        break;
                    }
                }
                if(building[i].target || building[i].count!=0)
                {
                    building[i].update(can);
                }
                if(building[i].canshoot)
                {
                    if(building[i].target)
                    {
                        building[i].shoot(building[i].target);
                    }
                }
                for(let j=0 ;j<building[i].bullets.length;j++)
                {
                    building[i].bullets[j].update(can);
                    let dis=building[i].bullets[j].dis;
                    if(dis<building[i].bullets[j].target.rad+building[i].bullets[j].siz)
                    {
                        explosion.push(new frames({x:building[i].bullets[j].x,y:building[i].bullets[j].y},'./explosion.png',4,{x:0,y:0}))
                        building[i].bullets[j].target.blood-=building[i].bullets[j].damage;
                        building[i].bullets.splice(j,1);
                    }
                }
            }
            fram++;
        }
        lasttime=time;
        window.requestAnimationFrame(move);
    }
    window.requestAnimationFrame(move)
    
    var activplace=null;
    
    canvas.addEventListener('click',(event)=>{
        if(activplace && activplace.isfree && index!=null)
        {
            let offset=-80;
            if(index>1)
            {
                offset=-120;
            }
            let buil=new build({x:activplace.x,y:activplace.y},ind.tower[index],ind.projec[index],damage[index],offset);
            building.push(buil);
            building.sort((a,b)=>{
                return a.y-b.y;
            });
            coin-=50*(index+1);
            mony.innerHTML=coin;
            activplace.isfree=false;
            index=null;
        }
        if(event.clientX>1260)
        {
            for(let i=0;i<pic.length-1;i++)
            {
                if(event.clientY>(h*i)+off && event.clientY<(h*(i+1))+off)
                {
                    if(coin>=(i+1)*50)
                    {
                        index=i;
                    }else{
                        index=null;
                    }
                }
            }
        }
    });
    
    window.addEventListener('mousemove',(event)=>{
        activplace=null;
        mouse.x=event.clientX;
        mouse.y=event.clientY;
        for(let i=0;i<placements.length;i++)
        {
           if(placements[i].colid)
           {
            activplace=placements[i];
            if(index!=null)
            {
                placements[i].isindex=true;
            }
           }
           if(index==null)
           {
            placements[i].isindex=false;
           }
        }
    });
    
    function drow()
    {
        can.fillStyle='black'
        can.fillRect(1280,0,202,768);
        can.drawImage(picimg[picindex],1280,0)
        if(index==null)
        {
            can.drawImage(img2,1280,0);
        }else{
            can.drawImage(pimg[index],1280,0);
        }
    }
    wavebut.addEventListener('click',()=>{
        if(enm.length==0)
        {
            wave(enmycount,enmycount2,enmycount3);
            enmycount++;
            enmycount2++;
            enmycount3++;
        }
    })
function gameover()
{
    const url='winlv3.html';
    window.location.href=`${url}?score=${wavecount}`;
}