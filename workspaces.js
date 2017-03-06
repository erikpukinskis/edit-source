var library = require("module-library")(require)


library.using(
  ["web-site", "browser-bridge", "web-element"],
  function(WebSite, BrowserBridge, element) {

    var host = new WebSite()
    var sites = {}
    var spaces = ["test"]

    spaces.forEach(function(name) {
      library.using(["work-space/"+name],
        function(space) {
          var appServer = new WebSite()
          host.use(appServer.app)
          sites[name] = appServer
          space.prepareSite(appServer)
        }
      )
    })

    host.addRoute("get", "/work-spaces/:id",
      function(request, response) {

        bridge = new BrowserBridge()

        var voxels = []

        function getAppBridge() {
          var partial = bridge.partial()
          voxels.push(partial)
          return partial
        }

        var id = request.params.id

        library.using(
          ["work-space/"+id],
          function(generator) {
            a(getAppBridge)
          }
        )

        voxels = element(
          ".voxels",
          element.style({
            "margin-top": "90px",
            "margin-bottom": "500px",
          }),
          voxels
        )
        
        bridge.requestHandler(voxels)(request, response)
      }
    )

    host.start(process.env.PORT || 1413)

  }
)
