// Este script tem como responsabilidade pegar os inputs do 
//  usuario e passar para as proximas funcoes
const start = require('../index.js')

async function startGet () {
    const content = {}
    
    content.serchTerm = document.getElementById('serchTerm').value

    // console.log(content)

    await start(content)

}