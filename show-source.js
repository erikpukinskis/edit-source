var library = require("module-library")(require)

module.exports = library.export(
  "show-source",
  ["web-element", "function-call", "make-request", "browser-bridge", "render-expression", "an-expression", "bridge-module", "./boot-program"],
  function(element, functionCall, makeRequest, BrowserBridge, renderExpression, anExpression, bridgeModule, bootProgram) {

    var left = element(
      ".bolt-bit.left",
      element.style({
        "width": "50%",
        "border-top-width": "3px",
        "border-right-width": "3px",
      })
    )
    var right = element(
      ".bolt-bit.right",
      element.style({
        "width": "50%",
        "border-bottom-width": "3px",
        "box-sizing": "border-box",
      })
    )

    var boltBit = element.style(".bolt-bit", {
      "display": "inline-block",
      "height": "100%",
      "box-sizing": "border-box",
      "border": "0px solid cyan",
    })

    var program = element.template(
      ".program",
      element.style({
        "position": "relative",
        "min-height": "100px",
        "max-width": "100%",
        "margin-top": "-50px",
        "border": "0px solid cyan",
        "border-top-width": "3px",
        "width": "1px",
        "margin-top": "-44px",
        "margin-left": "-1px",
        "float": "left",
        "min-height": "34px",
        "display": "none",

        ".open": {
          "display": "block",
          "width": "520px",
          "margin-left": "-545px",
          "min-height": "100px",
        }
      })
    )

    var bolt = element(
      ".glow",
      element.style({
        "background-color": "#dcfdff",
        "height": "100%",
      }),
      [left, right]
    )

    var ezjsButton = element.template(
      "a.lightning-bolt",
      element.style({
        "width": "60px",
        "height": "22px",
        "float": "left",
        "margin-left": "-25px",
        "margin-top": "-50px",
        "padding": "6px 6px 12px 0px",
        "background-color": "#f1feff",
        "cursor": "pointer",
      }),
      [bolt],
      function(bridge, renderSelector) {

        var showSource = bridge.remember("edit-source").withArgs(renderSelector, functionCall.raw("event"))

        this.onclick(showSource)
      }
    )

    function prepareSite(site, lib) {
      
      renderExpression.prepareSite(site)

      site.addRoute("get", "/edit-source/:moduleName", function(request, response) {

        var name = request.params.moduleName

        var bridge = new BrowserBridge().partial().forResponse(response)

        lib.using([name], function(singleton) {
          renderModule(bridge, singleton)
        })  

      })

      site.addRoute(
        "get",
        "/library/:name.js",
        function(request, response) {
          var name = request.params.name

          if (name.match(/[^a-z-]/)) {
            throw new Error("Dependencies can only have lowercase letters and dash. You asked for "+name)
          }

          var bridge = new BrowserBridge()

          var source = bridgeModule.definitionWithDeps(library, name, bridge)

          response.setHeader('content-type', 'text/javascript')

          response.send(source)
        }
      )
    }

    function renderModule(bridge, singleton) {

      var module = singleton.__nrtvModule

      var functionLiteral = anExpression.functionLiteral(module.func)

      var program = anExpression.program()

      var expressionPartial = bridge.partial()

      renderExpression(expressionPartial, functionLiteral, program)

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

      bridge.send(element(title, expressionPartial))
    }

    function prepareBridge(bridge) {
      if (bridge.remember("edit-source")) { return }

      bridge.addToHead(
        element.stylesheet(boltBit, ezjsButton, program)
      )

      var binding = bridge.defineFunction(
        [makeRequest.defineOn(bridge)],
        function showSource(makeRequest, renderSelector, event) {

          if (document.querySelector(".program.open")) { return }
          makeRequest("/edit-source/test-check-book", function(partial) {
            document.querySelector(".program").innerHTML = partial
          })

          event.preventDefault()

          var render = document.querySelector(renderSelector)

          render.style.transform = "translateX(540px)"
          render.style.transition = "transform 1s"

          document.querySelector(".program").classList.add("open")
        }
      )

      bridge.see("edit-source", binding)
    }

    showSource.prepareBridge = prepareBridge

    showSource.prepareSite = prepareSite

    function showSource(x,y) {
      return [
        program(),
        ezjsButton(x,y),
      ]
    }

    return showSource
  }
)