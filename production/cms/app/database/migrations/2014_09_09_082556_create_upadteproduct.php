<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUpadteproduct extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::table('de_product', function(Blueprint $table){
			$table->string('title_seo_vi',255);
			$table->string('title_seo_en',255);
			$table->string('desc_seo_vi',255);
			$table->string('desc_seo_en',255);
			$table->string('keyword_seo_vi',255);
			$table->string('keyword_seo_en',255);		
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
			$table->drop('title_seo_en');
			$table->drop('title_seo_vi');
			$table->drop('desc_seo_en');
			$table->drop('desc_seo_vi');
			$table->drop('keyword_seo_vi');
			$table->drop('keyword_seo_en');
		});
	}

}
