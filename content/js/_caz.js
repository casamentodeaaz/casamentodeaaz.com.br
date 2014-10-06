//var caz = caz || (function ($) {
//  'use strict';
//
//  function getLayout() {
//    var classBody = $('body').attr('class').split(' ')
//
//    for (var i = classBody.length - 1; i >= 0; i--) {
//      if (classBody[i].search(/^l-/) >= 0) {
//        return classBody[i].substr(2)
//      }
//    }
//
//    return undefined
//  }
//
//  return {
//    layout: getLayout()
//  }
//})(jQuery)

Module('Caz.Application', function (Application) {
  'use strict';

  Application.fn.initialize = function () {

    this.layout = this.getLayout()

    this.sidebar = new Caz.Sidebar($('aside'))
  }

  Application.fn.getLayout = function () {
    var classBody = $('body').attr('class').split(' ')

    for (var i = classBody.length - 1; i >= 0; i--) {
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
    this.resized()
    //this.draw(100)
    this.addEventListeners()
    this.initPosition = this.html.offset().top - parseInt(this.html.css('top'))
    this.endPosition = this.initPosition - this.html.outerHeight() + this.html.parent().outerHeight()
    this.lastPosition = this.initPosition
  }

  Sidebar.fn.draw = function (y) {
    $('body').append( $('<div/>').css({position: 'absolute', top: y, height: 1, width: '100%', background: 'red'}) )
  }

  Sidebar.fn.addEventListeners = function () {
    $(window)
      .on('resize', $.proxy(this, 'resized'))
      .on('scroll', $.proxy(this, 'scrolled'))
  }

  Sidebar.fn.resized = function () {

    var MAXWIDTH = 865
      , windowWidth = $(window).width()
      , windowHeight = $(window).height()
      , htmlHeight = this.html.height()

    this.enable = (MAXWIDTH < windowWidth && htmlHeight < windowHeight)
    this.scrolled()
  }

  Sidebar.fn.scrolled = function () {

    var thisTopBiggerThanScroll = this.initPosition <= $(window).scrollTop()
      , thisBottomBiggerThanParent = Math.floor(this.html.offset().top + this.html.outerHeight()) > this.html.parent().offset().top + this.html.parent().outerHeight()

    if (this.enable) {

      if (thisTopBiggerThanScroll) {
        this.fix()

        if (thisBottomBiggerThanParent) {
          this.bottom()
          this.unfix()
        }

      } else {
        this.unfix()
        this.unbottom()
      }
    } else {
      this.unbottom()
      this.unfix()
    }

//    var thisTopBiggerThanScroll = this.initPosition <= $(e.target).scrollTop()
//      , thisBiggerThanWindow = this.html.height() > $(window).height()
//      , thisBottomBiggerThanParent = Math.floor(this.html.offset().top + this.html.outerHeight()) > this.html.parent().offset().top + this.html.parent().outerHeight()
//
//    if (thisTopBiggerThanScroll) {
//      this.fix()
//
//      if (thisBiggerThanWindow) {
//        this.bottom()
//      }
//
//      if (thisBottomBiggerThanParent) {
//        this.bottom()
//        this.unfix()
//      }
//
//    } else {
//      this.unfix()
//      this.unbottom()
//    }

//      if(){
//
//      }
//      console.log(windowWidth, windowHeight)
//    } else {
//      this.unfix()
//      this.unbottom()
//    }

  }

  Sidebar.fn.fix = function () {
    this.html.addClass('fixed')
  }

  Sidebar.fn.unfix = function () {
    this.html.removeClass('fixed')
  }

  Sidebar.fn.bottom = function () {
    this.html.addClass('align-bottom')
  }

  Sidebar.fn.unbottom = function () {
    this.html.removeClass('align-bottom')
  }

})
