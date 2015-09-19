<?php
/**
* ADMIN DASHBOARD
*/
namespace quanly;
use BaseController;
use View;
use Sentry;

class DashboardController extends BaseController
{
	public function checklogin(){
		$username = \Input::get('username', '');
		$pasword = \Input::get('password', '');
		$token = \Input::get('_token', '');
		if (\Session::token() === $token) {
			try
			{
   				// Login credentials
				$credentials = array(
					'email'    => $username,
					'password' => $pasword,
				);

    			// Authenticate the user
				$user = Sentry::authenticate($credentials, false);
				return \Redirect::to('/quanly');
			}
			catch (\Exception $e)
			{
				return \Redirect::back()
				->withInput()
				->with('success', 'Có lỗi xảy ra, đăng nhập thất bại');
			}
			
		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}
	}
	public function logout(){
		Sentry::logout();
		return \Redirect::to('/quanly');
	}
}