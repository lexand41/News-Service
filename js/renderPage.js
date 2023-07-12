import fetchRequest from './fetchRequest.js';
import renderNews from './renderNews.js';
import preload from './preload.js';
import incline from './incline.js';

const wrapperNews = document.querySelector('.news-list-selected');
const wrapperNewsLatest = document.querySelector('.news-list-latest');
const headerTitle = document.querySelector('.title');
const choicesElem = document.querySelector('.js-choice');
const formSearch = document.querySelector('.form-search');
const titleSelected = document.querySelector('.title-selected');
const newsSelected = document.querySelector('.news-selected');
const searchInput = document.querySelector('.search-input');

const init = (newsNumCards) => {
  const serchNumCards = 8;
  const chooseСountry = (sessionStorage.getItem('chooseСountry')) ?
    `${sessionStorage.getItem('chooseСountry')}` : 'ru';
  const search = (searchInput.value) ?
    searchInput.value : 'свежие новости';

  preload.show();
  return Promise.all([
    fetchRequest(`everything?q={${search}}`, serchNumCards, {
      callback: renderNews,
      headers: {
        'x-api-key': 'd501f7b78ee145529afbd6e9c974481b',
      },
    }),
    fetchRequest(`top-headlines?country=${chooseСountry}`, newsNumCards, {
      callback: renderNews,
      headers: {
        'x-api-key': 'd501f7b78ee145529afbd6e9c974481b',
      },
    }),
  ]);
};

init(8).then(data => {
  preload.remove();
  wrapperNewsLatest.append((data[1]));
});

sessionStorage.clear();
choicesElem.addEventListener('change', () => {
  sessionStorage.setItem('chooseСountry', choicesElem.value);
  init(8).then(data => {
    preload.remove();
    wrapperNews.innerHTML = '';
    wrapperNewsLatest.innerHTML = '';
    wrapperNewsLatest.append((data[1]));
    titleSelected.classList.add('visually-hidden');
    newsSelected.classList.add('visually-hidden');
  });
});

formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  init(4).then(data => {
    preload.remove();
    wrapperNews.innerHTML = '';
    wrapperNewsLatest.innerHTML = '';
    wrapperNews.append((data[0]));
    const numNews = (document.querySelectorAll('.news-item')).length;
    wrapperNewsLatest.append((data[1]));
    titleSelected.classList.remove('visually-hidden');
    newsSelected.classList.remove('visually-hidden');
    headerTitle.textContent =
    `По вашему запросу | “${searchInput.value}” | найдено ${numNews}
      ${incline(numNews, 'новость', 'новости', 'новостей')}`;
    formSearch.reset();
  });
});
