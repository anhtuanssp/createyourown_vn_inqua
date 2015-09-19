;(function ($,window,document,undefined){

	CP.Validate = (function (){
		var ruleRegex = /^(.+?)\[(.+)\]$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        alphaRegex = /^[a-z]+$/i,
        alphaVN = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        alphaDashRegex = /^[a-z0-9_\-]+$/i,
        naturalRegex = /^[0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex = /^[\d\-\s]+$/,
        urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;

        var checkEmail = function (email) {
			var ok = emailRegex.exec(email);
			return ok;
		}
		var checkPhone = function (phone,start,end) {
			if(phone.length > start && phone.length <= end){
				var ok = numericRegex.exec(phone);
				return ok;
			}
			return false;
		}
		var checkUsername  = function (string,minLength){
			if(string.length > minLength) {
				var ok = alphaRegex.exec(string);
				return ok;
			}
			return false;
		}

		var checkFullName = function(string, minLength){
			if(string.length > minLength) {
				var ok = alphaVN.exec(string);
				return ok;
			}
			return false;
		}

		var checkNumber = function(number,min,max){
			if(number> min && number < max){
				var ok = integerRegex.exec(number);
				return ok;
			}
			return false;
		}

		return {
			checkEmail : checkEmail,
			checkPhone : checkPhone,
			checkUsername : checkUsername,
			checkFullName : checkFullName,
			checkNumber : checkNumber
		}
	})();

})(jQuery,window,document)