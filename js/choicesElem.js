const choicesElem = document.querySelector('.js-choice');

const choices = new Choices(choicesElem, {
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
  classNames: {
    containerInner: 'choices__inner choices-box',
  },
});
