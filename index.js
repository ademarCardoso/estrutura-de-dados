const readline = require('readline-sync') // Sera trocado por input trazido do front end

const miners = {
    text: require('./miners/textminer.js'),
//     complexity: require('./miners/complexityminer.js'),
//     image: require('./miners/imageminer.js')
}

async function start () {

    const content = {}

    //Adicionando o termo de busca
    content.serchTerm = askAndReturnSerchTerm()
    content.languageOfserch = asklanguageOfSerch() 

    /* Chamada dos mineradores
     * No momento os mineradores de texto e complexidade estao buscando em 'pt'
     * mais tarde devera ser implementado a busca 'en'
     * lembrando que as funcoes ja esperam outras linguas de busca
    */

    await miners.text(content)
    // await miners.complexity(content)
    // await miners.image(content)
    
    /* Estas funcoes sao para desenvolvimento do backend, mais tarde devera
     * ser subtituida por input do usario vindo do front end
    */
    function askAndReturnSerchTerm () {
        let content = readline.question("Termo de busca garotao: ")
        
        return content
    }

    function asklanguageOfSerch() {
        const languages = ['pt', 'en']
        const selectedLanguageIndex = readline.keyInSelect( languages, "Escolha uma linhua de busca: ")
        const selectedLanguageText = languages[selectedLanguageIndex]

        return selectedLanguageText
    }
    console.log(content)
}

start()