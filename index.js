import express from 'express'
import { getCount, getFacts } from './scraper'
import db from './db'
import cors from 'cors'
import {format} from 'date-fns'
import bodyParser from 'body-parser'
import axios from 'axios';
/* import Slack from 'slack' */
import { WebClient } from '@slack/web-api'
import { createMessageAdapter } from '@slack/interactive-messages'

const app = express()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const TOKEN  = 'xoxp-2534618128-43909772064-588529625937-75d246400b776ccd7c7974d31030fdf9';
const SECRET = '76bd1090ee54432d0605ce6553fd7239';
/* const slack = new Slack({TOKEN}) */
const web = new WebClient(TOKEN)
const slackInteractions = createMessageAdapter(SECRET);

app.use(cors())
/* app.use('/poll-action', slackInteractions.expressMiddleware()); */
 
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
app.post('/poll', urlencodedParser, async (req, res, next)=>{
    
    res.status(200).type('json').send('')
    const attachments = [
        {
            "text": req.body.text,
            "fallback": "Shame... buttons aren't supported in this land",
            "callback_id": "the_poll",
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
    const channel= req.body.channel_id
    const text= 'Just a Quick Poll'
    const send = await web.chat.postMessage({ channel, text, attachments })
    /* console.log('Message sent', send.ts) */

})
/* slackInteractions.action('the_poll', (payload, respond) => {
    const {text, actions, user} = payload.original_message.attachments[0]
    

    console.log({text, attachments}, payload)
    respond({attachments})
    
}) */
app.post('/poll-action', urlencodedParser, async(req, res, next)=>{
    res.status(200).type('json').send('')
    const {channel, message_ts, original_message, user, actions} = JSON.parse(req.body.payload)  
    console.log( JSON.parse(req.body.payload) )    
    const attachments = original_message.attachments
    const updatedAttachments = [...attachments, {text:`${user.name} said ${actions[0].name}`}]
    const send = await web.chat.update({
        channel:channel.id, 
        text:original_message.text, 
        attachments:updatedAttachments, 
        ts:message_ts
    })
    console.log(original_message.attachments)


})



app.listen(process.env.PORT || 5000)