# worker-thread-demo

Linked to Programmez's article 

## Execution

Go into `src/` and execute `node index.js`

## Improvements

After reading the code and understanting how to create workers, here are some improvements you can do

### Keep the worker alive

Creating a worker is a heavy operation and should be avoided.

To keep the worker alive, don't use `worker.once()`. Instead, react to `message` events with `worker.on()`. You can then passs the iteration number on the `postMessage()` to get it in the worker (see `src/v2`)

### Sharing memory

The data we pass to the worker is cloned and sharing memory is more efficient. We can use `SharedArrayBuffer` to share an array to the worker.To solve the concurrent access to the shared memory, Node.js give us access to `Atomics`. See `src/v3` for this implementation.

### Thread workeer pool

When a worker has finished its job (computing a fibonnacci iteration), it does nothing. We could create a pool of workers available for the execution of a task.

This is not supported natively by worker threads right now, so you can either create [your own worker pool](https://nodejs.org/api/async_context.html#using-asyncresource-for-a-worker-thread-pool) or use a library that does it for you ([node-worker-threads-pool](https://www.npmjs.com/package/node-worker-threads-pool), [workerpool)](https://www.npmjs.com/package/workerpool), [thread-pool-node](https://www.npmjs.com/package/thread-pool-node)...)
