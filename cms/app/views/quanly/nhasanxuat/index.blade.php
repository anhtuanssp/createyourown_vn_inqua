{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/nsx') }}">Nhà sản xuất</a></li>
</ul>
@stop

@section('adminbody')
<h3>
	QUẢN LÝ NHÀ SẢN XUẤT
	<a href="#" class="btn btn-labeled btn-default" data-toggle="modal" data-target="#addNSX"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm nhà sản xuất</a>

</h3>
<hr>

{{-- SEARCH FORM --}}
<form class="navbar-form" action="{{ url('quanly/nsx') }}" method="get">
	<div class="input-group" >
		<input type="text" class="form-control" placeholder="Tìm kiếm" name="s" id="s" value="{{Input::get('s')}}">
		<div class="input-group-btn">
			<button class="btn btn-default btn-primary" type="submit"><i class="glyphicon glyphicon-search"></i></button>
		</div>
	</div>
</form>
{{-- END SEARCH FORM --}}
<hr>

{{-- FLASH MESSEAGE --}}
@if(Session::has('success'))
<div class="label label-warning">
	<strong>{{ Session::get('success') }}</strong>
</div>
<br>
@endif
{{-- FLASH MESSEAGE --}}

@if($nhasanxuats->count()>0)
<div class="table table-responsive">
	<table class="table table-bordered table-hover table-striped">
	<thead>
		<tr>
			<th>Id</th>
			<th>Tên</th>
			<th>Hình</th>
			<th>Hiển thị</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		@foreach($nhasanxuats as $v)
		<tr>
			<td><a href="{{ url('quanly/tintuc/edit/'.$v->id) }}" title="">{{{ $v->id }}}</a></td>
			<td><a href="{{ url('quanly/tintuc/edit/'.$v->id) }}" title="">{{ $v->ten_vi }}</a></td>
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
		<td style="width:200px">
			<a href="{{ url('quanly/nsx/edit/'.$v->id) }}" title="" class="btn btn-default">Chỉnh sửa</a>
			<form id="delte_tintuc" style="display:inline-block" action="{{ url('quanly/nsx/delete') }}" method="post">
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
{{ $nhasanxuats->appends(Input::except('page'))->links(); }}

<a href="#" class="btn btn-labeled btn-default" data-toggle="modal" data-target="#addNSX"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm nhà sản xuất</a>

@else
Chưa có thông tin
@endif
@stop

@include('quanly.nhasanxuat._partials.add')

@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			// $("input[name='hienthi']").bootstrapSwitch();
			// $("input[name='noibat']").bootstrapSwitch();
		});
	</script>
@stop


