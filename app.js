const express =require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
app.post("/",function(req,res){
  //console.log(req.body.cityName);
  const query=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=12a4972c8d6d5bb55634be7f782365c7";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      console.log(weatherData);
      const temp=weatherData.main.temp;
      const des=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      res.write("<p>Temperature is "+temp+"K in "+query+" .</p>");
      res.write("It is "+des+".");
      res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png>");
      res.send();
    })
  })
});








})





app.listen(3000,function(){
  console.log("ready 3000");
})
