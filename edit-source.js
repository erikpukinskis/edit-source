var library = require("module-library")(require)

module.exports = library.export(
  "edit-source",
  ["web-element", "function-call", "make-request", "render-module", "browser-bridge"],
  function(element, functionCall, makeRequest, renderModule, BrowserBridge) {

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
        "background-color": "#f1feff",
        "width": "1px",
        "margin-top": "-6px",
        "margin-left": "-1px",
        "float": "left",
        "min-height": "34px",

        ".open": {
          "width": "270px",
          "margin-left": "-270px",
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
      [program(), left, right]
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
      renderModule.prepareSite(site)
      
      site.addRoute("get", "/edit-source/:moduleName", function(request, response) {

        var name = request.params.moduleName

        var bridge = new BrowserBridge().partial().forResponse(response)

        lib.using([name], function(singleton) {
          renderModule(bridge, singleton)
        })

      })

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

          render.style.transform = "translateX(300px)"
          render.style.transition = "transform 1s"

          document.querySelector(".program").classList.add("open")
        }
      )

      bridge.see("edit-source", binding)
    }

    ezjsButton.prepareBridge = prepareBridge

    ezjsButton.prepareSite = prepareSite

    return ezjsButton
  }
)