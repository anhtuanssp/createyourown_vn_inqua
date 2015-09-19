<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTintucCategory extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_tintuc_category', function(Blueprint $table)
		{
			$table->integer('id_tintuc')->unsigned();
			$table->foreign('id_tintuc')->references('id')->on('de_tintuc');
			$table->integer('id_category')->unsigned();
			$table->foreign('id_category')->references('id')->on('de_category');
			$table->primary(array('id_tintuc', 'id_category'));
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('de_tintuc_category');
	}

}
