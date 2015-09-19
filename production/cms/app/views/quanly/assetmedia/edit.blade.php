{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('title')
<title>ADMIN :: CHỈNH SỬA</title>
@stop

@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/assetmedia') }}">Asset media</a></li>
        <li class="active">{{ $asm->ten_vi }}</li>
</ul>
@stop

@section('adminbody')
	<h3><i class="fa fa-edit fa-2x"></i> EDIT</h3>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}

	@if(!empty($asm))
		<hr>
		{{-- EDIT FORM --}}
		{{ Form::open(array('url'=>'quanly/assetmedia/save', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
			{{--ID--}}
			<div class="form-group">
				{{ Form::label('id','ID',array('class'=>'col-sm-2')) }}
				<div class="col-sm-2">
					{{ Form::text('id',$asm->id,
					array('class'=>'form-control','readonly')) }}
				</div>
			</div>
			{{--ID--}}

			<!-- TIMESTAMP -->
			<div class="form-group">
				<label class="col-sm-2">Created at</label>
				<label class="col-sm-10">{{ $asm->created_at }}</label>
			</div>
			<div class="form-group">
				<label class="col-sm-2">Updated at</label>
				<label class="col-sm-10">{{ $asm->updated_at }}</label>
			</div>
			<!-- TIMESTAMP -->
			
			{{--PANEL NOI DUNG--}}
			<div class="panel panel-default">
			  <div class="panel-heading">NỘI DUNG</div>
			  <div class="panel-body">

			  	{{--TEN--}}
				<div class="form-group">
					{{ Form::label('ten_vi','Tên',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('ten_vi',$asm->ten_vi,
						array('class'=>'form-control')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('slug_vi','Slug',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('slug_vi',$asm->slug_vi,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				{{--TEN--}}

				{{--HINH DAI DIEN--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($asm->thumb) }}" class="img-responsive">
							 
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

				{{--CATEGORY--}}
				<div class="form-group">
					<label for="" class="col-sm-2">Chuyên mục</label>
					<div class="col-sm-10">
						<select id="category" name="category[]" class="multiselect" multiple="multiple">
							@foreach($cate as $c)
							<option value="{{ $c['id'] }}">{{ $c['ten_vi'] }}</option>
							@endforeach
						</select>
					</div>
				</div>
				{{--CATEGORY--}}

				{{--STT--}}
				<div class="form-group">
					{{ Form::label('stt','Số thứ tự',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('stt',$asm->stt,
						array('class'=>'form-control')) }}
					</div>
				</div>
				{{--STT--}}

				{{--LUOT XEM--}}
				<div class="form-group">
					{{ Form::label('luotxem','Lượt xem',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::input('number','luotxem',$asm->luotxem, array('class'=>'form-control'))  }}
					</div>
				</div>
				{{--LUOT XEM--}}

				{{--MOTA--}}
				<div class="form-group">
					{{ Form::label('mota_vi','Mô tả ',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::textarea('mota_vi',$asm->mota_vi,
						array('class'=>'form-control')) }}
					</div>
				</div>
				{{--MOTA--}}

				{{--HIEN THI--}}
				<div class="form-group">
					{{ Form::label('hienthi','Hiển thị',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="hienthi" <?=(!isset($asm->hienthi) || $asm->hienthi==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

				{{--NOI BAT--}}
				<div class="form-group">
					{{ Form::label('noibat','Nổi bật',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="noibat" <?=(!isset($asm->noibat) || $asm->noibat==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--NOI BAT--}}

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
			$('.multiselect').multiselect({
            	nonSelectedText: 'Chưa chọn Group'
        	});
        	<?php 
	            foreach ($cateoftintuc as $key => $value) {?>
	                $('#category').multiselect('select','<?php echo $value ?>')
	        <?php
	            }
	         ?>

		});
	</script>
@stop
