var library = require("module-library")(require)



module.exports = library.export(
  "show-source",
  ["render-expression", "make-request", "web-element", "browser-bridge", "javascript-to-ezjs", "./boot-program", "./program", "bridge-module", "./module"],
  function(renderExpression, makeRequest, element, BrowserBridge, javascriptToEzjs, bootProgram, Program, bridgeModule, Module) {

    function showSource(bridge, source, moduleName) {

      prepareBridge(bridge)

      var functionLiteral = javascriptToEzjs(source)

      var program = new Program()

      var expressionPartial = bridge.partial()

      renderExpression(expressionPartial, functionLiteral, program)

      Module.prepareBridge(bridge)

      bridge.asap(
        bridgeModule(library, "boot-program", bridge).withArgs(moduleName, program.data())
      )

      bridge.addToHead(
        element("link", {
          rel: "stylesheet",
          href: "/render-module/styles.css"
        })
      )

      var title = element(
        moduleName,
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


    showSource.button = function(targetVoxel, singleton) {

      prepareBridge(targetVoxel)

      targetVoxel.send("loading...")

      var moduleName = singleton.__nrtvModule.name

      var load = targetVoxel.remember("show-source/loadCode").withArgs(moduleName)

      var showSourceButton = element(
        "button",
        {onclick: targetVoxel.toggle().withArgs(load).evalable()},
        "Show source"
      )

      return showSourceButton

    }

    function prepareSite(site, lib) {
      
      renderExpression.prepareSite(site)

      site.addRoute("get", "/show-source/partials/:moduleName", function(request, response) {

        var name = request.params.moduleName

        var bridge = new BrowserBridge().partial().forResponse(response)

        lib.using([name], function(singleton) {
          var module = singleton.__nrtvModule

          showSource(bridge, module.func.toString(), module.name)
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

    function prepareBridge(bridge) {
      if (bridge.remember("show-source")) { return }

      var loadCode = bridge.defineFunction(
        [makeRequest.defineOn(bridge)],
        function loadCode(makeRequest, moduleName, voxel) {
          if (voxel.wasLoaded) { return }

          makeRequest("/show-source/partials/"+moduleName, function(html) {
            voxel.send(html)
          })

          voxel.wasLoaded = true
        }
      )

      bridge.addToHead(
        element.stylesheet(
          element.style("button", {
            "padding": "10px",
            "font-size": "1em",
            "border": "0",
            "background": "#e91e63",
            "color": "white",
          })
        )
      )

      bridge.see("show-source/loadCode", loadCode)
    }

    showSource.prepareSite = prepareSite

    return showSource
  }
)
