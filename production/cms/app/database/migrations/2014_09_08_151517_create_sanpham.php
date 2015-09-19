<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSanpham extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
			//
		Schema::create('de_product', function(Blueprint $table){
			$table->increments('id');
			
			$table->tinyInteger('hienthi');
			$table->tinyInteger('is_new');
			$table->tinyInteger('is_variant');
			$table->tinyInteger('is_stock');

			$table->float('price');

			$table->tinyInteger('noibat');
			$table->tinyInteger('thietke');

			$table->integer('luotxem');
			$table->integer('solandathang');

			$table->string('ten_vi',255);
			$table->string('ten_en',255);

			$table->string('slug_vi',255);
			$table->string('slug_en',255);

			//NOI DUNG
			$table->text('noidung_vi');
			$table->text('noidung_en');

			//NOI DUNG
			$table->text('thongso_vi');
			$table->text('thongso_en');

			$table->string('photo',255);
			$table->string('thumb',255);

			$table->string('xuatxu',100);
			$table->string('baohanh',100);

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
		Schema::drop('de_product');
	}

}
