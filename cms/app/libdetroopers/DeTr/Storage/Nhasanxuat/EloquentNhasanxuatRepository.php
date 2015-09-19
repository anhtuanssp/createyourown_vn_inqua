<?php 
namespace Detr\Storage\Nhasanxuat;
use Nhasanxuat;
use DB;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Nhasanxuat
*/
class EloquentNhasanxuatRepository  implements NhasanxuatRepository
{
	public function all(){
		return Nhasanxuat::all();
	}
	public function paginateNhasanxuat($num){
		return Nhasanxuat::orderBy('id', 'desc')->paginate($num);
	}
	public function searchNhasanxuat($str,$numPagi){

			$tintucs = Nhasanxuat::where(function($query) use ($str,$numPagi){
				$query->where('ten_vi', 'LIKE', "%$str%")
				->orWhere('ten_en', 'LIKE', "%$str%");
			})->orderBy('id', 'desc')->paginate($numPagi);

		return $tintucs;
	}
	public function find($id){
		return Nhasanxuat::find($id);
	}
	public function create($input){
		return Nhasanxuat::create($input);
	}
	public function delete($id){
		$t = Nhasanxuat::find($id);
		$t->products()->detach();
		Nhasanxuat::destroy($id);
		return true;
	}
}