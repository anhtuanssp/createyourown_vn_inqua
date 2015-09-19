{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('title')
<title>ADMIN :: CHỈNH SỬA CHUYÊN MỤC</title>
@stop

@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/chuyenmuc') }}">Chuyên mục - Categories</a></li>
        <li class="active">{{ $cate->ten_vi }}</li>
</ul>
@stop

@section('adminbody')
	<h3><i class="fa fa-edit fa-2x"></i> CHỈNH SỬA CHUYÊN MỤC</h3>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	<hr>
	{{-- EDIT FORM --}}
	{{ Form::open(array('url'=>'quanly/chuyenmuc/save', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
		{{--PANEL NOI DUNG--}}
		<div class="panel panel-default">
		  <div class="panel-heading">NỘI DUNG CHUYÊN MỤC</div>
		  <div class="panel-body">
		  		<input type="hidden" name="id" value="{{ $cate->id }}">
		  		{{--TEN--}}
				<div class="form-group">
					{{ Form::label('ten_vi','Tên tin tức',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('ten_vi',$cate->ten_vi,array('class'=>'form-control')) }}
					</div>
				</div>
				{{--TEN--}}

				{{--SLUG--}}
				<div class="form-group">
					{{ Form::label('slug_vi','Slug',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('slug_vi',$cate->slug_vi,array('class'=>'form-control')) }}
					</div>
				</div>
				{{--SLUG--}}

				{{--CATEGORY--}}
				<div class="form-group">
					<label for="" class="col-sm-2">Chuyên mục cha</label>
					<div class="col-sm-10">
						<select id="category" name="category" >
							<option value="0">Chuyên mục gốc</option>
							@foreach($catesArray as $c)
								<option value="{{ $c['id'] }}">{{ $c['ten_vi'] }}</option>
							@endforeach
						</select>
					</div>
				</div>
				{{--CATEGORY--}}

				{{--HIEN THI--}}
				<div class="form-group">
					{{ Form::label('hienthi','Hiển thị',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="hienthi" <?=(!isset($cate->hienthi) || $cate->hienthi==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

		  </div>
		</div>
		{{--PANEL NOI DUNG--}}

		{{--SEO--}}
		<div class="panel panel-default">
		  <div class="panel-heading">SEO</div>
		  <div class="panel-body">
			<div class="form-group">
				{{ Form::label('title_seo_vi','Title SEO',array('class'=>'col-sm-2')) }}
				<div class="col-sm-10">
					{{ Form::text('title_seo_vi',$cate->title_seo_vi,
					array('class'=>'form-control','placeholder'=>'Title seo')) }}
				</div>
			</div>
			<div class="form-group">
				{{ Form::label('desc_seo_vi','Description SEO',array('class'=>'col-sm-2')) }}
				<div class="col-sm-10">
					{{ Form::text('desc_seo_vi',$cate->desc_seo_vi,
					array('class'=>'form-control','placeholder'=>'Description seo')) }}
				</div>
			</div>
			<div class="form-group">
				{{ Form::label('keyword_seo_vi','Keyword SEO',array('class'=>'col-sm-2')) }}
				<div class="col-sm-10">
					{{ Form::text('keyword_seo_vi',$cate->keyword_seo_vi,array('class'=>'form-control','placeholder'=>'Keyword seo')) }}
				</div>
			</div>

		  </div>
		</div>
		{{--SEO--}}

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
@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			$("input[name='hienthi']").bootstrapSwitch();
			$("select[name='category']").multiselect();
			$('#category').multiselect('select','<?php echo $cate->parent ?>')
		});
	</script>
@stop