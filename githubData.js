import axios from 'axios'
import { format } from 'date-fns'

const AUTH = {auth:{username:'joshatoutthink', password:'GITfreedom2'}}
async  function getRepos(user){
    const url = await `https://api.github.com/users/${user}/repos`
    const res = await axios.get(url, AUTH)
    const {data} = await res
    const repos = await data.map(({
        name, 
        full_name,
        created_at, 
        updated_at, 
        language, 
        git_url, 
        description
    })=>{
        const desc = description!==null?description.replace(' \ ', ''):''
        return {
            name,
            full_name,
            created_at,
            updated_at,
            language,
            url:git_url,
            description:desc
        }
    })
    return repos
}

async function getCommitsByWeek(full_name, err) {
    try{
        const test = await `https://api.github.com/repos/${full_name}/stats/contributors`
        setTimeout(()=>{
            const url = await `https://api.github.com/repos/${full_name}/stats/contributors`
        const {data} = await axios.get(url , AUTH)
        const { weeks } =await data[0]
        const formated = await weeks.map(week=>{
             const{ w, c } = week
             return {w,c}
        })
        return formated
        },200)
    }catch(e){
        console.log(e)
        const url = await `https://api.github.com/repos/${full_name}/stats/contributors`
        const {data} = await axios.get(url , AUTH)
        const { weeks } =await data[0]
        const formated = await weeks.map(week=>{
             const{ w, c } = week
             return {w,c}
        })
        return formated
    }  
}



export {getRepos, getCommitsByWeek}