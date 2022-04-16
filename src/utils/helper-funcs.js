const toCapitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const debounce = (cb, delay) => {
  let timer;
  return (args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb.call(null, args);
    }, delay);
  };
};
export { toCapitalize, debounce };
