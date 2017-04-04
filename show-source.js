var library = require("module-library")(require)



module.exports = library.export(
  "show-source",
  ["render-expression", "make-request", "web-element", "browser-bridge", "javascript-to-ezjs", "an-expression", "bridge-module", "./boot-module", library.ref()],
  function(renderExpression, makeRequest, element, BrowserBridge, javascriptToEzjs, anExpression, bridgeModule, bootModule, lib) {

    function showSource(options) {
      var bridge = options.bridge

      var moduleName = options.moduleName

      var source = options.library.get(moduleName).__nrtvModule.func.toString()

      var tree = javascriptToEzjs(source, options.universe)

      var editor = bridge.partial()

      var boot = bridgeModule(lib, "./boot-module", bridge)

      renderExpression(editor, tree.root(), tree)

      editor.domReady(
        boot.withArgs(
          moduleName,
          tree.id,
          options.contentSelector
        )
      )

      bridge.asap("var using = library.using.bind(library)")

      prepareSite(bridge.getSite(), options.library)

      var title = element(".module-title", moduleName)

      var stylesheet = element.stylesheet([

        element.style(".module-title", {
          "color": "#a9a9ff",
          "font-family": "sans-serif",
          "font-size": "1.3em",
          "font-weight": "bold",
          "line-height": "1.5em",
          "margin-bottom": "0.2em",
        }),

      ])

      bridge.addToHead(stylesheet)

      bridge.send([title, editor])
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
      
      if (site.remember("show-source")) { return }

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

      site.see("show-source", true)
    }

    function prepareBridge(bridge, lib) {
      if (bridge.remember("show-source")) { return }

      prepareSite(bridge.getSite(), lib)

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
