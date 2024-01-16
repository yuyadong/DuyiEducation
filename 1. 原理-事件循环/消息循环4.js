function a() {
  console.log(1);
  Promise.resolve().then(function () {
    console.log(2);
  });
}

setTimeout(function () {
  console.log(3);
  Promise.resolve().then(a);
}, 0);

Promise.resolve().then(function () {
  console.log(4);
});

console.log(5);
