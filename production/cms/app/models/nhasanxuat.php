<?php 
/**
* 
*/
class Nhasanxuat extends Eloquent
{
	protected $table = 'de_nhasanxuat';
	protected $guarded = array('id');

	public function products()
	{
		return $this->belongsToMany('Product', 'de_product_nhasanxuat', 'id_nhasanxuat', 'id_product');
	}
}