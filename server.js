var express=require("express")
var fetch=require("node-fetch")
var app=express()

app.use(express.static(__dirname+"/public"))

app.get('/',(req,res)=>{
    res.sendFile("public/index.html")
})

app.get('/search/:query',async (req,res)=>{
    var search=req.params.query
    await fetch(process.env.API_URL+search)
    .then(fetch_res=>fetch_res.json())
    .then(result=>res.send(result))
})

app.listen(process.env.PORT || 8000)