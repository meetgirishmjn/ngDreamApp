(function () {
    "use strict";

  window.WidgetComponentFactory.registerModule('dimpleJS'/*$$WCOM_UID*/, function () {

    function Widget($base) {
      //private members
      this._height = 300;
      this.$base = $base;
    }

        Widget.prototype = {

          onRender: function () {

            var svg = dimple.newSvg(this.$base.element, this.$base.width, this.$base.height);
            var data = [
              { "Word": "Hello", "Awesomeness": 2000 },
              { "Word": "World", "Awesomeness": 3000 }
            ];
            var chart = new dimple.chart(svg, data);
            chart.addCategoryAxis("x", "Word");
            chart.addMeasureAxis("y", "Awesomeness");
            chart.addSeries(null, dimple.plot.bar);
            chart.draw();
            },

          onResize: function () {
            console.log('onResize');
          }
        }

        return Widget
    });

}());
