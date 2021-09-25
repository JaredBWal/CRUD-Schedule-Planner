
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const ScheduleModel = require('./models/Schedule');

// allows us to recieve info from front end in json format
app.use(express.json());

app.use(cors());

mongoose.connect(
    "Mongodb database connection string and password", {
    useNewUrlParser : true,
    });


app.post("/insert", async (req, res) =>{
    const scheduleEvent = req.body.scheduleEvent;
    const eventTime = req.body.eventTime;

    const schedule = new ScheduleModel({scheduleEvent: scheduleEvent, eventTime: eventTime});

    try {
        await schedule.save();
        res.send("Data passed")
    } catch (error) {
        console.log(error);
    }

});


//when someone connects to '/' 
app.get("/read", async (req, res) =>{

    // finds all data objects from database
   ScheduleModel.find({},(error, result) =>{
        if(error){
            res.send(error);
        } 
        res.send(result);
   });
});

app.put("/update", async (req, res) =>{
    const updatedScheduleEvent = req.body.updatedScheduleEvent;
    const id = req.body.id;

    try {
        await ScheduleModel.findById(id, (error, newScheduleEvent)=>{
            newScheduleEvent.scheduleEvent = updatedScheduleEvent;
            newScheduleEvent.save();
            res.send("update");
        });
    } catch (error) {
        console.log(error);
    }

});


app.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    await ScheduleModel.findByIdAndRemove(id).exec();
    res.send('deleted');
})


app.listen(3001, ()=>{
    console.log("Server Is Running On Port 3001");

});