<?php
namespace Detr\Storage\Facebook;

interface FacebookTrackingRespository{
	public function all();
	public function paginateFacebookTracking($num);
	public function find($id);
	public function create($input);
	public function delete($id);
}