const Bottleneck = require('bottleneck')

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 500
})

const limiterFunction = (method) => {
  return limiter.wrap(method);
}

const stringToNumber = (number) => {
  return number ? parseInt(number) : 0
}

module.exports = {
  limiterFunction,
  stringToNumber,
}