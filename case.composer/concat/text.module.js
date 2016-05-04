;(function ($,window,document,undefined){
	
	CP.TextModuleCustom = function (){};

	CP.TextModuleCustom.prototype.html = 
								'<div id="text-module-custom" class="panel panel-default">'+
								'<div class="panel-heading"><span>Chọn font chữ</span></div>'+
									'<div class="slide-font-size panel-body">'+
										'<input id="{0}" type="range" min="0" max="50" value="{1}" step="1"  />'+
										'<output id="{2}"></output>'+
									'</div>'+
								'</div>';

	CP.TextModuleCustom.prototype.$el = null;

	CP.TextModuleCustom.prototype.$rangeFontSzie = null;
	CP.TextModuleCustom.prototype.$outputRangeFontSzie = null;

	CP.TextModuleCustom.prototype.init = function () {

		this.html = this.html.format(MYLIB.constant.text_module_custom_font_size_id,CP_INIT.text.fontSize,
										MYLIB.constant.text_module_custom_font_size_output_id);
		this.$el = $(this.html);

		this.$rangeFontSzie = this.$el.find('#'+MYLIB.constant.text_module_custom_font_size_id);
		this.$outputRangeFontSzie = this.$el.find('#'+MYLIB.constant.text_module_custom_font_size_output_id);

		var fontSize = this.$rangeFontSzie.val();
		this.$outputRangeFontSzie.html(fontSize+'px') ;

		this.style();

		this.bindEvent();

	}

	CP.TextModuleCustom.prototype.style = function () {
		this.$el.css({
			border : '1px solid rgb(217, 237, 204)',
			margin : '10px 0px 0px 0px'
		});
		this.$outputRangeFontSzie.css({
			margin: '0 auto',
			'text-align' : 'center'
		});
	}

	CP.TextModuleCustom.prototype.getElement = function () {

		return this.$el;

	}

	CP.TextModuleCustom.prototype.bindEvent = function () {

		this.$rangeFontSzie
			.unbind('change')
			.bind('change', this,this.changeRangeFontSizeHandle);
	}

	// EVENT HANDLE
	CP.TextModuleCustom.prototype.changeRangeFontSizeHandle = function (event) {
		// alert('message');
		var that = event.data;
		var fontSize = that.$rangeFontSzie.val();
		that.$outputRangeFontSzie.html(fontSize+'px') ;

		MYLIB.eventManager.fireEvent(that,MYLIB.eventNames.event_fontSize,fontSize);
	}


	MYLIB.mixin(CP.TextModuleCustom, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.TextFormModule = function (){};

	CP.TextFormModule.prototype.html = 
								'<div class="panel-body" id="text-form-module">'+
									'<input type="text" id="form-text" class="input" placeholder="Your sologan :D" />'+
									'<button id="submit-form-text" class="btn btn-default" style="position:absolute">'+
									'<span class="glyphicon glyphicon-plus"></span></button>'+
									'<br>'+
									'<br>'+
									'<button type="button" class="btn btn-default btn-open-cloud-text" '+
									'style="width:100%;position:relative;padding:10px;color:#ff57ff;border-color:#ff57ff">'+
										'<i class="ion-ios-flower-outline" aria-hidden="true"'+
										 'style="position:absolute;left:5px;top:0px;color:#ff57ff;font-size:30px"></i>'+
										 'Cloud text</button>'+
								'</div>';

	CP.TextFormModule.prototype.$el = null;
	CP.TextFormModule.prototype.$btnSubmit = null;
	CP.TextFormModule.prototype.$inputText = null;

	CP.TextFormModule.prototype.init = function () {
		
		this.$el = $(this.html);

		this.$btnSubmit = this.$el.find('#submit-form-text');
		this.$inputText = this.$el.find('#form-text');

		this.bindEvent();

	}

	CP.TextFormModule.prototype.getElement = function () {

		return this.$el;

	}

	CP.TextFormModule.prototype.bindEvent = function () {
		// console.log('BIND SUBMIT');
		var that = this;
		this.$btnSubmit
			.unbind('click touchstart')
			.bind('click touchstart',this.submitHandle.bind(this));

		this.$inputText.keypress(function(event) {
			if ( event.which == 13 ) {
			    that.submitHandle();
			}
		});

		this.$el.find('.btn-open-cloud-text')
			.bind('click touchstart', function (){
				MYLIB.eventManager.fireEvent(that, MYLIB.eventNames.event_open_font_edit,false);
			})

	}

	// EVENT HANDLE
	CP.TextFormModule.prototype.submitHandle = function () {
		// console.log('TEXT SUBMIT');
		var text_value = this.$inputText.val();
		if(text_value != ''){
			MYLIB.eventManager.fireEvent(this,MYLIB.eventNames.event_submit_text,text_value);
		}else{
			alert('PLEASE ENTER YOUR CUSTOM TEXT')
		}
		

	}

	MYLIB.mixin(CP.TextFormModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;(function ($,window,document,undefined){
	
	CP.TextModule = function (){};

	CP.TextModule.prototype.html = 
	'<div data-step="5" data-intro="Đánh chữ vào ô và bấm nút + để thêm chữ vào sản phẩm" class="panel" id="text-module">'+
		'<div class="panel-heading"><i class="ion-ios-compose size-18"></i> Nhập text vào sản phẩm</div>'+
	'</div>';

	CP.TextModule.prototype.$el = null;

	CP.TextModule.prototype.formText = null;
	// CP.TextModule.prototype.customTextControl = null;

	CP.TextModule.prototype.init = function () {
		
		this.$el = $(this.html);
		this.renderLayout();

	}

	CP.TextModule.prototype.renderLayout = function () {
		//TEXT FORM MODULE INIT
		this.formText = new CP.TextFormModule();

		this.formText.init();

		// this.customTextControl = new CP.TextModuleCustom();

		// this.customTextControl.init();

		this.$el.append( this.formText.getElement() );
		// this.$el.append(this.customTextControl.getElement());

	}

	CP.TextModule.prototype.getElement = function () {

		return this.$el;

	}


	MYLIB.mixin(CP.TextModule, MYLIB.Event.ObserverMixin);

})(jQuery,window,document)
;
(function(d3, $, window, document, undefined) {

    CP.EditFontModule = function(callbackDashboard) {
        this.viewPath = 'js/module/text.module/popup.edit.font/view/template.html';

        this.callbackDashboard = callbackDashboard;

        if (d3 == undefined) {
            throw "Require D3js";
        }

        this.fill = null;
        this.layout = null;
        this.words = null;
        var that = this;

        this.drawClouldText = function(words, font) {
            that.$el.find('.d3-cloud-text-demo').html('');
            that.words = words;
            d3.select(that.$el.find('.d3-cloud-text-demo')[0]).append("svg")
                .attr("width", that.layout.size()[0])
                .attr("height", that.layout.size()[1])
                .append("g")
                .attr("transform", "translate(" + that.layout.size()[0] / 2 + "," + that.layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) {
                    return d.size + "px";
                })
                .style("font-family", font)
                .style("fill", function(d, i) {
                    return d.fillColor;
                })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) {
                    return d.text;
                });
        }

        this.setLayoutD3Clould = function(wordsText, font) {
            if (wordsText == undefined) {
                wordsText = ["Nhập", "ký tự", "mà", "bạn", "mong", "muốn", "words", "vào", "ô", "ở", "dưới"];
            }
            if (font == undefined) {
                font = "arial"
            }
            this.layout = d3.layout.cloud()
                .size([500, 300])
                .words(wordsText.map(function(d) {
                    return {
                        text: d,
                        size: 10 + Math.random() * 90,
                        fillColor : that.fill(d)
                    };
                }))
                .padding(5)
                .rotate(function() {
                    return ~~(Math.random() * 2) * 90;
                })
                .font(font)
                .fontSize(function(d) {
                    return d.size;
                })
                .on("end", function(words) {
                    that.drawClouldText(words, font);
                });
            this.layout.start();
        }



    };

    MYLIB.extend(CP.EditFontModule, CP.PopupModule);

    CP.EditFontModule.prototype.$elSelect = null;
    CP.EditFontModule.prototype.$spanThuNghiem = null;
    CP.EditFontModule.prototype.customTextControl = null;

    CP.EditFontModule.prototype.$inputUploadPartern = null;

    CP.EditFontModule.prototype.$elSelectV2 = null;
    CP.EditFontModule.prototype.$elInputFontWeight = null;

    CP.EditFontModule.prototype.init = function() {

        this.titlePopup = 'Chỉnh sửa font chử';

        this.parent.proto.init.call(this);

        // this.customTextControl = new CP.TextModuleCustom();

        // this.customTextControl.init();

        this.$el.find('.modal-dialog').removeClass('modal-lg');

        this.$el.appendTo('body');



        this.render();

    };

    CP.EditFontModule.prototype.getElement = function() {
        return this.$el;
    };
    CP.EditFontModule.prototype.render = function() {
        var that = this;
        $.get(this.viewPath, function(tmp) {

            var source = $(tmp).html();
            var template = Handlebars.compile(source);
            var result = template();

            that.$elContent.append($(result));
            // that.$el.find('.font-size-wrapper').append(that.customTextControl.getElement())
            that.initElement.call(that);
            that.bindEvent();

            that.fill = d3.scale.category20();
            that.setLayoutD3Clould();

        });
    };

    CP.EditFontModule.prototype.initElement = function() {

        this.$elSelect = this.$elContent.find('.font-select');
        this.$spanThuNghiem = this.$elContent.find('.thunghiem');
        this.$elSelectV2 = this.$elContent.find('.font-select-v2');
        this.$inputUploadPartern = this.$el.find('input[name="imagePatternFormComputer"]');

        this.$elInputFontWeight = this.$el.find('input[name="fontW"]');

        this.$elSelect.css({
            width: '100%',
            height: '50px',
            'font-size': '30px',
        });

        this.renderFontSelect(CP_INIT.text.listFont);
    };

    CP.EditFontModule.prototype.renderFontSelect = function(data) {
        // var option = '<option value="{0}">{1}</option>';
        var that = this;
        _.each(data, function(value, key, list) {

            var option = '<option value="{0}">{1}</option>';
            option = option.format(value.font, value.label);

            option = $(option);

            that.$elSelect.append(option)

            var font =
                '<label style="padding:5px">' +
                '<input type="radio" name="fontvalue" value="{0}"> ' +
                '<span style="font-family: {1};font-size:20px">SAMPLE</span> ' +
                '</label>';

            font = font.format(value.label, value.font);
            font = $(font);
            $(font).find('input').unbind('click').bind('click', that.changeFontHandlerV2.bind(that));
            that.$elSelectV2.append(font);

        });


    }

    CP.EditFontModule.prototype.bindEvent = function() {
        //SET FONT DEFAULT
        var valSelect = this.$elSelect.val();
        var that = this;
        this.$spanThuNghiem.css({
            'font-family': valSelect
        });

        this.$elSelect
            .change(this.changeFontHandler.bind(this));

        this.$inputUploadPartern
            .unbind('change')
            .bind('change', this, this.imageFileFromComputerHandle)

        this.$el.find('input[name="check-curve-text"]')
            .unbind('change')
            .bind('change', this, this.changeCurveTextHandle)

        this.$elInputFontWeight
            .unbind('change')
            .bind('change', this.changeFontWeightHandle.bind(this))

        this.$el.find('textarea[name="clould-world"]')
            .bind('change', function(event) {
                // var font = that.$el.find("input[name=fontvalue]:checked").val();
                // that.setLayoutD3Clould(that.$el.find('textarea[name="clould-world"]').val().split(" "), font);
            });

        this.$el.find('button.btn-cloud-text-submit')
            .click(function(event) {
                var t = document.createElement("canvas"),
                    e = t.getContext("2d");
                t.width = 500,
                    t.height = 300,
                    e.translate(500 >> 1, 300 >> 1),
                    // e.scale(1, 1),
                    that.words.forEach(function(t) {
                        e.save(),
                            e.translate(t.x, t.y),
                            e.rotate(t.rotate * Math.PI / 180),
                            e.textAlign = "center",
                            e.fillStyle = that.fill(t.text.toLowerCase()),
                            e.font = t.size + "px " + t.font,
                            e.fillText(t.text, 0, 0),
                            e.restore()
                    }),
                    MYLIB.eventManager.fireEvent(that, MYLIB.eventNames.event_upload_from_computer, t.toDataURL("image/png"));
                that.hide();

            });
        this.$el.find('button.xem-truoc')
            .click(function(event) {
                var font = that.$el.find("input[name=fontvalue]:checked").val();
                that.setLayoutD3Clould(that.$el.find('textarea[name="clould-world"]').val().split(" "), font);
            });

    };

    CP.EditFontModule.prototype.imageFileFromComputerHandle = function(event) {

        var that = event.data;

        var reader = new FileReader();

        reader.onload = function(e) {
            // console.log(e.target.result);
            MYLIB.eventManager.fireEvent(that, MYLIB.eventNames.event_change_partern, e.target.result);
        }

        reader.readAsDataURL(event.target.files[0]);
    }

    CP.EditFontModule.prototype.changeFontHandler = function() {
        var valSelect = this.$elSelect.val();
        console.log(valSelect);
        this.$spanThuNghiem.css({
            'font-family': valSelect
        });

        //main-canvas will handle
        MYLIB.eventManager.fireEvent(this, MYLIB.eventNames.event_change_font, valSelect);
    }
    CP.EditFontModule.prototype.changeFontHandlerV2 = function(event) {
        var valSelect = $(event.target).val();
        this.$spanThuNghiem.css({
            'font-family': valSelect
        });

        //main-canvas will handle
        MYLIB.eventManager.fireEvent(this, MYLIB.eventNames.event_change_font, valSelect);
    }

    CP.EditFontModule.prototype.changeCurveTextHandle = function() {
        MYLIB.eventManager.fireEvent(this, 'CURVER_TEXT', true);
    }

    CP.EditFontModule.prototype.changeFontWeightHandle = function(event) {
        var fw = $(event.target).val();
        this.$spanThuNghiem.css({
            'font-weight': fw
        });
        //main-canvas will handle
        MYLIB.eventManager.fireEvent(this, 'CHANGEFONTWEIGHT', fw);
    }

    CP.EditFontModule.prototype.show = function(event){

        if(event != undefined && event == true){
            this.$el.find('.toggle-zone-font').hide();
            this.$el.modal('show');
            this.$el.find('.d3-cloud-world').show();
            this.$el.find('.modal-backdrop').height($(window).height()+700);
        }else{
            this.$el.find('.toggle-zone-font').show();
            this.$el.modal('show');
            this.$el.find('.d3-cloud-world').hide();
            this.$el.find('.modal-backdrop').height($(window).height()+700);
        }
        this.$elSelectV2.find('input[name="fontvalue"]').prop('checked',false)

        
    };

    MYLIB.mixin(CP.PopupAssetsModule, MYLIB.Event.ObserverMixin);

})(d3, jQuery, window, document)
