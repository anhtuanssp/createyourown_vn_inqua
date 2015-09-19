<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrderLayerCircle extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('de_orders', function(Blueprint $table){
			/*
			*SẢN PHẨM CÓ MẶT LAYER CIRCLE HAY K
			 */
			$table->tinyInteger('hasLayerCircle');
			$table->text('hinhdein_layerBack');
			$table->text('hinhminhhoa_layerBack');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('de_orders', function(Blueprint $table){
			$table->drop('hasLayerCircle');
			$table->drop('hinhdein_layerBack');
			$table->drop('hinhminhhoa_layerBack');
		});
	}

}
