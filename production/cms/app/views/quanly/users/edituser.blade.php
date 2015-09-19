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
	<style type="text/css" media="screen">
		.loadding-permision,.loadding-add-permision{
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

	{{ Form::open(array('url'=>'quanly/users/saveUser', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
		<div class="form-group">
		    <label for="email" class="col-xs-2 control-label">Email</label>
		    <div class="col-xs-10">
		      <input type="email" name="email" class="form-control" id="email" value="<?php echo $item->email ?>" placeholder="Email" style="width:40%">
		    </div>
	  	</div>
	  	<div class="form-group">
		    <label for="first_name" class="col-xs-2 control-label">First Name</label>
		    <div class="col-xs-10">
		      <input type="text" name="first_name" class="form-control" id="first_name" value="<?php echo $item->first_name ?>" placeholder="First Name">
		    </div>
	  	</div>
	  	<div class="form-group">
		    <label for="last_name" class="col-xs-2 control-label">Last Name</label>
		    <div class="col-xs-10">
		      <input type="text" name="last_name" class="form-control" id="last_name" value="<?php echo $item->last_name ?>" placeholder="Last Name">
		    </div>
	  	</div>

	  	<div class="form-group">
		    <label for="activated" class="col-xs-2 control-label">Status Active</label>
		    <div class="col-xs-10">
		      <input type="checkbox" class="checkbox-switch" name="activated" <?php if ($item->activated == 1): ?>
		      	checked
		      <?php endif ?> >
		    </div>
	  	</div>



	  	<!-- CHI CO SUPPER USER MỚI ĐỔI PASSWORD ĐƯỢC -->

		  		<div class="form-group">
				    <label for="password" class="col-xs-2 control-label">Check vào đây nếu muốn thay đổi password</label>
				    <div class="col-xs-10">
				      <input type="checkbox" name="checkPass">
				    </div>
				</div>
			  	<div class="form-group">
				    <label for="cnewpassword" class="col-xs-2 control-label">Mật khẩu mới</label>
				    <div class="col-xs-10">
				      <input type="password" name="cnewpassword" class="form-control" id="cnewpassword" placeholder="Mật khẩu mới" >
				    </div>
			  	</div>
			  	<div class="form-group">
				    <label for="crnewpassword" class="col-xs-2 control-label">Xác Nhận Mật khẩu</label>
				    <div class="col-xs-10">
				      <input type="password" name="crnewpassword" class="form-control" id="crnewpassword" placeholder="Xác Nhận Mật khẩu" >
				    </div>
			  	</div>

	  	<!-- CHI CO SUPPER USER MỚI ĐỔI PASSWORD ĐƯỢC -->

	  	
	  	<div class="form-group">
		    <label for="group" class="col-xs-2 control-label">Group Phân Quyền</label>
		    <div class="col-xs-10">

				<select id="multigroup" class="multiselect" name="groups[]" multiple="multiple">
					<?php foreach ($groups as $key => $value): ?>
						<option value="<?php echo $value->id ?>"><?php echo  $value->name ?></option>	
					<?php endforeach ?>
				</select>
		    </div>
		    
	  	</div>


	  		<script>
	  			jQuery(document).ready(function($) {

		  			$('#multigroup').multiselect({
				    	nonSelectedText: 'Chưa chọn Group'
				    });
	  				<?php 
	  					foreach ($groupOfUser as $key => $value) {?>
	  						$('#multigroup').multiselect('select',<?php echo $value->id ?>)
	  				<?php
	  					}
	  				 ?>
					
	  			});	
			</script>


	  		<hr>
	  			<a href="#" class="collaspe-table-inherite" title=""><b>Quyền thừa kế từ group cha <i class="fa fa-sort-down"></i></b> </a>
	  			<br/><br>
	  	
	  			<table class="table table-bordered table-inherite-permission">
		  			<tr >
		  				<th style="text-align:center">Tên phân quyền</th>
		  				<th style="text-align:center">Trạng thái</th>
		  			</tr>
					<?php foreach ($merge_permissions as $key => $value): ?>
						<tr>
			  				<td><?php echo $key ?></td>
			  				<td>
				  				<span>
				  					<?php
				  						switch ($value) {
				  							case 1:
				  								# code...
				  								echo 'Cho phép ';
				  								break;
				  							case -1:
				  								# code...
				  								echo 'Không cho phép ';
				  								break;
				  						}
				  					?>
				  				</span>
			  				</td>
			  			</tr>
			  			
			  	<?php endforeach ?>
			  </table>
	  		<hr>
	  		<p><strong>Permissions : </strong></p> 
	  		<table class="table table-bordered">
	  			<tr >
	  				<th style="text-align:center">Tên phân quyền</th>
	  				<th style="text-align:center">Trạng thái</th>
	  				<th style="text-align:center"><i class="fa fa-edit"></i> Chỉnh sửa <i class="fa fa-spinner fa-spin loadding-permision"></i></th>
	  			</tr>
	  		<?php foreach ($permissions as $key => $value): ?>
	  		  	<tr>
	  				<td><?php echo $key ?></td>
	  				<td>
		  				<span>
		  					<?php
		  						switch ($value) {
		  							case 1:
		  								# code...
		  								echo 'Cho phép ';
		  								break;
		  							case -1:
		  								# code...
		  								echo 'Không cho phép ';
		  								break;
		  							case 0:
		  								# code...
		  								echo 'Thừa kế từ group cha ';
		  								break;
		  						}
		  					?>
		  				</span>
	  				</td>
	  				<td>
						<a href="#" class="edit_permission_ajax" data-id="<?php echo $item->id ?>" data-permissionvalue='1' data-permissionname="<?php echo $key ?>">Cho phép</a><br>
						<a href="#" class="edit_permission_ajax" data-id="<?php echo $item->id ?>" data-permissionvalue='-1' data-permissionname="<?php echo $key ?>">Không cho phép</a><br>
						<a href="#" class="edit_permission_ajax" data-id="<?php echo $item->id ?>" data-permissionvalue='0' data-permissionname="<?php echo $key ?>">Thừa hưởng</a>

	  				</td>
	  			</tr>
	  		<?php endforeach ?>
	  		</table>




		<hr>
		<input type="hidden" name="id" id="id" value="<?=@$item->id?>" />
		{{ Form::submit('Lưu',array('class'=>'btn btn-primary')) }}
		<hr>
	{{ Form::close() }}

  	<!-- ADD NEW PERMISION -->
  	<form method="post">
	  	<div class="panel panel-default">
		  <div class="panel-body add-permission-panel">
		  	<h4>Thêm quyền cho tài khoản</h4>
		  	<hr>
		   	<select name="select-permission-add" class="select-permission-add">
		   		<?php foreach ($merge_permissions as $key => $value): ?>
					<option value="<?php echo $key ?>"><?php echo $key ?></option>
		   		<?php endforeach; ?>
		   	</select>

		   	<input type="number" name="value_permission" class="value_permission" placeholder="1 : allow,-1 : deny">
		   	<button type="button" class="btnL btnL3 addUserPermission">Thêm</button>
		   	<i class="fa fa-spinner fa-spin loadding-add-permision"></i>
		  </div>
		</div>
  	</form>

	<!-- ADD NEW PERMISION -->

@stop
@section('script')
	@parent
	<script type="text/javascript">
		var consGroup = {
			editUserPremisionUrl : "{{ action('quanly\AdminUsersController@editUserPermission') }}",
			addPermissionForUser : "{{ action('quanly\AdminUsersController@adduspermission') }}"
		}
		jQuery(document).ready(function($) {

			$('.table-inherite-permission').css('display', 'none');

	  		$('.collaspe-table-inherite').click(function(event) {
				/* Act on the event */
				event.preventDefault();
				$('.table-inherite-permission').slideToggle(400)
			});

	  		$('#multigroup').multiselect({
				nonSelectedText: 'Chưa chọn Group'
			});

			$('.addUserPermission').click(function(event) {
				/* Act on the event */
				event.preventDefault();
				id = $('#id').val();
				permissionname = $('.select-permission-add').val();
				permissionvalue = $('.value_permission').val();
				
				$.ajax({
					url: consGroup.addPermissionForUser,
					type: 'POST',
					dataType: '',
					data: {act: 'ajax_addpermission',"id": id,'permissionname':permissionname,'permissionvalue':permissionvalue},
					beforeSend : function(){
						$('.loadding-add-permision').show(100);
					}
				})
				.done(function(datares) {
					datares = $.parseJSON(datares);
					// console.log(datares);

					if(datares.status == 1){
						alert(datares.msg);
						$('.loadding-add-permision').hide(100);

					}else if(datares.status == 0){
						alert(datares.msg);
						$('.loadding-add-permision').hide(100);
					}else if(datares.status == 3){
						alert(data.msg);
						$('.loadding-permision').hide(100);
					}
					console.log("success");
				})
				.fail(function() {
					alert('Có lỗi xãy ra, vui lòng thử lại');
					$('.loadding-add-permision').hide(100);
					console.log("error");
				})
				.always(function() {
					// $('.loadding-permision').hide(100);
					console.log("complete");
				});
			});

			$('.edit_permission_ajax').on('click', function(event) {
				event.preventDefault();
				/* Act on the event */
				id = $(this).data('id');
				permissionvalue = $(this).data('permissionvalue');
				permissionname = $(this).data('permissionname');
				data = {'id':id,"permissionvalue":permissionvalue,"permissionname":permissionname}
				$.ajax({
					url: consGroup.editUserPremisionUrl,
					type: 'POST',
					dataType: '',
					data: data,
					beforeSend : function(){
						$('.loadding-permision').show(100);
					}
				})
				.done(function(datares) {
					datares = $.parseJSON(datares);
					// console.log(datares);

					if(datares.status == 1){
						alert(datares.msg);
						$('.loadding-permision').hide(100);
					}else if(datares.status == 0){
						alert(datares.msg);
						$('.loadding-permision').hide(100);
					}else if(datares.status == 3){
						alert(data.msg);
						$('.loadding-permision').hide(100);
					}

				console.log("success");
			})
				.fail(function() {
					alert('Có lỗi xãy ra, vui lòng thử lại');
					$('.loadding-permision').hide(100);
					console.log("error");
				})
				.always(function() {
					// $('.loadding-permision').hide(100);
					console.log("complete");
				});
				
			});

		});
	</script>
	
@stop