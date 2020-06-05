//console.log=()=>{}
var queue=[]
var select=false
var flag=''
var play=true
//Set the youtube player !!
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: 'ALZHF5UqnU4',
    loop:'0',
    events: {
       'onReady': onPlayerReady,
       'onStateChange': onPlayerStateChange,
     }
  });
}

function onPlayerStateChange(data){
    data=data.data
    if(data==-1 && flag=='Finished'){
        flag='Finished'
    }
    else if(data==1){
        flag='Playing'
    }
    else if(data==2){
        flag='Paused'
    }
    else if(data==3){
        flag='Loading'
    }
    else if(data==0 || data==5){
        //player.stopVideo()
        flag='Finished'
    }
    else flag='Error'
    //console.log(data)

    document.getElementById("process").innerHTML=flag
    if(data==0 && queue.length>1){
        player.loadVideoById(queue[1][0])
        document.getElementById("musicHead").innerHTML=String(queue[1][1])
        queue.shift()
    }
    if(data==0 && queue.length==1){
        document.getElementById('p/p').innerHTML="Play"
        play=!play
    }
}


function onPlayerReady(){
    player.setPlaybackQuality('small')
}

////Globally

//Music start and queue handler
function Notify(toast){
    var text=document.getElementById('musicHead1')
    var val=text.innerHTML
    text.innerHTML=toast
    setTimeout(()=>{text.innerHTML=val},2000)   

}

function getID(obj){
    select=true
    var vId=obj.getAttribute('data')
    var title=obj.getAttribute('title')
    document.getElementById("musicHead").innerHTML=String(title)
    player.clearVideo()
    document.getElementById("p/p").innerHTML="Pause"
    play=true
    player.loadVideoById(vId)
    player.playVideo()
    if(queue.length>0){
        queue.shift()
    }
    var inside=false
    for(var i=0;i<queue.length;i++){
        if(queue[i].includes(vId)){
            inside=true   
        }
        else{
            break;
        }    
    }

    if(inside){
        Notify('Already in Queue')
    }
    else{
        queue.push([vId,title])
        Notify('Playing Now')
    }
}

function addQueue(obj){
    var Vid=obj.getAttribute('data')
    var title=obj.getAttribute('title')
    var inside=false
    for(var i=0;i<queue.length;i++){
            if(queue[i].includes(Vid)){
                inside=true
                break   
            }  
        }

        if(inside){
            Notify('Already in Queue')
        }
        else{
            queue.push([Vid,title])
            Notify('Added to Queue')
        }
}

//code for player control

function toggle(){
    play=!play
    if (play){
        // if (queue.length==1){
        //     player.
        // }
        player.playVideo()
        return 'Pause'
    }
    else{
        player.pauseVideo()
        return 'Play'
    }
}
function listner(){
    var playon=document.getElementById('p/p')
    var skip=document.getElementById('skip')

    playon.addEventListener('click',()=>{
        if (select){
        playon.innerHTML=toggle()
        }
        else{
            Notify('Select a Music first')
        }
    })
    skip.addEventListener('click',()=>{
        if (queue.length > 0){
            player.clearVideo()
            queue.shift()
            player.loadVideoById(queue[0][0])
            document.getElementById("musicHead").innerHTML=String(queue[0][1])
            }
        else{
            Notify('Your Queue is empty')
        }
        console.log(queue)
    })
}
//code for handling search query
function str(imgUrl,title,ID){
    var button=String('<div style="margin-left:auto;"><button id="select" style="width:100px;background-color:#48bb78;color:azure;border-radius:80px;margin-right: 2vw;outline: none;" onclick="getID(this);" data="'+ ID +'" title="'+title+'">Play</button><button id="qit" style="width:100px;background-color:#48bb78;color:azure;border-radius:80px;outline: none;" onclick="addQueue(this);" data="'+ ID +'" title="'+title+'">Queue</button></div>')
    return String('<div style="margin-top:10px;margin-left:0px"><div class="cardArea h-full bg-gray-200 p-8 rounded"><img width=70 height=70 src='+imgUrl+'>'+'<div class="cardTitle"">'+title+'</div>' +button+'</div></div>')
}
function str2(s){
    return String('<div style="margin-top:10px;margin-left:0px"><div ><div style="justify-content:center" class="h-full bg-gray-200 p-8 flex flex-wrap rounded">'+s+'</div></div></div>')
}

function populate(videos){
    Queue=''
    //Queue+=str(item.snippet.thumbnails.default.url,item.snippet.title)+'<br>'
     videos.map(item=>{
         Queue+=str(item.url,item.title,item.VideoId)
     })
    document.getElementById('queue').innerHTML=Queue
}

async function request(searchQuery){
     let url = 'https://youtube-search-results-api.herokuapp.com/youtube/' + searchQuery
     fetch(url,{method:'GET'})
     .then(res=>res.json())
     .then(res=>{
         console.log(res)
         if (res.length>0){
         data=res.splice(0,10)
         console.log(data)
         populate(data)
         }
         else{
             document.getElementById('queue').innerHTML=str2("No Result found. Try again !!!")
         }
    
     })
     .catch(error=>str2('Result not found. Try again !!!'))
}

function Go(){
    var query=document.getElementById('search').value
    var card=document.getElementById('queue')
    if (query!=''){
        card.innerHTML='<div style="display:flex;justify-content:center;align-items:center;margin-top:40px;"><div class="loader"></div></div>'
        request(query)
    }
    else{
    card.innerHTML=str2("Query can't be empty")        
    }
}

function back(){
  console.log('here')
  document.getElementById('queue').innerHtml=''
}

function init(){
    document.getElementById('page').classList.remove("loading")
    document.getElementById('load').style.display="none"
    listner()
    var go=document.getElementById('go')
    go.addEventListener('click',Go)

    document.getElementById('search')
    .addEventListener('keypress',(e)=>{
        if(e.charCode==13){
            Go()
        }
    
    })

    document.getElementById('home')
    .addEventListener('click',()=>console.log('back'))
}

function prepare(){
    setTimeout(init,2000)
}

//main driver code
document.addEventListener('DOMContentLoaded',prepare)

function changeVol(val){
  //var val=document.getElementById('range')
  player.setVolume(val)
  console.log(val)
}