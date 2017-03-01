var library = require("module-library")(require)

module.exports = library.export(
  "voxel",
  ["web-element", "add-html", "basic-styles"],
  function(element, addHtml, basicStyles) {


    var voxel = element.template(
      ".voxel",
      element.style({
        "padding": "10px",
        "border": "10px solid #ecedf9",
        "margin-top": "30px",
        "display": "inline-block",
        "background": "white",
      }),
      function(bridge, label, description, getContent) {

        var bindings = prepareBridge(bridge)

        if (label.html) {
          var content = label
          this.addChild(content.html())
          return
        }

        var voxelId = this.assignId()

        var load = bindings.load.withArgs(voxelId, getContent).evalable()

        var button = element(
          "button.voxel-button.voxel-expand-button-"+voxelId,
          label,
          {onclick: load})

        var representation = element(
          ".voxel-representation.voxel-representation-"+voxelId,
          [button])

        if (description) {
          var type = element("button.voxel-content-type", description)
          representation.addChild(type)
        }


        var closeButton = element(
          "button.close-button.voxel-close-button-"+voxelId,
          "✕",
          {onclick: bindings.close.withArgs(voxelId).evalable()},
          element.style({"display": "none"})
        )

        var content = element(".voxel-content-"+voxelId)

        this.addChild(representation)
        this.addChild(closeButton)
        this.addChild(content)
      }
    )


    // Actions

    function prepareBridge(bridge) {
      var bindings = bridge.remember("voxel/bindings")
      if (bindings) { return bindings }

      basicStyles.addTo(bridge)

      var expand = bridge.defineFunction(
        function expandVoxel(id) {

        document.querySelector(".voxel-representation-"+id).style.display = "none"

        document.querySelector(".voxel-close-button-"+id).style.display = "block"

        document.querySelector(".voxel-content-"+id).style.display = "block"
      })

      var load = bridge.defineFunction(
        [addHtml.defineOn(bridge), expand],
        function loadVoxel(addHtml, expand, voxelId, getList) {

          getList(function(partial) {
            addHtml.inside(".voxel-content-"+voxelId, partial)
            expand(voxelId)
          })

        }
      )

      var close = bridge.defineFunction(
        [expand.asCall()],
        function closeVoxel(expand, id) {
          document.querySelector(".voxel-representation-"+id).style.display = "inline-block"

          document.querySelector(".voxel-content-"+id).style.display = "none"

          document.querySelector(".voxel-close-button-"+id).style.display = "none"

          var button = document.querySelector(".voxel-expand-button-"+id)

          button.setAttribute("onclick", expand.withArgs(id).evalable())
      })

      var bodyStyle = element.style("body", {
        "background-color": "#fbfeff",
      })

      bridge.addToHead(
        element.stylesheet(
          bodyStyle,
          voxel,
          voxelButton,
          closeButtonStyle,
          closeButtonHover,
          typeStyle,
          typeHoverStyle,
          representationStyle
        )
      )

      var bindings = {
        expand: expand,
        load: load,
        close: close,
      }

      bridge.see("voxel/bindings", bindings)

      return bindings
    }


    // Styles

    var voxelButton = element.style(
      "button.voxel-button",
      {
        "box-shadow": "0px 3px 2px 0px #aec",
        "display": "block",
        "width": "100%",
        "text-align": "left",
      }
    )

    var typeStyle = element.style("button.voxel-content-type", {
      "box-shadow": "0px 3px 2px 0px #dfe",
      "background-color": "white",
      "color": "#0d8",
      "display": "inline-block"
    })

    var typeHoverStyle = element.style(".voxel-content-type:hover", {
      "background-color": "white",
    })

    var representationStyle = element.style(".voxel-representation", {
      "width": "14em",
    })

    var closeButtonStyle = element.style("button.close-button", {
      "display": "none",
      "float": "right",
      "background-color": "transparent",
      "color": "black",
      "padding": "20px",
      "margin": "-10px -5px -10px",
      "cursor": "pointer"
    })

    var closeButtonHover = element.style("button.close-button:hover", {
      "background-color": "transparent",
    })


    return voxel

  }
)

