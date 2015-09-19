<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductCircleLayer extends Migration {

	public function up()
	{
		Schema::table('de_product', function(Blueprint $table){
			/*
			*SẢN PHẨM CÓ MẶT CIRCLE HAY KHÔNG
			 */
			$table->tinyInteger('isCircleLayer');
			$table->string('photo_circle',255);
			$table->string('photo_circle_mask',255);
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
			$table->drop('isCircleLayer');
			$table->drop('photo_circle');
			$table->string('photo_circle_mask',255);
		});
	}

}
