<div class="navbar navbar-inverse navbar-fixed-top nav-menu" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">CMS DETROOPERS.COM</a>
		</div>
		<div class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#">Dashboard</a></li>
				<li><a href="#">Tin tức</a></li>
				<li><a href="#">Profile</a></li>
				<li><a href="{{ action('quanly\DashboardController@logout') }}"><i class="fa fa-toggle-off"></i> Logout</a></li>
			</ul>
<!-- 		<form class="navbar-form navbar-right">
				<input type="text" class="form-control" placeholder="Search...">
			</form> -->
		</div>
	</div>
</div>
