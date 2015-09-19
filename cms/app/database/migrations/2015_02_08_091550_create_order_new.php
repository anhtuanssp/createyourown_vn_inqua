<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderNew extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('de_orders', function(Blueprint $table){
			$table->increments('id');
			
			//thong tin khách hàng
			$table->string('tenkhachhang',150);
			$table->string('email',100);
			$table->string('phone',20);
			$table->string('orderNote',500);

			//Người nhận
			$table->string('tennguoinhan',150);
			$table->string('diachinguoinhan',150);
			$table->string('phone_nguoinhan',150);

			//Tài khoản
			$table->string('bank_account',100);
			$table->string('bank_name',100);
			$table->string('noidung_bank',100);

			$table->text('hinhdein');
			$table->text('hinhminhhoa');

			$table->tinyInteger('isCase')->default(1);
			$table->tinyInteger('isSkin');

			$table->integer('id_product');
			$table->integer('id_order');

			$table->tinyInteger('hang_dat_lai')->default(0);

			$table->tinyInteger('is_sharing')->default(0);

			$table->string('list_asset_imgs',255);
			$table->text('list_facebook_imgs');

			$table->string('phuongthucthanhtoan',255);
			$table->string('thumb',500);

			$table->integer('soluong');

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
		Schema::drop('de_orders');
	}

}
