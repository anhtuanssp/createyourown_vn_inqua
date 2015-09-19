<?php 
namespace Detr\Storage\Category;
use Category;
use DB;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Category
*/
class EloquentCategoryRepository implements CategoryRepository
{
	public function all(){
		return Category::all();
	}
	public function paginateCategory($num){
		return Category::orderBy('id', 'desc')->paginate($num);
	}
	public function searchCategory($str,$numPagi){
		$tintucs = Category::where(function($query) use ($str,$numPagi){
			$query->where('ten_vi', 'LIKE', "%$str%")
			->orWhere('ten_en', 'LIKE', "%$str%");
		})->orderBy('id', 'desc')->paginate($numPagi);
		return $tintucs;
	}

	public function find($id){
		try {
			return Category::find($id);
		} catch (\Exception $e) {
			return false;
		}
		
	}
	public function create($input){
		return Category::create($input);
	}

	public function delete($id){
		$cate = Category::find($id);
		DB::beginTransaction();
		try {
			if($cate->parent != 0){
				$cate->tintucs()->detach();
				Category::destroy($id);
			}else{
				$cate_child = Category::where('parent','=',$id)->get();
				foreach ($cate_child as $key => $value) {
					$value->parent = 0;
					$value->save();
					// print_r($value->id);
				}
				// die();


				$cate->tintucs()->detach();
				Category::destroy($id);
			}

		} catch (\Exception $e) {
			DB::rollBack();
			return false;
		}
		DB::commit();
		return true;
	}


	public function get_categories($cap){
		$cates = $this->layDequyDanhMucTinTuc($cap); 
		return $cates;
	}
	public function layDequyDanhMucTinTuc($cap = 0,$gach = '+ ', $arr = NULL){
		$items = Category::where('parent','=',$cap)->get();
		if(!$arr) $arr = array();//khoi tao 1 array co ten la arr  
		foreach ($items as $key => $value) {
			# code...

			$arr[] = array('id'=>$value->id,
							'ten_vi'=>$gach.$value->ten_vi,
							'ten_en'=>$gach.$value->ten_en,
							'hienthi'=>$value->hienthi
				);
			$arr = $this->layDequyDanhMucTinTuc($value->id,$gach.'---- ',$arr); 
		}
		return $arr;
	}

	// LAY DUONG DAN TOI NODE 
	public function getPathNode($id){

	    $result =Category::find($id);
	    $path = array(); 

	    if ($result->parent!=0) { 
	        $path[] = $result->parent; 
	        $path = array_merge($this->getPathNode($result->parent), $path); 

	    } 
	    return $path; 
	}
}