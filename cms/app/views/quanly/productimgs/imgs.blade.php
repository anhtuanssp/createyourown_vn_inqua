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
				 		<img src="{{ $p->thumb }}" alt="" class="img-responsive">
				 	</td>
				 	<td>{{ $p->caption_vi }}</td>
				 	<td>
				 		EDIT DELLETE
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
