<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTypeHinhOrder extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		DB::statement('ALTER TABLE de_orders MODIFY COLUMN hinhdein MEDIUMTEXT');
		DB::statement('ALTER TABLE de_orders MODIFY COLUMN hinhminhhoa MEDIUMTEXT');
		DB::statement('ALTER TABLE de_orders MODIFY COLUMN hinhdein_back MEDIUMTEXT');
		DB::statement('ALTER TABLE de_orders MODIFY COLUMN hinhminhhoa_back MEDIUMTEXT');

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
		DB::statement('ALTER TABLE de_orders MODIFY COLUMN hinhdein TEXT');
		DB::statement('ALTER TABLE de_orders MODIFY COLUMN hinhminhhoa TEXT');
		DB::statement('ALTER TABLE de_orders MODIFY COLUMN hinhdein_back TEXT');
		DB::statement('ALTER TABLE de_orders MODIFY COLUMN hinhminhhoa_back TEXT');
	}

}
