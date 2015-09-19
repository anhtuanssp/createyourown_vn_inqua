{{-- EDIT FORM --}}
		{{ Form::open(array('url'=>'quanly/sanpham/storage', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
			
			{{--PANEL NOI DUNG--}}
			<div class="panel panel-default">
			  <div class="panel-heading">NỘI DUNG</div>
			  <div class="panel-body">

			  	{{--TEN--}}
				<div class="form-group">
					{{ Form::label('ten_vi','Tên sản phẩm',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('ten_vi','',array('class'=>'form-control')) }}
					</div>
				</div>
				{{--TEN--}}

				{{--xuatxu--}}
				<div class="form-group">
					{{ Form::label('xuatxu','Xuất xứ',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('xuatxu','',array('class'=>'form-control')) }}
					</div>
				</div>
				{{--xuatxu--}}

				{{--baohanh--}}
				<div class="form-group">
					{{ Form::label('baohanh','Bảo hành',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('baohanh','',array('class'=>'form-control')) }}
					</div>
				</div>
				{{--baohanh--}}

			  	{{--price--}}
				<div class="form-group">
					{{ Form::label('price','Gía sản phẩm',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('price','',array('class'=>'form-control')) }}
					</div>
				</div>
				{{--price--}}

				{{--HINH DAI DIEN--}}
				<div class="form-group">
					<div class="col-sm-2">
					<label>Hình sản phẩm</label> 
					</div>
					<div class="col-sm-10">
						<div class="fileinput fileinput-new" data-provides="fileinput">
						  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;"></div>
						  <div>
						    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="photo"></span>
						    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
						  </div>
						</div>
					</div>
				</div>
				{{--HINH DAI DIEN--}}

				{{--HINH MASK--}}
				<div class="form-group">
					<div class="col-sm-2">
					<label>Hình sản phẩm (MASK)</label> 
					</div>
					<div class="col-sm-10">
						<div class="fileinput fileinput-new" data-provides="fileinput">
						  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;"></div>
						  <div>
						    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="photo_mask"></span>
						    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
						  </div>
						</div>
					</div>
				</div>
				{{--HINH MASK--}}

				{{--CATEGORY--}}
				<div class="form-group">
					<label for="" class="col-sm-2">Danh mục sản phẩm</label>
					<div class="col-sm-10">
						<select id="category" name="category[]" class="multiselect" multiple="multiple">
							@foreach($cate as $c)
							<option value="{{ $c['id'] }}">{{ $c['ten_vi'] }}</option>
							@endforeach
						</select>
					</div>
				</div>
				{{--CATEGORY--}}
				

				{{--NOIDUNG--}}
				<div class="form-group">
					{{ Form::label('noidung_vi','Nội dung',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::textarea('noidung_vi','',
						array('class'=>'form-control','id'=>'noidung_vi')) }}
						<script language="javascript">CKEDITOR.replace('noidung_vi');</script>
					</div>
				</div>
				{{--NOIDUNG--}}

				{{--HIEN THI--}}
				<div class="form-group">
					{{ Form::label('hienthi','Hiển thị',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="hienthi" <?=(!isset($tintuc->hienthi) || $tintuc->hienthi==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

				{{--IS NEW--}}
				<div class="form-group">
					{{ Form::label('is_new','Sản phẩm mới',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="is_new" <?=(!isset($tintuc->is_new) || $tintuc->is_new==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

				{{--IS NEW--}}
				<div class="form-group">
					{{ Form::label('is_stock','Còn hàng hay  không?',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="is_stock" <?=(!isset($tintuc->is_stock) || $tintuc->is_stock==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

				{{--NOI BAT--}}
				<div class="form-group">
					{{ Form::label('noibat','Nổi bật',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="noibat" <?=(!isset($tintuc->noibat) || $tintuc->noibat==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--NOI BAT--}}

				{{--DISPLAY HOME--}}
				<div class="form-group">
					{{ Form::label('isDisplayHome','Hiển thị ngoài trang chủ',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isDisplayHome" <?=(!isset($tintuc->isDisplayHome) || $tintuc->isDisplayHome==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--DISPLAY HOME--}}

				{{--SẢN PHẨM CHO PHÉP THIẾT KẾ--}}
				<div class="form-group">
					{{ Form::label('isDesign','Cho phép thiết kế',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isDesign" <?=(!isset($tintuc->isDesign) || $tintuc->isDesign==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--SẢN PHẨM CHO PHÉP THIẾT KẾ--}}

				{{--is Case--}}
				<div class="form-group">
					{{ Form::label('isCase','Sản phẩm là Case? (Để Tool design phân biệt)',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isCase" <?=(!isset($tintuc->isCase) || $tintuc->isCase==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--is Case--}}
				{{--is Skin--}}
				<div class="form-group">
					{{ Form::label('isSkin','Sản phẩm là Skin? (Để Tool design phân biệt)',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isSkin" <?=(!isset($tintuc->isCase) || $tintuc->isSkin==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--is Skin--}}

				{{--is Skin--}}
				<div class="form-group">
					{{ Form::label('isBack','Sản phẩm có mặt sau không? (Để Tool design phân biệt)',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="is_back" <?=(!isset($tintuc->isCase) || $tintuc->isSkin==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--is Skin--}}

			  </div>
			</div>
			{{--PANEL NOI DUNG--}}

			{{--SEO--}}
			<div class="panel panel-default">
			  <div class="panel-heading">SEO</div>
			  <div class="panel-body">
				<div class="form-group">
					{{ Form::label('title_seo_vi','Title SEO',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('title_seo_vi','',
						array('class'=>'form-control','placeholder'=>'Title seo')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('desc_seo_vi','Description SEO',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('desc_seo_vi','',
						array('class'=>'form-control','placeholder'=>'Description seo')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('keyword_seo_vi','Keyword SEO',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('keyword_seo_vi','',array('class'=>'form-control','placeholder'=>'Keyword seo')) }}
					</div>
				</div>

			  </div>
			</div>
			{{--SEO--}}

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
		<hr>