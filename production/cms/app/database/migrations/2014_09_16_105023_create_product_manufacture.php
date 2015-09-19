<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductManufacture extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_product_nhasanxuat', function(Blueprint $table)
		{
			$table->integer('id_product')->unsigned();
			$table->foreign('id_product')->references('id')->on('de_product');
			$table->integer('id_nhasanxuat')->unsigned();
			$table->foreign('id_nhasanxuat')->references('id')->on('de_nhasanxuat');
			$table->primary(array('id_product', 'id_nhasanxuat'));
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
		Schema::drop('de_product_nhasanxuat');
	}

}
