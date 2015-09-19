<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateManufacture extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('de_nhasanxuat', function(Blueprint $table){
			$table->increments('id');
			$table->integer('stt');
			//TITLE
			$table->string('ten_vi',255);
			$table->string('ten_en',255);
			$table->string('slug_vi',255);
			$table->string('slug_en',255);
			// MO TA
			$table->string('mota_vi',255);
			$table->string('mota_en',255);
			//HINH DAI DIEN
			$table->string('photo',150);
			$table->string('thumb',150);

			$table->string('website',100);
			$table->string('dienthoai',50);
			$table->string('email',50);

			//STATUS
			$table->tinyInteger('hienthi');
			//SEO
			$table->string('title_seo_vi',255);
			$table->string('title_seo_en',255);
			$table->string('desc_seo_vi',255);
			$table->string('desc_seo_en',255);
			$table->string('keyword_seo_vi',255);
			$table->string('keyword_seo_en',255);
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
		Schema::drop('de_nhasanxuat');
	}

}
