const toCapitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    console.log({ args });
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log('Called');
      cb.call(null, args);
    }, delay);
  };
};
export { toCapitalize, debounce };
