<!DOCTYPE html>
<html>
<head>
{{-- TITLE --}}
@section('head')
   @include('quanly.layouts.inc.meta')
@show

</head>

<body>
{{-- NAV --}}
  @include('quanly.layouts.inc.nav')
{{-- NAV --}}

<!-- CONTAINER FLUID -->
<div class="container-fluid wrapper">
    <div class="row info-profile">
      <div class="col-sm-12">
         <?php 
          if ( Sentry::check()):
            $user = Sentry::getUser();
          ?>
          <i class="fa fa-users"></i> <?php echo $user->email ?>
          || Last login at : <?php echo $user->last_login ?>
          <?php endif; ?>
      </div>
      <hr>
    </div>
    <div class="row">
      {{-- LEFT --}}
      <!-- @include('quanly.layouts.inc.leftside') -->
      {{-- LEFT --}}
      <div class="col-sm-12 main">
        @yield('breadcrumb')
        @yield('adminbody')
      </div>
    </div>
</div>
<hr>
<div class="clearfix"></div>

  <style type="text/css" media="screen">
    #footer {
  text-align: center;
  background-color: #2DBCF8;
  display: block;
  color: #ffffff;
  padding: 7px;
  position: absolute;
  left: 0;
  width: 100%
}
  </style>

  <div id="footer">
      TEAM DETROOPERS<br>
      CHUYÊN CUNG CẤP CÁC GIẢI PHÁP VỀ WEBSTIE - PHẦN MỀM<br>
      Điện thoại :0128 2577 477 (TUẤN) - 090 651 6735 (THUẬN) 
      <hr>
      Website : <a href="http://www.detroopers.com" title="" target="_blank">www.detroopers.com</a>   
  </div>


 <!-- END CONTAINER FLUID -->

@section('script')
  <script>
    $(document).on("click", ".confirm-delete-btn", function(e) {
      e.preventDefault();
      form = $(this).parent();
      bootbox.confirm("Bạn có chắc muốn xóa?", function(result) {
        if(result){
          form.submit();
        }

      }); 
    });
  </script>
@show

</body>


</html>