var library = require("module-library")(require)


library.define(
  "render-pitch",
  ["web-element", "basic-styles"],
  function(webElement, basicStyles) {

    function renderPitch(voxel) {

      var letter = webElement([
        webElement(
          "h1",
          "Dear friends,"
        ),
        webElement(
          "p",
          "I'm starting a  tiny house building business. I have built two prototypes, and made very detailed plans. I would like to build one for sale."
        ),
      ])

      voxel.send(letter)
    }

    return renderPitch
  }
)



library.using(
  ["web-host", "show-source", library.ref(), "render-pitch"],
  function collectiveMagic(host, showSource, lib, renderPitch) {

    host.onVoxel(function(voxel) {

      var content = voxel.below()

      renderPitch(content)

      showSource({
        editorTarget: voxel.left({open: true}),
        contentTarget: content,
        library: lib,
        moduleName: "render-pitch",
      })

      voxel.send()

    })
  }
)






      // element("p", "I need materials. Materials cost money. Classic situation in economics. I need to sell a bond."),
      // element("p", "The basic deal is this: If you buy a $200 bond, I will return to you $210 some time in the next 60 days."),

      // element("h1", "What makes you think you can do this?"),
      // element("p", "In order to buy the materials, pay myself and Bobby (my partner in prototype building), pay the premium on the bonds, I need to sell the house for $3000."),
      // element("p", "Someone could spend the $3000, plop it in their yard, rent it for $300 a month and make back their principle in 10 months."),

      // element("h1", "These \"plans\" are they sketched on a napkin somewhere?"),
      // element("p", "No, they are computer drawings and instruction checklists for how to build everything. I will dump all of the details I have below."),

      // element("h1", "What if it takes longer than you think? Shit happens right?"),
      // element("p", "I think we can build it in 2 weeks. That plus an additiona 8 weeks of \"overage\" and sales time = 60 days."),
      // element("p", "But yes, this first time is a best guess. The second time will be based on data."),

      // element("p", "It's also worth remembering that Bobby and I have already built two of these and I've tested building the production panels and using them for an addition, so my estimate of 2 weeks is based on timing things I have actually done."),

      // element("p", "If I've convinced you, click one of the buttons below. If you have questions, text me: 812-320-1877."),
      // element("p", "Best,", element("br"), "Erik"),












  //   if (!voxel.remember("panel-bond-demo/renderPitch")) {

  //     voxel.addToHead(
  //       element.stylesheet(

  //         element.style("img.hero", {
  //           "width": "100%",
  //           "@media (max-width: 600px)": {
  //             "margin-left": "-20%",
  //             "margin-right": "-40%",
  //             "width": "140%",
  //           }
  //         }),

  //         element.style(".caption", {
  //           "text-align": "center",
  //           "margin-bottom": "5em",
  //         }),

  //         element.style("img", {
  //           "width": "100%",
  //         }),

  //         element.style("h1", {
  //           "margin-top": "2em",
  //         })

  //       )
  //     )

  //     basicStyles.addTo(voxel)

  //     voxel.see("panel-bond-demo/renderPitch", true)
  //   }

  //   voxel.send(letter)
  // }












// EXAMPLE_FUNCTION = function foo() {
//   bless(this,
//     "house"
//   )
//   upTo(1, house)
// }

