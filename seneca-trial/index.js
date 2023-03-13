var seneca = require("seneca")();

seneca.add({ role: "math", cmd: "sum" }, function (msg, respond) {
  var sum = msg.left + msg.right;
  respond(null, { answer: sum });
});

seneca.add({ role: "math", cmd: "product" }, function (msg, respond) {
  var product = msg.left * msg.right;
  respond(null, { answer: product });
});

seneca.act({ role: "math", cmd: "sum", left: 1, right: 2 }, console.log);

seneca.act({ role: "math", cmd: "product", left: 3, right: 4 }, console.log);

seneca.add(
  { role: "math", cmd: "sum", integer: true },
  function (msg, respond) {
    this.act(
      {
        role: "math",
        cmd: "sum",
        left: Math.floor(msg.left),
        right: Math.floor(msg.right),
      },
      respond
    );
  }
);

seneca.act({ role: "math", cmd: "sum", left: 1.5, right: 2.5 }, console.log);

seneca.act(
  { role: "math", cmd: "sum", left: 1.5, right: 2.5, integer: true },
  console.log
);
