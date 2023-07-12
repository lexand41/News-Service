const renderNews = (err, data, countCard) => {
  const dataNews = data.articles;
  if (err) {
    console.warn(err, dataNews);
    return;
  }
  const template = document.createDocumentFragment();
  const news = dataNews.map(item => {
    const author = (item.author) ? item.author : '';
    const description = (item.description) ? item.description : '';
    const plugImage = '../img/plug.jpg';

    const card = document.createElement('div');
    card.className = 'news-item';
    card.innerHTML = `
      <img src="${item.urlToImage}" onerror="this.src='${plugImage}'"
        alt="${item.title}" class="news-image" height="200">
      <h3 class="news-title">
        <a href="${item.url}"
          class="news-link" target="_blank">${item.title}</a>
      </h3>
      <p class="news-description">${description}</p>
      <div class="news-footer">
        <time class="news-datetime" datetime="${item.publishedAt}">
          <span class="news-date">${item.publishedAt}</span>
        </time>
        <p class="news-author">${author}</p>
      </div>
    `;
    return card;
  });

  template.append(...news.slice(0, countCard));

  return template;
};

export default renderNews;

