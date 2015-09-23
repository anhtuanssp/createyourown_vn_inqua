var group = function(){

}
group.addPermission = function(){
	$('.addPermission').click(function(event) {
			/* Act on the event */
			event.preventDefault();
			id = $('#id').val();
			permissionname = $('.name_permission').val();
			permissionvalue = $('.value_permission').val();
			if(permissionvalue==''){
				alert('Permission value không được rỗng');
				return;
			}
			if(permissionname==''){
				alert('Permission name không được rỗng');
				return;
			}
			$.ajax({
				url: consGroup.addPremisionUrl,
				type: 'POST',
				dataType: '',
				data: {act: 'ajax_addpermission',"id": id,'permissionname':permissionname,'permissionvalue':permissionvalue},
				beforeSend : function(){
					$('.loadding-add-permision').show(100);
				}
			})
			.done(function(datares) {
				datares = $.parseJSON(datares);
				// console.log(datares);

				if(datares.status == 1){
					alert(datares.msg);
					$('.loadding-add-permision').hide(100);
					// window.location = window.location.href;
				}else if(datares.status == 0){
					alert(datares.msg);
					$('.loadding-add-permision').hide(100);
				}else{
					// alert(data.msg);
					$('.loadding-add-permision').hide(100);
				}
				console.log("success");
			})
			.fail(function() {
				alert('Có lỗi xãy ra, vui lòng thử lại');
				$('.loadding-add-permision').hide(100);
				// window.location = window.location.href;
			})
			.always(function() {
				
				console.log("complete");
			});
		});
}
jQuery(document).ready(function($) {
	group.addPermission();
});