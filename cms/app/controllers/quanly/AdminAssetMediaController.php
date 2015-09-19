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

class AdminAssetMediaController extends BaseController
{

	public function __construct(AssetMediaRepo $assetMedia,CateRepo $category,MediaRepo $media){
		$this->assetMedia = $assetMedia;
		$this->category = $category;
		$this->media = $media;
	}


	public function index(){
		if(isset($_GET['s']) && isset($_GET['cm'])){
			$asms = $this->assetMedia->searchTinTuc($_GET['s'],$_GET['cm'],20);
		}else
			$asms = $this->assetMedia->paginateAssetMedia(20);

		$categories = $this->category->get_categories(18);
		// var_dump($categories);die();
		
		return View::make('quanly.assetmedia.index',
			array('asms' => $asms,'categories'=>$categories));
	}

	public function delete(){


		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$id = intval(\Input::get('id'));
			$tt = $this->assetMedia->find($id);
			if($this->assetMedia->delete($id)){
				if (\File::exists(public_path().'/'.$tt->thumb)) {
			    	\File::delete(public_path().'/'.$tt->thumb);
			    }
			    if (\File::exists(public_path().'/'.$tt->photo)) {
			    	\File::delete(public_path().'/'.$tt->photo);
			    }
				return \Redirect::action('quanly\AdminAssetMediaController@index')
					->withInput()
					->with('success', 'Xóa dữ liệu thành công');
			}

		} else {
			return \Redirect::action('quanly\AdminAssetMediaController@index')
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
	}

	public function add(){
		$cate = $this->category->get_categories(18);
		return View::make('quanly.assetmedia.add',compact('cate'));
	}

	public function edit($id){
		$id = intval($id);
		$asm = $this->assetMedia->find($id);
		$cate = $this->category->get_categories(18);
		$belongtocate = $asm->categories;
		$cateofTintuc = [];
		foreach ($belongtocate as $key => $value) {
			# code...
			$cateofTintuc[] = $value->id;
		}
		return View::make('quanly.assetmedia.edit',array('asm' => $asm,'cate'=>$cate,'cateoftintuc'=>$cateofTintuc ) );
	}

	public function save(){
		$id = Input::get('id');
		$tt = $this->assetMedia->find($id);
		// dd($tt);

		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'stt'=>Input::get('stt'),
				'luotxem'=>Input::get('luotxem'),
				'ten_vi'=>Input::get('ten_vi'),
				'mota_vi'=>Input::get('mota_vi'),
				'hienthi'=>Input::has('hienthi'),
				'noibat'=>Input::has('noibat'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),

				);

			$tt->stt = $data['stt'];
			$tt->luotxem = $data['luotxem'];
			$tt->hienthi = $data['hienthi'];
			$tt->noibat = $data['noibat'];
			$tt->ten_vi = $data['ten_vi'];
			$tt->slug_vi = $data['slug_vi'];
			$tt->mota_vi = $data['mota_vi'];


			if (Input::hasFile('photo'))
			{
				// LAY TEN FILE 
			    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

			    // THU MUC UPLOAD TIN TUC
			    $directory = \Config::get('detr.assetmedia_upload');

			    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);

			    chmod(public_path().$directory.$filename, 0755);

			    if($upload_status){

			    	$tt->photo = $directory.$filename;

			    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
			    	$tt->thumb = $thumb;
			    	chmod(public_path().'/'.$thumb, 0755);

		    		//ADD VAO TABLE MEDIA
					$this->media->create([
						"src"=> $directory.$filename,
						'thumb'=>$thumb,
						'title_vi'=> Input::get('ten_vi'),
						'alt_vi'=>Input::get('ten_vi'),
						'caption_vi'=>Input::get('ten_vi'),
					]);
			    }
			}

			/* avoiding resubmission of same content */
			if(count($tt->getDirty()) > 0){

				//UPDATE CATEGORY
				\DB::beginTransaction();
				try {
					$tt->save();
					
					$cates = Input::get('category');
					$tt->categories()->detach();
					$tt->categories()->attach($cates);
				} catch (\Exception  $e) {
					\DB::rollback();
					// dd($e);
					return \Redirect::back()->with('success', 'Tin tức cập nhật thất bại!');
				}
				\DB::commit();
				//UPDATE CATEGORY
				return \Redirect::back()->with('success', 'Tin tức đã được cập nhật!');
			}else
				return \Redirect::back()->with('success','Nothing to update!');
		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}
		
	}

	public function storage(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'ten_vi'=>Input::get('ten_vi'),
				'mota_vi'=>Input::get('mota_vi'),
				'hienthi'=>Input::has('hienthi'),
				'noibat'=>Input::has('noibat'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
				);
			\DB::beginTransaction();
			try {
				$result = $this->assetMedia->create($data);
				$cates = Input::get('category');
				$t = $this->assetMedia->find($result->id);
				$t->categories()->attach($cates);

				if (Input::hasFile('photo'))
				{
					// LAY TEN FILE 
				    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

				    // THU MUC UPLOAD TIN TUC
				    $directory = \Config::get('detr.assetmedia_upload');

				    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);

				    chmod(public_path().$directory.$filename, 0755);

				    if($upload_status){
				    	$t->photo = $directory.$filename;
				    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
				    	$t->thumb = $thumb;
				    	// dd(public_path().$thumb);
				    	chmod(public_path().'/'.$thumb, 0755);
				    }
				    $t->save();
				    //ADD VAO TABLE MEDIA
					$this->media->create([
						"src"=> $directory.$filename,
						'thumb'=>$thumb,
						'title_vi'=> Input::get('ten_vi'),
						'alt_vi'=>Input::get('ten_vi'),
						'caption_vi'=>Input::get('ten_vi'),
						]);
				}
				
			} catch (\Exception  $e) {
				dd($e->getMessage());
				\DB::rollback();
				return \Redirect::back()->with('success', 'Thêm mới thất bại!');
			}
			\DB::commit();

			return \Redirect::to('/quanly/assetmedia/edit/'.$result->id);
			
		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Thêm mới thất bại, Token hết hiệu lực');
		}
	}


}