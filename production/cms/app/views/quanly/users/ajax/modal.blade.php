<!-- Modal -->
<div class="modal fade" id="modalRouterCollection" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="">Chọn Router</h4>
      </div>
      <div class="modal-body contentadd" style="height:500px;overflow:auto">

      </div>
    </div>
  </div>
</div>
@section('script')
  @parent
  <script>
      jQuery(document).ready(function($) {
        var btnChon = null;
        var btnChonNhieu = null;

        $('.chosseRouter').click(function(event) {
          event.preventDefault();

          urlAjax = $(this).attr('href');
          $.ajax({
              url : '' + urlAjax,
              dataType: 'json',
              type: 'POST'
          }).done(function (data) {
              var dataEl = $(data);

              btnChon = dataEl.find('.btnChon');
              btnChonNhieu = dataEl.find('.multiPermisionButton');

              btnChon.click(clickChonEvent);
              btnChonNhieu.click(clickChonNhieuEvent);

              $('.contentadd').html(dataEl);

              $('#modalRouterCollection').modal('toggle');


          }).fail(function () {
              alert('Fail.');
          });

        });

        var clickChonEvent = function(event){
          var tr = $(this).parents('tr');
          var val = tr.find('td').eq(1).data('route');
          $('.name_permission').val(val)
          $('#modalRouterCollection').modal('hide');
        }
        var clickChonNhieuEvent = function(event){
          var checkbox = $('input[name="chonquyen"]:checked');
          var permission = '';
          $.each(checkbox, function(index, val) {
             permission = permission +$(val).val()+ ';';
          });
          $('.name_permission').val(permission)
          $('#modalRouterCollection').modal('hide');
          
        }



      });
  </script>
@stop