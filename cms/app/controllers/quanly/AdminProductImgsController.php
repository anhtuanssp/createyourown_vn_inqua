<?php
/**
* ADMIN SAN PHAM CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Product;
use ProductImgs;
use Input;
use Detr\Storage\Product\EloquentProductRepository as ProductRepo;
use Detr\Storage\ProductImgs\EloquentProductImgsRepository as ProductImgsRepo;
use Detr\Storage\Media\EloquentMediaRepository as MediaRepo;

class AdminProductImgsController  extends BaseController
{
	public function __construct(ProductRepo $product,ProductImgsRepo $pimgs,MediaRepo $media){
		$this->product = $product;
		$this->pimgs = $pimgs;
		$this->media = $media;
	}
	public function getProductImgs($id){
		$idProduct = intval($id);
		$productimgs = $this->pimgs->paginateFindProductImgsOfProduct($idProduct,3);
		if(\Request::ajax()){
			return \Response::json(View::make('quanly.productimgs.ajax.productimgs',['productimgs'=>$productimgs])->render());
		}
		return View::make('quanly.productimgs.imgs',['productimgs'=>$productimgs]);
	}
	public function add($id){
		$idProduct = intval($id);
		$product = $this->product->find($id);
		if(\Request::ajax()){
			return \Response::json(View::make('quanly.productimgs.ajax.add', ['product'=>$product])->render());
		}
		return View::make('quanly.productimgs.ajax.add', ['product'=>$product]);
	}
	public function storage(){
		$idProduct = Input::get('id_product');

		$product = $this->product->find($idProduct);

		$photo = '';
		$thumb = '';

		if (Input::hasFile('photo'))
		{
			// LAY TEN FILE 
			$filename = \Str::random(20).'_'.Input::file('photo')->getClientOriginalName();

		    // THU MUC UPLOAD TIN TUC
			$directory = \Config::get('detr.sanpham_upload');

			$upload_status = Input::file('photo')->move(public_path().$directory,$filename);
			 chmod(public_path().$directory.$filename, 0755);

			if($upload_status){
				$photo = $directory.$filename;
				$thumb = \Illuminage::image($directory.$filename)->thumbnail(200, 200)->getRelativePath();
				chmod(public_path().'/'.$thumb, 0755);

		    	//ADD VAO TABLE MEDIA
				$this->media->create([
					"src"=> $directory.$filename,
					'thumb'=>$thumb,
					'title_vi'=> Input::get('ten_vi'),
					'alt_vi'=>Input::get('alt_vi'),
					'caption_vi'=>Input::get('caption_vi'),
					]);
			}
		}

		$productimg = $this->pimgs->create(['ten_vi'=>Input::get('ten_vi'),
			'alt_vi'=>Input::get('alt_vi'),
			'caption_vi'=>Input::get('caption_vi'),
			'alt_vi'=>Input::get('alt_vi'),
			'photo'=>$photo,
			'thumb'=>$thumb,
			'id_product'=>$idProduct
			]);


		return \Redirect::to('quanly/sanpham/');
	}
	public function delete(){
		$token = \Input::get('_token');
		$id = intval(\Input::get('id'));

		if(\Request::ajax()){

			if (\Session::token() === $token) {
				$idProduct = intval(\Input::get('id_product'));
				$this->pimgs->delete($id);
				$productimgs = $this->pimgs->paginateFindProductImgsOfProduct($idProduct,3);
				
				return \Response::json(View::make('quanly.productimgs.ajax.productimgs',['productimgs'=>$productimgs])->render());
			}
		}
	}
}