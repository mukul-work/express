const express = require('express');
const app = express();
module.exports = app;

const port = 2007;

app.get('/', (req,res) =>{
    res.send("Hello World");
})

if(!module.parent){
    app.listen(port);
    console.log(`Server running at ${port}`);
}
