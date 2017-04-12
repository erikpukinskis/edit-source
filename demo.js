var library = require("module-library")(require)



library.define(
  "manifest-floor-panel",
  ["issue-bond", "sell-bond"],
  function(issueBond, sellBond) {

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

    return sellBond(bond)
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






