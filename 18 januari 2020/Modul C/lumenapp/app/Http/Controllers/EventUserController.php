<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\User;
use App\Event;
use App\EventUser;



class EventUserController extends Controller
{


    public function __construct()
    {
        
    }

    public function join(Request $r){
        $user = User::where(["api_token" => $r->api_token])->get();
        if(count($user) > 0){
            $events = [];

            $eventUser = EventUser::where(['user_id' => $user[0]->id])->get();

            foreach ($eventUser as $ev) {
                array_push($events,Event::findOrFail($ev->event_id));
            }

            return response([
                "success" => true,
                "message" => "bergabung dengan ".count($events)." Event",
                "data" => $events
            ]);
        }else {
            return response([
                "success" => false,
                "message" => "Belum bergabung dengan event"
            ]);
        }
    }


    public function storeJoin(Request $r,$id){
        $user = User::where(['api_token' => $r->api_token])->get();
        $event = Event::findOrFail($id);
        if($event && count($user) > 0){
            $eventUserCheck = EventUser::where(['user_id' => $user[0]->id,'event_id' => $event->id])->get();

            if(count($eventUserCheck) > 0){
                return response([
                    "success" => false,
                    "message" => "sudah bergabng dengan event"
                ]);
            }else {
                $defEventUser = new EventUser;
                $defEventUser->user_id = $user[0]->id;
                $defEventUser->event_id = $event->id;

                $defEventUser->save();
                
                return response([
                    "success" => true,
                    "message" => "berhasil bergabung dengan Event",
                ]);

            }

        }else {
            return response([
                "success" => false,
                "message" => "Data tidak ditemukan"
            ]);
        }
    }

    //
}
