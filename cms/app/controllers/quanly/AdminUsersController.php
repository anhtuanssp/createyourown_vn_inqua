<?php
/**
* ADMIN TIN TUC CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Sentry;
use Input;
use Detr\Storage\Facebook\EloquenFacebookTrackingRespository as FacebookRepo;

class AdminUsersController extends BaseController{

	
	public function __construct(FacebookRepo $facebook){
		$this->facebook = $facebook;
	}
	public function index(){
		$items = Sentry::findAllUsers();
		return View::make('quanly.users.index',compact('items'));
	}

	public function groups(){
		$groups = Sentry::findAllGroups();
		return View::make('quanly.users.groups',compact('groups'));
	}

	public function groupEdit($id){
	    $group = Sentry::findGroupById($id);
	    $groupPermissions = $group->getPermissions();

		// $routeName = \Route::currentRouteName();

		// $routeCollection = \Route::getRoutes();
		// foreach ($routeCollection as $key => $value) {
		// 	$permissionname = $value->getPath();
		// 	$group->permissions  = array(
	 //        	$permissionname => 1
	 //    	);
	 //    	$group->save();
		// }

	    return View::make('quanly.users.editgroup',compact('group','groupPermissions'));
	}

	public function addPermission(){
		if(\Request::ajax()){

			$id = $_POST['id'];
			$permissionvalue = $_POST['permissionvalue'];
			$permissionname= Input::get('permissionname');
			$arrayPermissionName = explode(';', $permissionname);

			$datastatus  = array();
			try {
				$group = Sentry::findGroupById($id);

				if(count($arrayPermissionName) > 0){
					foreach ($arrayPermissionName as $key => $value) {
						if($value!=''){
							$group->permissions  = array(
					        	$value => $permissionvalue
					    	);
						}

					}
				}else{
					$group->permissions  = array(
			        	$permissionname => $permissionvalue
			    	);
		 		
				}

		 		if ($group->save())
			    {
			 		$datastatus['status'] = 1;
					$datastatus['msg'] = 'Add thành công!';
			    }
			    else
			    {
			 		$datastatus['status'] = 0;
					$datastatus['msg'] = 'Something wrong, update fail!';
			    }


			}
			catch (Cartalyst\Sentry\Groups\GroupNotFoundException $e){
				$datastatus['status'] = 0;
				$datastatus['msg'] = 'Không tìm thấy Group';
			}

			echo json_encode($datastatus);
		}

	}

	public function editUserPermission(){

		if(\Request::ajax()){

			$id = $_POST['id'];
			$permissionvalue = $_POST['permissionvalue'];
			$permissionname= Input::get('permissionname');

			$datastatus  = array();
			try {
				$user = Sentry::findUserById($id);
				$user->permissions = array(
		        	$permissionname => $permissionvalue
		    	);
			    $user->save();

		 		$datastatus['status'] = 1;
				$datastatus['msg'] = 'Update thành công!';


			}
			catch (Cartalyst\Sentry\Users\UserNotFoundException $e){
				$datastatus['status'] = 0;
				$datastatus['msg'] = 'Không tìm thấy Group';
			}

			echo json_encode($datastatus);
		}
	}

	public function adduspermission(){
		if(\Request::ajax()){

			$id = $_POST['id'];
			$permissionvalue = $_POST['permissionvalue'];
			$permissionname = Input::get('permissionname');

			$datastatus  = array();
			try {
				$user = Sentry::findUserById($id);

				$user->permissions = array(
		        	$permissionname => $permissionvalue
		    	);
		 		$user->save();

		 		$datastatus['status'] = 1;
				$datastatus['msg'] = 'Add thành công!';
			}
			catch (Cartalyst\Sentry\Users\UserNotFoundException $e) {
				$datastatus['status'] = 0;
				$datastatus['msg'] = 'Không tìm thấy User';
			}

			echo json_encode($datastatus);
		}
	}

	/**
	 * Ajax get list router
	 */
	public function getListRoutes(){
		$routeCollection = \Route::getRoutes();
		if(\Request::ajax()){
			return \Response::json(View::make('quanly.users.ajax.tablerouter',compact('routeCollection') )->render());
		}
		return;
	}

	/**
	 * User Edit
	 */
	public function editUser($id){
		if (!empty($id)) {
			# code...
			try {
				$item = Sentry::findUserById($id);
				$superUser = Sentry::findGroupByName('Supper User');
				$groups = Sentry::findAllGroups();
				$groupOfUser = $item->getGroups();
				$merge_permissions = $item->getMergedPermissions();
	  			$permissions = $item->getPermissions();
				return View::make('quanly.users.edituser',compact('item','superUser',
					'groups','groupOfUser','merge_permissions','permissions'));
			}catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
			{
				 \Redirect::back()->with('success', 'User not found!');
			}
		}
	}

	/**
	 * Save Edit user
	 */
	public function saveUser(){

		$token = \Input::get('_token');

		if (\Session::token() === $token) {

			$dataInput = Input::all();

			$user_sentry = Sentry::findUserById($dataInput['id']);

			$superUser = Sentry::findGroupByName('Supper User');

			/**
			 * KIEM TRA NEU LA SUPPER USER THI MUON EDIT PHAI CO QUYEN special.quanly.supperuseredit
			 */
			$currentUser = Sentry::getUser();
			
			if($user_sentry->inGroup($superUser) ){

				if( !$currentUser->hasAccess('special.user.suedit') ){

					return \Redirect::back()
						->withInput()
						->with('success', 'Bạn không có quyền edit Supper User');
					
				}
			}

			/**
			 * Kiểm tra có muốn change password hay không
			 */
			// dd(Input::get('checkPass'));
			if (Input::get('checkPass')!= null) {

				$cnewpassword =  Input::get('cnewpassword');
				$crnewpassword = Input::get('crnewpassword');
				if($cnewpassword === ''){
					return \Redirect::back()
						->withInput()
						->with('success', 'Password không được để trống');
				}
		        if (strcmp($cnewpassword, $crnewpassword) === 0) {
		        	$user_sentry->password = $cnewpassword; 
		        }else{
		        	return \Redirect::back()
						->withInput()
						->with('success', 'Password mới nhập không khớp');
		        }

			}

			// dd(Input::get('activated'));
			$activated = (Input::get('activated') == 'on') ? 1 : 0;
			$user_sentry->email = Input::get('email');
			$user_sentry->first_name =  Input::get('first_name');
			$user_sentry->last_name = Input::get('last_name');
			$user_sentry->activated = $activated;

			/**
			 * GROUPS
			 */
			// Xóa tat ca cac group of user
			$groupOfUser = $user_sentry->getGroups();
			// dd($groupOfUser);
			foreach ($groupOfUser as $key => $value) {
				$g = Sentry::findGroupById($value->id);
				$user_sentry->removeGroup($g);
			}
			

			$groups = Input::get('groups');

			foreach ($groups as $key => $value) {
	    		# code...
	    		$g = Sentry::findGroupById($value);
	    		$user_sentry->addGroup($g);

	    	}

			try {
	
				if($user_sentry->save()){
					return \Redirect::back()->with('success', 'User đã được cập nhật!');
				}else{
					return \Redirect::back()->with('success', 'Có lỗi xảy ra, bạn nên kiểm tra lại.');
				}

			} catch (Cartalyst\Sentry\Users\UserExistsException $e)
			{
			    return \Redirect::back()->with('success', 'User không tồn tại!');
			}
			catch (Cartalyst\Sentry\Users\UserNotFoundException $e)
			{
			    return \Redirect::back()->with('success', 'User không được tìm thấy!');
			}
			
		}
		else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}
	}

	public function addAuto(){
		$user = Sentry::register(array(
	        'email'    => str_random(10).'@example.com',
	        'password' => 'test',
	    ));
	    return \Redirect::back();
	}

	public function addGroupAuto(){
		$group = Sentry::createGroup(array(
	        'name'        => str_random(10)
	    ));
	    return \Redirect::back();
	}

	public function saveGroups(){
		$token = \Input::get('_token');

		if (\Session::token() === $token) {
			$dataForm = Input::all();

			// Find the group using the group id
		    $group = Sentry::findGroupById($dataForm['id']);

		    $group->name = $dataForm['name'];
		    try {
		    	$group->save();
				return \Redirect::back()
					->withInput()
					->with('success', 'Cập nhật thành công');
		    }catch (Cartalyst\Sentry\Groups\NameRequiredException $e)
			{
				return \Redirect::back()
					->withInput()
					->with('success', 'Cập nhật thất bại');
			}
			catch (Cartalyst\Sentry\Groups\GroupExistsException $e)
			{
						return \Redirect::back()
					->withInput()
					->with('success', 'Cập nhật thất bại');
			}
			catch (Cartalyst\Sentry\Groups\GroupNotFoundException $e)
			{
				return \Redirect::back()
					->withInput()
					->with('success', 'Cập nhật thất bại');
			}
					   

		    // Update the group details
		    $group->name = 'Users';

		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}
	}

	public function facebook(){

		
	    return View::make('quanly.users.facebook');
	}
	public function getUserFacebook(){
		$faceboks = $this->facebook->all();
		return \Response::json($faceboks, 200);
	}
	
}