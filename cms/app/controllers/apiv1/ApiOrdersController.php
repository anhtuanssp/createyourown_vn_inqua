<?php
namespace apiv1;

use Illuminate\Events\Dispatcher;

use BaseController;

use Orders;
use Input;

use Response;
use Request;

use Detr\Storage\Orders\EloquentOrdersRepository as OrdersRepo;

class ApiOrdersController extends BaseController {

	/**
	* @var Dispatcher
	*/
  	protected $events;


	/**
	 * 
	 */
	public function __construct( OrdersRepo $orders,Dispatcher $events ){
		$this->orders = $orders;
		$this->events = $events;
	}

	public function create(){


		if (Request::ajax())
		{
			$param = Input::all();
			
			foreach ($param as $key => $value) {
				# code...
					if($key != 'user_json'){
						$value = htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
						$param[$key] = $value;
					}
			}

			// dd($param);

			//CHECK SAN PHAM CO SHARE HAY KHONG
			$userJson = '';
			if($param["is_sharing"]){
				$userJson = $param['user_json'];
			}


			
			\DB::beginTransaction();
			try {
				$id = $this->orders->create([
					"tenkhachhang"=>$param["tenkhachhang"],
					"email"=>$param["email"],
					"phone"=>$param["phone"],
					"orderNote"=>$param["orderNote"],
					"hinhminhhoa"=>'',
					"hinhminhhoa_back"=>'',
					"hinhdein"=>'',
					"hinhdein_back"=>'',
					"soluong"=>$param["soluong"],
					"phuongthucthanhtoan"=>$param["phuongthucthanhtoan"],
					"tennguoinhan"=>$param["tennguoinhan"],
					"phone_nguoinhan"=>$param["phone_nguoinhan"],
					"diachinguoinhan"=>$param["diachinguoinhan"],
					"is_sharing"=>$param["is_sharing"],
					"bank_account"=>$param["bank_account"],
					"bank_name"=>$param["bank_name"],
					"noidung_bank"=>$param["noidung_bank"],
					"list_asset_imgs"=>'',
					"list_facebook_imgs"=>'',
					"id_product"=>$param['id_product'],
					"hasBack"=>$param['hasBack'],
					"thumb"=>'',
					"user_json" => '',

					'hasLayerCircle' => $param['hasBack'],
					'hinhdein_layerBack' => '',
					'hinhminhhoa_layerBack' => ''
				 ]);

				// // THU MUC UPLOAD TIN TUC
				$directory = public_path().\Config::get('detr.order_thumbs');
				$directoryHinhorder = \Config::get('detr.order_assets');

				// dd($userJson);

				$o = $this->orders->find($id->id);
				
		   		if($param['is_layerCircle']){
			   		if($param['hasLayerCircle']){
				        $base64_strbackMLC = substr($param['hinhminhhoa_layerBack'], strpos($param['hinhminhhoa_layerBack'], ",")+1);
				        $imageBackMLC = base64_decode($base64_strbackMLC);
				        $filenameBackMLC = "order-".time()."backCircle.png";
				   		$successBack = file_put_contents($directory.$filenameBackMLC, $imageBackMLC);
				   		chmod($directory.$filenameBackMLC, 0755);
				   		$thumbHinhminhhoa_backMLC = '/'.\Illuminage::image(\Config::get('detr.order_thumbs').$filenameBackMLC)->thumbnail(200, 300)->getRelativePath();
				   		chmod(public_path().'/'.$thumbHinhminhhoa_backMLC, 0755);
				   		$o->hinhminhhoa_layerBack = $thumbHinhminhhoa_backMLC;

				   		$o->thumb = $thumbHinhminhhoa_backMLC;
			   			$o->hinhminhhoa = $thumbHinhminhhoa_backMLC;

				   		$base64_str_hinhdein_backLC = substr($param['hinhdein_layerBack'], strpos($param['hinhdein_layerBack'], ",")+1);
				        $imageHinhdein_backLC = base64_decode($base64_str_hinhdein_backLC);
				        $filenameHinhdein_backLC = "orderLayerCircle-".time().".png";
				   		$successHinhdein_backLC = file_put_contents( public_path().$directoryHinhorder.$filenameHinhdein_backLC, 
				   												$imageHinhdein_backLC);
				   		chmod( public_path().$directoryHinhorder.$filenameHinhdein_backLC, 0755);
				   		$o->hinhdein_layerBack = $directoryHinhorder.$filenameHinhdein_backLC;
			   		}
		   		}else{
			   		/**
					 * HINH MINH HOA VÀ THUMB
					 * 
					 */
			        $base64_str = substr($param['hinhminhhoa'], strpos($param['hinhminhhoa'], ",")+1);
			        $image = base64_decode($base64_str);
			        $filename = "order-".time().".png";
			   		$success = file_put_contents($directory.$filename, $image);
			   		chmod($directory.$filename, 0755);
			   		
			   		$thumb = '/'.\Illuminage::image(\Config::get('detr.order_thumbs').$filename)->thumbnail(200, 300)->getRelativePath();
			   		chmod(public_path().'/'.$thumb, 0755);
			   		$o->thumb = $thumb;
			   		$o->hinhminhhoa = $thumb;

			   		if($param['hasBack']){

			   		/**
					 * HINH MINH HOA BACK
					 * 
					 */
				        $base64_strback = substr($param['hinhminhhoa_back'], strpos($param['hinhminhhoa_back'], ",")+1);
				        $imageBack = base64_decode($base64_strback);
				        $filenameBack = "order-".time()."back.png";
				   		$successBack = file_put_contents($directory.$filenameBack, $imageBack);
				   		chmod($directory.$filenameBack, 0755);
				   		$thumbHinhminhhoa_back = '/'.\Illuminage::image(\Config::get('detr.order_thumbs').$filenameBack)->thumbnail(200, 300)->getRelativePath();
				   		chmod(public_path().'/'.$thumbHinhminhhoa_back, 0755);
				   		$o->hinhminhhoa_back = $thumbHinhminhhoa_back;

				   		//Xử lý hình để in back
				   		$base64_str_hinhdein_back = substr($param['hinhdein_back'], strpos($param['hinhdein_back'], ",")+1);
				        $imageHinhdein_back = base64_decode($base64_str_hinhdein_back);
				        $filenameHinhdein_back = "order-".time().".png";
				   		$successHinhdein_back = file_put_contents( public_path().$directoryHinhorder.$filenameHinhdein_back, 
				   												$imageHinhdein_back);
				   		chmod( public_path().$directoryHinhorder.$filenameHinhdein_back, 0755);
				   		$o->hinhdein_back = $directoryHinhorder.$filenameHinhdein_back;
			   		}

				   	////Xử lý hình để in
			   		$base64_str_hinhdein = substr($param['hinhdein'], strpos($param['hinhdein'], ",")+1);
			        $imageHinhdein = base64_decode($base64_str_hinhdein);
			        $filenameHinhdein = "order-".time()."back.png";
			   		$successHinhdein = file_put_contents( public_path().$directoryHinhorder.$filenameHinhdein, 
			   												$imageHinhdein);
			   		chmod( public_path().$directoryHinhorder.$filenameHinhdein, 0755);
			   		$o->hinhdein = $directoryHinhorder.$filenameHinhdein;

		   		}


		   		if($param["is_sharing"]){
					// $o->user_json = $userJson;
					// order_tmp_json
					$filename = "OrderID-".$o->id."-".time().".json";
					\File::put(public_path().\Config::get('detr.order_tmp_json').$filename,$userJson);
					chmod( public_path().\Config::get('detr.order_tmp_json').$filename, 0755);
					$o->user_json = \Config::get('detr.order_tmp_json').$filename;
				}

		   		$o->save();
		   		/**
		   		 * FIRE EVENT SENT EMAIL
		   		 */
		   		// $this->events->fire(\Config::get('detr.event_detr.event_sentmail_order'), array($o));
		   		// $this->events->fire(\Config::get('detr.event_detr.event_sentmail_notify_order'), array($o));


			} catch (\Exception  $e) {
				dd($e->getMessage());
				\DB::rollback();
				return Response::json($arrayName = array('status' => 'fail'), 200);
			}
			\DB::commit();

			$newO = $this->orders->find($id->id);

		    return Response::json($arrayName = array(
		    	'status' => 'success', 
		    	'id'=> $id->id,
		    	'thumb'=> $newO->thumb
		    	), 200);
		}

		
	}



	/**
	 * Lay danh sach cac thiet ke duoc chia se
	 */
	public function getThietKeMau(){
		$paging = Input::get('limit', 10);
		$cate = Input::get('cateID', null);
		// dd($cate);
		$listOrderIsSharing = $this->orders->getOrderSharing(1,$paging,$cate);
		return Response::json($listOrderIsSharing, 200);
	}

	public function getSpecificThietkemau(){
		$id = Input::get('id');
		$order = $this->orders->find($id);

		return Response::json(['json'=>$order->user_json], 200);
	}

}
