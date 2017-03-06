var library = require("module-library")(require)

module.exports = library.export(
  "render-module",
  ["./draw-expression", "./an-expression", "browser-bridge", "bridge-module", "./boot-program", "web-element"],
  function(drawExpression, anExpression, BrowserBridge, bridgeModule, bootProgram, element) {

    function renderModule(bridge, singleton) {

      var module = singleton.__nrtvModule

      var functionLiteral = anExpression.functionLiteral(module.func)

      var program = drawExpression(functionLiteral, bridge)

      var programName = module.name || "unnamed"

      bootProgram.prepareBridge(bridge)

      bridge.asap(
        bridgeModule(library, "boot-program", bridge).withArgs(programName, program.data())
      )

      bridge.addToHead(
        element("link", {
          rel: "stylesheet",
          href: "/render-module/styles.css"
        })
      )

      var title = element(
        module.name,
        element.style({
          "color": "cyan",
          "font-weight": "bold",
          "font-size": "1.2em",
          "line-height": "2em",
          "margin-top": "-2em",
        })
      )

      bridge.send(element(title, program.element))
    }

    renderModule.prepareSite = function(site) {
      


    }

    return renderModule
  }
)