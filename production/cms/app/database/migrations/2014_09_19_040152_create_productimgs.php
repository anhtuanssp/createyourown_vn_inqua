<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductimgs extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('de_productimages', function(Blueprint $table){
			$table->increments('id');
			$table->string('ten_vi',255);
			$table->string('ten_en',255);
			$table->string('photo',255);
			$table->string('thumb',255);
			$table->string('caption_vi',255);
			$table->string('caption_en',255);
			$table->string('alt_vi',255);
			$table->string('alt_en',255);
			$table->integer('id_product')->unsigned();
			$table->foreign('id_product')->references('id')->on('de_product');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
		Schema::drop('de_productimages');
	}

}
