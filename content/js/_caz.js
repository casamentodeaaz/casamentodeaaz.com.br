Module('Caz.Application', function (Application) {
  'use strict';

  Application.fn.initialize = function () {
    this.layout = this.getLayout()
    this.sidebar = new Caz.Sidebar($('aside'))
  }

  Application.fn.getLayout = function () {
    var i,
        classBody = $('body').attr('class').split(' ')

    for (i = classBody.length - 1; i >= 0; i--) {
      if (classBody[i].search(/^l-/) >= 0) {
        return classBody[i].substr(2)
      }
    }
    return undefined
  }
})

Module('Caz.Sidebar', function (Sidebar) {
  'use strict';

  Sidebar.fn.initialize = function (html) {
    this.html = html
    this.initPosition = this.html.offset().top - parseInt(this.html.css('top'))
    this.resized()
    this.addEventListeners()
  }

  Sidebar.fn.addEventListeners = function () {
    $(window)
      .on('resize', $.proxy(this, 'resized'))
      .on('scroll', $.proxy(this, 'scrolled'))
  }

  Sidebar.fn.resized = function () {
    var MAXWIDTH = 865
      , windowWidth = $(window).width()

    this.enable = (MAXWIDTH < windowWidth)
    this.scrolled()
  }

  Sidebar.fn.scrolled = function () {
    var scrollTop = $(window).scrollTop()
      , biggerInit = this.initPosition <= scrollTop
      , endPosition = this.initPosition + this.html.parent().outerHeight()
      , biggerEnd = endPosition - this.html.outerHeight() <= scrollTop

    if (this.enable) {
      this.html.toggleClass('fixed', biggerInit)
      this.html.toggleClass('align-bottom', biggerEnd)
    } else {
      this.html.removeClass('fixed align-bottom')
    }
  }
})
