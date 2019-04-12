import express from 'express' 
import db from './db'
import cors from 'cors' 
import axios from 'axios'


const SECRET = 'c54fd6ddc030c74a7ea8731443ea51ec00f45172'
const CLIENT_ID = 'f956a3409eb7e35b3d23'

import {getRepos, getCommitsByWeek} from './githubData'

const app = express() 
app.use(cors())

app.get('/', (req, res, next)=>{
    res.send('this app is just for slack to interact with')
})
async function test(){

    const myRepos =  await getRepos('joshatoutthink')
    const commitData = await myRepos.map(async repo=>{
        const name = await repo.full_name
        const commits = await getCommitsByWeek(name)
        return commits
    })
    const results = await Promise.all(commitData)
console.log(results)
}
test()