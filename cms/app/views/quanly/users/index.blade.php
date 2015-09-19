{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/users') }}">Tài Khoản</a></li>
</ul>
@stop

@section('adminbody')
	<h3>
		QUẢN LÝ USER PHÂN QUYỀN
		<a href="{{ url('quanly/users/add') }}" class="btn btn-labeled btn-default"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm Tài Khoản</a>
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
	<h3><i class="fa fa-user fa-2x"></i> QUẢN LÝ TÀI KHOẢN</h3>
<a href="{{ url('quanly/users/facebook') }}" title="">User Facebook</a>
<table class="table table-hover table-striped table-bordered">
	<tr>
		<th>id</th>
		<th>Tên tài khoản</th>
		<th>Email</th>
		<th>Group</th>
		<th>Active</th>
		<th>Sửa</th>
		<th>Xóa</th>
	</tr>
	<tbody>
		<?php foreach ($items as $key => $value): ?>
			<tr>
				<td><?php echo $value->id ?></td>
				<td><?php echo $value->last_name.' '.$value->first_name ?></td>
				<td><?php echo $value->email ?></td>
				<td>
					<?php 
						$groups = json_decode($value->getGroups());
						// var_dump($groups);
						foreach ($groups as $k => $v) {
						 	echo '<span class="badge">'.$v->name.'</span> ';
						 } 
					?>
				</td>
				<td>
					<?php if ($value->activated): ?>
						<i class="fa fa-check-square-o fa-2x" style="color:#1ABC9C"></i>
					<?php else: ?>
						<i class="fa fa-check-square-o fa-2x" style="color:#e74c3c"></i>
					<?php endif; ?>
				</td>
				<td>
					<a href="{{ url('/quanly/users/edit/'.$value->id) }}"><i class="fa fa-edit fa-2x"></i></a>
				</td>
				<td><a href=""><i class="fa fa-trash-o fa-2x"></i></a></td>
			</tr>
		<?php endforeach ?>
	</tbody>

</table>

<button class="btn btn-primary"><i class="fa fa-user"></i> <a href="{{ url('/quanly/users/addAuto') }}" style="color:#fff">Thêm tài khoản</a> </button>
</a>

@stop

@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			// $("input[name='hienthi']").bootstrapSwitch();
			// $("input[name='noibat']").bootstrapSwitch();
        	

		});
	</script>
@stop


