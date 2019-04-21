 const request = require('request')
 const cheerio = require('cheerio')

 async function serchComplexityOnWiki (languageOfRequest = 'pt', serchTerm) {
 request(`https://${languageOfRequest}.wikipedia.org/wiki/${serchTerm}`, function (err, res, body){ // Passar parametro de busca
    if (err) {
        console.log('Erro: ' + err)
    }
      
    const $ = await cheerio.load(body)

    $('.mw-body').each(function () {
        var complexidade = $(this).find('.infobox_v2 td').text().trim()

        complexidade = sanitizador(complexidade)

        console.log('Complexidade: ' + complexidade)
    })
    
})

//Preparar sanitizador do response 
function responseSanitizer (termOfResponse) {

}

}

module.exports = console.log("Minerador, Buscando Complexidade")//termOfResponse