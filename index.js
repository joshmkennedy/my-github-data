import express from 'express'
import { getCount, getFacts } from './scraper'
import db from './db'
import cors from 'cors'
import {format} from 'date-fns'
import bodyParser from 'body-parser'

const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())
 
app.get('/', (req, res, next)=>{
    res.send('hello go to <a href="http://localhost:2900/scrape">scrape</a>')

})
app.post('/slack-get-date', (req, res, next)=>{
    res.status(200).type('json')
    res.json({
        text: format(Date.now(), 'MM/DD/YYYY')
    })


})

app.post('/get-a-fact', async (req, res, next)=>{
    res.status(200).type('json')
    const fact = await getFacts()
    await res.json({
        response_type:"in_channel",
        text:`${fact}`
    })


})
app.get('/get-a-fact', async (req, res, next)=>{
    res.status(200).type('json')
    const fact = await getFacts()
    await res.send(`${fact}`)


})
app.get('/slack-get-date',(req, res, next)=>{
    res.send('your at /slack-get-data')
})
app.get('/scrape', async (req, res, next)=>{
    res.send('your at /scrape')
})
app.post('/poll', urlencodedParser,(req, res, next)=>{
    
    res.status(200).type('json')

    //const {text}= JSON.parse(req.body.payload)
    console.log(req.body.text)
    const message ={
        "text": "This is your first interactive message",
        "attachments": [
            {
                "text": 'text',
                "fallback": "Shame... buttons aren't supported in this land",
                "callback_id": "button_tutorial",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "yes",
                        "text": "yes",
                        "type": "button",
                        "value": "yes"
                    },
                    {
                        "name": "no",
                        "text": "no",
                        "type": "button",
                        "value": "no"
                    },
                    {
                        "name": "maybe",
                        "text": "maybe",
                        "type": "button",
                        "value": "maybe",
                        "style": "danger"
                    }
                ]
            }
        ]
    }
    res.json(message)
    
})



app.listen(process.env.PORT || 5000)