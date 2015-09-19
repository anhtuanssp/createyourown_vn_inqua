<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSanphamIsDesign extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::table('de_product', function(Blueprint $table){
			$table->tinyInteger('isDesign');
			$table->tinyInteger('isCase');
			$table->tinyInteger('isSkin');
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
			$table->drop('isDesign');
			$table->drop('isCase');
			$table->drop('isSkin');
		});
	}

}
