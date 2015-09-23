<?php 
namespace Detr\Storage\Tintuc;
use Tintuc;
use Category;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Tin tức
*/
class EloquentTintucRepository implements TintucRepository
{
	public function all(){
		return Tintuc::all();
	}
	public function paginateTintuc($num){
		return Tintuc::orderBy('id', 'desc')->paginate($num);
	}
	public function searchTinTuc($str,$cate,$numPagi){

		if ($cate!=0) {
			$tintucs = Category::find($cate)->tintucs()->where('ten_vi', 'LIKE', "%$str%")->paginate($numPagi);
		}else{
			$tintucs = Tintuc::where(function($query) use ($str,$numPagi){
				$query->where('ten_vi', 'LIKE', "%$str%")
				->orWhere('ten_en', 'LIKE', "%$str%");
			})->orderBy('id', 'desc')->paginate($numPagi);
		}
		
		return $tintucs;
	}

	public function find($id){
		try {
			return Tintuc::find($id);
		} catch (\Exception $e) {
			return false;
		}
		
	}
	public function create($input){
		return Tintuc::create($input);
	}

	public function delete($id){
		$t = Tintuc::find($id);
		$t->categories()->detach();
		Tintuc::destroy($id);
		return true;
	}

	public function getTintucByCates($cateID,$numPagi){
		// $tintucs = Tintuc::whereHas('categories',function($q) use($cateID){
		// 		$q->where('id','=',$cateID);
		// 	})->select('ten_vi', 'id')->paginate($numPagi);
		$tintucs = Tintuc::whereHas('categories',function($q) use($cateID){
				$q->where('id','=',$cateID);
				$q->where('hienthi','=',1);
			})->paginate($numPagi);
		return $tintucs;
	}
}