<p>Tên sản phẩm : {{ $product->ten_vi }}</p>
{{-- EDIT FORM --}}
		{{ Form::open(array('url'=>'/quanly/productimgs/storage', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
			
			{{--PANEL NOI DUNG--}}
			<div class="panel panel-default">
			  <div class="panel-heading">NỘI DUNG</div>
			  <div class="panel-body">

				{{--ID--}}
				<div class="form-group">
					{{ Form::label('id_product','ID Product',array('class'=>'col-sm-2')) }}
					<div class="col-sm-2">
						{{ Form::text('id_product',$product->id,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				{{--ID--}}

			  	{{--TEN--}}
				<div class="form-group">
					{{ Form::label('ten_vi','Tên hình ảnh',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('ten_vi','',array('class'=>'form-control')) }}
					</div>
				</div>
				{{--TEN--}}

			  	{{--TEN--}}
				<div class="form-group">
					{{ Form::label('caption_vi','Caption',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('caption_vi','',array('class'=>'form-control')) }}
					</div>
				</div>
				{{--TEN--}}

			  	{{--TEN--}}
				<div class="form-group">
					{{ Form::label('alt_vi','Alt',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('alt_vi','',array('class'=>'form-control')) }}
					</div>
				</div>
				{{--TEN--}}

				{{--HINH DAI DIEN--}}
				<div class="form-group">
					<div class="col-sm-2">
					<label>Chọn hình sản phẩm</label> 
					</div>
					<div class="col-sm-10">
						<div class="fileinput fileinput-new" data-provides="fileinput">
						  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;"></div>
						  <div>
						    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="photo"></span>
						    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
						  </div>
						</div>
					</div>
				</div>
				{{--HINH DAI DIEN--}}

			{{--BUTTON--}}
			<div class="form-group">
				<div class="col-sm-10 col-sm-offset-2">
					{{ Form::submit('Lưu',array('class'=>'btn btn-primary')) }}
					{{ Form::reset('Clear',array('class'=>'btn btn-default')) }}
				</div>
			</div>
			{{--BUTTON--}}

		{{ Form::close() }}
		{{-- END EDIT FORM --}}
		<hr>