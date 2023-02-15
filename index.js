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

function getRandomInt(max) {
  return (Math.floor(Math.random() * max) + 1);
}

function increaseOffset(href) {
  const url = new URL(href);
  const currOffset = parseInt(url.searchParams.get("offset"));
  url.searchParams.set("offset", currOffset + getRandomInt(25));
  return url.href
}

async function insertQuote() {
  const quoteElement = document.querySelector("#quote")
  const quoteAuthorElm = document.querySelector("#quote-author")
  const url = localStorage.getItem("lastUrl") || `https://api.paperquotes.com/apiv1/quotes/?tags=love&random=random&order=&limit=1&offset=${getRandomInt(9)}`
  const currentQuote = await getQuote(url)
  localStorage.setItem("lastUrl", increaseOffset(currentQuote.next))
  console.log(currentQuote)
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

