<?php


use Detr\Storage\Tintuc\EloquentTintucRepository as TintucRepo;
class ExampleTest extends TestCase {


	public function testTrue(){
		$tt = new TintucRepo;
		$t = $tt->find(1);
		$this->assertEquals('nga-sua-doi-hoc-thuyet-quan-su-de-doi-pho-nato', $t->slug_vi);
	}

}
