<?php 
namespace Detr\Storage\Media;
use Media;
use DB;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Media
*/
class EloquentMediaRepository implements MediaRepository
{
	public function all(){
		return Media::all();
	}
	public function paginateMedia($num){
		return Media::orderBy('id', 'desc')->paginate($num);
	}
	public function searchMedia($str,$numPagi){

	}
	public function find($id){
		return Media::find($id);
	}
	public function create($input){
		return Media::create($input);
	}
	public function delete($id){
		return Media::destroy($id);
	}
}