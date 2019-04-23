 const request = require('request')
 const cheerio = require('cheerio')

 async function serchComplexityOnWiki (content) {
 request(`https://${content.languageOfserch}.wikipedia.org/wiki/${content.serchTerm}`, async function (err, res, body){
    if (err) {
        console.log('Erro: ' + err)
    }
      
    const $ = await cheerio.load(body)

    $('.mw-body').each(function () {
        const complexidade = $(this).find('.infobox_v2 td').text().trim()

        //complexidade = sanitizador(complexidade)

        console.log('Complexidade: ' + complexidade)

        //Erro para adicionar a complexidade no content
        content.textComplexity = complexidade
        return content
        
    })
    
})

//Preparar sanitizador do response 
// function responseSanitizer (termOfResponse) {

// }

}

module.exports = serchComplexityOnWiki