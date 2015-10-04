<?php
namespace apiv1;
use BaseController;
use View;

use Input;
use Response;
use Request;
use Facebooktracking;
use Sentry;
use DB;
use Detr\Storage\Facebook\EloquenFacebookTrackingRespository as FacebookTrackingRepo;

class ApiTrackingFacebookController extends BaseController {

	public function __call($name, $arguments){ 
		return Response::json('Missing method', 400);
    } 
	public function __construct( FacebookTrackingRepo $facebook){
		$this->facebook = $facebook;
	}
    public function create(){
	    if (Request::ajax())
		{
			$param = Input::all();
			// dd($param);
			// check exist
			$fb = $this->facebook->find($param['id']);

			if(is_null($fb)){
				$fbn = $this->facebook->create($param);
				//Add new user
				$facebookMe = json_decode($param['json_me']);
				//dd($facebookMe);
				$user = Sentry::register(array(
			        'email'    => $facebookMe->email,
			        'password' => 'khachhangwebinqua',
			        'first_name' => $facebookMe->first_name,
			        'last_name'=> $facebookMe->last_name,
			        'facebookid'=>$facebookMe->id
			    ));
			    return Response::json($user, 200);

			}else{
				$fb->json_me = $param['json_me'];
				$fb->json_picture = $param['json_picture'];
				$fb->save();
				$users = DB::table('users')->where('facebookid',$param['id'])->first();
				return Response::json($users, 200);
			}
		}
    }

    public function getUserProfile($facebookid){
		$users = DB::table('users')->where('facebookid', $facebookid)->first();
		return Response::json($users, 200);
    }

    public function updateProfileUser(){
    	$param = Input::all();
    	$users = DB::table('users')->where('email', $param['email'])->update(array(
    		'phone' => $param['phone'],
    		'address' => $param['address'],
    		)
    	);
    	$status = array('status'=>'success');
    	return Response::json($status, 200);
    }
	
	public function uploadSharePhoto(){
		
		$param = Input::all();
		// dd($param);
		$directoryHinhShareFaceboook =  public_path().\Config::get('detr.share_facebook');
		$sharePhoto = substr($param['share_photo'], strpos($param['share_photo'], ",")+1);

		$base64_img = base64_decode($sharePhoto);
		$filename = "sharefacebook-".$param['facebook_id'].'-'.time().".png";
		$isSuccess = file_put_contents($directoryHinhShareFaceboook.$filename, $base64_img);
		chmod($directoryHinhShareFaceboook.$filename, 0755);

		return Response::json(array("url" => \Config::get('detr.share_facebook').$filename), 200);


	}

}
