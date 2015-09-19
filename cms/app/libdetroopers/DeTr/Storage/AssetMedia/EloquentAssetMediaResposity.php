<?php 
namespace Detr\Storage\AssetMedia;
use Assetmedia;
use Category;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng AssetMedia
*/
class EloquentAssetMediaRepository implements AssetMediaRepository
{
	public function all(){
		return Assetmedia::all();
	}
	public function paginateAssetMedia($num){
		return Assetmedia::orderBy('id', 'desc')->paginate($num);
	}
	public function paginateAssetMediaOrderByLuotXem($num){
		return Assetmedia::orderBy('luotxem', 'desc')->paginate($num);
	}
	public function searchAssetMedia($str,$cate,$numPagi){

		if ($cate!=0) {
			$asms = Category::find($cate)->assetmedias()->where('ten_vi', 'LIKE', "%$str%")->paginate($numPagi);
		}else{
			$asms = Assetmedia::where(function($query) use ($str,$numPagi){
				$query->where('ten_vi', 'LIKE', "%$str%")
				->orWhere('ten_en', 'LIKE', "%$str%");
			})->orderBy('id', 'desc')->paginate($numPagi);
		}
		
		return $asms;
	}
	public function find($id){
		try {
			return Assetmedia::find($id);
		} catch (\Exception $e) {
			return false;
		}
		
	}
	public function create($input){
		return Assetmedia::create($input);
	}

	public function delete($id){
		$t = Assetmedia::find($id);
		$t->categories()->detach();
		Assetmedia::destroy($id);
		return true;
	}
}