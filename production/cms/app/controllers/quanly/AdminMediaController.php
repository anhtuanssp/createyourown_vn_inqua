<?php
/**
* ADMIN TIN TUC CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Gioithieu;
use Input;
use Detr\Storage\Media\EloquentMediaRepository as MediaRepo;

class AdminMediaController extends BaseController{
	private $media;

	public function __construct(MediaRepo $media){
		$this->media = $media;
	}

	public function index(){
		$medias = $this->media->paginateMedia(20);
		return View::make('quanly.media.index',compact('medias'));
	}

	public function add(){
		return View::make('quanly.gioithieu.add');
	}

	public function edit($id){
		$id = intval($id);
		$media = $this->media->find($id);
		
		return View::make('quanly.media.edit',array('media' => $media) );
	}
	public function save(){
		$id = Input::get('id');
		$tt = $this->media->find($id);

		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'title_vi'=>Input::get('title_vi'),
				'alt_vi'=>Input::get('alt_vi'),
				'description_vi'=>Input::get('description_vi'),
				'caption_vi'=>Input::get('caption_vi'),
				);

			$tt->title_vi = $data['title_vi'];
			$tt->alt_vi = $data['alt_vi'];
			$tt->description_vi = $data['description_vi'];
			$tt->caption_vi = $data['caption_vi'];
			

			if (Input::hasFile('photo'))
			{
				// LAY TEN FILE 
			    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

			    // THU MUC UPLOAD TIN TUC
			    $directory = \Config::get('detr.uploads');

			    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
			      chmod(public_path().$directory.$filename, 0755);

			    if($upload_status){
			    	//UPload thanh cong, kiem tra xem file photo co ton tai hay khong, neu cos thi xoa di
			    	if (\File::exists(public_path().$tt->src)) {
			    		\File::delete(public_path().$tt->src);
			    	}
			    	$tt->src = $directory.$filename;

			    	if (\File::exists(public_path().'/'.$tt->thumb)) {
			    		\File::delete(public_path().'/'.$tt->thumb);
			    	}
			    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
			    	$tt->thumb = $thumb;
			    	chmod(public_path().'/'.$thumb, 0755);
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
					return \Redirect::back()->with('success', 'Media cập nhật thất bại!');
				}
				\DB::commit();
				//Transaction

				return \Redirect::back()->with('success', 'Media đã được cập nhật!');
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
			$tt = $this->media->find($id);
			if($this->media->delete($id)){
				if (\File::exists(public_path().'/'.$tt->thumb)) {
			    	\File::delete(public_path().'/'.$tt->thumb);
			    }
			    if (\File::exists(public_path().'/'.$tt->src)) {
			    	\File::delete(public_path().'/'.$tt->src);
			    }
				return \Redirect::action('quanly\AdminMediaController@index')
					->withInput()
					->with('success', 'Xóa dữ liệu thành công');
			}

		} else {
			return \Redirect::action('quanly\AdminMediaController@index')
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
	}
	public function storage(){
		$token = \Input::get('_token');
		if (\Request::ajax()) {
			if (\Session::token() === $token) {
				$data= [
					'title_vi' => \Input::get('title_vi', 'Default name'),
					'description_vi' => \Input::get('description_vi', 'Default name'),
					'alt_vi' => \Input::get('alt_vi', 'Default name'),
					'caption_vi' => \Input::get('caption_vi', 'Default name'),
				];
				if(\Input::hasFile('src')){
					// LAY TEN FILE 
				    $filename = \Str::random(20).'_'.Input::file('src')->getClientOriginalName();

				    // THU MUC UPLOAD TIN TUC
				    $directory = \Config::get('detr.uploads');

				    $upload_status = Input::file('src')->move(public_path().$directory,$filename);
				      chmod(public_path().$directory.$filename, 0755);
				    if($upload_status){
				    	$data['src'] = $directory.$filename;
				    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
				    	$data['thumb'] = $thumb;
				    	 chmod(public_path().'/'.$thumb, 0755);
				    }
				}
					\DB::beginTransaction();
					try {
						$this->media->create($data);
						
					} catch (\Exception  $e) {
						\DB::rollback();
						$array = ['status'=>'3'];
						return \Response::json($array);
					}
					\DB::commit();
					$array = ['status'=>'1'];
					return \Response::json($array);
			}else{
				$array = ['status'=>'2'];
				return \Response::json($array);
			}
		}
	
	}
}