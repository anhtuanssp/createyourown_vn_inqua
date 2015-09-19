;(function(window, document, Darkroom) {
  'use strict';

  Darkroom.plugins['save'] = Darkroom.Plugin.extend({
    defaults: {
      // callback: function() {
      //   this.darkroom.selfDestroy();
      // },
      convertToCanvasInqua : function(){
        this.darkroom.covertToMainCanvasInqua();
      }
    },

    initialize: function InitDarkroomSavePlugin() {
      var buttonGroup = this.darkroom.toolbar.createButtonGroup();

      // this.destroyButton = buttonGroup.createButton({
      //   image: 'save'
      // });

      this.saveToMainCanvas = buttonGroup.createButton({
        image: '',
      },'Chuyển hình vào sản phẩm');

      // this.destroyButton.addEventListener('click', this.options.callback.bind(this));
      this.saveToMainCanvas.addEventListener('click', this.options.convertToCanvasInqua.bind(this));
    },
  });
})(window, document, Darkroom);
