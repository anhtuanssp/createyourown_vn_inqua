<?php 
/**
* 
*/
class Product extends Eloquent
{
	protected $table = 'de_product';
	protected $guarded = array('id');

	public function categories()
	{
		return $this->belongsToMany('Danhmucsanpham', 'de_product_category', 'id_product', 'id_Category');
	}
	public function productimages()
	{
		return $this->hasMany('ProductImgs','id_product');
	}
	public function nhasanxuats(){
		return $this->belongsToMany('Nhasanxuat','de_product_nhasanxuat','id_product','id_nhasanxuat');
	}
}