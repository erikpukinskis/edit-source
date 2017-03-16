var library = require("module-library")(require)

library.using(
  ["web-host", "web-element"],
  function(host, element) {
    var leftParen = element(".call-symbol", "(")
    var rightParen = element(".call-symbol", ")")
    var leftCurly = element(".scope-symbol", "{")
    var rightCurly = element(".scope-symbol", "}")
    var leftBracket = element(".array-symbol", "[")
    var rightBracket = element(".array-symbol", "]")
    var comma = element(".comma-symbol", ",")
    var equals = element(".equals-symbol", "=")

    var page  = element(".lines", [
      element(element(".function-symbol", "function"), element(".function-name", "buildAHouse"), leftParen),
      element(".depth-1.argument-name", "issueBond", comma),
      element(".depth-1.argument-name", "webHost", comma),
      element(".depth-1.argument-name", "library", comma),
      element(".depth-1.argument-name", "renderBond", rightParen, leftCurly),
      element(".scope.depth-1", [
        element(element(".variable-symbol", "var"), element(".reference", "buildPanel"), equals),
        element(".depth-1",
          element(".call", "issueBond"),
          leftParen,
          leftBracket
        ),

        element(".array", [
          element(".depth-2.array-item", "cut studs to length", comma),
          element(".depth-2.array-item", "cut track to length", comma),
          element(".depth-2.array-item", "crimp", comma),
          element(".depth-2.array-item", "add sheathing", comma),
          element(".depth-2.array-item", "flipsulate", comma),
          element(".depth-2.array-item",
            "add sheathing",
            rightBracket,
            rightParen
          ),
        ]),

        element(".break"),
        element(element(".call", "issueBond.expense"), leftParen),
        element(".depth-1", element(".reference", "buildPanel"), comma),
        element(".depth-1", "labor", comma),
        element(".depth-1", "$100", rightParen),
        element(".break"),
        element(element(".call", "issueBond.expense"), leftParen),
        element(".depth-1", element(".reference", "buildPanel"), comma),
        element(".depth-1", "steel studs", comma),
        element(".depth-1", "$20", rightParen),
        element(".break"),
        element(element(".call", "issueBond.expense"), leftParen),
        element(".depth-1", element(".reference", "buildPanel"), comma),
        element(".depth-1", "plywood", comma),
        element(".depth-1", "$10", rightParen),
        element(".break"),
        element(element(".call", "webHost.hostModule"), leftParen),
        element(".depth-1", element(".call", "library"), comma),
        element(".depth-1", "render-bond", comma),
        element(".depth-1", element(".call", "buildPanel"), rightParen),
        element(".break"),
        element(element(".return-symbol", "return"), element(".call", "buildPanel"), rightCurly),
      ])
    ])

    var canary = "#f5df2f"
    var gunmetal = "#bec9d6"
    var black =  "#557"

    var stylesheet = element.stylesheet([
      element.style(".lines", {
        "font-family": "sans-serif",
        "font-size": "15pt",
        "color": black,
        "line-height": "1.2em",
      }),

      element.style(".comma-symbol", {
        "color": black,
        "display": "inline-block",
        "font-weight": "bold",
      }),

      element.style(".variable-symbol", {
        "color": black,
        "display": "inline-block",
        "padding-right": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".reference::after", {
        "content": "•",
        "vertical-align": "0.25em",
        "margin-top": "-0.25em",
        "color": "#26de26",
        "font-weight": "bold",
        "display": "inline-block",
      }),

      element.style(".call, .reference", {
        "display": "inline",
      }),

      element.style(".equals-symbol", {
        "color": black,
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),


      element.style(".depth-1", {
        "margin-left": "1em",
      }),
      element.style(".depth-2", {
        "margin-left": "2em",
      }),
      element.style(".depth-3", {
        "margin-left": "3em",
      }),
      element.style(".depth-4", {
        "margin-left": "4em",
      }),
      element.style(".break", {
        "height": "0.75em",
        "width": "1.5em",
        "background": "#fff"
      }),
      element.style(".array-symbol", {
        "color": "#a9a9ff",
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),
      element.style(".array-item", {
        "border-left": "3px solid #a9a9ff",
        "padding-left": "0.5em",
      }),

      element.style(".scope-symbol", {
        "color": "#f5da6f",
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".scope", {
        "border-left": "3px solid "+canary,
        "padding-left": "0.5em",
      }),

      element.style(".return-symbol", {
        "color": "#dec167",
        "display": "inline-block",
        "padding-right": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".function-symbol", {
        "color": gunmetal,
        "display": "inline-block",
        "padding-right": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".argument-name", {
        "color": gunmetal,
      }),

      element.style(".function-name", {
        "color": gunmetal,
        "display": "inline",
      }),

      element.style(".argument-name .comma-symbol", {
        "color": gunmetal,
        "font-weight": "bold",
      }),


      element.style(".call-symbol", {
        "color": gunmetal,
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),

    ])

    host.onVoxel(function(voxel) {
      voxel.addToHead
      voxel.send([page, stylesheet])
    })
  }
)

