var library = require("module-library")(require)

module.exports = library.export(
  "render-module",
  ["render-expression", "an-expression", "browser-bridge", "bridge-module", "./boot-program", "web-element"],
  function(renderExpression, anExpression, BrowserBridge, bridgeModule, bootProgram, element) {

    function renderModule(bridge, singleton) {

      var module = singleton.__nrtvModule

      var expression = anExpression.functionLiteral(module.func)

      renderExpression(bridge, functionLiteral, program)

      var programName = module.name || "unnamed"

      bootProgram.prepareBridge(bridge)

      var program = anExpression.program()

      drawExpression(bridge, functionLiteral, program)

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