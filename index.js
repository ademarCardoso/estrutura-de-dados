const readline = require('readline-sync') // Sera trocado por input trazido do front end

const miners = {
    text: require('./miners/textminer.js'),
    complexity: require('./miners/complexityminer.js'),
    image: require('./miners/imageminer.js')
}

async function start () {

    const content = {}

    //Adicionando o termo de busca
    chamei(askAndReturnSerchTerm()) 

    /* Chamada dos mineradores
     * No momento os mineradores de texto e complexidade estao buscando em 'pt'
     * mais tarde devera ser implementado a busca 'en'
     * lembrando que as funcoes ja esperam outras linguas de busca
    */

    await miners.text(content)
    await miners.complexity(content)
    await miners.image(content)
    
    /* Esta funcao e so para desenvolvimento do backend, mais tarde devera
     * ser subtituida por input do usario vindo do front end
    */
    function askAndReturnSerchTerm () {
        let content = readline.question("Termo de busca garotao: ")
        
        return content
    }
    console,log(content)
}

start()