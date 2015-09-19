<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductCate extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_product_category', function(Blueprint $table)
		{
			$table->integer('id_product')->unsigned();
			$table->foreign('id_product')->references('id')->on('de_product');
			$table->integer('id_category')->unsigned();
			$table->foreign('id_category')->references('id')->on('de_danhmucsanpham');
			$table->primary(array('id_product', 'id_category'));
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
		Schema::drop('de_product_category');
	}

}
