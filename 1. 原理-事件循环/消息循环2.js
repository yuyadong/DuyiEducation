function delay(duration) {
  var start = new Date();
  while (new Date() - start < duration) {}
}

setTimeout(function () {
  console.log(1);
}, 0);

delay(1000);

console.log(2);
