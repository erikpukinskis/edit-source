var library = require("module-library")(require)



library.define(
  "render-bond-purchase-form",
  ["web-element"],
  function(element) {
    return function(bond, bridge) {
      bridge.send([
        element("h2", "Buy "+bond.id+ " bond"),
        element("p", bond.rateOfReturn),
        element("p", bond.rateOfReturn+" "+bond.termLength),
        element(".button", "Buy")
      ])
    }
  }
)


library.define(
  "manifest-floor-panel",
  ["issue-bond", "render-bond-purchase-form"],
  function(issueBond, purchase) {

    var bond = issueBond(
      "floor panel",
      {"rateOfReturn": "10%",  "termLength": "60 days"}
    )

    bond.addTasks([
      "cut studs to length",
      "cut track to length",
      "crimp",
      "add sheathing",
      "flipsulate",
      "add sheathing",
    ])

    bond.addExpense(
      "labor",
      "$100"
    )
    bond.addExpense(
      "steel studs",
      "$20"
    )
    bond.addExpense(
      "plywood",
      "$10"
    )

    // begin

    return purchase.bind(null, bond)
  }
)


library.using(
  ["web-host", "./", library.ref()],
  function collectiveMagic(host, showSource, lib) {

    host.onRequest(function(getBridge) {
      var bridge = getBridge()

      showSource(bridge, "manifest-floor-panel", lib)
    })
  }
)






