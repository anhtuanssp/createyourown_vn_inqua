{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('adminbody')
	<form class="form-signin" action="{{ url('quanly/checklogin') }}" method="post">
		{{-- FLASH MESSEAGE --}}
			@if(Session::has('success'))
			<div class="label label-warning">
				<strong>{{ Session::get('success') }}</strong>
			</div>
			<br>
			@endif
		{{-- FLASH MESSEAGE --}}       
      <h1 class="form-signin-heading">Vui lòng đăng nhập</h1>
      <input type="text" class="form-control" name="username" placeholder="Email Address" required="" autofocus="">
      <input type="password" class="form-control" name="password" placeholder="Password" required="">  
      {{ Form::token() }}   

      <button type="submit" class="btn btn-lg btn-primary btn-block" type="submit">Đăng nhập</button>   
    </form>
@stop
<style type="text/css" media="screen">
.form-signin {
		max-width: 280px;
		margin: 60px auto 10px;
}
.form-signin input[type="password"] {
	z-index: 2;
	margin-bottom: 20px;
	border-top: none;
	border-bottom: 1px solid #000;
	border-right: 1px solid #000;
	border-left: 1px solid #000;
	border-radius: 0px 0px 6px 6px;
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0px 1px 0px 0px rgba(255, 255, 255, 0.5);
}
.form-signin input[type="text"] {
	margin-bottom: -1px;
	border-top: 1px solid #000;
	border-right: 1px solid #000;
	border-left: 1px solid #000;
	border-radius: 6px 6px 0px 0px;
}
.form-signin .form-signin-heading {
	text-align: center;
	font-weight: bold;
	text-shadow: 0px 1px 2px #111;
	color: #000;
	margin-bottom: 20px;
}
</style>