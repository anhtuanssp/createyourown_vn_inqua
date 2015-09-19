<?php 
/*
|--------------------------------------------------------------------------
| ORDER COMMON FUNCTION
|--------------------------------------------------------------------------
|
*/

/**
 * Chuyển trạng thái đơn hàng từ kiểu int sang text
 */
function convertStatusOrder($status){
	$status_text = 'Đã nhận được đơn hàng';
	switch ($status) {
		case 0:
			# code...
			$status_text = 'Đã nhận được đơn hàng';
			break;
		case 1:
			# code...
			$status_text = 'Đang xử lý';
			break;
		case 2:
			# code...
			$status_text = 'Đang chuyển đi In';
			break;
		case 3:
			# code...
			$status_text = 'Đang trên đường đi giao hàng';
			break;
		case 4:
			# code...
			$status_text = 'Đơn hàng thành công';
			break;
	}
	return $status_text;
}

/**
 * Tạo class css tương ứng với trạng thái đơn hàng
 */
function genClassCssForOrderByStatus($status){
	$class = 'order_default';
	switch ($status) {
		case 0:
			# code...
			$class = 'active';
			break;
		case 1:
			# code...
			$class = 'danger';
			break;
		case 2:
			# code...
			$class = 'info';
			break;
		case 3:
			# code...
			$class = 'warning';
			break;
		case 4:
			# code...
			$class = 'success';
			break;
	}
	return $class;
}