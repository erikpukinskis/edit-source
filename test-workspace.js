var library = require("module-library")(require)

module.exports = library.export(
  "work-space/test",
  ["make-request", "browser-bridge", "./old-voxel", "web-element"],
  function(makeRequest, BrowserBridge, voxel, element) {

    var spec = special("foo")
    special.whiz("foo", "bar")


    function testWorkSpace(getBridge) {

      var testBridge = getBridge()

      specialThingies.prepareBridge(testBridge)

      var loadPartial = makeRequest.defineOn(testBridge)

      var get = loadPartial.withArgs("/partials/special-thingies/"+spec.id)


      var body = [
        voxel(testBridge, spec.description, "a special thingie", get),
      ]

      testBridge.send(body)
    }

    testWorkSpace.prepareSite = function(site) {
      if (site.remember("test-work-space")) { return }

      specialThingies.prepareSite(site)

      site.addRoute("get",
        "/partials/special-thingies/:specialId",
        function(request, response) {
          var bridge = new BrowserBridge().forResponse(response)

          specialThingies.handleRequest(request, bridge)
        }
      )

      site.see("test-work-space", true)
    }

    return testWorkSpace
  }
)

