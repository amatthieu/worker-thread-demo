const {Worker} = require("worker_threads")

//Create new worker
const worker = new Worker("./worker.js")

worker.on("message", result => {
  console.log(`${result.num}th Fibonacci Number: ${result.fib}`)
})

worker.on("error", error => {
  console.log(error)
})

worker.postMessage({num: 40})
worker.postMessage({num: 12})
