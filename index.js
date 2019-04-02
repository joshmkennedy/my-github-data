import express from 'express'
import { getCount } from './scraper'
import db from './db'
import cors from 'cors'

const app = express()
app.use(cors())
 
app.get('/', (req, res, next)=>{
    res.send('hello go to <a href="http://localhost:2900/scrape">scrape</a>')

})
app.post('/slack-get-date',(req, res, next)=>{
    res.send(Date.now())
})
app.get('/slack-get-date',(req, res, next)=>{
    res.send(Date.now())
})
app.get('/scrape', async (req, res, next)=>{
    const theCount = await getCount()
    //console.log(theCount)
    //res.send(theCount)

    /* db.update('count', n=>n+1).write()
    res.json(db) */
})



app.listen(process.env.PORT || 5000)