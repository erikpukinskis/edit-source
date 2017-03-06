var library = require("module-library")(require)


library.using(
  ["web-host", "show-source", "./test-check-book"],
  function(host, showSource, testCheckBook) {

    host.onSite(function(site) {
      showSource.prepareSite(site, library)
    })

    host.onRequest(function(getBridge) {
      var bridge = getBridge()
      showSource.prepareBridge(bridge)
      testCheckBook(bridge)

      // showSource(
      //   bridge,
      //   testCheckBook(bridge)
      // )
    })

  }
)