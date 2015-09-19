<?php
namespace DeTrFunc;

/**
* GỬI MAIL
*/
class EventDetrSendMailSubcriber
{

	/**
	 * Khi user đặt hàng thành công hoặc admin update trạng thái đơn hàng
	 * Email sẽ được gửi để cập nhật trạng thái đơn hàng cho khách hàng biết
	 * @param  [orders] $eventData 
	 */
  public function onSentOrderStatusMail($eventData)
  {
    // get orders
    $orderStatus = $eventData->status;
    $orderEmail = $eventData->email;
    $tkh = $eventData->tenkhachhang;
    $img = asset($eventData->thumb);
    // dd($orderEmail);
    $statusText = '';
    $subject = 'Hệ thống email xác nhận đơn hàng!';

    switch ($orderStatus) {
      case 0:
        $statusText = 'Cảm ơn bạn, chúng tôi đã nhận được đơn hàng';
        $subject = 'Hệ thống email xác nhận đơn hàng, đã nhận được đơn hàng!';
        break;
      case 1:
        $statusText = 'Cảm ơn bạn, chúng tôi đang xử lý đơn hàng của bạn';
        $subject = 'Hệ thống email xác nhận đơn hàng, đơn hàng đang xử lý!';
        break;
      case 2:
        $statusText = 'Đơn hàng của bạn đang được chuyển đi in';
        $subject = 'Hệ thống email xác nhận đơn hàng, đơn hàng đang được chuyển đi in!';
        break;
      case 3:
        $statusText = 'Chúng tôi đang trên đường đi giao hàng cho bạn, vui lòng giữ liên lạc để chúng tôi có thể liên hệ';
        $subject = 'Hệ thống email xác nhận đơn hàng, đang trên đường giao hàng!';
        break;
      case 4:
        $statusText ='Cảm ơn bạn, đơn hàng của bạn đã thành công. Mong quý khách ủng hộ cho website!';
        $subject = 'Hệ thống email xác nhận đơn hàng, đơn hàng của quý khách thành công!';
        break;
    }

    //GỬI MAIL THÔNG BÁO TÌNH TRẠNG ORDER
    \Mail::send('emails.orders.updateEmailStatusOrder', array('statusText'=>$statusText,
      'email'=> $orderEmail,'name' =>$tkh,
      'phone'=>$eventData->phone,'img'=>$img,'subject'=>$subject),
     function($message) use($orderEmail,$subject,$tkh){
        $message->to($orderEmail, $tkh)->subject($subject);
    });

  }

  public function onSentOrderNotifyMail($eventData){
    $orderStatus = $eventData->status;
    $tkh = $eventData->tenkhachhang;
    $img = asset($eventData->thumb);
    $orderEmail = $eventData->email;
    $link ="http://inqua.vn/cms/public/quanly/donhangs/view/".$eventData->id;

    $statusText = 'Thông báo đơn hàng - Inqua.vn';
    $subject = 'Hệ thống email báo đơn hàng, đã nhận được đơn hàng mới!';

    $listAdminEmail = \Config::get('detr.list_email_admin');
    foreach ($listAdminEmail as $key => $value) {
      \Mail::send('emails.orders.updateEmailNotifyOrder', array('statusText'=>$statusText,
        'email'=> $orderEmail,'name' =>$tkh,'link'=>$link,
        'phone'=>$eventData->phone,'img'=>$img,'subject'=>$subject),
       function($message) use($value,$subject,$tkh){
          $message->to($value, $tkh)->subject($subject);
      });
    }

  }

  /**
   * Register the listeners for the subscriber.
   *
   * @param  Illuminate\Events\Dispatcher  $events
   * @return array
   */
  public function subscribe($events)
  {
  	$events->listen(
  		\Config::get('detr.event_detr.event_sentmail_order'), 
  		'DeTrFunc\EventDetrSendMailSubcriber@onSentOrderStatusMail'
  	);

    $events->listen(
      \Config::get('detr.event_detr.event_sentmail_notify_order'), 
      'DeTrFunc\EventDetrSendMailSubcriber@onSentOrderNotifyMail'
    );
  }

}