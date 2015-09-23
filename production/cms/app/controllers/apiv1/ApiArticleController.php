<?php
namespace apiv1;
use BaseController;
use View;
use Tintuc;
use Category;

use Input;
use Response;

use Product;
use Detr\Storage\Tintuc\EloquentTintucRepository as TintucRepo;
use Detr\Storage\Category\EloquentCategoryRepository as CateRepo;

class ApiArticleController extends BaseController {


	public function __construct( TintucRepo $tintucs, CateRepo $cates ){
		$this->tt = $tintucs;
		$this->cates =  $cates;
	}
	public function __call($name, $arguments){ 
		return Response::json('Missing method', 400);
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
	 * lấy bai viet trợ giúp
	 */
	public function getTroGiupArticle(){
		$listTintuc = $this->tt->getTintucByCates(29,10);
		return Response::json($listTintuc, 200);
	}

	public function getContent($id){
		$tt = $this->tt->find($id);
		return Response::json($tt, 200);
	}
	public function getContentBySlug($slug){
		$tt = Tintuc::where('slug_vi','=',$slug)->get();
		return Response::json($tt, 200);
	}

}
