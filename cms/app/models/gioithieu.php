<?php 
/**
* 
*/
use Illuminate\Database\Eloquent\SoftDeletingTrait;
class Gioithieu extends Eloquent
{
	protected $table = 'de_gioithieu';
	protected $guarded = array('id');
	use SoftDeletingTrait;
    protected $dates = ['deleted_at'];
}