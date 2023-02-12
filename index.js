async function getQuote(url = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token d8740fb1a9548f08da2f48ddb4de86576c80c8d5'
    }
  });
  const parsedResponse = await response.json(); // parses JSON response into native JavaScript objects
  return parsedResponse
}

async function insertQuote() {
  const quoteElement = document.querySelector("#quote")
  const quoteAuthorElm = document.querySelector("#quote-author")
  const currentQuote = await getQuote("https://api.paperquotes.com/apiv1/quotes/?tags=love&random=random&order=?")
  if (currentQuote?.results[0]) {
    quoteElement.textContent = "\"" + currentQuote.results[0].quote +"\""
    quoteAuthorElm.textContent = currentQuote.results[0].author
  } else {
    quoteAuthorElm.textContent = "por alguna razón lo arruiné, prueba otra vez"
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  insertQuote()
});

