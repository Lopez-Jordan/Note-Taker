const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());                // when the fetch passes in JSON content
app.use(express.static('public'));      // allows access to paths within the public folder

