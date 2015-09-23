<?php 
namespace Detr\Storage\Danhmucsanpham;
use Danhmucsanpham;
use DB;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Danhmucsanpham
*/
class EloquentDanhmucsanphamRepository implements DanhmucsanphamRepository
{
	public function all(){
		return Danhmucsanpham::all();
	}
	public function paginateCategory($num){
		return Danhmucsanpham::orderBy('id', 'desc')->paginate($num);
	}
	public function searchCategory($str,$numPagi){
		$tintucs = Danhmucsanpham::where(function($query) use ($str,$numPagi){
			$query->where('ten_vi', 'LIKE', "%$str%")
			->orWhere('ten_en', 'LIKE', "%$str%");
		})->orderBy('id', 'desc')->paginate($numPagi);
		return $tintucs;
	}

	public function find($id){
		try {
			return Danhmucsanpham::find($id);
		} catch (\Exception $e) {
			return false;
		}
		
	}
	public function create($input){
		return Danhmucsanpham::create($input);
	}

	public function delete($id){
		$cate = Danhmucsanpham::find($id);
		DB::beginTransaction();
		try {
			if($cate->parent != 0){
				// $cate->tintucs()->detach();
				Danhmucsanpham::destroy($id);
			}else{
				$cate_child = Danhmucsanpham::where('parent','=',$id)->get();
				foreach ($cate_child as $key => $value) {
					$value->parent = 0;
					$value->save();
					// print_r($value->id);
				}
				// die();


				// $cate->tintucs()->detach();
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
		$items = Danhmucsanpham::where('parent','=',$cap)->get();
		if(!$arr) $arr = array();//khoi tao 1 array co ten la arr  
		foreach ($items as $key => $value) {
			# code...

			$arr[] = array('id'=>$value->id,
							'ten_vi'=>$gach.$value->ten_vi,
							'ten_en'=>$gach.$value->ten_en,
							'origin_name' =>$value->ten_vi,
							'hienthi'=>$value->hienthi,
							'thumb'=>$value->thumb
				);
			$arr = $this->layDequyDanhMucTinTuc($value->id,$gach.'---- ',$arr); 
		}
		return $arr;
	}



	// LAY DUONG DAN TOI NODE 
	public function getPathNode($id){

	    $result =Danhmucsanpham::find($id);
	    $path = array(); 

	    if ($result->parent!=0) { 
	        $path[] = $result->parent; 
	        $path = array_merge($this->getPathNode($result->parent), $path); 

	    } 
	    return $path; 
	}

	//Lay danh muc cap 1
	public function getCate1($cap){
		$items = Danhmucsanpham::where('parent','=',$cap)->get();
		$arr = array();//khoi tao 1 array co ten la arr  
		foreach ($items as $key => $value) {
			# code...
			if($value->hienthi == 1){
				$arr[] = array('id'=>$value->id,
								'ten_vi'=>$value->ten_vi,
								'ten_en'=>$value->ten_en,
								'origin_name' =>$value->ten_vi,
								'hienthi'=>$value->hienthi,
								'thumb'=>$value->thumb
					);
			}
		}
		return $arr;
	}
}