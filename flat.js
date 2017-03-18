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

    var page = renderFunctionLiteral([

      renderVariableAssignment(renderFunctionCall("issueBond", renderArray())),

      element(".break"),

      renderFunctionCall("issueBond.expense", renderExpenseArgs()),

      element(".break"),

      renderFunctionCall("checkBook", ["someString", comma, renderObjectLiteral()]),

      element(".break"),

      renderFunctionCall("showSource.hostModule", renderModuleArgs()),

      element(".break"),

      renderReturn(),
    ])


    function renderFunctionLiteral(content) {
      return element(".function-literal", [
        element(".function-symbol", "function "),
        element(".function-name", "buildAHouse"),
        leftParen,
        element(".function-signature", [   
          "issueBond",
          comma,
          br,
          "showSource",
          comma,
          br,
          "library",
          comma,
          br,
          "renderBond",
          rightParen,
          openFunction,
        ]),
        element(".function-body", content.concat([closeFunction])
        ),
      ])
    }


    function renderVariableAssignment(content) {
      return element("span", [
        element(".variable-symbol", "var"),
        "buildPanel",
        equals,
        element(".rhs", content),
      ])
    }


    function renderFunctionCall(name, content) {
      return element("span", [
        element(".call", name),
        leftParen,
        element(".arguments", content),
        rightParen,
      ])
    }


    function renderArray() {
      return element("span", [
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
        ]),
      ])
    }


    function renderExpenseArgs() {
      return element("span", [
        "buildPanel",
        comma,
        br,
        "labor",
        comma,
        br,
        "$100",
      ])
    }


    function renderObjectLiteral() {
      return element("span", [
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
        ])
      ])
    }


    function renderModuleArgs() {
      return element("span", [
        "library",
        comma,
        br,
        "render-bond",
        comma,
        br,
        "buildPanel",
      ])
    }


    function renderReturn() {
      return element("span", [
        element(".return-symbol", "return"),
        "buildPanel",
      ])
    }




    var canary = "#f5df2f"
    var gunmetal = "#bec9d6"
    var black =  "#557"
    var electric = "#a9a9ff"

    var stylesheet = element.stylesheet([

      element.style(".function-literal", {
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
        "margin-left": "1em",
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
        "margin-left": "1em",
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

