var library = require("module-library")(require)

module.exports = library.export(
  "boot-module",
  ["an-expression", "function-call", "add-html", "tell-the-universe", "web-element", "javascript-to-ezjs"],
  function(anExpression, functionCall, addHtml, tellTheUniverse, element, javascriptToEzjs) {

    function bootModule(moduleName, treeId, targetSelector, bridge, renderExpression) {

      var tree = anExpression.getTree(treeId)

      var universe = tellTheUniverse.called("new-universe").withNames({anExpression: "an-expression"})

      tree.logTo(universe)

      universe.onStatement(function(call) {

        var logTree = anExpression.tree()

        javascriptToEzjs(universe.source(), logTree)

        var logEl = renderExpression(bridge, logTree.root(), logTree)


        var uni = element([
          element("h2", "A wild universe appeared!"),
          element("p", "It only exists for you, for now."),
          element("p", element(".button", "Make it forever")),
          logEl,
        ])

        addHtml.inside(".log", uni.html())

        setTimeout(function() {
          document.querySelector(".log").classList.remove("squished")
        })
      })

      var module = new Module(tree, moduleName, targetSelector)

      return module
    }

    function Module(tree, name, targetSelector) {
      this.tree = tree
      this.name = name
      this.run = run.bind(this)
      this.updateDependencies = updateDependencies.bind(this)
      this.updateAndRun = updateAndRun.bind(this)
      this.depsAvailable = false
      this.loadDependencies = loadDependencies.bind(this)
      this.targetSelector = targetSelector

      var dependencies = tree.root().argumentNames

      this.loadDependencies(dependencies, this.run)

      tree.onchanged(this.run)

      var mod = this

      tree.onnewexpression(this.updateAndRun)
    }

    function run() {      

      var out = document.querySelector(this.targetSelector)

      if (!out) {
        throw new Error("Looked for a "+this.targetSelector+" element to render module into, but didn't find one.")
      }
      out.innerHTML = ""

      var root = this.tree.root()

      var moduleExpression = packageExpression(root)
  
      var js = anExpression.toJavascript(moduleExpression)

      js = js + "\n//# sourceURL="+this.name+".js"

      window.__nrtvFocusSelector = null

      var singleton = eval(js)

      var voxel = {
        send: send.bind(this)
      }

      addHtml.defaultIn(this.targetSelector, function() {
        singleton(voxel)
      })

    }

    function send(content) {
      if (content.html) {
        content = content.html()
      }
      document.querySelector(this.targetSelector).innerHTML = content 
    }

    function updateAndRun(parent, line) {
      this.updateDependencies(parent, line, this.run)
    }

    function packageExpression(functionLiteral) {

      var using = {
        kind: "function call",
        functionName: "using",
        arguments: [
          {
            kind: "array literal",
            items: argumentNamesToStringLiterals(functionLiteral)
          },
          functionLiteral
        ]
      }

      return using
    }

    function argumentNamesToStringLiterals(functionLiteral) {

      var names = functionLiteral
        .argumentNames
        .map(
          function(camelCase) {
            return anExpression.stringLiteral(
              dasherize(camelCase)
            )
          }
        )

      return names
    }

    function dasherize(camelCase) {
      var word = null
      var words = []

      for(var i=0; i<camelCase.length; i++) {
        var char = camelCase[i]
        var isUpper = char == char.toUpperCase()

        if (isUpper && !word) {
          word = char.toLowerCase()
        } else if (isUpper) {
          words.push(word)
          word = char.toLowerCase()
        } else if (!isUpper && !word) {
          word = char
        } else {
          word = word + char
        }
      }

      words.push(word)

      var dashed = words.join("-")

      return dashed
    }

    function loadDependencies(deps, callback) {
      var package = this.tree.root()

      deps.forEach(function(dep) {
        addScriptTag(dep)
      })

      waitForScripts(callback)

    }

    function updateDependencies(parent, line, callback) {

      if (line.kind != "function call") { return }

      var tree = this.tree
      var package = tree.root()
      var alreadyIn = package.argumentNames

      getDeps(line).forEach(requireIt)

      function requireIt(dep) {
        var isMissing = !contains(alreadyIn, dep)

        if (isMissing) {
          tree.addFunctionArgument(package.id, dep)
          addScriptTag(dep)
        }
      }

      waitForScripts(callback)
    }

    function getDeps(newExpression) {
      var deps = []
      var lines = newExpression.body
      var name = newExpression.functionName

      if (name) {
        var parts = name.split(".")
        deps.push(parts[0])
      }

      if (lines) {
        for(var i=0; i<lines; i++) {
          var moreDeps =
            getDeps(lines[i])
          deps = deps.concat(modeDeps)
        }
      }

      return deps
    }


    function getPackageFunctionLiteral(expression) {
      if (expression.kind == "function literal") {
        return expression
      }
    }


    var pendingScripts = []

    function addScriptTag(dep) {
      var moduleName = dasherize(dep)

      pendingScripts.push(moduleName)

      var el = document.createElement("script")
      el.setAttribute("src", "/library/"+moduleName+".js")
      el.setAttribute("type","text/javascript")

      var ready = functionCall("library.get").withArgs("boot-module").methodCall("ready").withArgs(moduleName)

      el.setAttribute("onload", ready.evalable())

      document.getElementsByTagName("head")[0].appendChild(el)
    }

    var waitingForScripts = []
    function waitForScripts(callback) {
      if (pendingScripts.length < 1) {
        callback()
      } else {
        waitingForScripts.push(callback)
      }
    }

    bootModule.ready = function(name) {
      remove(pendingScripts, name)
      if (pendingScripts.length > 0) {
        return
      }

      var callback
      while(
        callback = waitingForScripts.shift()
      ) {
        callback()
      }
    }

    function remove(array, item) {
      var i = array.indexOf(item)
      if (i >= 0) {
        array.splice(i, 1)
      }
    }

    return bootModule
  }
)

