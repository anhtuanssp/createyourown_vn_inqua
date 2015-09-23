<?php
namespace apiv1;
use BaseController;
use View;
use Tintuc;
use Category;
use Input;
use Response;

use Detr\Storage\AssetMedia\EloquentAssetMediaRepository as ASRepo;
use Detr\Storage\Category\EloquentCategoryRepository as CateRepo;

class ApiAssetMediaController extends BaseController {

	/**
	 * 
	 */
	public function __construct( CateRepo $cates, ASRepo $as ){
		$this->assetMedia = $as;
		$this->cates = $cates;
		$this->idAssetMedia = 18;
	}

	public function cates(){
		$categories = $this->cates->get_categories(18);
				// dd($products);
		$resultJson = array();
		$resultJson['assets'] = array();
		foreach ($categories as $key => $value) {
			# code...
			// dd($value);
			$tmp = array();
			$tmp['asset_id'] = $value['id'];
			$tmp['asset_name'] = $value['ten_vi'];
			$tmp['do_uu_tien'] = 1;
			/**
			 * PUSH A TEMPLATE INTO RESULT JSON
			 */
		
			array_push($resultJson['assets'], $tmp);
		}
		return Response::json($resultJson, 200);
	}

	public function getAssetMediaByCate($id){
		$cate = $this->cates->find($id);
		$asms = $cate->assetmedias;

		return Response::json($asms, 200);
	}

	/**
	 * [getAssetMediaByLimit description]
	 * @param  [type] $limit [description]
	 * @return [type]        [description]
	 */
	public function getAssetMediaByLimit($limit){
		$asLimit = $this->assetMedia->paginateAssetMediaOrderByLuotXem($limit);
		return Response::json($asLimit, 200);
	}

	public function getAssetsMediaByIds(){
		$p = Input::all();
		$resutl = $this->assetMedia->getAssetMediaByListID($p["data"]);
		return Response::json($resutl,200);
	}

	public function addCountAssetMedia($id){
		$this->assetMedia->tangLuotXemChoAssetMedia($id);
		return Response::json('success', 200);
	}
}
