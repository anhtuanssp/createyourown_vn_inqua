{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/donhangs') }}">Quản lý Orders</a></li>
</ul>
@stop

@section('adminbody')
	<h3>
		QUẢN LÝ ORDERS
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

	@if($orders->count()>0)
		<div class="table table-responsive">
			<table id="table-gioithieu" class="table table-bordered table-hover table-striped">
			<thead>
				<tr>
					<th>Id</th>
					<th>Sản phẩm</th>
					<th>Tên khách hàng</th>
					<th>Email</th>
					<th>Số phone</th>
					<th>Hình order</th>
					<th>Số lượng</th>
					<th>Trạng thái đơn hàng</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				@foreach($orders as $v)
				<tr class="{{genClassCssForOrderByStatus($v->status)}}">
					<td>
						<a href="{{ url('quanly/donhangs/view/'.$v->id) }}" title="">{{{ $v->id }}}</a>
					</td>
					<td><a href="{{ url('quanly/sanpham/edit/'.$v->id_product) }}" title="" target="_blank">Link</a></td>
					<td>
						<a href="{{ url('quanly/donhangs/view/'.$v->id) }}" title="">
							{{ $v->tenkhachhang }}
						</a>
					</td>
					<td>
						<a href="{{ url('quanly/donhangs/view/'.$v->id) }}" title="">
							{{ $v->email }}
						</a>
					</td>
					<td>
						<a href="{{ url('quanly/donhangs/view/'.$v->id) }}" title="">
							{{ $v->phone }}
						</a>
					</td>
					<td>
						<div class="thumbnail" >
							<img src="{{ asset($v->thumb) }}" style="width:30px" class="img-responsive">
						</div>
					</td>
					<td>
						<a href="{{ url('quanly/donhangs/view/'.$v->id) }}" title="">
							{{ $v->soluong }}
						</a>
					</td>
					<td>
						<a href="{{ url('quanly/donhangs/view/'.$v->id) }}" title="">
							{{ convertStatusOrder($v->status) }}
						</a>

					</td>
					<td>
						<a class="btn btn-danger" href="{{ url('quanly/donhangs/delete/'.$v->id) }}" title="">
							Delete
						</a>

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
			    	"order": [[ 0, "desc" ]]
			    });
			});
		});
	</script>
@stop