{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
</ul>
@stop

@section('adminbody')
<div style="margin:0 auto">
	<img src="{{asset('quanly_asset/img/denied.png')}}" alt="">
</div>

<hr>
<button class="btn btn-primary"><i class="fa fa-user fa-2x"></i> Sorry, bạn không có quyền truy cập action này..</button>



@stop


