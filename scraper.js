import axios from 'axios'
import cheerio from 'cheerio'


async function getHTML(url) {
    const {data: html} = await axios.get(url)
    return html

}
async function getInstagram(html){
    const $ = cheerio.load(html)
   
    const link = $('item').find('link').html()
    console.log(link)
}

async function getCount(){
    const html = await getHTML('https://codepen.io/joshatoutthink/public/feed/')
    const insta = await getInstagram(html)
    return insta;
}
async function getFacts(){
    const res = await getHTML('http://mentalfloss.com/api/facts?limit=1')
   //const data = await res.json()
    const fact = await res[0].fact
    console.log(fact)
    return fact

}
export { getCount, getFacts } 