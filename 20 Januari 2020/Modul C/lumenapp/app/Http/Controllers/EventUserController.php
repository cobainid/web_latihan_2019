<?php

namespace App\Http\Controllers;


use llluminate\Support\Facades\Hash;
use llluminate\Support\Str;
use Illuminate\Http\Request;
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
        $join = [];

        $user = User::where(['api_token' => $r->api_token])->get();

        // print_r(count($user));
        // exit();
        if(count($user) > 0){
            $EventUser = EventUser::where(['user_id' => $user[0]->id])->get();
            if(count($EventUser) > 0){
                foreach ($EventUser as $eu) {
                    array_push($join, Event::findOrFail($eu->event_id));
                }

                return response([
                    "success"=> true,
                    "message" => "Bergabung dengan ".count($join)." Event",
                    "data" => $join]);
            }
            return response([
                "success"=> true,
                "message" => "Belum bergabung dengan event"]);
        }
        return response([
            "success"=> false,
            "message" => "Auth invalid"]);

    }


    public function storeJoin(Request $r,$id){
        $user = User::where(['api_token' => $r->api_token])->get();

        if(count($user) > 0){
            $eventUser = EventUser::where(['user_id' => $user[0]->id, 'event_id' => $id])->get();
                
            if(count($eventUser) > 0){
                return response([
                    "success" => false,
                    "message" => "Telah bergabung dengan event ini"]);
            }else{
                $defEventUser = new EventUser;
                $defEventUser->user_id = $user[0]->id;
                $defEventUser->event_id = $id;

                $defEventUser->save();


                return response([
                    "success" => true,
                    "message" => "Berhasil bergabung dengan event"]);

            }
        }

        return response([
            "success" => false,
            "message" => "Auth Invalid"]);



    }



    public function member(Request $r,$id){
        $join = [];

        $event = Event::findOrFail($id);

        if($event){
            $EventUser = EventUser::where(['event_id' => $event->id])->get();
            if(count($EventUser) > 0){
                foreach ($EventUser as $eu) {
                    array_push($join, User::findOrFail($eu->user_id)->username);
                }

                return response([
                    "success"=> true,
                    "data" => $join]);
            }
            return response([
                "success"=> false,
                "message" => "Belum ada user"]);
        }
        return response([
            "success"=> false,
            "message" => "Event tidak ditemukan"]);

    }


}
