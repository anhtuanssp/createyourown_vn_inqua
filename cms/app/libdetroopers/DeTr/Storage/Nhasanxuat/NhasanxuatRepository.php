<?php 
/**
* 
*/
namespace Detr\Storage\Nhasanxuat;

interface NhasanxuatRepository
{
	public function all();
	public function paginateNhasanxuat($num);
	public function searchNhasanxuat($str,$numPagi);
	public function find($id);
	public function create($input);
	public function delete($id);
}