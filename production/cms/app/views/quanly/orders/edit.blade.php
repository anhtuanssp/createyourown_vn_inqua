{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('title')
<title>ADMIN :: XEM ĐƠN HÀNG</title>
@stop

@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/donhangs') }}">ĐƠN HÀNG</a></li>
        <li class="active">{{ $order->id }}</li>
</ul>
@stop

@section('adminbody')
	<h3><i class="fa fa-edit fa-2x"></i> ĐƠN HÀNG</h3>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}

	@if(!empty($order))
		<hr>
		{{-- EDIT FORM --}}
		{{ Form::open(array('url'=>'quanly/donhangs/save', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
			{{--ID--}}
			<div class="form-group">
				{{ Form::label('id','ID',array('class'=>'col-sm-2')) }}
				<div class="col-sm-2">
					{{ Form::text('id',$order->id,
					array('class'=>'form-control','readonly')) }}
				</div>
			</div>
			{{--ID--}}

			<!-- TIMESTAMP -->
			<div class="form-group">
				<label class="col-sm-2">ĐƠN HÀNG ĐƯỢC ĐẶT LÚC</label>
				<label class="col-sm-10">{{ $order->created_at }}</label>
			</div>
			<div class="form-group">
				<label class="col-sm-2">Updated at</label>
				<label class="col-sm-10">{{ $order->updated_at }}</label>
			</div>
			<!-- TIMESTAMP -->

			{{--CATEGORY--}}
			<div class="form-group">
				<label for="" class="col-sm-2">Trạng thái đơn hàng</label>
				<div class="col-sm-10">
					<select id="status" name="status" >

						<option value="0">Đã nhận đơn hàng</option>
						<option value="1">Đang xử lý đơn hàng</option>
						<option value="2">Đơn hàng được chuyển đi in</option>
						<option value="3">Đơn hàng đang trên đường giao hàng</option>
						<option value="4">Đơn hàng thành công</option>

					</select>
				</div>
			</div>
			{{--CATEGORY--}}
			
			{{--PANEL NOI DUNG--}}
			<div class="panel panel-default">
			  <div class="panel-heading">NỘI DUNG ĐƠN HÀNG</div>
			  <div class="panel-body">

			  	{{--TEN--}}
				<div class="form-group">
					{{ Form::label('tenkhachhang','Tên khách hàng',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('tenkhachhang',$order->tenkhachhang,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('email','Email',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('email',$order->email,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('phone','Phone',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('phone',$order->phone,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('soluong','Số lượng',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('soluong',$order->soluong,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('soluong','Số lượng',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('soluong',$order->soluong,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('phuongthucthanhtoan','Phương thức thanh toán',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('phuongthucthanhtoan',$order->phuongthucthanhtoan,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('orderNote','Ghi chú đơn hàng',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::textarea('orderNote',$order->orderNote,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('tennguoinhan','Tên người nhận',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('tennguoinhan',$order->tennguoinhan,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('diachinguoinhan','Địa chỉ người nhận',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('diachinguoinhan',$order->diachinguoinhan,
						array('class'=>'form-control')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('phone_nguoinhan','Số điện thoại người nhận',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('phone_nguoinhan',$order->phone_nguoinhan,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('bank_account','Số tài khoản',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('bank_account',$order->bank_account,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('bank_name','Tên ngân hàng',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('bank_name',$order->bank_name,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('noidung_bank','Nội dung chuyển tiền',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('noidung_bank',$order->noidung_bank,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				{{--TEN--}}

				{{--HINH DAI DIEN--}}
				<div class="form-group">
					{{ Form::label('order_thumbs','Hình order',array('class'=>'col-sm-2')) }}
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($order->thumb) }}" class="img-responsive" >
						</div>
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('order_thumbs','Hình order',array('class'=>'col-sm-2')) }}
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($order->hinhminhhoa_back) }}" class="img-responsive" >
						</div>
					</div>
				</div>
				{{--HINH DAI DIEN--}}


				{{--HINH DAI DIEN--}}
				<div class="form-group">
					{{ Form::label('hinhdein','Hinh đi in',array('class'=>'col-sm-2')) }}
					<div class="col-sm-6">

						<a href="{{ asset($order->hinhdein) }}" class="btn btn-primary"
							target="_blank" title="">DOWLOAD</a>

						@if($order->hasBack == 1)
							<a href="{{ asset($order->hinhdein_back) }}" class="btn btn-primary"
							target="_blank" title="">DOWLOAD MẶT SAU</a>
						@endif

						@if($order->hasLayerCircle == 1)
							<a href="{{ asset($order->hinhdein_layerBack) }}" class="btn btn-primary"
							target="_blank" title="">DOWLOAD LAYER MẶT PHẲNG</a>
						@endif


					</div>
				</div>
				{{--HINH DAI DIEN--}}

				<div class="form-group">
					{{ Form::label('is_sharing','Chia sẽ',array('class'=>'col-sm-2')) }}
					<div class="col-sm-2">
						
						<input type="checkbox" class="checkbox-switch" name="is_sharing" <?php if ($order->is_sharing == 1): ?>checked <?php endif ?> >
				
					</div>
				</div>

				<div class="form-group">
					{{ Form::label('status_sharing','Cho phép chia sẽ',array('class'=>'col-sm-2')) }}
					<div class="col-sm-2">
						<input type="checkbox"  name="status_sharing" <?php if ($order->status_sharing == 1): ?>checked <?php endif ?> >
				
					</div>
				</div>

			  </div>
			</div>
			{{--PANEL NOI DUNG--}}


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
		<hr>
	@else
		Chưa có thông tin
	@endif

@stop



@section('script')
	@parent
	<script>
		// $("select[name='status']").multiselect();
		$("select[name='status']").multiselect('select','<?php echo $order->status ?>')
		$("input[name='is_sharing']").bootstrapSwitch();
		$("input[name='status_sharing']").bootstrapSwitch();
	</script>
@stop
