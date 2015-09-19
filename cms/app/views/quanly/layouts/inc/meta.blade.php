<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
@section('title')
	<title>ADMIN :: QUẢN LÝ</title>
@show
<link rel="stylesheet" href="">

<!-- BOOTSTRAP -->
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
<!-- JQUERY -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>

<!-- dialog boxes -->
<script src="//cdn.jsdelivr.net/bootbox/4.2.0/bootbox.min.js" type="text/javascript"></script>

<!-- END BOOTSTAP -->

<!-- FONT ANSWOME -->
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

<!-- BOOTSTRAP MULTISELECT -->
<script type="text/javascript" src="{{ asset('bootstrap/bootstrap-multiselect/js/bootstrap-multiselect.js') }}"></script>
<link rel="stylesheet" href="{{ asset('bootstrap/bootstrap-multiselect/css/bootstrap-multiselect.css') }}" type="text/css"/>
<!-- END BOOTSTRAP MULTISELECT -->

<!-- BOOTSTRAP SWITCH -->
<link href="{{ asset('bootstrap/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css') }}" rel="stylesheet">
<script src="{{ asset('bootstrap/bootstrap-switch/js/bootstrap-switch.min.js') }}"></script>
<!-- END BOOTSTRAP SWITCH -->

<!-- BOOTSTRAP JANCY -->
<link href="{{ asset('bootstrap/jasny-bootstrap/css/jasny-bootstrap.min.css') }}" rel="stylesheet">
<script src="{{ asset('bootstrap/jasny-bootstrap/js/jasny-bootstrap.min.js') }}"></script>
<!-- END BOOTSTRAP JNACY -->

<!-- CUSTOM CSS -->
<link rel="stylesheet" href="{{asset('css/admin/style.css')}}">


{{--DATA TABLE--}}
<link rel="stylesheet" href="//cdn.datatables.net/1.10.2/css/jquery.dataTables.min.css">
<script src="//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js" type="text/javascript"></script>

{{--CKEDITOR--}}
<script type="text/javascript" src="{{asset('quanly_asset/js/ckeditor/ckeditor.js')}}"></script>


<script type="text/javascript">
	$(document).ready(function() {
	    // $('.multiselect').multiselect();
	});
	// $("[name='my-checkbox']").bootstrapSwitch();
</script>
