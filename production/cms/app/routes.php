<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//////////////////QUAN LY DASHBOARD//////////////////////////////////
Route::post('/quanly/checklogin', 'quanly\DashboardController@checklogin');

Route::group(['before' => 'authS|kiemtraquyen'], function(){
	Route::get('/quanly',function(){
		return View::make('quanly.dashboard');
	});

	Route::when('/quanly/*', 'csrf', array('post'));

	Route::get('/quanly/logout', 'quanly\DashboardController@logout');
	//TIN TUC
	Route::get('/quanly/tintuc', 'quanly\AdminTinTucController@index');
	Route::post('/quanly/tintuc/delete/','quanly\AdminTinTucController@delete');
	Route::get('/quanly/tintuc/edit/{id}','quanly\AdminTinTucController@edit');
	Route::get('/quanly/tintuc/add','quanly\AdminTinTucController@add');
	Route::post('/quanly/tintuc/save','quanly\AdminTinTucController@save');
	Route::post('/quanly/tintuc/storage','quanly\AdminTinTucController@storage');

	//CHUYEN MUC
	Route::get('/quanly/chuyenmuc', 'quanly\AdminChuyenmucController@index');
	Route::get('/quanly/chuyenmuc/add', 'quanly\AdminChuyenmucController@add');
	Route::post('/quanly/chuyenmuc/storage','quanly\AdminChuyenmucController@storage');
	Route::post('/quanly/chuyenmuc/delete','quanly\AdminChuyenmucController@delete');
	Route::post('/quanly/chuyenmuc/save','quanly\AdminChuyenmucController@save');
	Route::get('/quanly/chuyenmuc/edit/{id}','quanly\AdminChuyenmucController@edit');

	//GIOI THIEU
	Route::get('quanly/gioithieu', 'quanly\AdminGioithieuController@index');
	Route::get('quanly/gioithieu/add', 'quanly\AdminGioithieuController@add');
	Route::get('quanly/gioithieu/edit/{id}', 'quanly\AdminGioithieuController@edit');
	Route::post('quanly/gioithieu/save', 'quanly\AdminGioithieuController@save');
	Route::post('quanly/gioithieu/delete', 'quanly\AdminGioithieuController@delete');
	Route::post('quanly/gioithieu/storage', 'quanly\AdminGioithieuController@storage');

	// DANH MUC SAN PHAM
	Route::get('quanly/dmsp', 'quanly\AdminDanhmucsanphamController@index');
	Route::get('/quanly/dmsp/add', 'quanly\AdminDanhmucsanphamController@add');
	Route::post('/quanly/dmsp/storage','quanly\AdminDanhmucsanphamController@storage');
	Route::get('/quanly/dmsp/edit/{id}','quanly\AdminDanhmucsanphamController@edit');
	Route::post('/quanly/dmsp/save','quanly\AdminDanhmucsanphamController@save');
	Route::post('/quanly/dmsp/delete','quanly\AdminDanhmucsanphamController@delete');

	// SAN PHAM
	Route::get('quanly/sanpham', 'quanly\AdminSanphamController@index');
	Route::get('/quanly/sanpham/add', 'quanly\AdminSanphamController@add');
	Route::post('/quanly/sanpham/storage','quanly\AdminSanphamController@storage');
	Route::get('/quanly/sanpham/edit/{id}','quanly\AdminSanphamController@edit');
	Route::post('/quanly/sanpham/save','quanly\AdminSanphamController@save');
	Route::post('quanly/sanpham/delete', 'quanly\AdminSanphamController@delete');

	// MEDIA
	Route::get('quanly/media', 'quanly\AdminMediaController@index');
	Route::get('/quanly/media/add', 'quanly\AdminMediaController@add');
	Route::post('/quanly/media/storage','quanly\AdminMediaController@storage');
	Route::get('/quanly/media/edit/{id}','quanly\AdminMediaController@edit');
	Route::post('/quanly/media/save','quanly\AdminMediaController@save');
	Route::post('quanly/media/delete', 'quanly\AdminMediaController@delete');

	//NHASANXUAT
	Route::get('quanly/nsx', 'quanly\AdminNhasanxuatController@index');
	Route::post('quanly/nsx/delete', 'quanly\AdminNhasanxuatController@delete');
	Route::post('/quanly/nsx/storage','quanly\AdminNhasanxuatController@storage');
	Route::get('/quanly/nsx/edit/{id}','quanly\AdminNhasanxuatController@edit');
	Route::post('/quanly/nsx/save','quanly\AdminNhasanxuatController@save');

	//HINH ANH THEM CHO SAN PHAM
	Route::get('/quanly/productimgs/sanpham/{id}','quanly\AdminProductImgsController@getProductImgs');
	Route::get('/quanly/productimgs/add/{id}','quanly\AdminProductImgsController@add');
	Route::post('/quanly/productimgs/storage','quanly\AdminProductImgsController@storage');
	Route::post('quanly/productimgs/delete','quanly\AdminProductImgsController@delete');

	/**
	 * ASSET MEDIA ROUTER
	 */
	Route::get('/quanly/assetmedia', 'quanly\AdminAssetMediaController@index');
	Route::get('/quanly/assetmedia/edit/{id}','quanly\AdminAssetMediaController@edit');
	Route::post('/quanly/assetmedia/save','quanly\AdminAssetMediaController@save');
	Route::get('/quanly/assetmedia/add','quanly\AdminAssetMediaController@add');
	Route::post('quanly/assetmedia/storage', 'quanly\AdminAssetMediaController@storage');
	Route::post('quanly/assetmedia/delete', 'quanly\AdminAssetMediaController@delete');

	/**
	 * ORDERs
	 */
	Route::get('quanly/donhangs', 'quanly\AdminOrdersController@index');
	Route::get('quanly/donhangs/view/{id}', 'quanly\AdminOrdersController@view');
	Route::get('quanly/donhangs/delete/{id}', 'quanly\AdminOrdersController@delete');
	Route::post('/quanly/donhangs/save','quanly\AdminOrdersController@save');

	/*
	TEMPLATE ORDER
	 */
	Route::get('quanly/template_donhangs', 'quanly\AdminOrdersController@templateOrder');
	/**
	 * Users
	 */
	Route::get('quanly/users', 'quanly\AdminUsersController@index');
	Route::get('quanly/users/edit/{id}', 'quanly\AdminUsersController@editUser');
	Route::post('quanly/users/editUserPermission', 'quanly\AdminUsersController@editUserPermission');
	Route::post('quanly/users/adduspermission','quanly\AdminUsersController@adduspermission');
	Route::post('quanly/users/saveUser','quanly\AdminUsersController@saveUser');
	Route::get('quanly/users/addAuto','quanly\AdminUsersController@addAuto');
	Route::get('quanly/users/facebook','quanly\AdminUsersController@facebook');
	Route::resource('quanly/users/getUserFacebook','quanly\AdminUsersController@getUserFacebook');


	Route::get('quanly/groups', 'quanly\AdminUsersController@groups');
	Route::get('quanly/groups/edit/{id}', 'quanly\AdminUsersController@groupEdit');
	Route::post('quanly/groups/addPermission','quanly\AdminUsersController@addPermission');
	Route::post('quanly/groups/getListRoutes','quanly\AdminUsersController@getListRoutes');
	Route::get('quanly/groups/addAuto','quanly\AdminUsersController@addGroupAuto');
	Route::post('quanly/groups/save','quanly\AdminUsersController@saveGroups');
	
});


// API V1
// Route group for API versioning
Route::group(array('prefix' => 'api/v1', 'before' => 'auth.api_v1','after' =>'cors.api'), function()
{
    Route::resource('getAllProduct', 'apiv1\ApiProductController@products');
    Route::resource('getProductByCate', 'apiv1\ApiProductController@getProductByCate');
    Route::resource('getSpecificProducts', 'apiv1\ApiProductController@getSpecificProducts');
    Route::resource('getCate', 'apiv1\ApiProductController@getCate');
    Route::resource('getProductRelateByID', 'apiv1\ApiProductController@getProductRelateByID');
    Route::resource('getAllProductAllHome', 'apiv1\ApiProductController@productsOnHome');
    
    Route::resource('getAssetMediaByCate', 'apiv1\ApiAssetMediaController@getAssetMediaByCate');
    Route::resource('getCateAssetMedia', 'apiv1\ApiAssetMediaController@cates');
    Route::resource('getAssetMediaByLimit','apiv1\ApiAssetMediaController@getAssetMediaByLimit');
    Route::resource('getAssetsMediaByIds','apiv1\ApiAssetMediaController@getAssetsMediaByIds');
    Route::resource('addCountAssetMedia','apiv1\ApiAssetMediaController@addCountAssetMedia');

    Route::resource('orders', 'ApiOrdersController');
    Route::resource('createOrder', 'apiv1\ApiOrdersController@create');

    // CATE
    Route::resource('getCates', 'apiv1\ApiProductController@getCates');

    //ARTICEL
    Route::resource('getTroGiupArticle', 'apiv1\ApiArticleController@getTroGiupArticle');
    Route::resource('getContentArticle', 'apiv1\ApiArticleController@getContent');
    Route::resource('getContentBySlug', 'apiv1\ApiArticleController@getContentBySlug');

    //THIETKEMAU
    Route::resource('getThietKeMau', 'apiv1\ApiOrdersController@getThietKeMau');
    Route::resource('getSpecificThietkemau', 'apiv1\ApiOrdersController@getSpecificThietkemau');

    /**
     * FEEDBACK
     */
    Route::resource('sendFeedback', 'apiv1\ApiFeedbackController@sendFeedback');

    //Facebook Tracking
    Route::resource('fakeServiceTest1', 'apiv1\ApiTrackingFacebookController@create');
    Route::resource('getUserProfile','apiv1\ApiTrackingFacebookController@getUserProfile');
    Route::resource('updateProfileUser','apiv1\ApiTrackingFacebookController@updateProfileUser');
    Route::resource('uploadSharePhoto','apiv1\ApiTrackingFacebookController@uploadSharePhoto');

});


// SERECT
Route::group(array('prefix' => 'serect'), function()
{
	Route::get('/asset-media', 'quanly\AdminSerectController@index');
	Route::post('/asset-media/storage', 'quanly\AdminSerectController@storage');

});