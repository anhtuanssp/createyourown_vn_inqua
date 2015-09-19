<?php
/**
* ADMIN TIN TUC CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Gioithieu;
use Input;
use Detr\Storage\Gioithieu\EloquentGioithieuRepository as GioithieuRepo;

class AdminGioithieuController extends BaseController{
	private $gioithieu;

	public function __construct(GioithieuRepo $gioithieu){
		$this->gioithieu = $gioithieu;
	}

	public function index(){
		// Gioithieu::withTrashed()->where('id', 2)->restore();
		$gioithieus = $this->gioithieu->all();
		return View::make('quanly.gioithieu.gioithieu',compact('gioithieus'));
	}

	public function add(){
		return View::make('quanly.gioithieu.add');
	}

	public function edit($id){
		$id = intval($id);
		$tintuc = $this->gioithieu->find($id);
		
		return View::make('quanly.gioithieu.edit',array('tintuc' => $tintuc) );
	}
	public function save(){
		$id = Input::get('id');
		$tt = $this->gioithieu->find($id);

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
			    $directory = \Config::get('detr.gioithieu_upload');

			    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
			      chmod(public_path().$directory.$filename, 0755);

			    if($upload_status){
			    	//UPload thanh cong, kiem tra xem file photo co ton tai hay khong, neu cos thi xoa di
			    	if (\File::exists(public_path().$tt->photo)) {
			    		\File::delete(public_path().$tt->photo);
			    	}
			    	$tt->photo = $directory.$filename;

			    	if (\File::exists(public_path().'/'.$tt->thumb)) {
			    		\File::delete(public_path().'/'.$tt->thumb);
			    	}
			    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
			    	$tt->thumb = $thumb;
			    	  chmod(public_path().$thumb, 0755);
			    }
			}

			/* avoiding resubmission of same content */
			if(count($tt->getDirty()) > 0){

				//Transaction
				\DB::beginTransaction();
				try {
					$tt->save();
					
				} catch (\Exception  $e) {
					\DB::rollback();
					return \Redirect::back()->with('success', 'Tin tức cập nhật thất bại!');
				}
				\DB::commit();
				//Transaction

				return \Redirect::back()->with('success', 'Tin tức đã được cập nhật!');
			}else
				return \Redirect::back()->with('success','Nothing to update!');
		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}
	}

	public function delete(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$id = intval(\Input::get('id'));
			if($this->gioithieu->softdelete($id))
				return \Redirect::action('quanly\AdminGioithieuController@index')
			->withInput()
			->with('success', 'Xóa dữ liệu thành công');
		} else {
			return \Redirect::action('quanly\AdminGioithieuController@index')
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
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
			// \DB::beginTransaction();
			try {
				$result = $this->gioithieu->create($data);
				$t = $this->gioithieu->find($result->id);

				if (Input::hasFile('photo'))
				{
					// LAY TEN FILE 
				    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

				    // THU MUC UPLOAD TIN TUC
				    $directory = \Config::get('detr.gioithieu_upload');

				    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
				      chmod(public_path().$directory.$filename, 0755);

				    if($upload_status){
				    	$t->photo = $directory.$filename;
				    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
				    	$t->thumb = $thumb;
				    	chmod(public_path().$thumb, 0755);
				    }
				    $t->save();
				}
				
			} catch (\Exception  $e) {
				// \DB::rollback();
				return \Redirect::back()->with('success', 'Tin tức cập nhật thất bại!');
			}
			\DB::commit();

			return \Redirect::to('/quanly/gioithieu/edit/'.$result->id);
		}else {
			return \Redirect::back()
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
	}
}