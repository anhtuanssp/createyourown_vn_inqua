<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSanphamIsDisplayHome extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('de_product', function(Blueprint $table){
			$table->tinyInteger('isDisplayHome');
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
			$table->drop('isDisplayHome');
		});
	}

}
