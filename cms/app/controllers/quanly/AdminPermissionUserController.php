<?php
/**
* ADMIN TIN TUC CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Sentry;
use Input;

class AdminPermissionUserController extends BaseController{

	public function __construct(){

	}

	public function adduspermission(){
		if(\Request::ajax()){

			dd('s');
		}
		
	}

}