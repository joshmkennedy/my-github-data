import express from 'express' 

import cors from 'cors' 




import {getRepos, getCommitsByWeek} from './githubData'
//import fakedata from './fakedata'
import groupAndTotal from './groupAndTotal'




 const app = express() 
app.use(cors())

app.get('/', async(req, res, next)=>{
    const data = await sendData()
    /*  */
    const go = await res.send(
      data
   )
   return go

})

async function sendData(){
    
    const myRepos =  await getRepos('joshatoutthink')
    const commitData = await  myRepos.map(async (repo)=>{
        const name =  repo.full_name
        const commits = await getCommitsByWeek(name)
        return await commits
    }) 
    
    const results = await Promise.all(commitData)
    
    let all = []//this needs refactorying uhh uhgly
    await results.map((repo)=>{
        repo.map(r=>all.push(r))
    })
    const weeksTotaledData = await groupAndTotal(all,'w','c') 
    return weeksTotaledData

} 
app.listen(3000, console.log('http://localhost:3000'))


