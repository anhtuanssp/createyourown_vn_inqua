{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"> <i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/users/facebook') }}">Tài Khoản Facebook</a></li>
</ul>
@stop

@section('adminbody')

	<hr>

	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}
	<h3><i class="fa fa-user fa-2x"></i> QUẢN LÝ TÀI KHOẢN FACEBOOK</h3>

	<div id="d3-chart">
		
	</div>

@stop

@section('script')
	@parent
	<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.13/d3.js"></script>
	<script>
		$(document).ready(function($) {
			// $("input[name='hienthi']").bootstrapSwitch();
			// $("input[name='noibat']").bootstrapSwitch();
        	$.ajax({
        		url: "{{ url('/quanly/users/getUserFacebook') }}",
        		type: 'POST',
        		dataType: 'json',
        		
        	})
        	.done(function(response) {
        		var fbU = [];
        		$.each(response, function(index, val) {
        			 var fb = {};
        			 fb.id = val.id;
        			 fb.created_at = val.created_at;

        			 var jsonMe = $.parseJSON(val.json_me);

        			 fb.name = jsonMe.name;
        			 fb.email = jsonMe.email;
        			 var jsonPic = $.parseJSON(val.json_picture);
        			 fb.avatar = jsonPic.data.url;

        			 fbU.push(fb);
        			 var html = '<div class="circle" style="display:inline-block; width:100px;vertical-align:top;margin-left:10px;    word-wrap: break-word;">'+
        			 	'<img src="'+jsonPic.data.url+'" alt="" style="width:100%">'+
        			 	'<p><a href="https://facebook.com/'+fb.id+'" title="">'+fb.name+'</a></p>'+
        			 	'<p><a href="https://facebook.com/'+fb.id+'" title="">'+fb.email+'</a></p>'
        			 	'<p><a href="https://facebook.com/'+fb.id+'" title="">'+fb.created_at+'</a></p>'
        			 '</div>';
        			  $('#d3-chart').append(html);

        		});
        		 console.log(fbU)

        		
			})	

		});
	</script>
@stop


