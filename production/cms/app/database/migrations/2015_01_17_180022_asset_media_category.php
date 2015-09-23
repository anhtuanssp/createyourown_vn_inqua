<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AssetMediaCategory extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_assetmedia_category', function(Blueprint $table)
		{
			$table->integer('id_assetmedia')->unsigned();
			$table->foreign('id_assetmedia')->references('id')->on('de_assetmedia');
			$table->integer('id_category')->unsigned();
			$table->foreign('id_category')->references('id')->on('de_category');
			$table->primary(array('id_assetmedia', 'id_category'));
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('de_assetmedia_category');
	}

}
