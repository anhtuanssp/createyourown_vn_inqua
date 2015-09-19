<?php
namespace Detr\Storage\Tintuc;

interface TintucRepository{
	public function all();
	public function paginateTintuc($num);
	public function searchTinTuc($str,$cate,$numPagi);
	public function find($id);
	public function create($input);
	public function delete($id);
	public function getTintucByCates($cateID,$numPagi);
}