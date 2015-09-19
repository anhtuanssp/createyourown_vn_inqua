<!-- Modal -->
<div class="modal fade" id="addMedia" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">THÊM MEDIA</h4>
      </div>
      <div class="modal-body">
            {{ Form::open(array('url'=>'quanly/media/storage', 'class'=>'form form-horizontal','id'=>'formaddmedia','enctype'=>"multipart/form-data")) }}
                {{--PANEL NOI DUNG--}}
                <div class="panel panel-default">
                  <div class="panel-heading">NỘI DUNG</div>
                  <div class="panel-body">
                    <div class="form-group">
                      {{ Form::label('title_vi','Tên Media',array('class'=>'col-sm-2')) }}
                      <div class="col-sm-10">
                        {{ Form::text('title_vi','',array('class'=>'form-control','placeholder'=>'Title')) }}
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
                      {{ Form::label('caption_vi','Caption',array('class'=>'col-sm-2')) }}
                      <div class="col-sm-10">
                        {{ Form::text('caption_vi','',array('class'=>'form-control','placeholder'=>'Caption')) }}
                      </div>
                    </div>
                              <div class="form-group">
                      {{ Form::label('alt_vi','Alternative',array('class'=>'col-sm-2')) }}
                      <div class="col-sm-10">
                        {{ Form::text('alt_vi','',array('class'=>'form-control','placeholder'=>'Alternative')) }}
                      </div>
                    </div>

                                  <div class="form-group">
                      {{ Form::label('description_vi','Description',array('class'=>'col-sm-2')) }}
                      <div class="col-sm-10">
                        {{ Form::text('description_vi','',array('class'=>'form-control','placeholder'=>'Description')) }}
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

        $('#formaddmedia').submit(function(event) {
          /* Act on the event */
          event.preventDefault();
          
          var form = document.getElementById('formaddmedia');
          var formdata = new FormData(form);
          var fileInput = document.getElementById('photo');
          var photo = fileInput.files[0];
          formdata.append('src',photo);
          var params = $(this).serializeArray();
          $.each(params, function (i, val) {
              formdata.append(val.name, val.value);
          });

          $.ajax({
            url: '{{ action('quanly\AdminMediaController@storage') }}' ,
            type: 'POST',
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data : formdata,
            beforeSend : function(){
              $('#formaddmedia').css({
                opacity: '0.5',
                'z-index': '-1'
              });
            }
          })
          .done(function(data) {
            console.log(data.status)
            if(data.status == '1'){
                alert('THÊM THÀNH CÔNG!')
                window.location = '{{ action('quanly\AdminMediaController@index') }}'
            }else if(data.status == '2'){
                alert('CÓ LỖI XẢY RA! VUI LÒNG THỬ LẠI')
                window.location = '{{ action('quanly\AdminMediaController@index') }}'
            }else if(data.status == '3'){
                alert('TOKEN INVALID')
                window.location = '{{ action('quanly\AdminMediaController@index') }}'
            }

          })
          .fail(function() {
              alert('THÊM MEDIA THẤT BẠI, REFESH ĐỂ THỬ LẠI')
              $('#formaddmedia').css({
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