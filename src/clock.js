/**
 * Helpers for clock format and display
 */

/**
 * Takes functions as arguments, returns one value
 * @param  {...any} fns
 */
const compose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);

const getCurrentTime = () => new Date();
const oneSec = () => 1000;
//const clear = () => console.clear();
//const log = message => console.log(message);

const dateToTime = date => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds()
});
const addAMPM = timeObject => ({
  ...timeObject,
  ampm: timeObject.hours >= 12 ? "PM" : "AM"
});

const civilHours = timeObject => ({
  ...timeObject,
  hours: timeObject.hours > 12 ? timeObject.hours - 12 : timeObject.hours
});

const addZero = key => timeObject => ({
  ...timeObject,
  [key]: timeObject[key] < 10 ? `0${timeObject[key]}` : timeObject[key]
});

//const display = target => time => target(time);

const formatTime = format => time =>
  format
    .replace("hh", time.hours)
    .replace("mm", time.minutes)
    .replace("ss", time.seconds)
    .replace("tt", time.ampm);

const convertToCivilianTime = clockTime =>
  compose(
    addAMPM,
    civilHours
  )(clockTime);

const doubleDigits = civilianTime =>
  compose(
    addZero("hours"),
    addZero("minutes"),
    addZero("seconds")
  )(civilianTime);

/*
const startTicking = () =>
  setInterval(
    compose(
      clear,
      getCurrentTime,
      dateToTime,
      convertToCivilianTime,
      doubleDigits,
      formatTime("hh:mm:ss tt"),
      display(log)
    ),
    oneSec()
  );
*/
const updateTime = () =>
  compose(
    getCurrentTime,
    dateToTime,
    convertToCivilianTime,
    doubleDigits,
    formatTime("hh:mm:ss tt")
  )();

export { updateTime, oneSec };
