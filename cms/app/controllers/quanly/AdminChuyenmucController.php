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
use Detr\Storage\Category\EloquentCategoryRepository as CateRepo;

class AdminChuyenmucController extends BaseController
{
	private $category;

	public function __construct(CateRepo $category){
		$this->category = $category;
	}
	public function index(){
		// print_r(\Session::get('langs_detr', ''));die();
		$cates = $this->category->get_categories(0);
		// print_r($this->category->getPathNode(21));die();
		return View::make('quanly.category.category',compact('cates'));
	}
	public function add(){
		$cates = $this->category->get_categories(0);
		return View::make('quanly.category.add',compact('cates'));
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

			// $result = $this->category->create($data);
			\DB::beginTransaction();
			try {
				$result = $this->category->create($data);
			} catch (\Exception  $e) {
				\DB::rollback();
				return \Redirect::back()->with('success', 'Thêm thất bại - thử lại!');
			}
			\DB::commit();

			return \Redirect::to('/quanly/chuyenmuc');
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
			if($this->category->delete($id))
				return \Redirect::action('quanly\AdminChuyenmucController@index')
			->withInput()
			->with('success', 'Xóa dữ liệu thành công');
		} else {
			return \Redirect::action('quanly\AdminChuyenmucController@index')
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
	}
	public function edit($id){
		$id = intval($id);
		$cate = $this->category->find($id);
		$catesArray = $this->category->get_categories(0);
		return View::make('quanly.category.edit',array('cate' => $cate,'catesArray'=>$catesArray) );
	}
	public function save(){
		$id = Input::get('id');
		$ct = $this->category->find($id);
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