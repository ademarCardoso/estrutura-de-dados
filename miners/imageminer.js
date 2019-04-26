const ImageScraper = require('bing-image-scraper');
const bingImages = new ImageScraper();

async function imageFinder (content) {
    // Esta funcao retorna uma promisse
    await bingImages.list({
        keyword: content.serchTerm,
        num: 2
    }).then(function (res) {
        // a resposta que o bing trara sera um array de objetos, contendo a url e informacoes da imagem
        console.log("Trazendo a imagem: " + res[1])
        
    }).catch(function (err) {
        console.log('Imagem nao encontrada ' + err)
        
    });
}

module.exports = imageFinder