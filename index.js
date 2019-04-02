import express from 'express'
import { getCount } from './scraper'
import db from './db'
import cors from 'cors'

const app = express()
app.use(cors())
 
app.get('/', (req, res, next)=>{
    res.send('hello go to <a href="http://localhost:2900/scrape">scrape</a>')

})
app.post('/slack-get-date', (req, res, next)=>{
    res.status(200).type('json')
    res.json({
        text: "hello"
    })


})
app.get('/slack-get-date',(req, res, next)=>{
    res.send('your at /slack-get-data')
})
app.get('/scrape', async (req, res, next)=>{
    res.send('your at /scrape')
})



app.listen(process.env.PORT || 5000)