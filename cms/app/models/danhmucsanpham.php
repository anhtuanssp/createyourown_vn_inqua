<?php 
class Danhmucsanpham extends Eloquent
{
	protected $table = 'de_danhmucsanpham';
	protected $guarded = array('id');
	public function sanphams()
	{
		return $this->belongsToMany('Product', 'de_product_category', 'id_category', 'id_product');
	}
}