<div id="main-content" class="container_CP dmsp">
	<div class="sologan text-center">
		<h2>Thiết kế mẫu - Template</h2>
		<span>Chỉ cần upload hình ảnh, tự design riêng theo cách của mình, chúng tôi sẽ giúp bạn</span>
	</div>
	<div class="btn-started"></div>
	<div class="show-case" id="thietkemau" ng-controller="thietkemauControllerMain" >
		<div class="paging" >
			<span>Hiển thị </span>
			<select ng-model="paging" ng-change="selectPaging()">
				<option value="20">20</option>
				<option value="40">40</option>
				<option value="60">60</option>
				<option value="80">80</option>
				<option value="100">100</option>
				<option value="120">120</option>
				<option value="140">140</option>
			</select>

			<select ng-model="cate" ng-change="selectCate()" ng-options="obj.id as obj.name for obj in cates">
				<option value="">-----Tất cả-----</option>
			</select>
			<span ng-show="isShowing">Loading...</span>
		</div>
		<div class="my-block" ng-repeat="thietkemau in listTKMS">
			<span class="ion-ios-shuffle relateProduct" ng-click="showPopupRelateProduct(thietkemau.id_product,thietkemau.id)"></span>
			<span>Mẫu số #{{thietkemau.id}}</span>
			<br>
			<span><a href="design.html#!id={{thietkemau.id_product}}&ref={{thietkemau.id}}">
				<b>{{thietkemau.ten_vi}}</b></a>
			</span>
			<div class="khung-anh">
				<a href="design.html#!id={{thietkemau.id_product}}&ref={{thietkemau.id}}"><img ng-src="{{hostImg}}{{thietkemau.thumb}}" alt=""></a>
			</div>
			<div class="meta-btn">
				<a href="design.html#!id={{thietkemau.id_product}}&ref={{thietkemau.id}}" class="btn btn-default">
					{{thietkemau.price | currency:"đ "}}
				</a>
				<a href="design.html#!id={{thietkemau.id_product}}&ref={{thietkemau.id}}" class="btn btn-primary">
					Chỉnh sửa <i class="ion-ios-color-wand-outline"></i>
				</a>
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="paging" >
			<span>Hiển thị </span>
			<select ng-model="paging" ng-change="selectPaging()">
				<option value="20">20</option>
				<option value="40">40</option>
				<option value="60">60</option>
				<option value="80">80</option>
				<option value="100">100</option>
				<option value="120">120</option>
				<option value="140">140</option>
			</select>
			<select ng-model="cate" ng-change="selectCate()" ng-options="obj.id as obj.name for obj in cates">
				<option value="">-----Tất cả-----</option>
			</select>
			<span ng-show="isShowing">Loading...</span>
		</div>

		<div class="" ng-include="pathPopupProduct"></div>

	</div>

	

</div>