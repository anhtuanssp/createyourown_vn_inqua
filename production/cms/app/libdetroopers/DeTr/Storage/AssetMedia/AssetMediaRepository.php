<?php
namespace Detr\Storage\AssetMedia;

interface AssetMediaRepository{
	public function all();
	public function paginateAssetMedia($num);
	public function paginateAssetMediaOrderByLuotXem($num);
	public function searchAssetMedia($str,$cate,$numPagi);
	public function find($id);
	public function create($input);
	public function delete($id);
	public function getAssetMediaByListID($aids);
	public function tangLuotXemChoAssetMedia($id);
	public function getAssetMediaByCateId($cateId,$numPagi);
}