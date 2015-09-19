<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUpdateProductImageMask extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::table('de_product', function(Blueprint $table){
			$table->string('photo_mask',255);
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
		Schema::table('de_product', function(Blueprint $table){
			$table->drop('photo_mask');
		});
	}

}
