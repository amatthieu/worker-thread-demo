const {Worker} = require("worker_threads")

let nums = [21, 33, 15, 40]

//get size of the array buffer with int32 size buffer for each element in the array
const size = Int32Array.BYTES_PER_ELEMENT*nums.length

//create the buffer for the shared array
const sharedBuffer = new SharedArrayBuffer(size)
const sharedArray = new Int32Array(sharedBuffer)

nums.forEach((num, index) => {
  Atomics.store(sharedArray, index, num)
})

//Create new worker
const worker = new Worker("./worker.js")

//Listen for a message from worker
worker.on("message", result => {
  console.log(`${result.num}th Fibonacci Number: ${result.fib}`)
})

worker.on("error", error => {
  console.log(error)
})

worker.postMessage({nums: sharedArray})
