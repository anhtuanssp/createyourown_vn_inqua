{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/Media') }}">Quản lý Media</a></li>
</ul>
@stop

@section('adminbody')
	<h3>
		QUẢN LÝ MEDIA
		<a href="#" class="btn btn-labeled btn-default" data-toggle="modal" data-target="#addMedia"><span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Thêm Media</a>
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

	@if($medias->count()>0)
		<div class="table table-responsive">
			<table id="table-gioithieu" class="table table-bordered table-hover table-striped">
			<thead>
				<tr>
					<th>Id</th>
					<th>Title</th>
					<th>Hình</th>
					<td>Src </td>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				@foreach($medias as $v)
				<tr>
					<td><a href="{{ url('quanly/media/edit/'.$v->id) }}" title="">{{{ $v->id }}}</a></td>
					<td><a href="{{ url('quanly/media/edit/'.$v->id) }}" title="">{{ $v->title_vi }}</a></td>
					<td>
						<div class="thumbnail" >
							<img src="{{ asset($v->thumb) }}" style="width:50px" class="img-responsive">
						</div>
					</td>
					<td>{{ $v->src }}</td>
					
				<td style="width:200px">
					<a href="{{ url('quanly/media/edit/'.$v->id) }}" title="" class="btn btn-default">Chỉnh sửa</a>
					<form id="delte_tintuc" style="display:inline-block" action="{{ url('quanly/media/delete') }}" method="post">
						{{Form::token()}}
						<input type="hidden" name="id" value="{{ $v->id }}" />
						<a href="#" title="" class="btn btn-danger confirm-delete-btn"><i class="fa fa-trash-o"></i> Xóa</a>
					</form>
				</td>
			</tr>
			@endforeach
		</tbody>
		</table>
		{{ $medias->appends(Input::except('page'))->links(); }}
		</div>
	@else
		Chưa có bài viết nào!
	@endif
	@include('quanly.media.partical.upload')
@stop



@section('script')
	@parent
	
@stop