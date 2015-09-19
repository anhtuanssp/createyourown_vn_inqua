<?php
namespace apiv1;
use BaseController;
use View;
use Tintuc;
use Category;
use Danhmucsanpham;
use Input;
use Response;
use ProductImgs;
use Product;
use Detr\Storage\Product\EloquentProductRepository as ProductRepo;
use Detr\Storage\Danhmucsanpham\EloquentDanhmucsanphamRepository as DanhmucsanphamRepo;
use Detr\Storage\ProductImgs\EloquentProductImgsRepository as ProductImgsRepo;

class ApiProductController extends BaseController {


	public function __construct( ProductRepo $product, DanhmucsanphamRepo $cates , ProductImgsRepo $pimgs){
		$this->product = $product;
		$this->cates =  $cates;
		$this->pimgs = $pimgs;
	}
	public function __call($name, $arguments){ 
		return Response::json('Missing method', 400);
    } 

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Lấy danh sách sản phẩm 
	 * Lọc sản phẩm không còn hàng
	 * @param $limit : int
	 */
	public function products($limit){


		$products = $this->product->paginateProduct($limit);

		// dd($products);
		$resultJson = array();
		$resultJson['products'] = array();
		foreach ($products as $key => $value) {
			# code...
			// dd($value->is_stock);
			if($value->is_stock == 1){
				$tmp = array();
				$tmp['product_id'] = $value->id;
				$tmp['product_name'] = $value->ten_vi;
				$tmp['product_img_thumb'] = $value->thumb;
				$tmp['product_img_primary'] = $value->photo;
				$tmp['product_img_primary_mask'] = $value->photo_mask;
				$tmp['price'] = $value->price;
				$tmp['isBack'] = ($value->isBack == 1)?true:false;
				$tmp['isCircleLayer'] = ($value->isCircleLayer == 1)?true:false;
				if(1 == $value->isBack){
					$tmp['product_img_back'] = $value->photo_back;
					$tmp['product_img_back_mask'] = $value->photo_back_mask;
				}
				if(1 == $value->isCircleLayer){
					$tmp['product_layer_circle'] = $value->photo_circle;
					$tmp['product_layer_circle_mask'] = $value->photo_circle_mask;
				}
				array_push($resultJson['products'], $tmp);
			}
			
		}

		return Response::json($resultJson, 200);
	}

	/**
	 * Lấy danh sách sản phẩm để show lên trang chủ
	 * Những sản phẩm nào là được phép design
	 * 
	 */

	public function productsOnHome($limit){


		$products = $this->product->paginateProduct($limit);

		// dd($products);
		$resultJson = array();
		$resultJson['products'] = array();
		foreach ($products as $key => $value) {
			# code...
			// dd($value->is_stock);
			if($value->is_stock == 1 && $value->isDisplayHome){
				$tmp = array();
				$tmp['product_id'] = $value->id;
				$tmp['product_name'] = $value->ten_vi;
				$tmp['product_img_thumb'] = $value->thumb;
				$tmp['product_img_primary'] = $value->photo;
				$tmp['product_img_primary_mask'] = $value->photo_mask;
				$tmp['price'] = $value->price;
				$tmp['isBack'] = ($value->isBack == 1)?true:false;
				$tmp['isCircleLayer'] = ($value->isCircleLayer == 1)?true:false;
				if(1 == $value->isBack){
					$tmp['product_img_back'] = $value->photo_back;
					$tmp['product_img_back_mask'] = $value->photo_back_mask;
				}
				if(1 == $value->isCircleLayer){
					$tmp['product_layer_circle'] = $value->photo_circle;
					$tmp['product_layer_circle_mask'] = $value->photo_circle_mask;
				}
				array_push($resultJson['products'], $tmp);
			}
			
		}

		return Response::json($resultJson, 200);
	}
	/**
	 * Lấy danh sách product theo mang id
	 */
	public function getSpecificProducts(){
		$argsID = Input::all();

		$products = $this->product->findIn($argsID);

		// dd($products);
		$resultJson = array();
		$resultJson['products'] = array();
		foreach ($products as $key => $value) {
			# code...
			// dd($value->is_stock);
			if($value->is_stock == 1 && $value->isDisplayHome){
				$tmp = array();
				$tmp['product_id'] = $value->id;
				$tmp['product_name'] = $value->ten_vi;
				$tmp['product_img_thumb'] = $value->thumb;
				$tmp['product_img_primary'] = $value->photo;
				$tmp['product_img_primary_mask'] = $value->photo_mask;
				$tmp['product_title_seo'] = $value->title_seo_vi;
				$tmp['product_desc_seo'] = $value->desc_seo_vi;
				$tmp['product_content'] = $value->noidung_vi;
				//GET IMGS
				$productIMGS = $this->pimgs->paginateFindProductImgsOfProduct($value->id,20);
				if($productIMGS != null){
					$tmp['product_imgs'] = $productIMGS->toJson();
				}
				//
				$tmp['price'] = $value->price;
				$tmp['isBack'] = ($value->isBack == 1)?true:false;
				$tmp['isCircleLayer'] = ($value->isCircleLayer == 1)?true:false;
				if(1 == $value->isBack){
					$tmp['product_img_back'] = $value->photo_back;
					$tmp['product_img_back_mask'] = $value->photo_back_mask;
				}
				if(1 == $value->isCircleLayer){
					$tmp['product_layer_circle'] = $value->photo_circle;
					$tmp['product_layer_circle_mask'] = $value->photo_circle_mask;
				}

				$value->luotxem = $value->luotxem+1;
				$value->save();

				array_push($resultJson['products'], $tmp);
			}
			
		}

		return Response::json($resultJson, 200);
	}

	/**
	 * LẤY danh sách các category con
	 */
	public function getCates($idParent){
		$cates = $this->cates->getCate1($idParent);
		return Response::json($cates, 200);
	}

	/**
	 * Get danh muc san pham
	 */
	public function getCate($id){
		$cate = $this->cates->find($id);
		return Response::json($cate, 200);

	}
	
	/**
	 * lấy sản phẩm dựa theo category
	 */
	public function getProductByCate () {
		// $cateID,$paging
		$cateID = Input::get('cate');
		$paging = Input::get('limit', 10);
		
		$products = $this->product->getProductsByCates($cateID,$paging);

		return Response::json($products, 200);
	}

	/**
	 * Lấy sản phẩm cùng category
	 */
	public function getProductRelateByID(){
		$id = Input::get('id');
		$products = $this->product->getRelateProductByProductID($id);
		return Response::json($products, 200);
	}



}
