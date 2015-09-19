<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDanhmucsanpham extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_danhmucsanpham', function($table){
			$table->increments('id');
			$table->integer('stt');
			$table->string('ten_vi',255);
			$table->string('ten_en',255);
			$table->string('slug_vi',255);
			$table->string('slug_en',255);
			$table->string('photo',255);
			$table->string('thumb',255);
			$table->integer('parent');
			$table->tinyInteger('hienthi');
			$table->string('title_seo_vi',255);
			$table->string('title_seo_en',255);
			$table->string('desc_seo_vi',255);
			$table->string('desc_seo_en',255);
			$table->string('keyword_seo_vi',255);
			$table->string('keyword_seo_en',255);
			$table->softDeletes();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('de_danhmucsanpham');
	}

}
