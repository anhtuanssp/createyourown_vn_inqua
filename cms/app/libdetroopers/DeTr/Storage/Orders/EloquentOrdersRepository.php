<?php 
namespace Detr\Storage\Orders;
use Orders;

/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Orders
*/
class EloquentOrdersRepository implements OrdersRepository
{
	public function all(){
		return Orders::orderBy('id', 'DESC')->get();
	}

	public function getAllOrder(){
		return Orders::where('is_sharing',0)->orderBy('id', 'DESC')->get();
	}

	public function getTemplateOrder(){
		return Orders::where('is_sharing', '=', 1)->orderBy('id', 'DESC')->get();	
	}


	public function find($id){
		try {
			return Orders::find($id);
		} catch (\Exception $e) {
			return false;
		}
		
	}

	public function create($input){
		return Orders::create($input);
	}

	public function delete($id){
		$t = Orders::find($id);
		try {

			$directory_orderThumbs = public_path().\Config::get('detr.order_thumbs');
			$directoryHinhorder = \Config::get('detr.order_assets');

			$hinhdein = $t->hinhdein;
			$hinhminhhoa = $t->hinhminhhoa;
			$thumb = $t->thumb;
			$hinhdein_back = $t->hinhdein_back;
			$hinhminhhoa_back = $t->hinhminhhoa_back;

			$user_json = $t->user_json;
			$hinhdein_layerBack = $t->hinhdein_layerBack;
			$hinhminhhoa_layerBack = $t->hinhminhhoa_layerBack;

			$arrayFileDelete = array();

			// print_r($hinhminhhoa_layerBack);

			if($hinhdein != ''){
				if(\File::exists(public_path().$hinhdein)){
					array_push($arrayFileDelete, public_path().$hinhdein);
				}
			}
			if($hinhminhhoa != ''){
				if(\File::exists(public_path().$hinhminhhoa)){
					array_push($arrayFileDelete, public_path().$hinhminhhoa);
				}
			}
			if($thumb != ''){
				if(\File::exists(public_path().$thumb)){
					array_push($arrayFileDelete, public_path().$thumb);
				}
			}
			if($hinhdein_back != ''){
				if(\File::exists(public_path().$hinhdein_back)){
					array_push($arrayFileDelete, public_path().$hinhdein_back);
				}
			}
			if($hinhminhhoa_back != ''){
				if(\File::exists(public_path().$hinhminhhoa_back)){
					array_push($arrayFileDelete, public_path().$hinhminhhoa_back);
				}
			}

			if($user_json != ''){
				if(\File::exists(public_path().$user_json)){
					array_push($arrayFileDelete, public_path().$user_json);
				}
			}

			if($hinhdein_layerBack != ''){
				if(\File::exists(public_path().$hinhdein_layerBack)){
					array_push($arrayFileDelete, public_path().$hinhdein_layerBack);
				}
			}

			if($hinhminhhoa_layerBack != ''){
				if(\File::exists(public_path().$hinhminhhoa_layerBack)){
					array_push($arrayFileDelete, public_path().$hinhminhhoa_layerBack);
				}
			}

			// dd($arrayFileDelete);
			Orders::destroy($id);

			if(count($arrayFileDelete) > 0){
				\File::delete($arrayFileDelete);
			}

			return true;
		} catch (Exception $e) {
			return false;
		}

	}

	public function getOrderSharing($isSharing,$numPagi,$cateID = null){
		if($cateID == null){
			$orders = Orders::join('de_product', 'de_orders.id_product', '=', 'de_product.id')
		          ->where('is_sharing', '=', $isSharing)
				  ->where('status_sharing', '=', 1)
		          ->orderBy('de_orders.id', 'desc')
		          ->select(array('de_orders.id','de_orders.id_product','de_orders.user_json','de_orders.thumb','de_orders.hinhminhhoa','de_orders.hinhminhhoa_back','de_product.price','de_product.ten_vi','de_product.slug_vi'))
		          ->paginate($numPagi);
      }else{
  			$orders = Orders::join('de_product', 'de_orders.id_product', '=', 'de_product.id')
			->join('de_product_category', function($join) use ($cateID)
		        {
		            $join->on('de_orders.id_product', '=', 'de_product_category.id_product')
		                 ->where('de_product_category.id_category', 'LIKE', "%$cateID%");
		        })
              ->where('is_sharing', '=', $isSharing)
			  ->where('status_sharing', '=', 1)
              ->orderBy('de_orders.id', 'desc')
              ->select(array('de_orders.id','de_orders.id_product','de_orders.user_json','de_orders.thumb','de_orders.hinhminhhoa','de_orders.hinhminhhoa_back','de_product.price','de_product.ten_vi','de_product.slug_vi'))
              ->paginate($numPagi);
      }

		                  // dd(\DB::getQueryLog());
		return $orders;
	}
}