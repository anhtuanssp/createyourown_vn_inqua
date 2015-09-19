<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateOrderAddHinhminhhoaback extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('de_orders', function(Blueprint $table){
			$table->text('hinhdein_back');
			$table->text('hinhminhhoa_back');
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
		Schema::table('de_orders', function(Blueprint $table){
			$table->drop('hinhdein_back');
			$table->drop('hinhminhhoa_back');
		});
	}

}
