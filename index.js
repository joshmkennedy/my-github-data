import express from 'express' 
import db from './db'
import cors from 'cors' 
import _ from 'lodash'
import axios from 'axios'


const SECRET = 'c54fd6ddc030c74a7ea8731443ea51ec00f45172'
const CLIENT_ID = 'f956a3409eb7e35b3d23'

//import {getRepos, getCommitsByWeek} from './githubData'
import fakedata from './fakedata'
import groupAndTotal from './groupAndTotal'


console.log(groupAndTotal(fakedata,'w','additions'))

/* const app = express() 
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
    const totalAdditions =await results.reduce((total, res)=>{
        const eachRepo = res.reduce((total, repo)=>total+repo.additions,0)
        return total+eachRepo
    },0)
    let all = []
    results.map((repo)=>{
        repo.map(r=>all.push(r))
    })
    const groupByWeek = all.sort((a,b)=>a.w-b.w)
    const byWeek = all.reduce((tArr, subArr)=>{
        const inArr= tArr.filter(arr=>arr.w===subArr.w)
        if(inArr.length<1){
            tArr = [...tArr, {w:subArr.w, a:subArr.additions}]
            return  tArr 
        }
        inArr[0].a+subArr.additions
    },[])
console.log(groupByWeek)
} */



