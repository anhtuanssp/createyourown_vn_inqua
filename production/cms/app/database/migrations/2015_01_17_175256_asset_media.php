<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AssetMedia extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		//
		Schema::create('de_assetmedia', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('stt');
			//ID CATEGORY
			$table->string('id_category',100)->default('0');
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
			//STATUS
			$table->tinyInteger('hienthi');
			$table->tinyInteger('noibat');
			$table->integer('luotxem');

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
		Schema::drop('de_assetmedia');
	}

}
