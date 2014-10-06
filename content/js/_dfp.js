var googletag

;
(function () {
  'use strict';

  var id = function (n) { return 'div-gpt-ad-1391116309662-' + n }

  googletag = googletag || {}
  googletag.cmd = googletag.cmd || []

  $.ajax({
    url: '//www.googletagservices.com/tag/js/gpt.js',
    dataType: 'script'
  })

  googletag.cmd.push(function () {

    var slots = []

    switch (CazApplication.layout) {
      case 'default':
        slots.push(
          googletag
            .defineSlot('/4132661/caz_300x600_1', [300, 600], id(0))
            .addService(googletag.pubads())
        )
        slots.push(
          googletag
            .defineSlot('/4132661/caz_768x90_1', [728, 90], id(1))
            .addService(googletag.pubads())
        )
        break

      case 'article':
        slots.push(
          googletag
            .defineSlot('/4132661/caz_300x250_1', [300, 250], id(0))
            .addService(googletag.pubads())
        )
        slots.push(
          googletag
            .defineSlot('/4132661/caz_768x90_1', [728, 90], id(1))
            .addService(googletag.pubads())
        )
        break
    }

    googletag.pubads().enableSingleRequest()
    googletag.pubads().set('adsense_link_color', '#ee326d')
    googletag.pubads().set('adsense_url_color', '#42bbcd')
    googletag.pubads().set('adsense_text_color', '#333')
    googletag.pubads().set('adsense_background_color', '#f5f5f5')

    googletag.enableServices()

    setInterval(
        function () { googletag.pubads().refresh([slots[0]]) }
      , 30000
    )
  })

  googletag.cmd.push(
    function () { googletag.display(id(0)) }
  )
  googletag.cmd.push(
    function () { googletag.display(id(1)) }
  )
})()
