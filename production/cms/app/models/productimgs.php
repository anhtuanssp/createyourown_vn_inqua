<?php

	/**
	* Hinh Anh Them cho Product
	*/
	class ProductImgs extends Eloquent
	{
		protected $table = "de_productimages";
		protected $guarded = array('id');


		public function product()
	    {
	        return $this->belongsTo('Product');
	    }
	}