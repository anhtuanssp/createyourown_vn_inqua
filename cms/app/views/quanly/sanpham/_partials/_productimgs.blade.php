<!-- Modal -->
<div class="modal fade" id="modalProductImgs" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">HÌNH ẢNH THÊM CHO SẢN PHẨM</h4>
      </div>
      <div class="modal-body post">

      </div>
    </div>
  </div>
</div>
@section('script')
  @parent
  <script>
      jQuery(document).ready(function($) {
        $('.popupimgs').click(function(event) {
          event.preventDefault();
          urlAjax = $(this).attr('href');
          $.ajax({
              url : '' + urlAjax,
              dataType: 'json',
          }).done(function (data) {
              $('.post').html(data);
              $('#modalProductImgs').modal('show') 
          }).fail(function () {
              alert('Posts could not be loaded.');
          });
        });

        $(document).on('click', '.imgs-pag .pagination a', function (e) {
            getPosts($(this).attr('href'));
            e.preventDefault();
        });
      });

    function getPosts(urlA) {
        $.ajax({
            url : urlA,
            dataType: 'json',
            beforeSend: function(){
              $('#modalProductImgs').css({
                opacity: '0.7'
              });
            }
        }).done(function (data) {
              $('.post').html(data);
              $('#modalProductImgs').css({
                opacity: '1'
              });
              $('#modalProductImgs').modal('show') 
        }).fail(function () {
              alert('Posts could not be loaded.');
        });
    }

    jQuery(document).ready(function($) {
      $(document).on('submit', '.form-delete-imgs', function(event) {
        event.preventDefault();
        /* Act on the event */
          urlAjax = $(this).attr('action');
          data = $(this).serialize();
          $.ajax({
              url : '' + urlAjax,
              method : 'post',
              data : data,
              dataType: 'json',
          }).done(function (data) {
              $('.post').html('');
              $('.post').html(data);
              $('#modalProductImgs').modal('show') 
          }).fail(function () {
              alert('Posts could not be loaded.');
          });
  
      });

    });
  </script>
@stop