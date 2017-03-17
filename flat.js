var library = require("module-library")(require)

library.using(
  ["web-host", "web-element"],
  function(host, element) {
    var leftParen = element(".call-symbol", "(")
    var rightParen = element(".call-symbol", ")")
    var openFunction = element(".scope-symbol", "{")
    var closeFunction = element(".scope-symbol", "}")
    var openObject = element(".object-delimiter", "{")
    var closeObject = element(".object-delimiter", "}")
    var leftBracket = element(".array-symbol", "[")
    var rightBracket = element(".array-symbol", "]")
    var comma = element(".comma-symbol", ", ")
    var equals = element(".equals-symbol", "=")
    var br = element("br")
    var colon = element(".colon-symbol", ":")

    var page = element(".expression", [
      element(
        element(".function-symbol", "function "),
        element(".function-name", "buildAHouse"),
        leftParen
      ),
      element(".function", [   
        element(".function-signature", [   
          "issueBond",
          comma,
          br,
          "webHost",
          comma,
          br,
          "library",
          comma,
          br,
          "renderBond",
          rightParen,
          openFunction,
        ]),
        element(".function-body", [

          element(".variable-symbol", "var"),
          "buildPanel",
          equals,
          element(".rhs", [
            element(".call", "issueBond"),
            leftParen,
            leftBracket,
            element(".array-items", [
              "cut studs to length",
              comma,
              br,
              "cut track to length",
              comma,
              br,
              "crimp",
              comma,
              br,
              "add sheathing",
              comma,
              br,
              "flipsulate",
              comma,
              br,
              "add sheathing",
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

          element(".call", "checkBook"),
          leftParen,
          element(".arguments", [
            "some string",
            comma,
            openObject,
            element(".object-pairs", [
              "one of",
              colon,
              "1001",
              br,
              "two-w3",
              colon,
              "2222",
              closeObject,
              rightParen
            ]),
          ]),


          element(".break"),

          "webHost.hostModule",
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
          "buildPanel",
          closeFunction,


        ]),
      ]),
    ])





    var canary = "#f5df2f"
    var gunmetal = "#bec9d6"
    var black =  "#557"
    var electric = "#a9a9ff"

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

      element.style(".colon-symbol", {
        "color": electric,
        "display": "inline-block",
        "font-weight": "bold",
        "margin": "0 0.5em",
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
        "color": electric,
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".array-items", {
        "border-left": "0.15em solid #a9a9ff",
        "margin-left": "1em",
        "padding-left": "0.5em",
      }),

      element.style(".object-pairs", {
        "border-left": "0.15em solid "+electric,
        "padding-left": "0.5em",
      }),

      element.style(".array-item", {
        "display": "inline-block",
      }),

      element.style(".arguments", {
        "margin-left": "1em",
      }),

      element.style(".scope-symbol", {
        "color": canary,
        "display": "inline-block",
        "padding-left": "0.5em",
        "font-weight": "bold",
      }),

      element.style(".object-delimiter", {
        "color": electric,
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
        "border-left": "0.15em solid "+canary,
        "padding-left": "0.5em",
      }),

      element.style(".function", {
        "margin-left": "1em",
      }),

      element.style(".rhs", {
        "margin-left": "1em",
      }),

      element.style(".function-signature", {
        "color": gunmetal,
      }),

      element.style(".function-name", {
        "color": gunmetal,
        "display": "inline",
      }),

      element.style(".function-signature .comma-symbol", {
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
      voxel.addToHead(stylesheet)
      voxel.send(page)
    })
  }
)

