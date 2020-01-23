<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\User;
use App\Event;
use App\EventUser;

class EventUserController extends Controller
{
    public function __construct()
    {
        //
    }

    public function join(Request $r){
    	$checkUser  = User::where([
    		"api_token" => $r->api_token])->get();

    	if(count($checkUser) > 0){
    		$ev = EventUser::where([
    			"user_id" => $checkUser[0]->id])->get();


            $event = [];

            foreach($ev as $e){
                array_push($event, Event::findOrFail($e->event_id));
            } 


    		return response(["succes" => true,
    			"message" => "Bergabung dengan ".count($ev)." Event",
    			"data" => $event]);

    	}else {
    		return response([
    			"success" => false,
    			"message" => "Authentichate failed"]);
    	}
    }


    public function storeJoin(Request $r,$id){
    	$user = User::where([
    		"api_token" => $r->api_token])->get();

    	$event = Event::findOrFail($id);

    	if(count($user) > 0 && $event){
    		$eventUser = EventUser::where([
    			"user_id" => $user[0]->id,
    			"event_id" => $event->id])->get();

    		if(count($eventUser)  > 0){
    			return response([
    				"success" => false,
    				"message" => "Sudah bergabung denga event ini"]);
    		}else {
    			$defEventUser = new EventUser;
    			$defEventUser->user_id = $user[0]->id;
    			$defEventUser->event_id = $event->id;

                $defEventUser->save();


	    		$eventMember = EventUser::where([
	    			"event_id" => $event->id])->get();

	    		$member = [];

	    		foreach($eventMember as $e){
	    			array_push($member, User::findOrFail($e->user_id)->username);
	    		}

    			return response([
    				"success" => true,
    				"message" => "berhasill bergabung dengan event",
    				"member" => $member]);

    		}

    	}

    	return response(["succes" => false,
    		"message" => "gagl menambahkan data"]);

    } 




    //
}
