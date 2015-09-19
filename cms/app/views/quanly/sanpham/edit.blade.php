{{-- EXTENDS MAIN --}}
@extends('quanly.layouts.main')

{{-- THỪA KẾ TỪ MAIN --}}
@section('title')
<title>ADMIN :: CHỈNH SỬA SẢN PHẨM</title>
@stop

@section('breadcrumb')
<ul class="breadcrumb">
        <li><a href="{{ url('/quanly') }}"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="{{ url('/quanly/sanpham') }}">Sản Phẩm</a></li>
        <li class="active">{{ $product->ten_vi }}</li>
</ul>
@stop

@section('adminbody')
	<h3><i class="fa fa-edit fa-2x"></i> EDIT SẢN PHẨM</h3>
	{{-- FLASH MESSEAGE --}}
	@if(Session::has('success'))
	<div class="label label-warning">
		<strong>{{ Session::get('success') }}</strong>
	</div>
	<br>
	@endif
	{{-- FLASH MESSEAGE --}}

	@if(!empty($product))
		<hr>
		{{-- EDIT FORM --}}
		{{ Form::open(array('url'=>'quanly/sanpham/save', 'class'=>'form form-horizontal','enctype'=>"multipart/form-data")) }}
			{{--ID--}}
			<div class="form-group">
				{{ Form::label('id','ID',array('class'=>'col-sm-2')) }}
				<div class="col-sm-2">
					{{ Form::text('id',$product->id,
					array('class'=>'form-control','readonly')) }}
				</div>
			</div>
			{{--ID--}}

			<!-- TIMESTAMP -->
			<div class="form-group">
				<label class="col-sm-2">Created at</label>
				<label class="col-sm-10">{{ $product->created_at }}</label>
			</div>
			<div class="form-group">
				<label class="col-sm-2">Updated at</label>
				<label class="col-sm-10">{{ $product->updated_at }}</label>
			</div>
			<!-- TIMESTAMP -->
			
			{{--PANEL NOI DUNG--}}
			<div class="panel panel-default">
			  <div class="panel-heading">NỘI DUNG</div>
			  <div class="panel-body">

			  	{{--TEN--}}
				<div class="form-group">
					{{ Form::label('ten_vi','Tên sản phẩm',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('ten_vi',$product->ten_vi,
						array('class'=>'form-control')) }}
					</div>
				</div>

				{{--price--}}
				<div class="form-group">
					{{ Form::label('price','Gía sản phẩm',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('price',$product->price,array('class'=>'form-control')) }}
					</div>
				</div>
				{{--price--}}
				<div class="form-group">
					{{ Form::label('slug_vi','Slug',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('slug_vi',$product->slug_vi,
						array('class'=>'form-control','readonly')) }}
					</div>
				</div>
				{{--TEN--}}

				<div class="form-group">
					{{ Form::label('baohanh','Bảo Hành',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('baohanh',$product->baohanh,
						array('class'=>'form-control',)) }}
					</div>
				</div>
				{{--TEN--}}

				{{--HINH DAI DIEN--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($product->thumb) }}" class="img-responsive">
							 
						</div>
					</div>
					<div class="col-sm-10">
						<label for="" class="col-sm-12">Hình sản phẩm</label>
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
						<div class="thumbnail">
							<img src="{{ asset($product->photo_mask) }}" class="img-responsive">
							 
						</div>
					</div>
					<div class="col-sm-10">
						<label for="" class="col-sm-12">Hình sản phẩm (Mask)</label>
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

				{{--HINH MAT SAIU--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($product->photo_back) }}" class="img-responsive">
							 
						</div>
					</div>
					<div class="col-sm-10">
						<label for="" class="col-sm-12">Hình mặt sau</label>
						<div class="fileinput fileinput-new" data-provides="fileinput">
						  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;"></div>
						  <div>
						    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="photo_back"></span>
						    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
						  </div>
						</div>
					</div>
				</div>
				{{--HINH MASK--}}

				{{--HINH MAT SAIU MASK--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($product->photo_back_mask) }}" class="img-responsive">
							 
						</div>
					</div>
					<div class="col-sm-10">
						<label for="" class="col-sm-12">Hình mặt sau (mask)</label>
						<div class="fileinput fileinput-new" data-provides="fileinput">
						  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;"></div>
						  <div>
						    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="photo_back_mask"></span>
						    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
						  </div>
						</div>
					</div>
				</div>
				{{--HINH MASK--}}

				{{--HINH LAYER CIRCLE--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($product->photo_circle) }}" class="img-responsive">
							 
						</div>
					</div>
					<div class="col-sm-10">
						<label for="" class="col-sm-12">Hình layer cirlce</label>
						<div class="fileinput fileinput-new" data-provides="fileinput">
						  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;"></div>
						  <div>
						    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="photo_circle"></span>
						    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
						  </div>
						</div>
					</div>
				</div>
				{{--HINH LAYER CIRCLE--}}

				{{--HINH LAYER CIRCLE MASK--}}
				<div class="form-group">
					<div class="col-sm-2">
						<div class="thumbnail">
							<img src="{{ asset($product->photo_circle) }}" class="img-responsive">
							 
						</div>
					</div>
					<div class="col-sm-10">
						<label for="" class="col-sm-12">Hình layer cirlce mask</label>
						<div class="fileinput fileinput-new" data-provides="fileinput">
						  <div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 200px; height: 150px;"></div>
						  <div>
						    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="photo_circle_mask"></span>
						    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
						  </div>
						</div>
					</div>
				</div>
				{{--HINH LAYER CIRCLE MASK--}}

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


				{{--NSX--}}
				<div class="form-group">
					<label for="" class="col-sm-2">Nhà sản xuất</label>
					<div class="col-sm-10">
						<select id="nsx" name="nsx[]" class="multiselect" multiple="multiple">
							@foreach($nsx as $c)
							<option value="{{ $c->id }}">{{ $c->ten_vi }}</option>
							@endforeach
						</select>
					</div>
				</div>
				{{--NSX--}}


				{{--LUOT XEM--}}
				<div class="form-group">
					{{ Form::label('luotxem','Lượt xem',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::input('number','luotxem',$product->luotxem, array('class'=>'form-control'))  }}
					</div>
				</div>
				{{--LUOT XEM--}}

				{{--NOIDUNG--}}
				<div class="form-group">
					{{ Form::label('noidung_vi','Nội dung',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::textarea('noidung_vi',$product->noidung_vi,
						array('class'=>'form-control','id'=>'noidung_vi')) }}
						<script language="javascript">CKEDITOR.replace('noidung_vi');</script>
					</div>
				</div>
				{{--NOIDUNG--}}

				{{--HIEN THI--}}
				<div class="form-group">
					{{ Form::label('hienthi','Hiển thị',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="hienthi" <?=(!isset($product->hienthi) || $product->hienthi==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

				{{--NOI BAT--}}
				<div class="form-group">
					{{ Form::label('noibat','Nổi bật',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="noibat" <?=(!isset($product->noibat) || $product->noibat==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--NOI BAT--}}
				{{--IS NEW--}}
				<div class="form-group">
					{{ Form::label('is_new','Sản phẩm mới',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="is_new" <?=(!isset($product->is_new) || $product->is_new==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

				{{--IS NEW--}}
				<div class="form-group">
					{{ Form::label('is_stock','Còn hàng hay  không?',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="is_stock" <?=(!isset($product->is_stock) || $product->is_stock==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--HIEN THI--}}

				{{--DISPLAY HOME--}}
				<div class="form-group">
					{{ Form::label('isDisplayHome','Hiển thị ngoài trang chủ',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isDisplayHome" <?=(!isset($product->isDisplayHome) || $product->isDisplayHome==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--DISPLAY HOME--}}

				{{--SẢN PHẨM CHO PHÉP THIẾT KẾ--}}
				<div class="form-group">
					{{ Form::label('isDesign','Cho phép thiết kế',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isDesign" <?=(!isset($product->isDesign) || $product->isDesign==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--SẢN PHẨM CHO PHÉP THIẾT KẾ--}}

				{{--is Case--}}
				<div class="form-group">
					{{ Form::label('isCase','Sản phẩm là Case? (Để Tool design phân biệt)',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isCase" <?=(!isset($product->isCase) || $product->isCase==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--is Case--}}
				{{--is Skin--}}
				<div class="form-group">
					{{ Form::label('isSkin','Sản phẩm là Skin? (Để Tool design phân biệt)',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isSkin" <?=(!isset($product->isCase) || $product->isSkin==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--is Skin--}}

				{{--is back--}}
				<div class="form-group">
					{{ Form::label('isBack','Sản phẩm có mặt sau? (Để Tool design phân biệt)',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isBack" <?=(!isset($product->isBack) || $product->isBack==1)?'checked="checked"':''?> >
					</div>
				</div>
				{{--is Skin--}}

				{{--is back--}}
				<div class="form-group">
					{{ Form::label('isCircleLayer','Sản phẩm hình layer circle? (Để Tool design phân biệt)',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						<input type="checkbox" name="isCircleLayer" <?=(!isset($product->isCircleLayer) || $product->isCircleLayer==1)?'checked="checked"':''?> >
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
						{{ Form::text('title_seo_vi',$product->title_seo_vi,
						array('class'=>'form-control','placeholder'=>'Title seo')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('desc_seo_vi','Description SEO',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('desc_seo_vi',$product->desc_seo_vi,
						array('class'=>'form-control','placeholder'=>'Description seo')) }}
					</div>
				</div>
				<div class="form-group">
					{{ Form::label('keyword_seo_vi','Keyword SEO',array('class'=>'col-sm-2')) }}
					<div class="col-sm-10">
						{{ Form::text('keyword_seo_vi',$product->keyword_seo_vi,array('class'=>'form-control','placeholder'=>'Keyword seo')) }}
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
	@else
		Chưa có thông tin
	@endif

@stop



@section('script')
	@parent
	<script>
		$(document).ready(function($) {
			$("input[name='hienthi']").bootstrapSwitch();
			$("input[name='noibat']").bootstrapSwitch();
			$("input[name='is_new']").bootstrapSwitch();
			$("input[name='is_stock']").bootstrapSwitch();
			$("input[name='isDisplayHome']").bootstrapSwitch();
			$("input[name='isDesign']").bootstrapSwitch();
			$("input[name='isCase']").bootstrapSwitch();
			$("input[name='isSkin']").bootstrapSwitch();
			$("input[name='isBack']").bootstrapSwitch();
			$("input[name='isCircleLayer']").bootstrapSwitch();
			$('.multiselect').multiselect({
            	nonSelectedText: 'Chưa chọn Group'
        	});
        	<?php 
	            foreach ($cateofProduct as $key => $value) {?>
	                $('#category').multiselect('select','<?php echo $value ?>')
	        <?php
	            }
	         ?>
	        <?php 
	            foreach ($nsxOfProduct as $key => $value) {?>
	                $('#nsx').multiselect('select','<?php echo $value ?>')
	        <?php
	            }
	         ?>

		});
	</script>
@stop
