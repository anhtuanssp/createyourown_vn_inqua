<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateOrderAddHasBack extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('de_orders', function(Blueprint $table){
			/*
			*SẢN PHẨM CÓ MẶT SAU HAY KHÔNG
			 */
			$table->tinyInteger('hasBack');
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
			$table->drop('hasBack');
		});
	}

}
