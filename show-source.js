var library = require("module-library")(require)



module.exports = library.export(
  "show-source",
  ["render-expression", "make-request", "web-element", "browser-bridge", "an-expression", "./boot-program", "bridge-module"],
  function(renderExpression, makeRequest, element, BrowserBridge, anExpression, bootProgram, bridgeModule) {

    function showSource(targetVoxel, singleton) {

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
          renderModule(bridge, singleton)
        })  

      })

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



// module.exports = library.export(
//   "show-source",
//   ["web-element", "function-call", "make-request", "browser-bridge", "render-expression", "an-expression", "bridge-module", "./boot-program"],
//   function(element, functionCall, makeRequest, BrowserBridge, renderExpression, anExpression, bridgeModule, bootProgram) {

//     var left = element(
//       ".bolt-bit.left",
//       element.style({
//         "width": "50%",
//         "border-top-width": "3px",
//         "border-right-width": "3px",
//       })
//     )
//     var right = element(
//       ".bolt-bit.right",
//       element.style({
//         "width": "50%",
//         "border-bottom-width": "3px",
//         "box-sizing": "border-box",
//       })
//     )

//     var boltBit = element.style(".bolt-bit", {
//       "display": "inline-block",
//       "height": "100%",
//       "box-sizing": "border-box",
//       "border": "0px solid cyan",
//     })

//     var program = element.template(
//       ".program",
//       element.style({
//         "position": "relative",
//         "min-height": "100px",
//         "max-width": "100%",
//         "margin-top": "-50px",
//         "border": "0px solid cyan",
//         "border-top-width": "3px",
//         "width": "1px",
//         "margin-top": "-44px",
//         "margin-left": "-1px",
//         "float": "left",
//         "min-height": "34px",
//         "display": "none",

//         ".open": {
//           "display": "block",
//           "width": "520px",
//           "margin-left": "-545px",
//           "min-height": "100px",
//         }
//       })
//     )

//     var bolt = element(
//       ".glow",
//       element.style({
//         "background-color": "#dcfdff",
//         "height": "100%",
//       }),
//       [left, right]
//     )

//     var ezjsButton = element.template(
//       "a.lightning-bolt",
//       element.style({
//         "width": "60px",
//         "height": "22px",
//         "float": "right",
//         "padding": "6px 6px 12px 0px",
//         "background-color": "#f1feff",
//         "cursor": "pointer",
//         "display": "inline-block",
//       }),
//       [bolt]
//     )

//     function prepareSite(site, lib) {
      
//       renderExpression.prepareSite(site)

//       site.addRoute("get", "/show-source/:moduleName", function(request, response) {

//         var name = request.params.moduleName

//         var bridge = new BrowserBridge().partial().forResponse(response)

//         lib.using([name], function(singleton) {
//           renderModule(bridge, singleton)
//         })  

//       })

//       site.addRoute(
//         "get",
//         "/library/:name.js",
//         function(request, response) {
//           var name = request.params.name

//           if (name.match(/[^a-z-]/)) {
//             throw new Error("Dependencies can only have lowercase letters and dash. You asked for "+name)
//           }

//           var bridge = new BrowserBridge()

//           var source = bridgeModule.definitionWithDeps(library, name, bridge)

//           response.setHeader('content-type', 'text/javascript')

//           response.send(source)
//         }
//       )
//     }

//     function renderModule(bridge, singleton) {

//       var module = singleton.__nrtvModule

//       var functionLiteral = anExpression.functionLiteral(module.func)

//       var program = anExpression.program()

//       var expressionPartial = bridge.partial()

//       renderExpression(expressionPartial, functionLiteral, program)

//       var programName = module.name || "unnamed"

//       bootProgram.prepareBridge(bridge)

//       bridge.asap(
//         bridgeModule(library, "boot-program", bridge).withArgs(programName, program.data())
//       )

//       bridge.addToHead(
//         element("link", {
//           rel: "stylesheet",
//           href: "/render-module/styles.css"
//         })
//       )

//       var title = element(
//         module.name,
//         element.style({
//           "color": "cyan",
//           "font-weight": "bold",
//           "font-size": "1.2em",
//           "line-height": "2em",
//           "margin-top": "-2em",
//         })
//       )

//       bridge.send(element(title, expressionPartial))
//     }

//     function prepareBridge(bridge) {
//       if (bridge.remember("show-source")) { return }

//       bridge.addToHead(
//         element.stylesheet(boltBit, ezjsButton, program)
//       )

//       var loadModule = bridge.defineFunction(
//         [makeRequest.defineOn(bridge)],
//         function loadModule(makeRequest, event, moduleName, targetSelector) {
        
//           if (typeof makeRequest != "function") { throw new error("makeRequest should be a function") }

//           if (typeof event.clientX != "number") { throw new Error("event should be an event") }

//           if (typeof moduleName != "string") { throw new error("module name should be string") }

//           if (typeof targetSelector != "string") { throw new Error("targetSelector should be string") }

//           if (document.querySelector(".program.open")) { return }

//           makeRequest("/show-source/"+moduleName, function(partial) {
//             document.querySelector(targetSelector).innerHTML = partial
//           })

//           event.preventDefault()

//           // var render = document.querySelector(".voxels")

//           // render.style.transform = "translateX(200px)"
//           // render.style.transition = "transform 1s"

//           document.querySelector(targetSelector).classList.add("open")
//         }
//       )

//       bridge.see("show-source", loadModule)
//     }

//     showSource.prepareBridge = prepareBridge

//     showSource.prepareSite = prepareSite

//     function showSource(bridge, singleton) {

//       prepareBridge(bridge)

//       var target = program()
//       target.assignId()

//       if (!singleton.__nrtvModule) {
//         throw new Error("show-source expects you to pass it a browser-bridge to eventually render the source into, and a singleton that came from module-library. You passed this for a singleton: "+singleton)
//       }

//       var moduleName = singleton.__nrtvModule.name

//       var targetSelector = "#"+target.id

//       var loadModule = bridge.remember("show-source").withArgs(functionCall.raw("event"), moduleName, targetSelector)

//       var button = ezjsButton()

//       button.onclick(loadModule)

//       bridge.send([
//         target,
//         button
//       ])
//     }

//     return showSource
//   }
// )