const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const newQuoteBtn = document.querySelector('#new-quote')
const loader = document.querySelector('#loader')

function showLoadingSpinner() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false
    loader.hidden = true
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner()
  const apiUrl = 'https://quotes15.p.rapidapi.com/quotes/random/'
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'ab79d78af6msh61c93939824214bp162e7fjsn2f21bdf6b0f7',
        'x-rapidapi-host': 'quotes15.p.rapidapi.com',
      },
    })
    const data = await response.json()

    // If author is blank , add 'Unknown'
    if (data.originator.name === '') {
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = data.originator.name
    }

    if (data.content.length > 50) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }

    if (data.content.length) {
      quoteText.innerText = data.content
    }
    // Stop loader and show quote
    removeLoadingSpinner()
  } catch (error) {
    console.log(error)
    getQuote()
  }
}

// Tweet quote
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

function tweetQuote() {
  const quote = quoteText.innerText
  const author = authorText.innerText

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners

// On Load
getQuote()
