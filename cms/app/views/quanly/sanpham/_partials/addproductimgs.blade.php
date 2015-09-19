<!-- Modal -->
<div class="modal fade" id="modaladdProductImgs" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="">THÊM HÌNH ẢNH</h4>
      </div>
      <div class="modal-body contentadd">

      </div>
    </div>
  </div>
</div>
@section('script')
  @parent
  <script>
      jQuery(document).ready(function($) {
        $('.popupaddproductimgs').click(function(event) {
          event.preventDefault();

          urlAjax = $(this).attr('href');
          $.ajax({
              url : '' + urlAjax,
              dataType: 'json',
          }).done(function (data) {
              $('.contentadd').html(data);
              $('#modaladdProductImgs').modal('toggle');
          }).fail(function () {
              alert('Posts could not be loaded.');
          });
        });
      });
  </script>
@stop