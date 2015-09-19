/*! Project case.composer 2014-12-24 */
!function(a,b){CP.MainCanvas=function(){},CP.MainCanvas.prototype.$el=null,CP.MainCanvas.prototype.html="",CP.MainCanvas.prototype.canvas=null,CP.MainCanvas.prototype.widthCanvas=500,CP.MainCanvas.prototype.heightCanvas=500,CP.MainCanvas.prototype.casePhone=null,CP.MainCanvas.prototype.casePhone_mask=null,CP.MainCanvas.prototype.maskBackgroundCanvas=null,CP.MainCanvas.prototype.centerX=0,CP.MainCanvas.prototype.centerY=0,CP.MainCanvas.prototype.textDict=[],CP.MainCanvas.prototype.init=function(){this.html='<div class="main-canvas-container"><canvas id="{0}" width="{1}" height="{2}"></canvas></div>',this.html=this.html.format(MYLIB.constant.main_canvas_id,this.widthCanvas,this.heightCanvas),this.$el=a(this.html),this.bindEvents()},CP.MainCanvas.prototype.getElement=function(){return this.$el},CP.MainCanvas.prototype.renderLayout=function(){this.canvas=new fabric.Canvas(MYLIB.constant.main_canvas_id);this.canvas.on("after:render",function(){}),this.canvas.on("before:selection:cleared",function(){}),this.canvas.on({"touch:gesture":function(){console.log("TOUCH:GESTURE")},"touch:drag":function(){console.log("TOUCH:DRAG")},"touch:orientation":function(){},"touch:shake":function(){},"touch:longpress":function(){}})},CP.MainCanvas.prototype.bindEvents=function(){MYLIB.eventManager.subscribe(this,MYLIB.eventNames.chooseProductItem,"chooseProductHandle"),MYLIB.eventManager.subscribe(this,MYLIB.eventNames.saveCanvas,"saveCanvasHandle"),MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_submit_text,"addTextHandle"),MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_fontSize,"fontSizeHandle"),MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_change_color,"changeColorHandle"),MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_upload_from_computer,"addImageUploadHandle"),a(b).unbind("keydown").bind("keydown",this,this.onKeyDownHandler)},CP.MainCanvas.prototype.onKeyDownHandler=function(a){var b=a.data;switch(a.keyCode){case 46:var c=b.canvas.getActiveObject();if(c){var d=c.type||"khongro";switch(d){case"MyText":for(var e=0;e<b.textDict.length;e++){var f=b.textDict[e].getID(),g=c.getID();f===g&&(console.log("Find"),b.textDict.splice(e,1))}console.log(b.textDict),b.canvas.remove(c);break;default:b.canvas.remove(c)}}return}},CP.MainCanvas.prototype.fontSizeHandle=function(a){var b=a.data;console.log(b);var c=this.canvas.getActiveObject();if(c){var d=c.type||"khongro";switch(d){case"MyText":c.fontSize=b,this.canvas.renderAll()}}},CP.MainCanvas.prototype.changeColorHandle=function(a){console.log("change color");var b=a.data;console.log(b);var c=this.canvas.getActiveObject();c&&(c.set({fill:"#"+b}),this.canvas.renderAll())},CP.MainCanvas.prototype.chooseProductHandle=function(a){var b=a.data,c=this;this.casePhone_mask=b.product_img_primary_mask,this.canvas.clear(),fabric.Image.fromURL(b.product_img_primary,function(a){c.casePhone=a,c.canvas.add(a),c.casePhone.selectable=!1,c.canvas.setWidth(c.casePhone.width),c.canvas.setHeight(c.casePhone.height),c.centerX=c.casePhone.width/2,c.centerY=c.casePhone.height/2}),c.canvas.setOverlayImage(b.product_img_primary_mask,c.canvas.renderAll.bind(c.canvas)),c.canvas.renderAll()},CP.MainCanvas.prototype.addTextHandle=function(a){var b=a.data,c=new CP.MyText(b);c.fontSize=CP_INIT.text.fontSize,c.fontFamily=CP_INIT.text.fontFamilyDefault,c.left=this.centerX-50,c.top=this.centerY-50,this.textDict.push(c),this.canvas.add(c),this.canvas.renderAll()},CP.MainCanvas.prototype.addImageUploadHandle=function(a){var b=this,c=a.data,d=a.data;MYLIB.eventManager.fireEvent(b,MYLIB.eventNames.event_display_img,d);var e=new Image;e.src=c,e.onload=function(){var a=new fabric.Image(e,{left:b.centerX-100,top:b.centerY-100,centeredScaling:!0}),c=b.casePhone.width/e.width;1>c&&a.scale(c).setFlipX(!0),b.canvas.add(a),b.canvas.renderAll()}},CP.MainCanvas.prototype.saveCanvasHandle=function(){console.log("SAVE"),this.canvas.toDataURL("png")},MYLIB.mixin(CP.MainCanvas,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.ChooseProduct=function(){var b='<div id="{0}"" class="{1}" style="margin-bottom: 10px;"></div>';this.$el=null,this.productService=null,this.data=null,this.init=function(){console.log("LEFT INIT"),b=b.format(MYLIB.constant.choose_product_id,MYLIB.constant.choose_product_class),this.$el=a(b),this.productService=new CP.productSerice,this.renderProduct()},this.getElement=function(){return this.$el}},CP.ChooseProduct.prototype.productDicts=[],CP.ChooseProduct.prototype.renderProduct=function(){var a=this,b=this.productService.getProducts();b.done(function(b){a.data=b.products,a.render(a.data)})},CP.ChooseProduct.prototype.render=function(a){var b=this;_.each(a,function(a){var c=new CP.ProductItem;c.init(a),b.$el.append(c.getElement())})}}(jQuery,window,document),function(a){CP.ProductItem=function(){},CP.ProductItem.prototype.$el=null,CP.ProductItem.prototype.data=null,CP.ProductItem.prototype.html='<div class="product-item"></div>',CP.ProductItem.prototype.active=!1,CP.ProductItem.prototype.init=function(b){this.$el=a(this.html);var c='<div class="title_product">{0}</div>',d='<div class="img_product">{0}</div>',e='<img src="{0}" class="img-responsive" />';c=c.format(b.product_name),e=e.format(b.product_img_thumb),d=d.format(e),this.data=b,this.$el.append(d),this.$el.append(c),this.bindEvent()},CP.ProductItem.prototype.getElement=function(){return this.$el},CP.ProductItem.prototype.bindEvent=function(){this.$el.unbind("click touchstart",this.chooseProductHandle).bind("click touchstart",this,this.chooseProductHandle)},CP.ProductItem.prototype.chooseProductHandle=function(b){var c=b.data;a(".product-item").removeClass("active"),c.$el.toggleClass("active"),console.log("Choose iphone"),console.log("Product id : "+c.data.product_id),MYLIB.eventManager.fireEvent(c,MYLIB.eventNames.chooseProductItem,c.data)},MYLIB.mixin(CP.ProductItem,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.ColorController=function(){this.view=null,this.model=null},CP.ColorController.prototype.init=function(){this.view=new CP.ColorView,this.view.init(),this.model=new CP.ColorModel,this.model.init(),this.view.render([this.model.HEADING,this.model.ID_INPUT,this.model.NAME_INPUT]),this.bindEvent()},CP.ColorController.prototype.bindEvent=function(){this.view.bindEvent(this)},CP.ColorController.prototype.changeColorHandle=function(b){var c=b.data,d=a(b.currentTarget),e=d.val();console.log("COLOR CHANGE : "+d.val()),MYLIB.eventManager.fireEvent(c,MYLIB.eventNames.event_change_color,e)},MYLIB.mixin(CP.ColorController,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(){CP.ColorModule=function(){this.controller=null},CP.ColorModule.prototype.init=function(){this.controller=new CP.ColorController,this.controller.init()},MYLIB.mixin(CP.ColorModule,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(){CP.ColorModel=function(){this.ID_INPUT="input-color-picker",this.NAME_INPUT="input-color-picker",this.HEADING="Chọn màu sắc"},CP.ColorModel.prototype.init=function(){return!0},CP.ColorModel.prototype.getElement=function(){},CP.ColorModel.prototype.bindEvent=function(){},MYLIB.mixin(CP.ColorView,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.ColorView=function(){this.html="",this.$el=null,this.$input=null,this.init=function(){this.html='<div class="panel panel-default"><div class="panel-heading">{0}</div><div class="panel-body"><input id="{1}" type="text" value="000" name="{2}" class="pick-a-color form-control">'}},CP.ColorView.prototype.render=function(b){if(!a.isArray(b))throw"Data render must be array";this.html=this.html.format(b[0],b[1],b[2]),this.$el=a(this.html),this.$input=this.$el.find("#"+b[1])},CP.ColorView.prototype.getElement=function(){return this.$el},CP.ColorView.prototype.bindEvent=function(a){this.$input.pickAColor(),this.$input.unbind("change").bind("change",a,a.changeColorHandle)},MYLIB.mixin(CP.ColorView,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.SaveCanvas=function(){},CP.SaveCanvas.prototype.$el=null,CP.SaveCanvas.prototype.html="",CP.SaveCanvas.prototype.$btnSave=null,CP.SaveCanvas.prototype.init=function(){this.html='<div class="save-canvas-module panel panel-default"><div class="panel-body"><span class="save-canvas btn btn-default btn-tron"><i class="fa fa-save"></i></span><span class="tool-delete btn btn-danger  btn-tron"><i class="fa fa-trash"></i></span><span class="tool-review btn btn-default  btn-tron"><i class="fa fa-eye"></i></span></div></div>',this.$el=a(this.html),this.$btnSave=this.$el.find(".save-canvas"),this.$el.find("span").css({margin:"0 0 0px 5px"}),this.bindEvents()},CP.SaveCanvas.prototype.getElement=function(){return this.$el},CP.SaveCanvas.prototype.bindEvents=function(){var a=this;this.$btnSave.unbind("click touchstart").bind("click touchstart",this,function(){MYLIB.eventManager.fireEvent(a,MYLIB.eventNames.saveCanvas,!0)})},MYLIB.mixin(CP.SaveCanvas,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(){"use strick";CP.SocialController=function(){this.view=null,this.model=null},CP.SocialController.prototype.init=function(){this.view=new CP.SocialView,this.view.init(),this.model=new CP.SocialModel,this.model.init(),this.view.render([this.model.hrefFacebook,this.model.urlImgFacebook,this.model.hrefFacebook,this.model.hrefGplus,this.model.urlImgGplus]),this.bindEvent()},CP.SocialController.prototype.bindEvent=function(){this.view.bindEvent(this)},MYLIB.mixin(CP.SocialController,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(){CP.SocialModel=function(){this.hrefFacebook="facebook.com",this.urlImgFacebook="imgs/theme/facebook.png",this.hrefGplus="google.com",this.urlImgGplus="imgs/theme/gplus.png"},CP.SocialModel.prototype.init=function(){return!0},CP.SocialModel.prototype.getElement=function(){},CP.SocialModel.prototype.bindEvent=function(){},MYLIB.mixin(CP.SocialModel,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(){"use strick";CP.SocialModule=function(){this.controller=null},CP.SocialModule.prototype.init=function(){this.controller=new CP.SocialController,this.controller.init()},MYLIB.mixin(CP.SocialModule,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.SocialView=function(){this.html="",this.$el=null,this.$fb=null,this.$gplus=null,this.init=function(){this.html='<div class="socical-wrapper" style="bottom:20%"><ul><li><a href="{0}"><img src="{1}" alt="{2}" /></a></li><li><a href="{3}"><img src="{4}" alt="{5}" /></a></li></ul></div>'}},CP.SocialView.prototype.render=function(b){if(!a.isArray(b))throw"Data render must be array";this.html=this.html.format(b[0],b[1],b[2],b[3],b[4],b[5]),this.$el=a(this.html),this.$fb=this.$el.find("li").eq(0),this.$gplus=this.$el.find("li").eq(1),this.style()},CP.SocialView.prototype.style=function(){this.$el.css({right:0,top:"-60px",display:"inline-block",position:"absolute"}),this.$el.find("ul").css({listStyle:"none"}),this.$el.find("li").css({padding:"15px",display:"inline-block"})},CP.SocialView.prototype.getElement=function(){return this.$el},CP.SocialView.prototype.bindEvent=function(){},MYLIB.mixin(CP.SocialView,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.TextModuleCustom=function(){},CP.TextModuleCustom.prototype.html='<div id="text-module-custom" class="panel panel-default"><div class="panel-heading"><span>Chọn font chữ</span></div><div class="slide-font-size panel-body"><input id="{0}" type="range" min="0" max="50" value="{1}" step="1"  /><output id="{2}"></output></div></div>',CP.TextModuleCustom.prototype.$el=null,CP.TextModuleCustom.prototype.$rangeFontSzie=null,CP.TextModuleCustom.prototype.$outputRangeFontSzie=null,CP.TextModuleCustom.prototype.init=function(){this.html=this.html.format(MYLIB.constant.text_module_custom_font_size_id,CP_INIT.text.fontSize,MYLIB.constant.text_module_custom_font_size_output_id),this.$el=a(this.html),this.$rangeFontSzie=this.$el.find("#"+MYLIB.constant.text_module_custom_font_size_id),this.$outputRangeFontSzie=this.$el.find("#"+MYLIB.constant.text_module_custom_font_size_output_id);var b=this.$rangeFontSzie.val();this.$outputRangeFontSzie.html(b+"px"),this.style(),this.bindEvent()},CP.TextModuleCustom.prototype.style=function(){this.$el.css({border:"1px solid rgb(217, 237, 204)",margin:"10px 0px 0px 0px"}),this.$outputRangeFontSzie.css({margin:"0 auto","text-align":"center"})},CP.TextModuleCustom.prototype.getElement=function(){return this.$el},CP.TextModuleCustom.prototype.bindEvent=function(){this.$rangeFontSzie.unbind("change").bind("change",this,this.changeRangeFontSizeHandle)},CP.TextModuleCustom.prototype.changeRangeFontSizeHandle=function(a){var b=a.data,c=b.$rangeFontSzie.val();b.$outputRangeFontSzie.html(c+"px"),MYLIB.eventManager.fireEvent(b,MYLIB.eventNames.event_fontSize,c)},MYLIB.mixin(CP.TextModuleCustom,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.TextFormModule=function(){},CP.TextFormModule.prototype.html='<div class="panel-body" id="text-form-module"><input type="text" id="form-text" class="input" placeholder="Your sologan :D" /><button id="submit-form-text" class="btn btn-default" style="position:absolute"><span class="glyphicon glyphicon-plus"></span></button></div>',CP.TextFormModule.prototype.$el=null,CP.TextFormModule.prototype.$btnSubmit=null,CP.TextFormModule.prototype.$inputText=null,CP.TextFormModule.prototype.init=function(){this.$el=a(this.html),this.$btnSubmit=this.$el.find("#submit-form-text"),this.$inputText=this.$el.find("#form-text"),this.bindEvent()},CP.TextFormModule.prototype.getElement=function(){return this.$el},CP.TextFormModule.prototype.bindEvent=function(){console.log("BIND SUBMIT"),this.$btnSubmit.unbind("click touchstart").bind("click touchstart",this,this.submitHandle)},CP.TextFormModule.prototype.submitHandle=function(a){console.log("TEXT SUBMIT");var b=a.data,c=b.$inputText.val();""!=c?MYLIB.eventManager.fireEvent(b,MYLIB.eventNames.event_submit_text,c):alert("PLEASE ENTER YOUR CUSTOM TEXT")},MYLIB.mixin(CP.TextFormModule,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.TextModule=function(){},CP.TextModule.prototype.html='<div class="panel" id="text-module"><div class="panel-heading">Enter your sologan :D</div></div>',CP.TextModule.prototype.$el=null,CP.TextModule.prototype.formText=null,CP.TextModule.prototype.customTextControl=null,CP.TextModule.prototype.init=function(){this.$el=a(this.html),this.renderLayout()},CP.TextModule.prototype.renderLayout=function(){this.formText=new CP.TextFormModule,this.formText.init(),this.customTextControl=new CP.TextModuleCustom,this.customTextControl.init(),this.$el.append(this.formText.getElement()),this.$el.append(this.customTextControl.getElement())},CP.TextModule.prototype.getElement=function(){return this.$el},MYLIB.mixin(CP.TextModule,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(){"use strick";CP.DisplayImgController=function(){this.view=null,this.model=null},CP.DisplayImgController.prototype.init=function(){this.view=new CP.DisplayImgModuleView,this.view.init(),this.model=new CP.DisplayImgModuleModel,this.model.init(),this.view.render([this.model.CLASS,this.model.ID]),this.bindEvent()},CP.DisplayImgController.prototype.bindEvent=function(){MYLIB.eventManager.subscribe(this,MYLIB.eventNames.event_display_img,"addDisplayImageUploadHandle"),this.view.bindEvent(this)},CP.DisplayImgController.prototype.addDisplayImageUploadHandle=function(a){var b=a.data;this.view.renderItem(b)},MYLIB.mixin(CP.DisplayImgController,MYLIB.Event.ObserverMixin)}(jQuery,window,document),CP.DisplayImgModule=function(){this.controller=null},CP.DisplayImgModule.prototype.init=function(){this.controller=new CP.DisplayImgController,this.controller.init()},MYLIB.mixin(CP.DisplayImgModule,MYLIB.Event.ObserverMixin),function(){CP.DisplayImgModuleModel=function(){this.ID="display-img-module",this.CLASS="display-img-module",this.data={}},CP.DisplayImgModuleModel.prototype.init=function(){return!0},MYLIB.mixin(CP.DisplayImgModuleModel,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.DisplayImgModuleView=function(){this.html="",this.$el=null,this.$loading=null,this.init=function(){this.html='<div style="position:relative" class="table-responsive {0}" id="{1}"><table class="table table-bordered"><tbody><tr></tr></tbody></table></div>'}},CP.DisplayImgModuleView.prototype.style=function(){this.$el.css({})},CP.DisplayImgModuleView.prototype.loading=function(){var b='<img src="imgs/theme/loader.gif" />';this.$loading=a(b),this.$loading.css({position:"absolute",top:"0"}),this.$el.append(this.$loading)},CP.DisplayImgModuleView.prototype.detachLoading=function(){this.$loading.remove()},CP.DisplayImgModuleView.prototype.render=function(b){if(!a.isArray(b))throw"Data render must be array";this.html=this.html.format(b[0],b[1]),this.$el=a(this.html),this.style()},CP.DisplayImgModuleView.prototype.renderItem=function(b){this.loading();var c=a("<td></td>"),d='<img src="{0}"/>';d=d.format(b),d=a(d),d.css({"max-width":"50px"}),c.append(d),this.$el.find("tr").append(c);var e=this;setTimeout(function(){e.detachLoading()},1e3)},CP.DisplayImgModuleView.prototype.getElement=function(){return this.$el},CP.DisplayImgModuleView.prototype.bindEvent=function(){},MYLIB.mixin(CP.DisplayImgModuleView,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.UploadFromComputerController=function(){},CP.UploadFromComputerController.prototype.$el=null,CP.UploadFromComputerController.prototype.html='<div class="panel panel-default" id="{0}"><div class="panel-heading">Upload From Computer</div></div>',CP.UploadFromComputerController.prototype.ID="upload-from-controller-wrapper",CP.UploadFromComputerController.prototype.formController=null,CP.UploadFromComputerController.prototype.init=function(){this.html=this.html.format(this.ID),this.$el=a(this.html),this.formController=new CP.UploadFromComputer_Form,this.formController.init(),this.renderLayout()},CP.UploadFromComputerController.prototype.getElement=function(){return this.$el},CP.UploadFromComputerController.prototype.renderLayout=function(){this.$el.append(this.formController.getElement())},MYLIB.mixin(CP.UploadFromComputerController,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.UploadFromComputer_Form=function(){},CP.UploadFromComputer_Form.prototype.$el=null,CP.UploadFromComputer_Form.prototype.html='<div class="panel-body" id="{0}"><input type="file" accept="image/*" name="imageLoader"/><br/></div>',CP.UploadFromComputer_Form.prototype.ID="upload-from-controller-form",CP.UploadFromComputer_Form.prototype.inputChooseFile=null,CP.UploadFromComputer_Form.prototype.init=function(){this.html=this.html.format(this.ID),this.$el=a(this.html),this.inputChooseFile=this.$el.find("input"),this.bindEvent()},CP.UploadFromComputer_Form.prototype.getElement=function(){return this.$el},CP.UploadFromComputer_Form.prototype.bindEvent=function(){this.inputChooseFile.unbind("change").bind("change",this,this.imageFileFromComputerHandle)},CP.UploadFromComputer_Form.prototype.imageFileFromComputerHandle=function(a){var b=a.data,c=new FileReader;c.onload=function(a){MYLIB.eventManager.fireEvent(b,MYLIB.eventNames.event_upload_from_computer,a.target.result)},c.readAsDataURL(a.target.files[0])},MYLIB.mixin(CP.UploadFromComputer_Form,MYLIB.Event.ObserverMixin)}(jQuery,window,document),function(a){CP.productSerice=function(){},CP.productSerice.prototype.param=null,CP.productSerice.prototype.getProducts=function(){var b=a.ajax({url:"data/products.json",type:"GET",dataType:"json"});return b}}(jQuery,window,document),window.fbAsyncInit=function(){FB.init({appId:MYLIB.facebook.appid,xfbml:!0,version:"v2.2",oauth:!0})},function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_US/sdk.js",e.parentNode.insertBefore(d,e))}(document,"script","fb-root"),CP.FacebookService=function(){};