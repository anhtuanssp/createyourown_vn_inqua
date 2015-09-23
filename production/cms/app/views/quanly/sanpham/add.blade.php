{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('title')
<title>ADMIN :: ADD SẢN PHẨM</title>
@stop

@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/sanpham') }}">Sản phẩm</a></li>
        <li class="active">Thêm mới</li>
</ul>
@stop

@section('adminbody')
	<h3><i class="fa fa-edit fa-2x"></i> THÊM MỚI SẢN PHẨM</h3>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}
	@include('quanly.sanpham._partials.formadd')
@stop



@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			$("input[name='hienthi']").bootstrapSwitch();
			$("input[name='noibat']").bootstrapSwitch();
			$("input[name='is_new']").bootstrapSwitch();
			$("input[name='is_back']").bootstrapSwitch();
			$("input[name='is_stock']").bootstrapSwitch();
			$("input[name='isDisplayHome']").bootstrapSwitch();
			$("input[name='isDesign']").bootstrapSwitch();
			$("input[name='isCase']").bootstrapSwitch();
			$("input[name='isSkin']").bootstrapSwitch();
			$('.multiselect').multiselect();
		});
	</script>
@stop
