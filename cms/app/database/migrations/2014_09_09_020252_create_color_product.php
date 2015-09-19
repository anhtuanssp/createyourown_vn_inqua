<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateColorProduct extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_colorproduct', function(Blueprint $table){
			$table->increments('id');
			$table->integer('id_color')->unsigned();
			$table->integer('id_product')->unsigned();
			$table->foreign('id_color')->references('id')->on('de_color');
			$table->foreign('id_product')->references('id')->on('de_product');
			$table->unique(['id_color','id_product']);
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
		Schema::drop('de_colorproduct');
	}

}
