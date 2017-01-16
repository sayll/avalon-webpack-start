;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-sliderR" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M763.299 536.212c0.58-1.165 1.6-2.183 2.037-3.348 10.186-21.245 6.838-47.44-11.204-64.465l-411.244-388.979c-22.412-21.247-57.773-20.226-79.018 2.182-21.248 22.412-20.228 57.773 2.182 79.019l369.042 349.109-367.588 354.195c-22.263 21.392-22.846 56.756-1.454 79.019 10.914 11.353 25.611 17.171 40.162 17.171 13.971 0 27.939-5.237 38.708-15.714l407.46-392.766c0.727-0.727 1.017-1.889 1.891-2.619 0.581-0.579 1.165-1.017 1.891-1.598 3.349-3.347 4.95-7.423 7.133-11.206M763.299 536.212z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sliderL" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M260.701 487.788c-0.58 1.165-1.6 2.183-2.037 3.348-10.186 21.245-6.838 47.44 11.204 64.465l411.244 388.979c22.412 21.247 57.773 20.226 79.018-2.182 21.248-22.412 20.228-57.773-2.182-79.019l-369.042-349.109 367.588-354.195c22.263-21.392 22.846-56.756 1.454-79.019-10.914-11.353-25.611-17.171-40.162-17.171-13.971 0-27.939 5.237-38.708 15.714l-407.46 392.766c-0.727 0.727-1.017 1.889-1.891 2.619-0.581 0.579-1.165 1.017-1.891 1.598-3.349 3.347-4.95 7.423-7.133 11.206M260.701 487.788z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)