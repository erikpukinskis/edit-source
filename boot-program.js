var library = require("module-library")(require)

module.exports = library.export(
  "boot-program",
  ["./module", "an-expression"],
  function(Module, anExpression) {

    function bootProgram(programName, programData) {

      var program = new anExpression.program(programData)

      var mod = new Module(program, programName)

      var dependencies = program.rootExpression().argumentNames

      mod.loadDependencies(dependencies, function() {
        mod.run() 
      })

      program.onchanged(function(changes) {
        if (changes.linesAdded) {
          lineControls.offsetCameraUp(linesAdded)
        }

        mod.run()
      })

      program.onnewexpression(function(parent, line) {
        mod.updateDependencies(parent, line, mod.run)
      })
    }

    bootProgram.prepareBridge = function(bridge) {
      Module.prepareBridge(bridge)
    }

    return bootProgram

  }
)
