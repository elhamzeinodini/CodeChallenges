Function: doneMessage;
// This function is responsible for directly displaying a message in the console with the following text and will
// always be used as a callback function in the upcoming functions:
// [prevStep] done, next step ...

// Previous steps titles:
// preparing, making, serving, and eating.

// Note: The output of all the upcoming functions will be a successfully resolved Promise with the message
// returned by the callback function.

// Function: prepare
// This function is responsible for preparing the food ingredients. It takes two parameters:

// An array of strings containing the ingredients.
// A callback function, which must be called after a delay of 500ms.
// Before executing the main process, the following text should be displayed in the console:

// preparing stuffs: eggs, tomatoes

// Function: cooking
// This function is responsible for cooking the food. It takes a callback function as input,
// which must be called after a delay of 2000ms.

// Before executing the main process, the following text should be displayed in the console:

// making an omelette ...

// Function: serve
// This function is responsible for serving and plating the food. It takes a callback function as input,
// which must be called after a delay of 500ms.

// Before executing the main process, the following text should be displayed in the console:

// serving food ...

// Function: eat
// This function is responsible for eating the food! It takes a callback function as input,
// which must be called after a delay of 1000ms.

// Before executing the main process, the following text should be displayed in the console:

// eating ...

/* --------------------------------- example -------------------------------- */

// startCooking(["eggs", "tomatoes"]);

// preparing stuffs: eggs, tomatoes
// preparing done, next step ...
// making an omelette ...
// making done, next step ...
// serving food ...
// serving done, next step ...
// eating ...
// eating done, next step ...
// process is done

function prepare(ingredients, fn) {
  return new Promise((resolve) => {
    console.log(`preparing stuffs: ${[...ingredients].join(", ")}`);

    setTimeout(() => {
      resolve(fn());
    }, 500);
  });
}

function cooking(fn) {
  console.log("making an omelette ...");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, 2000);
  });
}

function serve(fn) {
  console.log("serving food ...");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, 500);
  });
}

function eat(fn) {
  console.log("eating ...");

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, 1000);
  });
}

function doneMessage(prevStep) {
  return () => console.log(`${prevStep} done, next step ...`);
}

function startCooking(stuffs) {
  prepare(stuffs, doneMessage("preparing"))
    .then(() => {
      return cooking(doneMessage("making"));
    })
    .then(() => {
      return serve(doneMessage("serving"));
    })
    .then(() => {
      return eat(doneMessage("eating"));
    })
    .then(() => {
      console.log("process is done");
    });
}

startCooking(["eggs", "tomatoes"]);

module.exports = { prepare, cooking, serve, eat, doneMessage };
