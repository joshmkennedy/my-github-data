import axios from 'axios'
import cheerio from 'cheerio'

async function getHTML(url) {
    const {data: html} = await axios.get(url, {responseType: 'document'})
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

export { getCount } 