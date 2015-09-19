<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGioithieu extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_gioithieu', function(Blueprint $table)
		{
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
			//NOI DUNG
			$table->text('noidung_vi');
			$table->text('noidung_en');
			//HINH DAI DIEN
			$table->string('photo',150);
			$table->string('thumb',150);
			//STATUS
			$table->tinyInteger('hienthi');
			$table->tinyInteger('noibat');
			$table->integer('luotxem');
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
		Schema::drop('de_gioithieu');
	}

}
