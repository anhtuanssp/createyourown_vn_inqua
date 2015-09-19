<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	//detr : set session ngôn ngữ
	if(!Session::has('langs_detr')){
		Session::put('langs_detr','vi');
	}

	header("Access-Control-Allow-Origin: http://localhost/case.composer/fe/");
	header('Access-Control-Allow-Methods : GET, POST, OPTIONS');
	header('Access-Control-Allow-Headers : Origin, X-Requested-With, Content-Type, Accept');
	header('Access-Control-Allow-Credentials : true');

});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if (Auth::guest())
	{
		if (Request::ajax())
		{
			return Response::make('Unauthorized', 401);
		}
		else
		{
			return Redirect::guest('login');
		}
	}
});


Route::filter('auth.basic', function()
{
	return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});


// Route::filter('birthday', function()
// {
// 	if (true) {
// 		return View::make('birthday');
// 	}
// });

// DETROOPER FILTER
Route::filter('authS',function(){
	/**
	 * Update check permision
	 */
	if (!Sentry::check()) 
		return View::make('quanly.login');
	else{

		$user_sentry = Sentry::getUser();
	    $superUser = Sentry::findGroupByName('Supper User');
	    $modUser = Sentry::findGroupByName('Moderator Admin');

	    if ($user_sentry->inGroup($superUser) || $user_sentry->inGroup($modUser)) {

		}else{
			Session::flash('success', 'Sorry, Bạn không có quyền truy cập');
			return View::make('quanly.login');

		}
	}
});

Route::filter('kiemtraquyen', function(){

	$routename = Route::getCurrentRoute()->getPath();
	// print_r($routename);die();

	$user = Sentry::getUser();

	// dd($user->hasAccess($routename));

	if($user){
		
		if($user->hasAccess($routename)){

		}else{

			if(\Request::ajax()){
				$datastatus  = array();
				$datastatus['status'] = 3;
				$datastatus['msg'] = 'Khong co quyen';
				return \Response::json($datastatus);
			}else
				return View::make('quanly.permision.index');
			
		}

	}else{

			if(\Request::ajax()){
				$datastatus  = array();
				$datastatus['status'] = 3;
				$datastatus['msg'] = 'Khong co quyen';
				return \Response::json($datastatus);
			}else
				return View::make('quanly.permision.index');
	}

});


Route::filter('auth.api_v1', function($req)
{
	//CORS example, not implement yet
});

Route::filter('cors.api', function($route, $req, $resp)
{

});