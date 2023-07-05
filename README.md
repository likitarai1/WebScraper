# Web Scraper

Client side webpage 

<img width="960" alt="webscraper" src="https://github.com/likitarai1/WebScraper/assets/68556975/0bc66933-ca0a-47f3-ac0d-efd230d04e7e">

- Tech stack used
  1) Frontend: ReactJS
  2) Backend: NodeJS
  3) Database: PostgreSQL

- Information about routes:

  1) GET: /insights - Fetch all insights from database
  2) POST: /insights/search - Get insights of entered url, send url in request body as `{"url" : "<the url to be searched>"}`
  3) PATCH: /insights/{insightId} - Update value of favourite
  4) DELETE: /insights/{insightId} - Delete specific insight
