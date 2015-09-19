<?php 
namespace Detr\Storage\Product;
use Product;
use ProductImgs;
use Danhmucsanpham;
use DB;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Product
*/
class EloquentProductRepository  implements ProductRepository
{
	public function all(){
		return Product::all();
	}
	public function paginateProduct($num){
		return Product::orderBy('id', 'desc')->paginate($num);
	}
	public function searchProduct($str,$cate,$nsx,$numPagi){
		if ($cate!=0 && $nsx!=0) {
			$products = Product::whereHas('categories',function($q) use($cate){
				$q->where('id','=',$cate);
			})->whereHas('nhasanxuats',function($q) use($nsx){
				$q->where('id','=',$nsx);
			})->where('ten_vi', 'LIKE', "%$str%")->paginate($numPagi);
		}
		else if($cate!=0 && $nsx==0){
			$products = Product::whereHas('categories',function($q) use($cate){
				$q->where('id','=',$cate);
			})->where('ten_vi', 'LIKE', "%$str%")->paginate($numPagi);
		}
		else if($cate==0 && $nsx!=0){
			$products = Product::whereHas('nhasanxuats',function($q) use($nsx){
				$q->where('id','=',$nsx);
			})->where('ten_vi', 'LIKE', "%$str%")->paginate($numPagi);
		}
		else{
			$products = Product::where(function($query) use ($str,$numPagi){
				$query->where('ten_vi', 'LIKE', "%$str%")
				->orWhere('ten_en', 'LIKE', "%$str%");
			})->orderBy('id', 'desc')->paginate($numPagi);
		}
		return $products;
	}

	public function getRelateProductByProductID($pid){
		$product = Product::find($pid);

		$cates = $product->categories;

		$cateArr = function () use ($cates){
			$cateId = array();
			foreach ($cates as $key => $cate) {
				array_push($cateId, $cate->id);
			}
			return $cateId;
		};
		$cs = $cateArr();

		$products = Product::whereHas('categories',function($q) use($cs){
			$q->whereIn('id',$cs);
		})->get();

		return $products;

	}

	public function getProductsByCates($cateID,$numPagi){
		$products = Product::whereHas('categories',function($q) use($cateID){
				$q->where('id','=',$cateID);
			})->paginate($numPagi);
		return $products;
	}
	public function find($id){
		return Product::find($id);
	}

	public function findIn($argId){
		return Product::whereIn('id', $argId)->get();
	}
	
	public function create($input){
		return Product::create($input);
	}
	public function delete($id){
		$t = Product::find($id);
		$t->categories()->detach();
		$t->nhasanxuats()->detach();
		Product::destroy($id);
		return true;
	}
}