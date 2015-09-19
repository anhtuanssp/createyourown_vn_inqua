<?php
namespace Detr\Storage\Orders;

interface OrdersRepository{
	public function all();
	public function getAllOrder();
	public function getTemplateOrder();
	public function find($id);
	public function create($input);
	public function delete($id);
	public function getOrderSharing($isSharing,$paging);
}