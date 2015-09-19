<?php 
namespace Detr\Storage\Gioithieu;
use Gioithieu;
use DB;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Gioithieu
*/
class EloquentGioithieuRepository implements GioithieuRespository
{
	public function all(){
		return Gioithieu::all();
	}
	public function paginateCategory($num){
		return Gioithieu::orderBy('id', 'desc')->paginate($num);
	}

	public function find($id){
		try {
			return Gioithieu::find($id);
		} catch (\Exception $e) {
			return false;
		}
		
	}
	public function create($input){
		return Gioithieu::create($input);
	}

	public function delete($id){
		$cate = Category::find($id);
		DB::beginTransaction();
		try {
			Gioithieu::destroy($id);
		} catch (\Exception $e) {
			DB::rollBack();
			return false;
		}
		DB::commit();
		return true;
	}

	public function softdelete($id){
		$gt = Gioithieu::find($id);
		return $gt->delete($id);
	}
	public function restoredelete($id){
		
	}
}