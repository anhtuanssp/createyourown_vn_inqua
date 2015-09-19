;(function ($,window,document,undefined){


	MYLIB.LOADING = function (msg){
		if(!MYLIB.$loading){
			MYLIB.$loading = $('<div class="overlay-loading"></div>');
		}
		$('#'+MYLIB.constant.app_id).append(MYLIB.$loading);
		
	}
	MYLIB.LOADING_WITH_ID = function (id){
		if(!MYLIB.$loading){
			MYLIB.$loading = $('<div class="overlay-loading"></div>');
		}
		$('#'+id).append(MYLIB.$loading);
		
	}
	MYLIB.REMOVE_LOADING = function (callbacksuccess){
		setTimeout(function () {
			if(MYLIB.$loading !== 'undefined'){
				MYLIB.$loading.detach();
				if(callbacksuccess && typeof(callbacksuccess) === 'function')
					callbacksuccess();
			}
				
		}, 1000);
	}

	MYLIB.LOADING_LITTLE = function ($el,msg){
		if(!MYLIB.$loading_little){
			MYLIB.$loading_little = $('<div class="loading_little"><img src="imgs/theme/spin.svg"/>'+msg+'<div>');
		}
		$el.append(MYLIB.$loading_little);

	}

	MYLIB.REMOVE_LOADING_LITTLE = function ($el){

		setTimeout(function () {

			$el.find(MYLIB.$loading_little).detach();
			// MYLIB.$loading_little.delay();
						
		}, 1000);

	}

	MYLIB.dataURItoBlob = function (dataURI, mime) {
	    // convert base64 to raw binary data held in a string
	    // doesn't handle URLEncoded DataURIs
	 
	    var byteString = window.atob(dataURI); 
	    // separate out the mime component
	 
	    // write the bytes of the string to an ArrayBuffer
	    //var ab = new ArrayBuffer(byteString.length);
	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }
	 
	    // write the ArrayBuffer to a blob, and you're done
	    var blob = new Blob([ia], { type: mime });
	 
	    return blob;
	}

	MYLIB.Base64Binary = {
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		
		/* will return a  Uint8Array type */
		decodeArrayBuffer: function(input) {
			var bytes = (input.length/4) * 3;
			var ab = new ArrayBuffer(bytes);
			this.decode(input, ab);
			
			return ab;
		},
		
		decode: function(input, arrayBuffer) {
			//get last chars to see if are valid
			var lkey1 = this._keyStr.indexOf(input.charAt(input.length-1));		 
			var lkey2 = this._keyStr.indexOf(input.charAt(input.length-2));		 
		
			var bytes = (input.length/4) * 3;
			if (lkey1 == 64) bytes--; //padding chars, so skip
			if (lkey2 == 64) bytes--; //padding chars, so skip
			
			var uarray;
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			var j = 0;
			
			if (arrayBuffer)
				uarray = new Uint8Array(arrayBuffer);
			else
				uarray = new Uint8Array(bytes);
			
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			
			for (i=0; i<bytes; i+=3) {	
				//get the 3 octects in 4 ascii chars
				enc1 = this._keyStr.indexOf(input.charAt(j++));
				enc2 = this._keyStr.indexOf(input.charAt(j++));
				enc3 = this._keyStr.indexOf(input.charAt(j++));
				enc4 = this._keyStr.indexOf(input.charAt(j++));
		
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
		
				uarray[i] = chr1;			
				if (enc3 != 64) uarray[i+1] = chr2;
				if (enc4 != 64) uarray[i+2] = chr3;
			}
		
			return uarray;	
		}
	}

	MYLIB.createUrl = function (argsParam){
		var urlResult = '#!';
		var phancach = '';

		var lengthParam = _.size(argsParam);

		if(lengthParam > 1){
			phancach = '&';
		}


		_.each(argsParam, function(value, key, list){
			
			urlResult = urlResult + key + '=' + value + phancach;

		});

		var lenthUrl = urlResult.length;
		// console.log(urlResult.charAt(lenthUrl-1));
		if(urlResult.charAt(lenthUrl-1) == phancach){
			urlResult = urlResult.substring(0, lenthUrl-1);
		}

		return urlResult;
	}

	MYLIB.getParamURL = function (name){

	    // name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    // var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    //     results = regex.exec(location.search);
	    // return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	    // 
	    var sPageURL = window.location.hash.substring(1);
	    sPageURL = sPageURL.replace("!", "");

	    var sURLVariables = sPageURL.split('&');

	    for (var i = 0; i < sURLVariables.length; i++)

	    {

	        var sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] == name)

	        {

	            return sParameterName[1];

	        }

	    }
	    return '';


	}

	MYLIB.setSEOOnPage = function (title,desc,keyword){
		
		$('title').html(title);
		$("meta[name=description]").attr("content", desc);
	}

	MYLIB.detectBrower = function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			return true;
		}
		return false;
	}

	MYLIB.checkValidMineType = function(type){
		var status = false;
		_.each(MYLIB.typeFile, function(value, key, list){
		
			if(type == value){
				status = true;
				return status;
			}
				
		
		});

		return status;
	}
	var isTouch = MYLIB.detectBrower;
	MYLIB.click = function(jquery, arg0, arg1) {
	  if(isTouch){
	        if (arg1 != null) {
	             MYLIB.clickfix.Win8ClickHandler.add(jquery, arg1, arg0);
	        }
	        else {
	            MYLIB.clickfix.Win8ClickHandler.add(jquery, arg0);
	        }
	    }
	    else {
	        if (arg1 != null) {
	            jquery.click(arg0, arg1);
	        }
	        else {
	            jquery.click(arg0);
	        }
	    }
	    
	    return jquery;

	};

	MYLIB.removeClick = function(jquery, handler) {
	    if(isTouch){
	        MYLIB.clickfix.Win8ClickHandler.remove(jquery, handler);
	    }
	    else {
	        jquery.off('click', handler);
	    }    
	    return jquery;
	};


	MYLIB.triggerClick = function(jquery) {
	    jquery.trigger("click");
	};

})(jQuery,window,document)
