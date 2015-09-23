<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMedia extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('de_media',function(Blueprint $table){
			$table->increments('id');
			$table->string('src',255);
			$table->string('thumb',255);
			$table->string('title_vi',255);
			$table->string('caption_vi',255);
			$table->string('description_vi',255);
			$table->string('alt_vi',255);
			$table->string('title_en',255);
			$table->string('caption_en',255);
			$table->string('description_en',255);
			$table->string('alt_en',255);
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
		//
		Schema::drop('de_media');
	}

}
