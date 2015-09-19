<?php
namespace Detr\Storage\ProductImgs;

interface ProductImgsRepository{
	public function all();
	public function paginateProductImgs($num);
	public function paginateFindProductImgsOfProduct($idProduct,$num);
	public function find($id);
	public function create($input);
	public function delete($id);
}