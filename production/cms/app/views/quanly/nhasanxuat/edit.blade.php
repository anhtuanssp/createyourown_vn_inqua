{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('title')
<title>ADMIN :: CHỈNH SỬA NSX</title>
@stop

@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/nsx') }}">Nhà sản xuất</a></li>
        <li class="active">{{ $nsx->ten_vi }}</li>
</ul>
@stop

@section('adminbody')
	<h3><i class="fa fa-edit fa-2x"></i> Edit Nhà sản xuất</h3>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}

	@if(!empty($nsx))
		<hr>
		{{-- EDIT FORM --}}
		{{ Form::open(array('url'=>'quanly/nsx/save', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
			{{--ID--}}
			<div class="form-group">
				{{ Form::label('id','ID',array('class'=>'col-sm-2')) }}
				<div class="col-sm-2">
					{{ Form::text('id',$nsx->id,
					array('class'=>'form-control','readonly')) }}
				</div>
			</div>
			{{--ID--}}

			<!-- TIMESTAMP -->
			<div class="form-group">
				<label class="col-sm-2">Created at</label>
				<label class="col-sm-10">{{ $nsx->created_at }}</label>
			</div>
			<div class="form-group">
				<label class="col-sm-2">Updated at</label>
				<label class="col-sm-10">{{ $nsx->updated_at }}</label>
			</div>
			<!-- TIMESTAMP -->
			
			{{--PANEL NOI DUNG--}}
			<div class="panel panel-default">
			  <div class="panel-heading">NỘI DUNG</div>
			  <div class="panel-body">

			  	{{--TEN--}}
				<div class="form-group">
					{{ Form::label('ten_vi','Tên nhà sản xuất',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('ten_vi',$nsx->ten_vi,
						array('class'=>'form-control')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('slug_vi','Slug',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('slug_vi',$nsx->slug_vi,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				{{--TEN--}}

				{{--HINH DAI DIEN--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($nsx->thumb) }}" class="img-responsive">
							 
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


				{{--STT--}}
				<div class="form-group">
					{{ Form::label('stt','Số thứ tự',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('stt',$nsx->stt,
						array('class'=>'form-control')) }}
					</div>
				</div>
				{{--STT--}}

				{{--MOTA--}}
				<div class="form-group">
					{{ Form::label('mota_vi','Mô tả nhà sản xuất',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::textarea('mota_vi',$nsx->mota_vi,
						array('class'=>'form-control')) }}
					</div>
				</div>
				{{--MOTA--}}

				{{--HIEN THI--}}
				<div class="form-group">
					{{ Form::label('hienthi','Hiển thị',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="hienthi" <?=(!isset($nsx->hienthi) || $nsx->hienthi==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

			  </div>
			</div>
			{{--PANEL NOI DUNG--}}

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
	@else
		Chưa có thông tin
	@endif

@stop



@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			$("input[name='hienthi']").bootstrapSwitch();
			$("input[name='noibat']").bootstrapSwitch();
		});
	</script>
@stop
