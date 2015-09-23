<?php
namespace apiv1;
use BaseController;
use View;

use Input;
use Response;
use Request;
use Mail;

class ApiFeedbackController extends BaseController {

	public function __call($name, $arguments){ 
		return Response::json('Missing method', 400);
    } 

    public function sendFeedback(){
	    if (Request::ajax())
		{
			$param = Input::all();

			$email = $param['email'];
			$content = $param['content'];

			// print_r($email);

			Mail::send('emails.feedback.send', array('email'=>$email,'content'=>$content),
		     function($message) use($email,$content){
		        $message->to($email, $email)->subject('FEEDBACK FROM CYO. EMAIL TO : '.$email);
		    });

			return Response::json($param, 200);
		}
    }

	

}
