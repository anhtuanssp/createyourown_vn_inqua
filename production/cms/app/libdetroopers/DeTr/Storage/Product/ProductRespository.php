<?php
namespace Detr\Storage\Product;

interface ProductRepository{
	public function all();
	public function paginateProduct($num);
	public function searchProduct($str,$cate,$nsx,$numPagi);
	public function find($id);
	public function findIn($argId);
	public function create($input);
	public function delete($id);
	public function getProductsByCates($cateID,$numPagi);
	public function getRelateProductByProductID($productID);
}