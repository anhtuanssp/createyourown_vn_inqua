{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('title')
<title>ADMIN :: CHỈNH SỬA DANH MỤC SẢN PHẨM</title>
@stop

@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/dmsp') }}">Danh mục sản phẩm</a></li>
        <li class="active">{{ $cate->ten_vi }}</li>
</ul>
@stop

@section('adminbody')
	<h3><i class="fa fa-edit fa-2x"></i> CHỈNH SỬA DANH MỤC SẢN PHẨM</h3>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	<hr>
	{{-- EDIT FORM --}}
	{{ Form::open(array('url'=>'quanly/dmsp/save', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
		{{--PANEL NOI DUNG--}}
		<div class="panel panel-default">
		  <div class="panel-heading">NỘI DUNG DANH MỤC SẢN PHẨM</div>
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
				<!-- TIMESTAMP -->
				<div class="form-group">
					<label class="col-sm-2">Created at</label>
					<label class="col-sm-10">{{ $cate->created_at }}</label>
				</div>
				<div class="form-group">
					<label class="col-sm-2">Updated at</label>
					<label class="col-sm-10">{{ $cate->updated_at }}</label>
				</div>
				<!-- TIMESTAMP -->

				{{--SLUG--}}
				<div class="form-group">
					{{ Form::label('slug_vi','Slug',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('slug_vi',$cate->slug_vi,array('class'=>'form-control')) }}
					</div>
				</div>
				{{--SLUG--}}

				{{--HINH DAI DIEN--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($cate->thumb) }}" class="img-responsive">
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