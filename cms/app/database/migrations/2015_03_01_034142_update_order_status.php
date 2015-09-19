<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateOrderStatus extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
		Schema::table('de_orders', function(Blueprint $table){
			/**
			 * status : 0 is default, order đã được nhận.
			 * status : 1 order đang xử lý.
			 * status : 2 order đang được chuyển đi in.
			 * status : 3 order đang trên đường đi giao hàng.
			 * status : 4 order thành công.
			 */
			$table->tinyInteger('status')->default(0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('de_orders', function(Blueprint $table){
			$table->drop('status');
		});
	}

}
