<?php
/**
* ADMIN SAN PHAM CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Product;
use Input;
use Detr\Storage\Product\EloquentProductRepository as ProductRepo;
use Detr\Storage\Danhmucsanpham\EloquentDanhmucsanphamRepository as DanhmucsanphamRepo;
use Detr\Storage\Media\EloquentMediaRepository as MediaRepo;
use Detr\Storage\Nhasanxuat\EloquentNhasanxuatRepository as NhasanxuatRepo;

class AdminSanphamController  extends BaseController
{
	private $product;
	private $categories;
	private $media;

	public function __construct(ProductRepo $product,DanhmucsanphamRepo $cate
		,MediaRepo $media,NhasanxuatRepo $nsx){
		$this->product = $product;
		$this->categories = $cate;
		$this->media = $media;
		$this->nsx = $nsx;
	}
	public function index(){
		if(isset($_GET['s']) && isset($_GET['cm']) && isset($_GET['nsx']) ){
			$str = ($_GET['s'] == '')?'':$_GET['s'];
			$products = $this->product->searchProduct($str,$_GET['cm'],$_GET['nsx'],20);
		}else{
			$products = $this->product->paginateProduct(20);
		}
		
		$categories = $this->categories->get_categories(0);
		$nsxs = $this->nsx->all();

		// print_r('ds');die();
		return View::make('quanly.sanpham.index',array('products' => $products,
			'categories'=>$categories,'nsx'=>$nsxs));
	}
	public function add(){
		$cate = $this->categories->get_categories(0);
		return View::make('quanly.sanpham.add',compact('cate'));
		
	}
	public function storage(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'ten_vi'=>Input::get('ten_vi'),
				'price'=>Input::get('price'),
				'noidung_vi'=>Input::get('noidung_vi'),
				'baohanh'=>Input::get('baohanh'),
				'xuatxu'=>Input::get('xuatxu'),
				'hienthi'=>Input::has('hienthi'),
				'noibat'=>Input::has('noibat'),
				'is_new'=>Input::has('is_new'),
				'is_stock'=>Input::has('is_stock'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
				'title_seo_vi'=>Input::get('title_seo_vi'),
				'desc_seo_vi'=>Input::get('desc_seo_vi'),
				'keyword_seo_vi'=>Input::get('keyword_seo_vi'),

				'isDisplayHome'=>Input::has('isDisplayHome'),
				'isDesign'=>Input::has('isDesign'),
				'isCase'=>Input::has('isCase'),
				'isSkin'=>Input::has('isSkin'),
				'isBack'=>Input::has('isBack')
				);

			\DB::beginTransaction();
			try {
				$result = $this->product->create($data);
				$cates = Input::get('category');
				$t = $this->product->find($result->id);
				if(!empty($cates)){
					$t->categories()->attach($cates);
				}
				if (Input::hasFile('photo'))
				{
					// LAY TEN FILE 
					$filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

				    // THU MUC UPLOAD TIN TUC
					$directory = \Config::get('detr.sanpham_upload');

					$upload_status = Input::file('photo')->move(public_path().$directory,$filename);
					chmod(public_path().$directory.$filename, 0755);

					if($upload_status){
						$t->photo = $directory.$filename;
						$thumb = '/'.\Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
						$t->thumb = $thumb;

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
					$t->save();
				}
				
			} catch (\Exception  $e) {
				dd($e->getMessage());
				\DB::rollback();
				return \Redirect::back()->with('success', 'Sản phẩm thêm mới thất bại!');
			}
			\DB::commit();

		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Thêm mới thất bại, Token hết hiệu lực');
		}
		return \Redirect::to('/quanly/sanpham/edit/'.$result->id);
	}
	public function delete(){
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$id = intval(\Input::get('id'));
			if($this->product->delete($id))
				return \Redirect::action('quanly\AdminSanphamController@index')
			->withInput()
			->with('success', 'Xóa dữ liệu thành công');
		} else {
			return \Redirect::action('quanly\AdminSanphamController@index')
			->withInput()
			->with('success', 'Xóa thất bại, Token hết hiệu lực');
		}
	}
	public function edit($id){
		$id = intval($id);
		$product = $this->product->find($id);
		//CATE
		$cate = $this->categories->get_categories(0);
		$belongtocate = $product->categories;
		$cateofProduct = [];
		foreach ($belongtocate as $key => $value) {
			# code...
			$cateofProduct[] = $value->id;
		}
		// NHA SAN XUAT
		$nsx = $this->nsx->all();
		$nsxs = $product->nhasanxuats;
		$nsxOfProduct = [];
		foreach ($nsxs as $key => $value) {
			# code...
			$nsxOfProduct[] = $value->id;
		}

		return View::make('quanly.sanpham.edit',array('product' => $product,
			'cate'=>$cate,'cateofProduct'=>$cateofProduct,'nsx'=>$nsx,'nsxOfProduct'=>$nsxOfProduct
			 ) );
	}
	public function save(){
		$id = Input::get('id');
		$product = $this->product->find($id);
		$token = \Input::get('_token');
		if (\Session::token() === $token) {
			$data = array(
				'luotxem'=>Input::get('luotxem'),
				'ten_vi'=>Input::get('ten_vi'),
				'price'=>Input::get('price'),
				'noidung_vi'=>Input::get('noidung_vi'),
				'baohanh'=>Input::get('baohanh'),
				'xuatxu'=>Input::get('xuatxu'),
				'hienthi'=>Input::has('hienthi'),
				'noibat'=>Input::has('noibat'),
				'is_new'=>Input::has('is_new'),
				'is_stock'=>Input::has('is_stock'),
				'slug_vi'=>\Str::slug(Input::get('ten_vi'), '-'),
				'title_seo_vi'=>Input::get('title_seo_vi'),
				'desc_seo_vi'=>Input::get('desc_seo_vi'),
				'keyword_seo_vi'=>Input::get('keyword_seo_vi'),
				'isDisplayHome'=>Input::has('isDisplayHome'),
				'isDesign'=>Input::has('isDesign'),
				'isCase'=>Input::has('isCase'),
				'isSkin'=>Input::has('isSkin'),
				'isBack'=>Input::has('isBack'),
				'isCircleLayer'=>Input::has('isCircleLayer'),
				);

			$product->price = $data['price'];
			$product->luotxem = $data['luotxem'];
			$product->baohanh = $data['baohanh'];
			$product->xuatxu = $data['xuatxu'];
			$product->is_new = $data['is_new'];
			$product->is_stock = $data['is_stock'];
			$product->hienthi = $data['hienthi'];
			$product->noibat = $data['noibat'];
			$product->ten_vi = $data['ten_vi'];
			$product->slug_vi = $data['slug_vi'];
			
			$product->noidung_vi = $data['noidung_vi'];
			$product->title_seo_vi = $data['title_seo_vi'];
			$product->desc_seo_vi = $data['desc_seo_vi'];
			$product->keyword_seo_vi = $data['keyword_seo_vi'];

			$product->isDisplayHome = $data['isDisplayHome'];
			$product->isDesign = $data['isDesign'];
			$product->isCase = $data['isCase'];
			$product->isSkin = $data['isSkin'];
			$product->isBack = $data['isBack'];
			$product->isCircleLayer = $data['isCircleLayer'];

			// THU MUC UPLOAD TIN TUC
			$directory = \Config::get('detr.sanpham_upload');

			if (Input::hasFile('photo'))
			{
				// LAY TEN FILE 
				$filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

				$upload_status = Input::file('photo')->move(public_path().$directory,$filename);
				chmod(public_path().$directory.$filename, 0755);

				if($upload_status){

					$product->photo = $directory.$filename;
					$thumb = '/'.\Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
					$product->thumb = $thumb;
				
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

			if (Input::hasFile('photo_mask'))
			{
				// print_r('expression');die();
				// LAY TEN FILE 
				$filenamePM = \Str::random(20).'_'.Input::file('photo_mask')->getClientOriginalName();

				$upload_statusM = Input::file('photo_mask')->move(public_path().$directory,$filenamePM);
				chmod(public_path().$directory.$filenamePM, 0755);

				if($upload_statusM){

					$product->photo_mask = $directory.$filenamePM;
					$thumbM = \Illuminage::image($directory.$filenamePM)->thumbnail(200, 200)->getRelativePath();
					chmod(public_path().'/'.$thumbM, 0755);
		    		//ADD VAO TABLE MEDIA
					$this->media->create([
						"src"=> $directory.$filenamePM,
						'thumb'=>$thumbM,
						'title_vi'=> Input::get('ten_vi'),
						'alt_vi'=>Input::get('ten_vi'),
						'caption_vi'=>Input::get('ten_vi'),
						]);
				}
			}

			if (Input::hasFile('photo_back'))
			{
				$filenamePBM = \Str::random(20).'_'.Input::file('photo_back')->getClientOriginalName();

				$upload_statusPBM = Input::file('photo_back')->move(public_path().$directory,$filenamePBM);
				chmod(public_path().$directory.$filenamePBM, 0755);

				if($upload_statusPBM){

					$product->photo_back = $directory.$filenamePBM;
					$thumbM = \Illuminage::image($directory.$filenamePBM)->thumbnail(200, 200)->getRelativePath();
					chmod(public_path().'/'.$thumbM, 0755);
		    		//ADD VAO TABLE MEDIA
					$this->media->create([
						"src"=> $directory.$filenamePBM,
						'thumb'=>$thumbM,
						'title_vi'=> Input::get('ten_vi'),
						'alt_vi'=>Input::get('ten_vi'),
						'caption_vi'=>Input::get('ten_vi'),
						]);
				}
			}

			if (Input::hasFile('photo_back_mask'))
			{
				$filenamePM = \Str::random(20).'_'.Input::file('photo_back_mask')->getClientOriginalName();

				$upload_statusM = Input::file('photo_back_mask')->move(public_path().$directory,$filenamePM);
				chmod(public_path().$directory.$filenamePM, 0755);

				if($upload_statusM){

					$product->photo_back_mask = $directory.$filenamePM;
					$thumbM = \Illuminage::image($directory.$filenamePM)->thumbnail(200, 200)->getRelativePath();
					chmod(public_path().'/'.$thumbM, 0755);
		    		//ADD VAO TABLE MEDIA
					$this->media->create([
						"src"=> $directory.$filenamePM,
						'thumb'=>$thumbM,
						'title_vi'=> Input::get('ten_vi'),
						'alt_vi'=>Input::get('ten_vi'),
						'caption_vi'=>Input::get('ten_vi'),
						]);
				}
			}

			if (Input::hasFile('photo_circle'))
			{
				$filenamePC = \Str::random(20).'_'.Input::file('photo_circle')->getClientOriginalName();

				$upload_statusPC = Input::file('photo_circle')->move(public_path().$directory,$filenamePC);
				chmod(public_path().$directory.$filenamePC, 0755);

				if($upload_statusPC){

					$product->photo_circle = $directory.$filenamePC;
					$thumbPC = \Illuminage::image($directory.$filenamePC)->thumbnail(200, 200)->getRelativePath();
					chmod(public_path().'/'.$thumbPC, 0755);
				}
			}

			if (Input::hasFile('photo_circle_mask'))
			{
				$filenamePCM = \Str::random(20).'_'.Input::file('photo_circle_mask')->getClientOriginalName();

				$upload_statusPCM = Input::file('photo_circle_mask')->move(public_path().$directory,$filenamePCM);
				chmod(public_path().$directory.$filenamePCM, 0755);

				if($upload_statusPCM){

					$product->photo_circle_mask = $directory.$filenamePCM;
					$thumbPCM = \Illuminage::image($directory.$filenamePCM)->thumbnail(200, 200)->getRelativePath();
					chmod(public_path().'/'.$thumbPCM, 0755);
				}
			}

			// print_r($product->photo_mask);die();

			/* avoiding resubmission of same content */
			if(count($product->getDirty()) > 0){
				\DB::beginTransaction();
				try {
					// print_r('try to save product');die();
					$product->save();
					
					$cates = Input::get('category');
					$product->categories()->detach();
					$product->categories()->attach($cates);

					$nsxs = Input::get('nsx');
					// print_r($nsxs);die();
					if($nsxs !=''){
						$product->nhasanxuats()->detach();
						$product->nhasanxuats()->attach($nsxs);
					}else{
						if(count($product->nhasanxuats) > 0 ){
							$product->nhasanxuats()->detach();
						}
						
					}
				} catch (\Exception  $e) {
					\DB::rollback();
					return \Redirect::back()->with('success', 'Product cập nhật thất bại, có lỗi!');
				}
				\DB::commit();
				return \Redirect::back()->with('success', 'Product đã được cập nhật!');
			}else
			return \Redirect::back()->with('success','Nothing to update!');
		}
		else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}
	}
}
