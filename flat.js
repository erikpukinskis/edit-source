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
    var comma = element(".comma-symbol", ", ")
    var equals = element(".equals-symbol", "=")
    var br = element("br")

    var page = element(".expression", [
      element(
        element(".function-symbol", "function "),
        element(".function-name", "buildAHouse"),
        leftParen
      ),
      element(".function-body", [      
        element(".argument-name", "issueBond"),
        comma,
        br,
        element(".argument-name", "webHost"),
        comma,
        br,
        element(".argument-name", "library"),
        comma,
        br,
        element(".argument-name", "renderBond"),
        rightParen,
        leftCurly,
        element(".lines", [

          element(".variable-symbol", "var"),
          element(".reference", "buildPanel"),
          equals,
          element(".rhs", [
            element(".call", "issueBond"),
            leftParen,
            leftBracket,
            element(".array-items", [
              element(".depth-2.array-item", "cut studs to length"),
              comma,
              br,
              element(".depth-2.array-item", "cut track to length"),
              comma,
              br,
              element(".depth-2.array-item", "crimp"),
              comma,
              br,
              element(".depth-2.array-item", "add sheathing"),
              comma,
              br,
              element(".depth-2.array-item", "flipsulate"),
              comma,
              br,
              element(".depth-2.array-item", "add sheathing"),
              rightBracket,
              rightParen,
            ]),
          ]),

          element(".break"),

          element(".call", "issueBond.expense"),
          leftParen,
          element(".arguments", [
            "buildPanel",
            comma,
            br,
            "labor",
            comma,
            br,
            "$100",
            rightParen
          ]),

          element(".break"),

          element(".call", "webHost.hostModule"),
          leftParen,
          element(".arguments", [
            "library",
            comma,
            br,
            "render-bond",
            comma,
            br,
            "buildPanel",
            rightParen,
          ]),

          element(".break"),

          element(".return-symbol", "return"),
          element(".call", "buildPanel"),
          rightCurly,


        ]),
      ]),
    ])





    var canary = "#f5df2f"
    var gunmetal = "#bec9d6"
    var black =  "#557"

    var stylesheet = element.stylesheet([

      element.style(".expression", {
        "font-family": "sans-serif",
        "font-size": "15pt",
        "color": black,
        "line-height": "1.2em",
      }),

      element.style(".comma-symbol", {
        "color": gunmetal,
        "display": "inline-block",
        "font-weight": "bold",
      }),

      element.style(".array-items .comma-symbol, .arguments .comma-symbol", {
        "color": black,
      }),

      element.style(".variable-symbol", {
        "color": black,
        "display": "inline-block",
        "padding-right": "0.5em",
        "font-weight": "bold",
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

      element.style(".array-items", {
        "margin-left": "0.5em",
        "border-left": "3px solid #a9a9ff",
        "padding-left": "0.5em",
      }),

      element.style(".array-item", {
        "display": "inline-block",
      }),

      element.style(".arguments", {
        "margin-left": "0.5em",
      }),

      element.style(".scope-symbol", {
        "color": canary, //"#f5da6f",
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".return-symbol", {
        "color": "#eccd6b",
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

      element.style(".function-body", {
        "margin-left": "0.5em",
      }),

      element.style(".lines", {
        "border-left": "3px solid "+canary,
        "padding-left": "0.5em",
      }),



      element.style(".rhs", {
        "margin-left": "0.5em",
      }),

      element.style(".argument-name", {
        "color": gunmetal,
        "display": "inline-block",
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

