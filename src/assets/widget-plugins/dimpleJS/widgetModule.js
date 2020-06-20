(function () {
    "use strict";

  window.WidgetComponentFactory.registerModule('dimpleJS'/*$$WCOM_UID*/, function () {

    function Widget($base) {
      //private members
      this._height = 300;
      this.$base = $base;

      $base.widgetEvents = [
        {
          name: 'BarSelected',
          parameters:['fieldName']
        }
      ]
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

            const that = this;
            d3.selectAll("rect.dimple-bar").on("click", function (e) {
              that.$base.triggerEvent(that,'BarSelected', [e.xField[0]]);
            });
            },

          onResize: function () {
            console.log('onResize');
          }
        }

        return Widget
    });

}());
