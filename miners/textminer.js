const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/apikey.json').apiKey
// const sentenceBoundaryDetection = require('sbd ')

async function scrapTextFromWikipedia(content) {

    //console.log("Recebi os termos de busca: " + content.serchTerm + " E a lingua " + content.languageOfserch)

    await fetchContentFromWikipidia(content)
        sanitizeContent(content)
    await summarizerContent(content)
    // breakContentIntoSentences(content)

    async function fetchContentFromWikipidia(content) {

        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe({
            "lang" : content.languageOfserch,
            "articleName" : content.serchTerm
        })
        const wikipediaContent = wikipediaResponse.get()

        content.sourceContentOriginal = wikipediaContent.content

    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
        const whithoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)

        content.sourceContentSanitized = whithoutDatesInParentheses

        function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n')

            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }
                return true
            })
            return withoutBlankLinesAndMarkdown.join(' ')
        }
    }

    function removeDatesInParentheses(text) {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ')
    }

    async function summarizerContent (content) {
    
    const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
    const algorithmSummarizer = algorithmiaAuthenticated.algo('nlp/Summarizer/0.1.8') 
    const textResponseSumarizer = await algorithmSummarizer.pipe(content.sourceContentSanitized)
        
    const textSumarize = textResponseSumarizer.get()
        content.sourceContentSumarize = textSumarize
    
    // .then(function(output) {
    //     console.log(output);
    // });
    }
}

module.exports = scrapTextFromWikipedia