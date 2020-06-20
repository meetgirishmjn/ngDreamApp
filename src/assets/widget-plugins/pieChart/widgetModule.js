(function () {
  "use strict";

  window.WidgetComponentFactory.registerModule('pieChart'/*$$WCOM_UID*/, function () {

    function Widget($base) {
      //private members
      this._height = 300;
      this.$base = $base;

      $base.widgetEventListeners = [
        {
          name: 'RegionChange', parameters: ['regionCode'], callback: this.onRegionChange
        }
      ];

      const randomScalingFactor = function () {
        return Math.round(Math.random() * 100);
      };

      const  chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      };
      this.config = {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
            ],
            backgroundColor: [
              chartColors.red,
              chartColors.orange,
              chartColors.yellow,
              chartColors.green,
              chartColors.blue,
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Red',
            'Orange',
            'Yellow',
            'Green',
            'Blue'
          ]
        },
        options: {
          responsive: true
        }
      };
    }

    Widget.prototype = {

      onRender: function () {

        var canvas = document.createElement('canvas');
        canvas.width = this.$base.width;
        canvas.height = this.$base.height;
        this.$base.element.appendChild(canvas);    
        var ctx = canvas.getContext('2d');
        this.chart = new Chart(ctx,this.config);
      },

      onResize: function () {
        console.log('onResize');
      },

      onRegionChange(regionCode) {
        this.chart.data.labels = this.chart.data.labels = this.chart.data.labels.map((o, i) => regionCode + i);
        this.chart.update();
      }
    }



    return Widget
  });

}());
