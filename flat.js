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

    var page  = element(".lines", [
      element(element(".function-symbol", "function"), "buildAHouse", leftParen),
      element(".depth-1.argument-name", "issueBond,"),
      element(".depth-1.argument-name", "webHost,"),
      element(".depth-1.argument-name", "library,"),
      element(".depth-1.argument-name", "renderBond", rightParen, leftCurly),
      element(".scope.depth-1", [
        element(element(".variable-symbol", "var"), "buildPanel ="),
        element(".depth-1",
          "issueBond",
          leftParen,
          leftBracket
        ),

        element(".array", [
          element(".depth-2.array-item", "cut studs to length,"),
          element(".depth-2.array-item", "cut track to length,"),
          element(".depth-2.array-item", "crimp,"),
          element(".depth-2.array-item", "add sheathing,"),
          element(".depth-2.array-item", "flipsulate,"),
          element(".depth-2.array-item",
            "add sheathing",
            rightBracket,
            rightParen
          ),
        ]),

        element(".break"),
        element("issueBond.expense", leftParen),
        element(".depth-1", "buildPanel,"),
        element(".depth-1", "labor,"),
        element(".depth-1", "$100", rightParen),
        element(".break"),
        element("issueBond.expense", leftParen),
        element(".depth-1", "buildPanel,"),
        element(".depth-1", "steel studs,"),
        element(".depth-1", "$20", rightParen),
        element(".break"),
        element("issueBond.expense", leftParen),
        element(".depth-1", "buildPanel,"),
        element(".depth-1", "plywood,"),
        element(".depth-1", "$10", rightParen),
        element(".break"),
        element("webHost.hostModule", leftParen),
        element(".depth-1", "library,"),
        element(".depth-1", "render-bond,"),
        element(".depth-1", "buildPanel", rightParen),
        element(".break"),
        element("return buildPanel", leftCurly),
      ])
    ])

    var stylesheet = element.stylesheet([
      element.style(".lines", {
        "font-family": "sans-serif",
        "font-size": "15pt",
        "color": "#557",
        "line-height": "1.2em",
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
        "color": "#f5df2f",
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".scope", {
        "border-left": "3px solid #f5df2f",
        "padding-left": "0.5em",
      }),

      element.style(".call-symbol", {
        "color": "#bec9d6",
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".function-symbol", {
        "color": "#bec9d6",
        "display": "inline-block",
        "padding-right": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".argument-name", {
        "color": "#bec9d6",
      }),

      element.style(".variable-symbol", {
        "color": "black",
        "display": "inline-block",
        "padding-right": "0.5em",
        "font-weight": "bold",
      }),


    ])

    host.onVoxel(function(voxel) {
      voxel.addToHead
      voxel.send([page, stylesheet])
    })
  }
)



//      function buildAHouse(
//        issueBond,
//        webHost,
//        library,
//        renderBond ){
//          var buildPanel =
//            issueBond([
//              "cut studs to length",
//              "cut track to length",
//              "crimp",
//              "add sheathing",
//              "flipsulate",
//              "add sheathing" ])
//          issueBond.expense(
//            buildPanel,
//            "labor",
//            "$100")
//          issueBond.expense(
//            buildPanel,
//            "steel studs",
//            "$20" )
//          issueBond.expense(
//            buildPanel,
//            "plywood",
//            "$10" )
//          webHost.hostModule(
//            library,
//            "render-bond",
//            buildPanel )
//          return buildPanel }


