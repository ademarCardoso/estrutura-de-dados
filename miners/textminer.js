const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/apikey.json').apiKey
const sentenceBoundaryDetection = require('sbd ')

async function scrapTextFromWikipedia(serchTerm) {

    await fetchContentFromWikipidia(serchTerm)
    sanitizeContent(serchTerm)
    breakContentIntoSentences(serchTerm)

    async function fetchContentFromWikipidia(serchTerm) {

        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponse = await wikipediaAlgorithm.pipe(serchTerm)
        const wikipediaContent = wikipediaResponse.get()

        serchTerm.sourceContentOriginal = wikipediaContent.serchTerm

    }

    function sanitizeContent(serchTerm) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(serchTerm.sourceContentOriginal)
        const whithoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)

        serchTerm.sourceContentSanitized = whithoutDatesInParentheses

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
}

module.exports = console.log("Minerador, Buscando Texto")