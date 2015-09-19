<?php 
namespace Detr\Storage\Facebook;

use Facebooktracking;
use DB;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng de_facebook
*/
class EloquenFacebookTrackingRespository implements FacebookTrackingRespository
{
	public function all(){
		return Facebooktracking::all();
	}
	public function paginateFacebookTracking($num){
		return Facebooktracking::orderBy('id', 'desc')->paginate($num);
	}
	public function find($id){
		return Facebooktracking::find($id);
	}
	public function create($input){
		Facebooktracking::unguard();
		return Facebooktracking::create($input);
	}
	public function delete($id){
		return Facebooktracking::destroy($id);
	}
}