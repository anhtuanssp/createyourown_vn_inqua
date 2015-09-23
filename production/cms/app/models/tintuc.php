<?php
/**
* 
*/
use Illuminate\Support\Collection;

class Tintuc extends Eloquent
{
	protected  $table="de_tintuc";
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

	// Tintuc belongs_to_many__ Category
	public function categories()
	{
		return $this->belongsToMany('Category', 'de_tintuc_category', 'id_tintuc', 'id_category');
	}
}