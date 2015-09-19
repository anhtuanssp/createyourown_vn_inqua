<!-- Modal -->
<div class="modal fade" id="addNSX" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">THÊM NHÀ SẢN XUẤT</h4>
      </div>
      <div class="modal-body">
            {{ Form::open(array('url'=>'quanly/nsx/storage', 'class'=>'form form-horizontal','id'=>'formaddnsx','enctype'=>"multipart/form-data")) }}
                {{--PANEL NOI DUNG--}}
                <div class="panel panel-default">
                  <div class="panel-heading">NỘI DUNG</div>
                  <div class="panel-body">
                    <div class="form-group">
                      {{ Form::label('ten_vi','Tên nhà sản xuất',array('class'=>'col-sm-2')) }}
                      <div class="col-sm-10">
                        {{ Form::text('ten_vi','',array('class'=>'form-control','placeholder'=>'Tên nhà sản xuất')) }}
                      </div>
                    </div>
                    {{--HINH DAI DIEN--}}
                    <div class="form-group">
                      <div class="col-sm-2">
                        {{ Form::label('photo','Image',array('class'=>'col-sm-2')) }}
                      </div>
                      <div class="col-sm-10">
                        <div class="fileinput fileinput-new" data-provides="fileinput">
                          <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;"></div>
                          <div>
                            <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="photo" id="photo"></span>
                            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {{--HINH DAI DIEN--}}

                    <div class="form-group">
                      {{ Form::label('mota_vi','Mô tả',array('class'=>'col-sm-2')) }}
                      <div class="col-sm-10">
                        {{ Form::text('mota_vi','',array('class'=>'form-control','placeholder'=>'Mô tả')) }}
                      </div>
                    </div>
                    

                    {{--BUTTON--}}
                      <div class="form-group">
                        <div class="col-sm-10 col-sm-offset-2">
                          {{ Form::submit('Lưu',array('class'=>'btn btn-primary')) }}
                          {{ Form::reset('Clear',array('class'=>'btn btn-default')) }}
                        </div>
                      </div>
                      {{--BUTTON--}}

                  </div>
                </div>
            {{ Form::close() }}
      </div>
    </div>
  </div>
</div>
@section('script')
  @parent
  <script>
      jQuery(document).ready(function($) {

        $('#formaddnsx').submit(function(event) {
          /* Act on the event */
          event.preventDefault();
          
          var form = document.getElementById('formaddnsx');
          var formdata = new FormData(form);
          var fileInput = document.getElementById('photo');
          var photo = fileInput.files[0];
          formdata.append('photo',photo);
          var params = $(this).serializeArray();
          $.each(params, function (i, val) {
              formdata.append(val.name, val.value);
          });

          $.ajax({
            url: '{{ action('quanly\AdminNhasanxuatController@storage') }}' ,
            type: 'POST',
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data : formdata,
            beforeSend : function(){
              $('#formaddnsx').css({
                opacity: '0.5',
                'z-index': '-1'
              });
            }
          })
          .done(function(data) {
            console.log(data.status)
            if(data.status == '1'){
                alert('THÊM THÀNH CÔNG!')
                window.location = '{{ action('quanly\AdminNhasanxuatController@index') }}'
            }else if(data.status == '3'){
                alert('CÓ LỖI XẢY RA! VUI LÒNG THỬ LẠI')
                window.location = '{{ action('quanly\AdminNhasanxuatController@index') }}'
            }else if(data.status == '2'){
                alert('TOKEN INVALID')
                window.location = '{{ action('quanly\AdminNhasanxuatController@index') }}'
            }

          })
          .fail(function() {
              alert('THÊM NHÀ SẢN XUẤT THẤT BẠI, REFESH ĐỂ THỬ LẠI')
              $('#formaddnsx').css({
                opacity: 1,
                'z-index': ''
              });
          })
          .always(function() {
            // console.log("complete");
          });
          

        });
      });
  </script>
@stop