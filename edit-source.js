var library = require("module-library")(require)

module.exports = library.export(
  "edit-source",
  ["web-element"],
  function(element) {

    function ezjsButton() {
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

      var bolt = element(
        ".glow",
        element.style({
          "background-color": "#dcfdff",
          "height": "100%",
        }),
        [left, right]
      )

      var container = element(
        "a.lightning-bolt",
        element.style({
          "width": "60px",
          "height": "22px",
          "float": "left",
          "margin-left": "-30px",
          "margin-top": "-50px",
          "padding": "6px 6px 12px 0px",
          "background-color": "#f1feff",
        }),
        {href: "javascript:console.log('ezrp')"},
        [bolt, element.stylesheet(boltBit)]
      )

      return container
    }

    return ezjsButton
  }
)