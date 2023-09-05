const circle=document.getElementsByClassName("cir");
const news=document.getElementById('news');
const t=document.getElementById('insid');
const newslist=["news3.png","news1.png","news.png"];
const newstext=["add new tower","add new orc modul","add 4 maps"];
circle[0].style.backgroundColor="yellow";
news.style.backgroundColor=newslist[0];
var count=0;


function change()
{
    if(count==0)
    {
        circle[newslist.length-1].style.backgroundColor="white";
    }
    else{
        circle[count-1].style.backgroundColor="white";
    }
    circle[count].style.backgroundColor="yellow";
    news.style.backgroundImage='url('+newslist[count]+')';
    t.innerHTML=newstext[count];
}
let lasttime
let fram=0;
function move(time){
    if(lasttime!=null){
        if(fram%200==0)
        {
            if(count>newslist.length-1)
            {
                count=0;
            }
            change();
            count++;
        }
        fram++;
    }
    lasttime=time;
    window.requestAnimationFrame(move);
}
window.requestAnimationFrame(move)
