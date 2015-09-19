{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/groups') }}">Group phân quyền</a></li>
</ul>
@stop

@section('adminbody')
	<h3>
		QUẢN LÝ GROUP PHÂN QUYỀN
		<a href="{{ url('quanly/quanly/add') }}" class="btn btn-labeled btn-default"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm GROUP</a>
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
	<h3><i class="fa fa-user fa-2x"></i> QUẢN LÝ GROUP</h3>

<table class="table table-hover table-snipped table-bordered">
	<thead>
		<tr>
			<th>ID</th>
			<th>Group Name</th>
			<th>Edit </th>
		</tr>
	</thead>
	<tbody>

		<?php foreach ($groups as $key => $value): ?>
		<tr>
			<td><?php echo $value->id ?></td>
			<td><?php echo $value->name ?></td>
			<td>{{ HTML::linkAction('quanly\AdminUsersController@groupEdit', 'Edit', array($value->id)) }}</td>
		</tr>
	<?php endforeach ?>

</tbody>
</table>

<button class="btn btn-primary"><i class="fa fa-user"></i> <a href="{{ url('/quanly/groups/addAuto')}}" style="color:#fff">Add new group</a>d</button>
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


