

<div class="table-responsive">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>
					<button type="button" class="btn btn-primary multiPermisionButton">Chọn nhiều</button> 
					Method
				</th>
				<th>

					Path
				</th>
				<th>Chọn</th>
			</tr>
		</thead>
		<tbody>
			@foreach ($routeCollection as $p)
				<tr>
					<td>
						<label>
							<input type="checkbox" name="chonquyen" value="{{$p->getPath()}}">
						</label>
						{{ $p->getMethods()[0] }}
					</td>
					<td data-route="{{ $p->getPath() }}">{{ $p->getPath() }} 
						{{-- <br/>({{ $p->getActionName() }}) --}}
					</td>
					<td>
						<button type="button " class="btn btn-primary btnChon">Chọn</button>
					</td>
				</tr>
			@endforeach
		</tbody>
	</table>
</div>


