{{ Form::open(array('url'=>'serect/asset-media/storage', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
			
			{{--PANEL NOI DUNG--}}
			<div class="panel panel-default">
			  <div class="panel-body">

				{{--CATEGORY--}}
				<div class="form-group">
					<label for="" class="col-sm-2">Chuyên mục</label>
					<div class="col-sm-10">
						<select id="category" name="category[]" class="multiselect" multiple="multiple">
							@foreach($cate as $c)
							<option value="{{ $c['id'] }}">{{ $c['ten_vi'] }}</option>
							@endforeach
						</select>
					</div>
				</div>
				{{--CATEGORY--}}

				{{Form::file('files[]', array('multiple'=>true));}}
				<br/>
				{{Form::text("name")}}
				

			  </div>
			</div>
			{{--PANEL NOI DUNG--}}


			{{--BUTTON--}}
			<div class="form-group">
				<div class="col-sm-10 col-sm-offset-2">
					{{ Form::submit('Lưu',array('class'=>'btn btn-primary')) }}
					{{ Form::reset('Clear',array('class'=>'btn btn-default')) }}
				</div>
			</div>
			{{--BUTTON--}}

		{{ Form::close() }}
		{{-- END EDIT FORM --}}