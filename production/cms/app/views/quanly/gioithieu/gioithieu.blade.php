{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/gioithieu') }}">Quản lý giới thiệu</a></li>
</ul>
@stop

@section('adminbody')
	<h3>
		QUẢN LÝ BÀI VIẾT GIỚI THIỆU
		<a href="{{ url('quanly/gioithieu/add') }}" class="btn btn-labeled btn-default"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm tin tức</a>
	</h3>
	<hr>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}

	@if($gioithieus->count()>0)
		<div class="table table-responsive">
			<table id="table-gioithieu" class="table table-bordered table-hover table-striped">
			<thead>
				<tr>
					<th>Id</th>
					<th>Tên bài viết</th>
					<th>Hình</th>
					<th>Hiển thị</th>
					<th>Tin nổi bật</th>
					<th>Lượt xem</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				@foreach($gioithieus as $v)
				<tr>
					<td><a href="{{ url('quanly/gioithieu/edit/'.$v->id) }}" title="">{{{ $v->id }}}</a></td>
					<td><a href="{{ url('quanly/gioithieu/edit/'.$v->id) }}" title="">{{ $v->ten_vi }}</a></td>
					<td>
						<div class="thumbnail" >
							<img src="{{ asset($v->thumb) }}" style="width:50px" class="img-responsive">
						</div>
					</td>
					<td>
					@if($v->hienthi)
						<a href="{{ url('quanly/tintuc/edit/'.$v->id) }}" title="">
							<i class="fa fa-check-circle" style="color:green"></i>
						</a>
					@else
						<a href="{{ url('quanly/tintuc/edit/'.$v->id) }}" title="">
							<i class="fa fa-check-circle" style="color:red"></i>
						</a>
					@endif
					
				</td>
				<td>
					@if($v->noibat)
						<a href="{{ url('quanly/gioithieu/edit/'.$v->id) }}" title="">
							<i class="fa fa-check-circle" style="color:green"></i>
						</a>
					@else
						<a href="{{ url('quanly/gioithieu/edit/'.$v->id) }}" title="">
							<i class="fa fa-check-circle" style="color:red"></i>
						</a>
					@endif
					
				</td>
				<td>
					<i class="fa fa-eye"></i> {{{ $v->luotxem }}} lượt
				</td>
				<td style="width:200px">
					<a href="{{ url('quanly/gioithieu/edit/'.$v->id) }}" title="" class="btn btn-default">Chỉnh sửa</a>
					<form id="delte_tintuc" style="display:inline-block" action="{{ url('quanly/gioithieu/delete') }}" method="post">
						{{Form::token()}}
						<input type="hidden" name="id" value="{{ $v->id }}" />
						<a href="#" title="" class="btn btn-danger confirm-delete-btn"><i class="fa fa-trash-o"></i> Xóa</a>
					</form>
				</td>
			</tr>
			@endforeach
		</tbody>
		</table>
		</div>
	@else
		Chưa có bài viết nào!
	@endif
@stop

@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			$(document).ready(function(){
			    $('#table-gioithieu').dataTable({
			    	// empty sort
			    	
			    });
			});
		});
	</script>
@stop