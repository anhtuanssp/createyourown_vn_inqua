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
	<style type="text/css" media="screen">
		.loadding-add-permision{
			display: none;
		}
	</style>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}
	<h3><i class="fa fa-user fa-2x"></i> CHỈNH SỬA </h3>

	{{-- START FROM --}}
	{{ Form::open(array('url'=>'quanly/groups/save', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}

		<div class="form-group">

		    <label for="name" class="col-xs-2 control-label">Group name</label>
		    <div class="col-xs-10">
		      <input type="text" name="name" 
		      	class="form-control" id="name" value="<?php echo $group->name ?>" name="name" placeholder="Group name" required <?php $redonly = ( (($group->id) == "1") || (($group->id) == "5")) ? 'readonly' : '' ;echo $redonly ?>>
	    	</div>

		</div>

		<div class="form-group">
		    <label for="create" class="col-xs-2 control-label">Create at</label>
		    <div class="col-xs-10">
		      <input type="text" name="create" class="form-control" id="create" value="<?php echo $group->created_at ?>" placeholder="Create at" readonly >
		    </div>
		</div>

		<div class="form-group">
		    <label for="updated" class="col-xs-2 control-label">Updated at</label>
		    <div class="col-xs-10">
		      <input type="text" name="updated" class="form-control" id="updated" value="<?php echo $group->updated_at ?>" placeholder="Create at" readonly >
		    </div>
		</div>
		<div class="form-group">
		    <label for="updated" class="col-xs-2 control-label">Action</label>
		    <div class="col-xs-10">
				{{ Form::submit('Lưu',array('class'=>'btn btn-primary')) }}
			</div>
		</div>
		
		{{Form::input('hidden', 'id', $group->id)}}
	{{ Form::close() }}


		 <!-- //ADD NEW PERMISION -->
		<div class="panel panel-default">
		  <div class="panel-body add-permission-panel">
		  	<h4>Permission Of Group</h4>
		  	<hr>
		  	<table class="table table-bordered">
		  		<thead>
		  			<tr>
		  				<th>Tên quyền</th>
		  				<th>Giá trị</th>
		  			</tr>
		  		</thead>
		  		<tbody>
		  			<?php foreach ($groupPermissions as $key => $value): ?>
		  				<tr>
		  					<td><?php echo $key ?></td>
		  					<td><span>
		  					<?php
		  						switch ($value) {
		  							case 1:
		  								# code...
		  								echo 'Cho phép ';
		  								break;
		  							case 0:
		  								# code...
		  								echo 'Không cho phép ';
		  								break;
		  						}
		  					?>
		  				</span></td>
		  				</tr>
		  			<?php endforeach ?>
		  		</tbody>
		  	</table>
		  </div>
		</div>
		<!-- //ADD NEW PERMISION -->

		<!-- //ADD NEW PERMISION -->
		<div class="panel panel-default">
		  <div class="panel-body add-permission-panel">
		  	<h4>Thêm quyền cho Group</h4>

		  	<hr>
		  	<?php

		  	 ?>

		  	<input type="text" name="name_permission" class="name_permission" value="" placeholder="module.controller.action" style="width:80%">
		  	<a href="{{ url('/quanly/groups/getListRoutes/') }}" class="chosseRouter"><i class="fa fa-plus-circle"></i></a>
		  		<hr>
		   	<input type="number" name="value_permission" class="value_permission" placeholder="1 : allow,0 : deny" value="1" >
		   		<hr>
		   	<button type="buttion" class="btn btn-primary addPermission">Thêm</button>
		   	<i class="fa fa-spinner fa-spin loadding-add-permision"></i>
		  </div>
		</div>

		<!-- //END  -->
		<input type="hidden" name="id" id="id" value="<?=@$group->id?>" />

	</form>
	@include('quanly.users.ajax.modal')
@stop

@section('script')
	@parent
	<script type="text/javascript">
		var consGroup = {
			addPremisionUrl : "{{ action('quanly\AdminUsersController@addPermission') }}"
		}
	</script>
	<script src="{{ asset('quanly_asset/js/app/group.js') }}"></script>
@stop

