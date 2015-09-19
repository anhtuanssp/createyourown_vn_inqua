<?php 
/**
* 
*/
class Category extends Eloquent
{
	protected $table = 'de_category';
	protected $guarded = array('id');

	public function tintucs()
	{
		return $this->belongsToMany('Tintuc', 'de_tintuc_category', 'id_category', 'id_tintuc');
	}
	public function assetmedias()
	{
		return $this->belongsToMany('Assetmedia', 'de_assetmedia_category', 'id_category', 'id_assetmedia');
	}
}