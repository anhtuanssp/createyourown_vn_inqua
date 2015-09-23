<?php
namespace Detr\Storage\Category;

interface CategoryRepository{
	public function all();
	public function paginateCategory($num);
	public function searchCategory($str,$numPagi);
	public function find($id);
	public function create($input);
	public function delete($id);
	public function getPathNode($id);
}