const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// SENDS HOMEPAGE TO NOTES PAGE
app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, "public" ,'notes.html')); 
})

// API ENDPOINT FOR RENDERING ALL NOTES
app.get('/api/notes',(req, res)=>{
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.error("Error reading this file:", err) : console.log('success');
        let output = JSON.parse(data);
        res.json(output);
    });
});

// DEFAULT ENDPOINT FOR HOME PAGE
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public',"index.html"));

});


// SENDING A NEW NOTE TO THE DATABASE
app.post('/api/notes',(req,res)=>{
    let newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.error("Error reading this file:", err) : console.log('success');
        let output = JSON.parse(data);
        output.push(newNote);

        fs.writeFile('./db/db.json',JSON.stringify(output),(error)=>{
            error ? console.error('error updating the data') : console.log("success");
        });
    });
    res.json(newNote);
});

// DELETING A NOTE FROM THE DATABASE
app.delete('/api/notes/:id',(req,res)=>{
    let userId = req.params.id;
    let indexToDelete;
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.log("error reading file to delete") : console.log('success reading file');
        var dataArr = JSON.parse(data);
        for (let i=0;i<dataArr.length;i++){
            if (dataArr[i].id === userId){
                indexToDelete = i;
            }
        }
        dataArr.splice(indexToDelete, 1);
        dataArr = JSON.stringify(dataArr);
        fs.writeFile('./db/db.json', dataArr ,(error)=>{
            error ? console.log('error write new file after deletion') : console.log("success writing new file");
        });
    });
});



app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
    );