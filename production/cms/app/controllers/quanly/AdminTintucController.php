<?php
/**
* ADMIN TIN TUC CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Tintuc;
use Category;
use Input;
use Detr\Storage\Tintuc\EloquentTintucRepository as TintucRepo;
use Detr\Storage\Category\EloquentCategoryRepository as CateRepo;
use Detr\Storage\Media\EloquentMediaRepository as MediaRepo;

class AdminTinTucController extends BaseController
{
	private $tintuc;
	private $category;
	private $media;

	public function __construct(TintucRepo $tintuc,CateRepo $category,MediaRepo $media){
		$this->tintuc = $tintuc;
		$this->category = $category;
		$this->media = $media;
	}
	public function index(){
		// \Sentry::logout();
		// var_dump($this->category->getPathNode(11));die();
		if(isset($_GET['s']) && isset($_GET['cm'])){
			$tintucs = $this->tintuc->searchTinTuc($_GET['s'],$_GET['cm'],20);
		}else
			$tintucs = $this->tintuc->paginateTintuc(20);

		$categories = $this->category->get_categories(0);
		// var_dump($categories);die();
		
		return View::make('quanly.tintuc.tintuc',array('tintucs' => $tintucs,'categories'=>$categories));
	}
	public function edit($id){

		$id = intval($id);
		$tintuc = $this->tintuc->find($id);
		$cate = $this->category->get_categories(0);
		$belongtocate = $tintuc->categories;
		$cateofTintuc = [];
		foreach ($belongtocate as $key => $value) {
			# code...
			$cateofTintuc[] = $value->id;
		}
		return View::make('quanly.tintuc.edit',array('tintuc' => $tintuc,'cate'=>$cate,'cateoftintuc'=>$cateofTintuc ) );
	}
	public function delete(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$id = intval(\Input::get('id'));
			if($this->tintuc->delete($id))
				return \Redirect::action('quanly\AdminTinTucController@index')
			->withInput()
			->with('success', 'Xóa dữ liệu thành công');
		} else {
			return \Redirect::action('quanly\AdminTinTucController@index')
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
	}
	public function add(){
		$cate = $this->category->get_categories(0);
		return View::make('quanly.tintuc.add',compact('cate'));
	}
	public function storage(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'ten_vi'=>Input::get('ten_vi'),
				'mota_vi'=>Input::get('mota_vi'),
				'noidung_vi'=>Input::get('noidung_vi'),
				'hienthi'=>Input::has('hienthi'),
				'noibat'=>Input::has('noibat'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
				'title_seo_vi'=>Input::get('title_seo_vi'),
				'desc_seo_vi'=>Input::get('desc_seo_vi'),
				'keyword_seo_vi'=>Input::get('keyword_seo_vi')
				);
			\DB::beginTransaction();
			try {
				$result = $this->tintuc->create($data);
				$cates = Input::get('category');
				$t = $this->tintuc->find($result->id);
				$t->categories()->attach($cates);

				if (Input::hasFile('photo'))
				{
					// LAY TEN FILE 
				    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

				    // THU MUC UPLOAD TIN TUC
				    $directory = \Config::get('detr.tintuc_upload');

				    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
					chmod(public_path().$directory.$filename, 0755);
				    if($upload_status){
				    	$t->photo = $directory.$filename;
				    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
				    	$t->thumb = $thumb;
				    	chmod(public_path().$thumb, 0755);
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
				\DB::rollback();
				return \Redirect::back()->with('success', 'Tin tức cập nhật thất bại!');
			}
			\DB::commit();

			return \Redirect::to('/quanly/tintuc/edit/'.$result->id);
			
		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Thêm mới thất bại, Token hết hiệu lực');
		}
	}
	
	public function save(){
		$id = Input::get('id');
		$tt = $this->tintuc->find($id);

		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'stt'=>Input::get('stt'),
				'luotxem'=>Input::get('luotxem'),
				'ten_vi'=>Input::get('ten_vi'),
				'mota_vi'=>Input::get('mota_vi'),
				'noidung_vi'=>Input::get('noidung_vi'),
				'hienthi'=>Input::has('hienthi'),
				'noibat'=>Input::has('noibat'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
				'title_seo_vi'=>Input::get('title_seo_vi'),
				'desc_seo_vi'=>Input::get('desc_seo_vi'),
				'keyword_seo_vi'=>Input::get('keyword_seo_vi')
				);

			$tt->stt = $data['stt'];
			$tt->luotxem = $data['luotxem'];
			$tt->hienthi = $data['hienthi'];
			$tt->noibat = $data['noibat'];
			$tt->ten_vi = $data['ten_vi'];
			$tt->slug_vi = $data['slug_vi'];
			$tt->mota_vi = $data['mota_vi'];
			$tt->noidung_vi = $data['noidung_vi'];
			$tt->title_seo_vi = $data['title_seo_vi'];
			$tt->desc_seo_vi = $data['desc_seo_vi'];
			$tt->keyword_seo_vi = $data['keyword_seo_vi'];

			if (Input::hasFile('photo'))
			{
				// LAY TEN FILE 
			    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

			    // THU MUC UPLOAD TIN TUC
			    $directory = \Config::get('detr.tintuc_upload');

			    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
			    chmod(public_path().$directory.$filename, 0755);

			    if($upload_status){
			    	//UPload thanh cong, kiem tra xem file photo co ton tai hay khong, neu cos thi xoa di
			    	// if (\File::exists(public_path().$tt->photo)) {
			    	// 	\File::delete(public_path().$tt->photo);
			    	// }
			    	$tt->photo = $directory.$filename;

			    	// if (\File::exists(public_path().'/'.$tt->thumb)) {
			    	// 	\File::delete(public_path().'/'.$tt->thumb);
			    	// }
			    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
			    	$tt->thumb = $thumb;
			    	chmod(public_path().$thumb, 0755);
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
}