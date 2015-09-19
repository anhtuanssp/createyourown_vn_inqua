
<!-- END MODAL -->
@if($productimgs->count()>0)
<div class="table-responsive">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Id</th>
				<th>Title</th>
				<th>Thumbs</th>
				<th>Caption</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			@foreach ($productimgs as $p)
			<tr>
				 	<td>{{ $p->id }}</td>
				 	<td>{{ $p->ten_vi }}</td>
				 	<td style="width:20%">
				 		<img src="/{{ $p->thumb }}" alt="" class="img-responsive">
				 	</td>
				 	<td>{{ $p->caption_vi }}</td>
				 	<td>
				 		<form class="form-delete-imgs" style="display:inline-block" action="{{ url('/quanly/productimgs/delete') }}" method="post">
							{{Form::token()}}
							<input type="hidden" name="id" value="{{ $p->id }}" />
							<input type="hidden" name="id_product" value="{{ $p->id_product }}" />
							<a href="#" title="" class="btn btn-danger confirm-delete-btn"><i class="fa fa-trash-o"></i> Xóa</a>
						</form>
				 	</td>
			</tr>
			@endforeach
		</tbody>
	</table>
</div>
@else
	Chưa có hình thêm
@endif
<div class="imgs-pag">
	{{ $productimgs->links() }}
</div>
