<?php 
namespace Detr\Storage\ProductImgs;
use ProductImgs;
use DB;
/*
* @author : tuantruong
* 2/9/2014
* class repository chứa các bussiness logic của bảng Product Imgs
*/
class EloquentProductImgsRepository  implements ProductImgsRepository
{
	public function all(){
		return ProductImgs::all();
	}
	public function paginateProductImgs($num){
		return ProductImgs::orderBy('id', 'desc')->paginate($num);
	}
	public function paginateFindProductImgsOfProduct($idProduct,$num){

		$pimgs = ProductImgs::where('id_product','=',$idProduct)->orderBy('id', 'desc')->paginate($num);
		// $queries = DB::getQueryLog();
		// $last_query = end($queries);
		// print_r($last_query);die();
		return ProductImgs::where('id_product','=',$idProduct)->paginate($num);

	}
	public function find($id){
		return ProductImgs::find($id);
	}
	public function create($input){
		return ProductImgs::create($input);
	}
	public function delete($id){
		ProductImgs::destroy($id);
		return true;
	}
}