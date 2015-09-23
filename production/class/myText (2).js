//   //EXTEND FROM IText CLASS
// ;(function ($,window,document,undefined){
//   fabric.MyText = fabric.util.createClass(fabric.Text, {

//     type: 'MyText',

//     initialize: function(options) {

//       options || (options = { });

//       this.callSuper('initialize', options);
//       this.set('idText', options.idText || new Date().getTime());
//       this.set('label', options.label || '');

//     },
//     // toObject: function(propertiesToInclude) {
//     //   return fabric.util.object.extend(this.callSuper('toObject'), {
//     //     label: this.get('label'),
//     //     idText : this.get('idText')
//     //   });
//     // },
//     _render: function(ctx) {
//       this.callSuper('_render', ctx);
//     }

//   });  
//   fabric.MyText.prototype.getID = function (){
//     return this.idText;
//   }
//   // fabric.MyText.fromObject = function (object){
//   //   return new fabric.MyText(object);
//   // }

//   fabric.MyText.async = true;



//   MYLIB.mixin(fabric.MyText, MYLIB.Event.ObserverMixin);
// })(jQuery,window,document)