<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddImgBackForProduct extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('de_product', function(Blueprint $table){
			/*
			*SẢN PHẨM CÓ MẶT SAU HAY KHÔNG
			 */
			$table->tinyInteger('isBack');
			$table->string('photo_back',255);
			$table->string('photo_back_mask',255);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('de_product', function(Blueprint $table){
			$table->drop('isBack');
			$table->drop('photo_back');
			$table->string('photo_back_mask',255);
		});
	}

}
