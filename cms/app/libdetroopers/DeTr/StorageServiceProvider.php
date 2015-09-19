<?php 
// anhtuan.ssp@gmail.com
//9/9/2014
namespace Detr\Storage;
 
use Illuminate\Support\ServiceProvider;
 
class StorageServiceProvider extends ServiceProvider {
 
  public function register()
  {
    $this->app->bind(
      'Detr\Storage\TinTuc\TintucRepository',
      'Detr\Storage\Category\CategoryRepository',
      'Detr\Storage\Gioithieu\GioithieuRepository',
      'Detr\Storage\Danhmucsanpham\DanhmucsanphamRepository',
      'Detr\Storage\TinTuc\EloquentTintucRepository',
      'Detr\Storage\Category\EloquentCategoryRepository',
      'Detr\Storage\Gioithieu\EloquentGioithieuRepository',
      'Detr\Storage\Danhmucsanpham\EloquentDanhmucsanphamRepository',
      // MEDIA
      'Detr\Storage\Media\MediaRepository',
      'Detr\Storage\Media\EloquentMediaRepository',
      // PRODUCT
      'Detr\Storage\Product\ProductRepository',
      'Detr\Storage\Product\EloquentProductRepository',
      //NHA SAN XUAT
      'Detr\Storage\Nhasanxuat\NhasanxuatRepository',
      'Detr\Storage\Nhasanxuat\EloquentNhasanxuatRepository',
      //PRODUCT IMGS
      'Detr\Storage\ProductImgs\ProductImgsRepository',
      'Detr\Storage\ProductImgs\EloquentProductImgsRepository',
      /**
       * Assetmedia
       */
      'Detr\Storage\AssetMedia\AssetMediaRepository',
      'Detr\Storage\AssetMedia\EloquentAssetMediaRepository',
      /**
       * Orders
       */
      'Detr\Storage\Orders\OrdersRepository',
      'Detr\Storage\Orders\EloquentOrdersRepository',

      // FACEBOOK TRACKING
      'Detr\Storage\Facebook\FacebookTrackingRespository',
      'Detr\Storage\Facebook\EloquenFacebookTrackingRespository'
    );
  }
 
}