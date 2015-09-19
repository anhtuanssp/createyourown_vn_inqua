<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateColor extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_color', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('stt');
			//TITLE
			$table->string('ten_vi',255);
			$table->string('ten_en',255);
			$table->string('slug_vi',255);
			$table->string('slug_en',255);
		
			$table->string('hex',10);
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
		//
		Schema::drop('de_color');
	}

}
