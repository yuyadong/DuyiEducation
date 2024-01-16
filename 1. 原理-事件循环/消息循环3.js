setTimeout(function () {
  console.log(1);
}, 0);

Promise.resolve().then(function () {
  console.log(2);
});

console.log(3);
