{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

@section('title')
<title>ADMIN :: QUẢN LÝ CHUYÊN MỤC - CATEGORIES</title>
@stop

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/tintuc') }}">Category - Chuyên mục</a></li>
</ul>
@stop

@section('adminbody')
	<?php //var_dump($cates) ?>
<h3>
	QUẢN LÝ CHUYÊN MỤC
	<a href="{{ url('quanly/chuyenmuc/add') }}" class="btn btn-labeled btn-default"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm chuyên mục</a>

</h3>
<hr>
	@if(!empty($cates))
		<div class="table table-responsive">
			<table id="table-chuyenmuc" class="table  table-hover table-borderd">
				<thead>
					<tr>
						<th>ID</th>
						<th>Tên chuyên mục</th>
						<th>Hiển thị</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					@foreach($cates as $cate)
					<tr>
						<td>{{ $cate['id'] }}</td>
						<td>{{ $cate['ten_vi'] }}</td>
						<td>
							@if($cate['hienthi'])
								<a href="{{ url('quanly/chuyenmuc/edit/'.$cate['id']) }}" title="">
									<i class="fa fa-check-circle" style="color:green"></i>
								</a>
							@else
								<a href="{{ url('quanly/chuyenmuc/edit/'.$cate['id']) }}" title="">
									<i class="fa fa-check-circle" style="color:red"></i>
								</a>
							@endif
						</td>
						<td>
							<a href="{{ url('quanly/chuyenmuc/edit/'.$cate['id']) }}" class="btn btn-labeled btn-default">
								<span class="btn-label">
									<i class="glyphicon glyphicon-pencil"></i>
								</span>Chỉnh sửa
							</a>
							<form id="delte_tintuc" style="display:inline-block" action="{{ url('quanly/chuyenmuc/delete') }}" method="post">
								{{Form::token()}}
								<input type="hidden" name="id" value="{{ $cate['id'] }}" />
								<a href="#" title="" class="btn btn-danger confirm-delete-btn"><i class="fa fa-trash-o"></i> Xóa</a>
							</form>
						</td>
					</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	@else
		<h5>Chưa có chuyên mục nào</h5>
	@endif
@stop
@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			$(document).ready(function(){
			    $('#table-chuyenmuc').dataTable({
			    	// empty sort
			    	"aaSorting": []
			    });
			});
		});
	</script>
@stop