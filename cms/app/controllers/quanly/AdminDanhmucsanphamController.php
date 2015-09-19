<?php
/**
* ADMIN DANH MUC SAN PHAM CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Danhmucsanpham;
use Input;
use Detr\Storage\Danhmucsanpham\EloquentDanhmucsanphamRepository as DanhmucsanphamRepo;

class AdminDanhmucsanphamController extends BaseController
{
	private $danhmuc;

	public function __construct(DanhmucsanphamRepo $category){
		$this->danhmuc = $category;
	}
	public function index(){
		// print_r(\Session::get('langs_detr', ''));die();
		$cates = $this->danhmuc->get_categories(0);
		return View::make('quanly.dmsp.category',compact('cates'));
	}
	public function add(){
		$cates = $this->danhmuc->get_categories(0);
		return View::make('quanly.dmsp.add',compact('cates'));
	}
	public function storage(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'ten_vi'=>Input::get('ten_vi'),
				'hienthi'=>Input::has('hienthi'),
				'parent'=>Input::get('category'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
				'title_seo_vi'=>Input::get('title_seo_vi'),
				'desc_seo_vi'=>Input::get('desc_seo_vi'),
				'keyword_seo_vi'=>Input::get('keyword_seo_vi')
			);

			
			\DB::beginTransaction();
			try {
				$result = $this->danhmuc->create($data);
				$t = $this->danhmuc->find($result->id);
				if (Input::hasFile('photo'))
				{
					// LAY TEN FILE 
				    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

				    // THU MUC UPLOAD TIN TUC
				    $directory = \Config::get('detr.danhmuc_upload');

				    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
				    chmod(public_path().$directory.$filename, 0755);

				    if($upload_status){
				    	$t->photo = $directory.$filename;
				    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
				    	$t->thumb = $thumb;
				    	chmod(public_path().'/'.$thumb, 0755);
				    }
				    $t->save();
				}
			} catch (\Exception  $e) {
				\DB::rollback();
				return \Redirect::back()->with('success', 'Thêm thất bại - thử lại!');
			}
			\DB::commit();

			return \Redirect::to('/quanly/dmsp');
		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Thêm mới thất bại, Token hết hiệu lực');
		}
	}
	public function delete(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$id = intval(\Input::get('id'));
			if($this->danhmuc->delete($id))
				return \Redirect::action('quanly\AdminDanhmucsanphamController@index')
			->withInput()
			->with('success', 'Xóa dữ liệu thành công');
		} else {
			return \Redirect::action('quanly\AdminDanhmucsanphamController@index')
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
	}
	public function edit($id){
		$id = intval($id);
		$cate = $this->danhmuc->find($id);
		$catesArray = $this->danhmuc->get_categories(0);
		return View::make('quanly.dmsp.edit',array('cate' => $cate,'catesArray'=>$catesArray) );
	}
	public function save(){
		$id = Input::get('id');
		$ct = $this->danhmuc->find($id);
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'ten_vi'=>Input::get('ten_vi'),
				'hienthi'=>Input::has('hienthi'),
				'parent'=>Input::get('category'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
				'title_seo_vi'=>Input::get('title_seo_vi'),
				'desc_seo_vi'=>Input::get('desc_seo_vi'),
				'keyword_seo_vi'=>Input::get('keyword_seo_vi')
				);
			// var_dump($data);die();
			$ct->hienthi = $data['hienthi'];
			$ct->ten_vi = $data['ten_vi'];
			$ct->slug_vi = $data['slug_vi'];
			$ct->parent = $data['parent'];
			$ct->title_seo_vi = $data['title_seo_vi'];
			$ct->desc_seo_vi = $data['desc_seo_vi'];
			$ct->keyword_seo_vi = $data['keyword_seo_vi'];
			/* avoiding resubmission of same content */


			if (Input::hasFile('photo'))
			{
				// LAY TEN FILE 
			    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

			    // THU MUC UPLOAD TIN TUC
			    $directory = \Config::get('detr.danhmuc_upload');

			    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
			    // dd(public_path().$directory.$filename);
			    chmod(public_path().$directory.$filename, 0755);

			    if($upload_status){
			    	//UPload thanh cong, kiem tra xem file photo co ton tai hay khong, neu cos thi xoa di
			    	if (\File::exists(public_path().$ct->photo)) {
			    		\File::delete(public_path().$ct->photo);
			    	}
			    	$ct->photo = $directory.$filename;

			    	if (\File::exists(public_path().'/'.$ct->thumb)) {
			    		\File::delete(public_path().'/'.$ct->thumb);
			    	}
			    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
			    	$ct->thumb = $thumb;
			    	chmod(public_path().'/'.$thumb, 0755);
			    }
			}

			if(count($ct->getDirty()) > 0){
				\DB::beginTransaction();
				try {

					$ct->save();
				} catch (\Exception $e) {
					\DB::rollBack();
					return \Redirect::back()
					->withInput()
					->with('success', 'ERROR : Update fail');
				}
				\DB::commit();
				return \Redirect::back()
					->withInput()
					->with('success', 'Cập nhật thành công');
			}else{
				return \Redirect::back()
				->withInput()
				->with('success', 'Không thay đổi gì');
			}
		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}
	}
}