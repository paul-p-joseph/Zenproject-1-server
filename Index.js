const express = require("express");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const cors = require("cors");
const app = express();
const dbUrlAltas = "mongodb+srv://zen_project_db:ArlF8m0585CzK4S6@zen-project.b1wta.mongodb.net/b20wd_db?retryWrites=true&w=majority"
app.use(cors())
app.use(express.json())


app.get("/",async(req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbUrlAltas);
        let db = await clientInfo.db('b20wd_db');
        let data = await db.collection('Bookkeeping').find().toArray();
        res.status(200).json(data);
        clientInfo.close();
    } catch(error){console.log(error)}
      
       });
       
app.post("/create-bill", async(req,res) =>{
    try{
        let clientInf = await mongoClient.connect(dbUrlAltas);
        let db = await clientInf.db('b20wd_db');
        let data = await db.collection('Bookkeeping').insertOne(req.body)
        res.status(200).json({message:"bill created"})
        clientInf.close();
        
    }
    catch(error){console.log(error)}
});

app.put('/update-bill/:id',async(req,res) =>{
    try{
        console.log(req.body)
        let clientInf = await mongoClient.connect(dbUrlAltas);
        let db = await clientInf.db('b20wd_db');
        let data = await db.collection('Bookkeeping').findOneAndUpdate({_id: objectId(req.params.id)},{$set: req.body})
        res.status(200).json({message:"bill updated"})
        clientInf.close();
    } catch(error){console.log(error)}
})

app.delete('/delete-bill/:id',async(req,res) =>{
    try{
        let clientInf = await mongoClient.connect(dbUrlAltas);
        let db = await clientInf.db('b20wd_db');
        let data = await db.collection('Bookkeeping').deleteOne({_id: objectId(req.params.id)})
        res.status(200).json({message:"bill deleted"});
        clientInf.close();
    } catch(error){console.log(error)}
})

app.listen(process.env.PORT || 5000, () => "App runs with some port");