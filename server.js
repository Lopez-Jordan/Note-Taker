const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, "public" ,'notes.html')); 
})


app.get('/api/notes',(req, res)=>{
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.error("Error reading this file:", err) : console.log('success');
        let output = JSON.parse(data);
        res.json(output);
    });
});


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public',"index.html"));

});

app.post('/api/notes',(req,res)=>{
    let newNote = req.body;
    newNote.id = uuidv4();


    //this code actually work reading in the body
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.error("Error reading this file:", err) : console.log('success');
        let output = JSON.parse(data);
        output.push(newNote);

        fs.writeFile('./db/db.json',JSON.stringify(output),(error)=>{
            error ? console.error('error updating the data') : console.log("sucess");
        });
    });
    res.json(newNote);




});









app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
    );