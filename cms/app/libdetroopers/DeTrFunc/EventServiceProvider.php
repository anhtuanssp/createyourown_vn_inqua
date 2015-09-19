<?php
namespace DeTrFunc;
 
use Illuminate\Support\ServiceProvider;
use DeTrFunc\EventDetrSendMailSubcriber;
 
class EventServiceProvider extends ServiceProvider {
 
  public function register()
  {

  	$subscriber = new EventDetrSendMailSubcriber;
	\Event::subscribe($subscriber);
	//hoặc code ở dứoi
  	// $this->app->events->subscribe(new EventDetrSendMailSubcriber);
  }
 
}
