var library = require("module-library")(require)


library.define(
  "manifest-floor-panel",
  ["issue-bond"],
  function(issueBond) {

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

    return bond
  }
)


library.define(
  "render-bond-purchase-form",
  ["web-element"],
  function(element) {
    return function(bridge, bond) {
      bridge.send("bond")
    }
  }
)


library.using(
  ["web-host", "show-source", library.ref(), "manifest-floor-panel", "render-bond-purchase-form", "web-element", "basic-styles", "tell-the-universe"],
  function collectiveMagic(host, showSource, lib, manifestFloorPanel, renderBondPurchaseForm, element, basicStyles, tellTheUniverse) {

    host.onRequest(function(getBridge) {
      var bridge = getBridge()

      basicStyles.addTo(bridge)

      var contentPartial = bridge.partial()

      renderBondPurchaseForm(contentPartial, manifestFloorPanel)

      var editorPartial = bridge.partial()

      var universe = tellTheUniverse.called("demo-module").withNames({anExpression: "an-expression"})

      showSource({
        bridge: editorPartial,
        contentSelector: contentPartial.selector(),
        library: lib,
        moduleName: "manifest-floor-panel",
        universe: universe,
      })

      var page = element(
        element.style({
          "margin-top": "150px",
        }), [
        element(
          editorPartial,
          element.style({
            "width": "275px",
            "margin-right": "20px",
            "display": "inline-block",
            "vertical-align": "top",
          })
        ),
        element(
          [contentPartial],
          element.style({
            "display": "inline-block",
            "width": "300px",
            "vertical-align": "top",
          })
        ),
      ])

      bridge.send(page)

    })
  }
)



























// EXAMPLE_FUNCTION = function foo() {
//   bless(this,
//     "house"
//   )
//   upTo(1, house)
// }

