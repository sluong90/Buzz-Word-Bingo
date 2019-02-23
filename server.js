const express = require('express');
const app = express();
const PORT = 8080;
const bp = require('body-parser'); //middleware library (app.use)
let buzzArr = [];
let buzz = {"buzzWords": buzzArr}
let score = 0;



//middleware parse initializing
app.use(express.static('public'))
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())



//GET - Sets homepage to index.html
app.get('/', (req,res) => {
    // res.send('HELLLOOOO')
    res.json({success: 'ok'});
});

app.get('/buzzwords', (req, res) => {
    res.json(buzz)
})

//post  --send raw data as json

//POST - creates new buzz word object when "buzzWord" is a String and "points" is a Number and pushes into Buzz Array. 
app.post('/buzzwords', (req,res) => {
    if(typeof (req.body.buzzWord) === 'string' && typeof (req.body.points) === 'number'){
        buzz.buzzWords.push(req.body);
        res.json({ "success" : true });
    }else{
        res.json({ "success" : false });
    }
});


//DELETE
app.delete('/buzzwords', (req,res) => {
        for(let i=0; i<buzzArr.length; i++){
            if(req.body.buzzWord === buzzArr[i].buzzWord){
                buzzArr.splice(i,0);
                res.json({ "success": true })
            }else{
                res.json({ "success": false})
            }
        }
        
    

})

// POST - Reset
app.post('/reset', (req,res) => {
    buzzArr.splice(0,buzzArr.length)
    res.json({ "success" : true })
})

app.listen(PORT, () => {
    console.log('SERVER LISTENING..')
})

