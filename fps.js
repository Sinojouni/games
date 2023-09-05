const circle=document.getElementsByClassName("cir");
const news=document.getElementById('news');
const newslist=["blueviolet","red","green","blue"];
circle[0].style.backgroundColor="yellow";
news.style.backgroundColor=newslist[0];
var count=0;

var name=document.getElementById("one");
console.log(name);

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
    news.style.backgroundColor=newslist[count];
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
    }
    lasttime=time;
    window.requestAnimationFrame(move);
    fram++;
}
window.requestAnimationFrame(move)
