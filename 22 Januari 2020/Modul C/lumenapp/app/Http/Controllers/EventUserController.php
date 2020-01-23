<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use App\Event;
use App\EventUser;
use App\User;

class EventUserController extends Controller
{

    public function __construct()
    {
        //
    }

    public function join(Request $r){
    	$checkUser = User::where([
    		"api_token" => $r->api_token])->get();

    	if(count($checkUser) > 0){
    		$eventUser = EventUser::where([
    			"user_id" => $checkUser[0]->id])->get();
    		$shows = [];

    		if(count($eventUser) > 0){
	    		foreach($eventUser as $ev){
	    			array_push($shows,Event::findOrFail($ev->event_id));
	    		}
    		}

    		return response([
    			"success" => true,
    			"message" => "Telah bergabung dengan ".count($shows)." Event",
    			"data" => $shows]);

    	}


    }


    public function storeJoin(Request $r,$id){
    	$checkUser = User::where([
    		"api_token" => $r->api_token])->get();
    	$event = Event::findOrFail($id);

    	if($event and count($checkUser) > 0){
    		$eventUser = EventUser::where([
    			"user_id" => $checkUser[0]->id,
    			"event_id" => $event->id])->get();

    		if(count($eventUser) > 0){

    			return response([
    				"success" => false,
    				"message" => "Telah bergabung dengan event ini"]);
    		}else{
    			$defEventUser = new EventUser;
    			$defEventUser->user_id = $checkUser[0]->id;
    			$defEventUser->event_id = $event->id;

    			$defEventUser->save();

    			return response([
    				"success" => true,
    				"message" => "Berhasil bergabung dengan event ini"]);


    		}
    	}
    	return response([
    		"success" => false,
    		"message" => "Data tidak ditemukan"]);
    }


    public function member($id){
    	$event = Event::findOrFail($id);
    	if($event){
    		$eventUser = EventUser::where([
    			"event_id" => $event->id])->get();

    		$data = [];

    		if(count($eventUser) > 0){
    			foreach($eventUser as $ev){
    				array_push($data, [ "username" => User::findOrFail($ev->user_id)->username,"created_at" => $ev->created_at]);
    			}
    		}


    		return response([
    			"success" => true,
    			"data" => $data]);

    	}

    	return response([
    		"success" => false,
    		"message" => "Gagal memuat data"]);
    }



}