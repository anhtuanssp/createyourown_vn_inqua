	thietKeMauApp.service('thietKeMauService', function( $http, $q) {
	    this.thietkes = [];

        // I get all of the friends in the remote collection.
        function getThietKeMau(paging,cateID) {

            var request = $http({
                method: "get",
                url: MYLIB.HOST+MYLIB.SERVICENAME.getThietKeMau,

		        params: {
		            limit: paging,
		            cateID : cateID
		        }
            });

            return( request.then( handleSuccess, handleError ) );

        }

        function getRelateProduct(id) {

            var request = $http({
                method: "get",
                url: MYLIB.HOST+MYLIB.SERVICENAME.getProductRelateByID,

		        params: {
		            id : id
		        }
            });

            return( request.then( handleSuccess, handleError ) );

        }

	    // I transform the error response, unwrapping the application dta from
	    // the API response payload.
	    function handleError( response ) {

	        // The API response from the server should be returned in a
	        // nomralized format. However, if the request was not handled by the
	        // server (or what not handles properly - ex. server error), then we
	        // may have to normalize it on our end, as best we can.
	        if (
	            ! angular.isObject( response.data ) ||
	            ! response.data.message
	            ) {

	            return( $q.reject( "An unknown error occurred." ) );

	        }

	        // Otherwise, use expected error message.
	        return( $q.reject( response.data.message ) );

	    }


	    // I transform the successful response, unwrapping the application data
	    // from the API response payload.
	    function handleSuccess( response ) {

	        return( response.data );

	    }

        // Return public API.
        return({
            getThietKeMau: getThietKeMau,
            getRelateProduct : getRelateProduct
        });


	});