const ImageScraper = require('bing-image-scraper');
const bing = new ImageScraper();

async function imageFindUrl (content) {
    // Esse cacete retorna uma promisse
    await bing.list({
        keyword: content.serchTerm,
        num: 2
    }).then(function (res) {
        // res is the result array
        console.log("Trazendo a imagem: " + res[0], res[1])
        
    }).catch(function (err) {
        console.log('Imagem nao encontrada ' + err)
        // err is the Error that maybe thrown here
    });
}

module.exports = imageFindUrl