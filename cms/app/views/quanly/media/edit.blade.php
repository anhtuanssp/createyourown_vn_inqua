{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/media') }}">Quản lý Media</a></li>
        <li>Chỉnh sửa media</li>
</ul>
@stop

@section('adminbody')
	<h3><i class="fa fa-edit fa-2x"></i> EDIT Media</h3>

	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}

	<hr>
	{{ Form::open(array('url'=>'quanly/media/save', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
				{{--ID--}}
			<div class="form-group">
				{{ Form::label('id','ID',array('class'=>'col-sm-2')) }}
				<div class="col-sm-2">
					{{ Form::text('id',$media->id,
					array('class'=>'form-control','readonly')) }}
				</div>
			</div>
			{{--ID--}}
		<div class="form-group">
			{{ Form::label('title_vi','Tên Media',array('class'=>'col-sm-2')) }}
			<div class="col-sm-10">
				{{ Form::text('title_vi',$media->title_vi,array('class'=>'form-control','placeholder'=>'Title')) }}
			</div>
		</div>

						{{--HINH DAI DIEN--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($media->thumb) }}" class="img-responsive">
							 
						</div>
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
					<!-- TIMESTAMP -->
			<div class="form-group">
				<label class="col-sm-2">Created at</label>
				<label class="col-sm-10">{{ $media->created_at }}</label>
			</div>
			<div class="form-group">
				<label class="col-sm-2">Updated at</label>
				<label class="col-sm-10">{{ $media->updated_at }}</label>
			</div>
			<!-- TIMESTAMP -->
					<div class="form-group">
			{{ Form::label('caption_vi','Caption',array('class'=>'col-sm-2')) }}
			<div class="col-sm-10">
				{{ Form::text('caption_vi',$media->caption_vi,array('class'=>'form-control','placeholder'=>'Caption')) }}
			</div>
		</div>
							<div class="form-group">
			{{ Form::label('alt_vi','Alternative',array('class'=>'col-sm-2')) }}
			<div class="col-sm-10">
				{{ Form::text('alt_vi',$media->alt_vi,array('class'=>'form-control','placeholder'=>'Alternative')) }}
			</div>
		</div>

									<div class="form-group">
			{{ Form::label('description_vi','Description',array('class'=>'col-sm-2')) }}
			<div class="col-sm-10">
				{{ Form::text('description_vi',$media->description_vi,array('class'=>'form-control','placeholder'=>'Description')) }}
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
	{{ Form::close() }}
	{{-- END EDIT FORM --}}
@stop