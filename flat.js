var library = require("module-library")(require)

library.using(
  ["web-host", "web-element"],
  function(host, element) {
    var page  = element(".lines", [
      element("function buildAHouse("),
      element(".depth-1", "issueBond,"),
      element(".depth-1", "webHost,"),
      element(".depth-1", "library,"),
      element(".depth-1", "renderBond ){"),
      element(".break"),
      element(".depth-2", "var buildPanel ="),
      element(".depth-3", "issueBond(["),
      element(".depth-4", "cut studs to length,"),
      element(".depth-4", "cut track to length,"),
      element(".depth-4", "crimp,"),
      element(".depth-4", "add sheathing,"),
      element(".depth-4", "flipsulate,"),
      element(".depth-4", "add sheathing ])"),
      element(".break"),
      element(".depth-2", "issueBond.expense("),
      element(".depth-3", "buildPanel,"),
      element(".depth-3", "labor,"),
      element(".depth-3", "$100)"),
      element(".break"),
      element(".depth-2", "issueBond.expense("),
      element(".depth-3", "buildPanel,"),
      element(".depth-3", "steel studs,"),
      element(".depth-3", "$20 )"),
      element(".break"),
      element(".depth-2", "issueBond.expense("),
      element(".depth-3", "buildPanel,"),
      element(".depth-3", "plywood,"),
      element(".depth-3", "$10 )"),
      element(".break"),
      element(".depth-2", "webHost.hostModule("),
      element(".depth-3", "library,"),
      element(".depth-3", "render-bond,"),
      element(".depth-3", "buildPanel )"),
      element(".break"),
      element(".depth-2", "return buildPanel }"),
    ])

    var stylesheet = element.stylesheet([
      element.style(".lines", {
        "font-family": "sans-serif",
        "font-size": "13pt",
        "color": "#333",
        "line-height": "1.2em",
      }),
      element.style(".depth-1", {
        "margin-left": "1em",
      }),
      element.style(".depth-2", {
        "margin-left": "2em",
      }),
      element.style(".depth-3", {
        "margin-left": "3em",
      }),
      element.style(".depth-4", {
        "margin-left": "4em",
      }),
      element.style(".break", {
        "height": "0.75em",
        "width": "1.5em",
        "background": "#fff"
      }),
    ])

    host.onVoxel(function(voxel) {
      voxel.addToHead
      voxel.send([page, stylesheet])
    })
  }
)



//      function buildAHouse(
//        issueBond,
//        webHost,
//        library,
//        renderBond ){
//          var buildPanel =
//            issueBond([
//              "cut studs to length",
//              "cut track to length",
//              "crimp",
//              "add sheathing",
//              "flipsulate",
//              "add sheathing" ])
//          issueBond.expense(
//            buildPanel,
//            "labor",
//            "$100")
//          issueBond.expense(
//            buildPanel,
//            "steel studs",
//            "$20" )
//          issueBond.expense(
//            buildPanel,
//            "plywood",
//            "$10" )
//          webHost.hostModule(
//            library,
//            "render-bond",
//            buildPanel )
//          return buildPanel }


