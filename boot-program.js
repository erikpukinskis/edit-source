var library = require("module-library")(require)

module.exports = library.export(
  "boot-program",
  ["./module", "./program"],
  function(Module, Program) {

    function bootProgram(programName, programData) {

      var program = new Program(programData)

      var mod = new Module(program, programName)      
    }

    return bootProgram

  }
)
