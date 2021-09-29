const elLoadDataBtn = document.querySelector('.js-btn');
const elNewsList = document.querySelector(".js-news-list");

const elNewsTemplate = document.querySelector("#news-template").content;

elLoadDataBtn.addEventListener('click', () => {
  fetch('https://newsapi.org/v2/everything?qInTitle=apple&language=ru&apiKey=94d05747d7344d7391264e6dacae98ad')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'ok') {
      elNewsList.innerHTML = "";
      let elNewsFragment = document.createDocumentFragment();
      data.articles.forEach(article => {

        let elNewsItem = elNewsTemplate.cloneNode(true);

        elNewsItem.querySelector(".news-title").textContent = article.title;
        elNewsItem.querySelector(".news-img").src = article.urlToImage;
        elNewsItem.querySelector(".news-link").href = article.url;
        elNewsItem.querySelector(".news-link").textContent = "Learn More";
        elNewsFragment.appendChild(elNewsItem);
      });
      elNewsList.appendChild(elNewsFragment);
    }
  });
});




