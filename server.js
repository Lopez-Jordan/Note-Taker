const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(express.json());
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


    //this code actually work reading in the body
    fs.readFile('./db/db.json','utf-8',(error, data)=>{
        error ? console.error("Error reading this file:", err) : console.log('success');
        let output = JSON.parse(data);
        output.push(newNote);

        fs.writeFile('./db/db.json',JSON.stringify(output),(error)=>{
            error ? console.error('error updating the data') : console.log("sucess");
        });
    });
    res.json(newNote); //not done, must give it an id




});









app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
    );