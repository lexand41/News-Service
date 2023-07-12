const incline = (num, nominative, genetive, genPlural) => {
  let content;
  if (!(10 < num && num < 15)) {
    switch (num % 10) {
      case 1:
        content = nominative;
        break;
      case 2:
      case 3:
      case 4:
        content = genetive;
        break;
      default:
        content = genPlural;
    }
  } else {
    content = genPlural;
  }
  return content;
};

export default incline;
