const express = require('express');

const app = express();

const port = process.env.PORT || 5001;

app.get('/', (req,res)=>{
    res.send('hello from serverside')
})


app.use((req, res, next)=>{
    res.send('<button type="submit">submit</button>')
});

app.listen(port, ()=>{
     console.log(`App running on port ${port}`);
});