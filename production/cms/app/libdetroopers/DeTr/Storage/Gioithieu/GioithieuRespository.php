<?php
namespace Detr\Storage\Gioithieu;

interface GioithieuRespository{
	public function all();
	public function paginateCategory($num);
	public function find($id);
	public function create($input);
	public function delete($id);
	public function softdelete($id);
	public function restoredelete($id);
}