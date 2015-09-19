        <h1 class="page-header"> <i class="fa fa-dashboard fa-3x"></i> DASHBOARD</h1>
        <div class="row placeholders">

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa  fa-dot-circle-o fa-5x"></i>
              <h4>QUẢN LÝ GIỚI THIỆU WEBSITE</h4>
                <span class="text-muted">
                <a href="{{ action('quanly\AdminGioithieuController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa  fa-newspaper-o fa-5x"></i>
              <h4>QUẢN LÝ TIN TỨC</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminTinTucController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa fa-file-word-o fa-5x"></i>
              <h4>QUẢN LÝ CHUYÊN MỤC</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminChuyenmucController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa   fa-sitemap fa-5x"></i>
              <h4>QUẢN LÝ PHÂN QUYỀN</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminUsersController@index') }}" title="" class="btn btn-default">View now</a>
                <a href="{{ action('quanly\AdminUsersController@groups') }}" title="" class="btn btn-default">View group</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa  fa-list-alt fa-5x"></i>
              <h4>QUẢN LÝ DANH MỤC SẢN PHẨM</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminDanhmucsanphamController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa  fa-coffee fa-5x"></i>
              <h4>QUẢN LÝ SẢN PHẨM</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminSanphamController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa  fa-space-shuttle fa-5x"></i>
              <h4>QUẢN LÝ NHÀ SẢN XUẤT</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminNhasanxuatController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa fa-umbrella fa-5x"></i>
              <h4>CÂU HỎI THƯỜNG GẶP</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminChuyenmucController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa fa-file-image-o fa-5x"></i>
              <h4>MEDIA</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminMediaController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa fa-file-image-o fa-5x"></i>
              <h4>ASSET MEDIA</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminAssetMediaController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa fa-shopping-cart fa-5x"></i>
              <h4>QUẢN LÝ ORDER</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminOrdersController@index') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

          <div class="col-sm-3 placeholder">
            <div class="thumbnail">
              <i class="fa fa-shopping-cart fa-5x"></i>
              <h4>QUẢN LÝ TEMPLATE ORDER</h4>
              <span class="text-muted">
                <a href="{{ action('quanly\AdminOrdersController@templateOrder') }}" title="" class="btn btn-default">View now</a>
              </span>
            </div>
          </div>

        </div>