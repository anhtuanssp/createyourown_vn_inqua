{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/sanpham') }}">Sản phẩm</a></li>
</ul>
@stop

@section('adminbody')
<h3>
	QUẢN LÝ SẢN PHẨM
	<a href="{{ url('quanly/sanpham/add') }}" class="btn btn-labeled btn-default"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm sản phẩm</a>
</h3>
<hr>

{{-- SEARCH FORM --}}
<form class="navbar-form" action="{{ url('quanly/sanpham') }}" method="get">
	<div class="input-group">
		<select id="cm" name="cm" class="form-control" >
			<option value="0">Chọn chuyên mục</option>
			@foreach($categories as $c)
				<option value="{{ $c['id'] }}">{{ $c['ten_vi'] }}</option>
			@endforeach
		</select>
	</div>
	<div class="input-group">
		<select id="nsx" name="nsx" class="form-control" >
			<option value="0">Chọn nhà sản xuất</option>
			@foreach($nsx as $c)
				<option value="{{ $c->id }}">{{ $c->ten_vi }}</option>
			@endforeach
		</select>
	</div>
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

@if($products->count()>0)
<div class="table table-responsive">
	<table class="table table-bordered table-hover table-striped">
	<thead>
		<tr>
			<th>Id</th>
			<th>Tên bài viết</th>
			<th>Giá</th>
			<th>Hình</th>
			<th>Hình ảnh thêm</th>
			<th>Chuyên mục</th>
			<th>Nhà sản xuất</th>
			<th>Hiển thị</th>
			<th>Tin nổi bật</th>
			<th>Is Design</th>
			<th>Lượt xem</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		@foreach($products as $v)
		<tr>
			<td><a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="">{{{ $v->id }}}</a></td>
			<td><a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="">{{ $v->ten_vi }}</a></td>
			<td>{{ number_format($v->price) }} VND</td>
			<td>
				<div class="thumbnail" >
					<img src="{{ asset($v->thumb) }}" style="width:50px" class="img-responsive">
				</div>
			</td>
			<td>
				<a href="{{ url('/quanly/productimgs/sanpham/'.$v->id) }}" class="popupimgs" >{{ $v->productimages->count() }} <i class="fa fa-image"></i></a> 
				<a href="{{ url('/quanly/productimgs/add/'.$v->id) }}" class="popupaddproductimgs"><i class="fa fa-plus-circle"></i></a>
			</td>
			<td style="width:20%">
				
				@foreach($v->categories as $c)
					<a href="" target="_blank">{{{ $c->ten_vi }}}</a> - 
				@endforeach
			</td>
			<td>
                @foreach($v->nhasanxuats as $c)
               	 	<a href="" target="_blank">{{{ $c->ten_vi }}}</a> - 
                @endforeach
			</td>
			<td>
			@if($v->hienthi)
				<a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="">
					<i class="fa fa-check-circle" style="color:green"></i>
				</a>
			@else
				<a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="">
					<i class="fa fa-check-circle" style="color:red"></i>
				</a>
			@endif
			
		</td>
		<td>
			@if($v->noibat)
				<a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="">
					<i class="fa fa-check-circle" style="color:green"></i>
				</a>
			@else
				<a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="">
					<i class="fa fa-check-circle" style="color:red"></i>
				</a>
			@endif
			
		</td>

		<td>
			@if($v->isDesign)
				<a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="">
					<i class="fa fa-check-circle" style="color:green"></i>
				</a>
			@else
				<a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="">
					<i class="fa fa-check-circle" style="color:red"></i>
				</a>
			@endif
			
		</td>
		<td>
			<i class="fa fa-eye"></i> {{{ $v->luotxem }}} lượt
		</td>
		<td style="width:200px">
			<a href="{{ url('quanly/sanpham/edit/'.$v->id) }}" title="" class="btn btn-default">Chỉnh sửa</a>
			<form id="delte_tintuc" style="display:inline-block" action="{{ url('quanly/sanpham/delete') }}" method="post">
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
{{ $products->appends(Input::except('page'))->links(); }}

<a href="{{ url('quanly/sanpham/add') }}" class="btn btn-labeled btn-default"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm tin tức</a>

@include('quanly.sanpham._partials._productimgs')
@include('quanly.sanpham._partials.addproductimgs')

@else
Chưa có thông tin
@endif
@stop



@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			// $("input[name='hienthi']").bootstrapSwitch();
			// $("input[name='noibat']").bootstrapSwitch();
        	
			 $('#cm').multiselect('select',"{{Input::get('cm')}}");
			 $('#nsx').multiselect('select',"{{Input::get('nsx')}}")
		});
	</script>
@stop


