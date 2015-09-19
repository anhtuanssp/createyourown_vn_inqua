<?php
/**
* ADMIN AssetMedia CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Category;
use Assetmedia;
use Input;

use Detr\Storage\AssetMedia\EloquentAssetMediaRepository as AssetMediaRepo;
use Detr\Storage\Category\EloquentCategoryRepository as CateRepo;
use Detr\Storage\Media\EloquentMediaRepository as MediaRepo;

class AdminSerectController extends BaseController
{

	public function __construct(AssetMediaRepo $assetMedia,CateRepo $category,MediaRepo $media){
		$this->assetMedia = $assetMedia;
		$this->category = $category;
		$this->media = $media;
	}





	public function index(){
		$cate = $this->category->get_categories(18);
		return View::make('serect.asm',compact('cate'));
	}

	public function storage(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {

			$files = Input::file('files');

		    foreach($files as $file) {
				$data = array(
					'ten_vi'=>Input::get('name'),
					'mota_vi'=>Input::get('name'),
					'hienthi'=>true,
					'noibat'=>false,
					'slug_vi'=>\Str::slug(Input::get('name'), '-'),
					);
				\DB::beginTransaction();
				try {
					$result = $this->assetMedia->create($data);
					$cates = Input::get('category');
					$t = $this->assetMedia->find($result->id);
					$t->categories()->attach($cates);

		
						// LAY TEN FILE 
					    $filename = \Str::random(20).'_'.$file->getClientOriginalName();

					    // THU MUC UPLOAD TIN TUC
					    $directory = \Config::get('detr.assetmedia_upload');

					    $upload_status = $file->move(public_path().$directory,$filename);

					    chmod(public_path().$directory.$filename, 0755);

					    if($upload_status){
					    	$t->photo = $directory.$filename;
					    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
					    	$t->thumb = $thumb;
					    	chmod(public_path().'/'.$thumb, 0755);
					    }
					    $t->save();
					    //ADD VAO TABLE MEDIA
						$this->media->create([
							"src"=> $directory.$filename,
							'thumb'=>$thumb,
							'title_vi'=> Input::get('name'),
							'alt_vi'=>Input::get('name'),
							'caption_vi'=>Input::get('name'),
							]);
	
					
				} catch (\Exception  $e) {
					dd($e->getMessage());
					\DB::rollback();
					return \Redirect::back()->with('success', 'Thêm mới thất bại!');
				}
				\DB::commit();
		    }




			return \Redirect::to('serect/asset-media');
			
		}else{
			return \Redirect::back();
		}
	}


}