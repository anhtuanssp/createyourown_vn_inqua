<?php
namespace quanly;
use BaseController;
use View;
use Nhasanxuat;
use Input;
use Detr\Storage\Nhasanxuat\EloquentNhasanxuatRepository as NhasanxuatRepo;
use Detr\Storage\Media\EloquentMediaRepository as MediaRepo;

class AdminNhasanxuatController extends \BaseController {

	private $nsx;
	private $media;

	public function __construct(NhasanxuatRepo $nsx,MediaRepo $media){
		$this->nsx = $nsx;
		$this->media = $media;
	}
	public function index(){
		if(isset($_GET['s'])){
			$nsx = $this->nsx->searchNhasanxuat($_GET['s'],20);
		}else
			$nsx = $this->nsx->paginateNhasanxuat(20);
		
		return View::make('quanly.nhasanxuat.index',['nhasanxuats'=>$nsx]);
	}
	public function edit($id){
		$nsx = $this->nsx->find($id);
		return View::make('quanly.nhasanxuat.edit', compact('nsx'));
	}

	public function delete(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$id = intval(\Input::get('id'));
			if($this->nsx->delete($id))
				return \Redirect::action('quanly\AdminNhasanxuatController@index')
			->withInput()
			->with('success', 'Xóa dữ liệu thành công');
		} else {
			return \Redirect::action('quanly\AdminNhasanxuatController@index')
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
	}


	public function storage(){
		$token = \Input::get('_token');
		if (\Request::ajax()) {
			if (\Session::token() === $token) {
				$data= [
					'ten_vi' => \Input::get('ten_vi', 'Default name'),
					'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
					'mota_vi' => \Input::get('mota_vi', 'Default name'),
					'hienthi' => 1
				];
				if(\Input::hasFile('photo')){
					// LAY TEN FILE 
				    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

				    // THU MUC UPLOAD
				    $directory = \Config::get('detr.nsx_upload');

				    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
				      chmod(public_path().$directory.$filename, 0755);
				    if($upload_status){
				    	$data['photo'] = $directory.$filename;
				    	$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
				    	$data['thumb'] = $thumb;
				    	  chmod(public_path().$thumb, 0755);

				    	$this->media->create([
							"src"=> $directory.$filename,
							'thumb'=>$thumb,
							'title_vi'=> Input::get('ten_vi'),
							'alt_vi'=>Input::get('mota_vi'),
							'caption_vi'=>Input::get('ten_vi'),
							]);
				    }

				}
				\DB::beginTransaction();
				try {
				    $this->nsx->create($data);	
				} catch (\Exception  $e) {
					// \DB::rollback();
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

	public function save(){
		$id = Input::get('id');
		$tt = $this->nsx->find($id);

		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'stt'=>Input::get('stt'),
				'ten_vi'=>Input::get('ten_vi'),
				'mota_vi'=>Input::get('mota_vi'),
				'hienthi'=>Input::has('hienthi'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
				);

			$tt->stt = $data['stt'];
			$tt->hienthi = $data['hienthi'];
			$tt->ten_vi = $data['ten_vi'];
			$tt->slug_vi = $data['slug_vi'];
			$tt->mota_vi = $data['mota_vi'];

			if (Input::hasFile('photo'))
			{
				// LAY TEN FILE 
			    $filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

			    // THU MUC UPLOAD TIN TUC
			    $directory = \Config::get('detr.nsx_upload');

			    $upload_status = Input::file('photo')->move(public_path().$directory,$filename);
			     chmod(public_path().$directory.$filename, 0755);

			    if($upload_status){

			    	$tt->photo = $directory.$filename;

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
					return \Redirect::back()->with('success', 'Nhà sản xuất cập nhật thất bại!');
				}
				\DB::commit();
				//Transaction

				return \Redirect::back()->with('success', 'Nhà sản xuất đã được cập nhật!');
			}else
				return \Redirect::back()->with('success','Nothing to update!');
		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}
	}


}
