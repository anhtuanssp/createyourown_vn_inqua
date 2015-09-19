<?php
namespace Detr\Storage\Media;

interface MediaRepository{
	public function all();
	public function paginateMedia($num);
	public function searchMedia($str,$numPagi);
	public function find($id);
	public function create($input);
	public function delete($id);
}