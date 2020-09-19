export default (func: Function, ms: number) => {
  let oldDate: number = Number(new Date().getTime());
  let timeout: any;

  function wrapper() {
    const newDate: number = Number(new Date().getTime());

    if (newDate - oldDate < ms) {
      clearTimeout(timeout);
    }

    oldDate = newDate;

    timeout = setTimeout(() => {
      func();
    }, ms);
  }
  return wrapper;
}
