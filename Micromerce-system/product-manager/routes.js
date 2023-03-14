/**
 * Fetch the list of all the products.
 */
seneca.add({ area: "product", action: "fetch" }, function (args, done) {
  var products = this.make("products");
  products.list$({}, done);

  /***  done is short for   ***/
  // products.list$({}, function (err, result) {
  //   done(err, result);
  // });
});
