<?php
/**
* ADMIN ORDER CONTROLLER
*/
namespace quanly;
use BaseController;
use View;
use Product;
use Input;
use Detr\Storage\Orders\EloquentOrdersRepository as OrderRepo;
use Illuminate\Events\Dispatcher;

class AdminOrdersController  extends BaseController
{

	/**
	* @var Dispatcher
	*/
  	protected $events;

	public function __construct(OrderRepo $orders,Dispatcher $events){
		$this->orders = $orders;
		$this->events = $events;
	}
	public function index(){
		$orders = $this->orders->getAllOrder();
		return View::make('quanly.orders.index',array('orders' => $orders));
	}
	
	public function templateOrder(){
		$orders = $this->orders->getTemplateOrder();
		return View::make('quanly.orders.index',array('orders' => $orders));
	}

	public function view($id){
		$order = $this->orders->find($id);
		return View::make('quanly.orders.edit',array('order' => $order));
	}

	public function delete($id){

		if($this->orders->delete($id)){

			return \Redirect::to('quanly/donhangs');

		}

		
	}

	public function save(){
		$id = Input::get('id');
		$order = $this->orders->find($id);
		$param = Input::all();

		// dd($param);die();
		// remove index muliselect
		unset($param['multiselect']);
		if(isset($param['status_sharing'])){
			$param['status_sharing'] = ($param['status_sharing']=="on")?1:0;
		}else{
			$param['status_sharing'] = 0;
		}

		if(isset($param['is_sharing'])){
			$param['is_sharing'] = ($param['is_sharing']=="on")?1:0;
		}else{
			$param['is_sharing'] = 0;
		}
		
		
		$token = \Input::get('_token');
		if (\Session::token() === $token) {


			//UPDATE ORDER
			\DB::beginTransaction();
			try {
				$order->update($param);
				$order->save();
				
		   		/**
		   		 * FIRE EVENT SENT EMAIL
		   		 */
		   		$this->events->fire(\Config::get('detr.event_detr.event_sentmail_order'), array($order));
					
			} catch (\Exception  $e) {
				\DB::rollback();
				return \Redirect::back()->with('success', 'Order cập nhật thất bại!');
			}
			\DB::commit();
			//UPDATE CATEGORY

			return \Redirect::back()->with('success', 'Order đã được cập nhật!');

		}else{
			return \Redirect::back()
			->withInput()
			->with('success', 'Cập nhật thất bại, Token hết hiệu lực');
		}	
	}

}