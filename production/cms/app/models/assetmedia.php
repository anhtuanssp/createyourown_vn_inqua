<?php
/**
* 
*/

class Assetmedia extends Eloquent
{
	protected  $table="de_assetmedia";
	protected $guarded = array('id');

	public function getChuyenmuc($str){
		if ($str!==0 || $str!=='') {	
			$result = array();
			$arrStr = explode(',', $str);
			if (!empty($arrStr)) {
				foreach ($arrStr as $k=> $v) {
					$cate = Category::find($v);;
					array_push($result, $cate);
				}
				return $result;
			}
		}else{
			return null;
		}
	}

	// assetmedia belongs_to_many__ Category
	public function categories()
	{
		return $this->belongsToMany('Category', 'de_assetmedia_category', 'id_assetmedia', 'id_category');
	}
}