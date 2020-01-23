<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

use App\Event;

use App\EventUser;



class EventUserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    public function join(Request $r){
        $checkUser = User::where([
            "api_token" => $r->api_token ])->get();

        if(count($checkUser) > 0){
            $eventUser  = EventUser::where([
                "user_id" => $checkUser[0]->id ])->orderBy('created_at','DESC')->get();
            if(count($eventUser) > 0){
                $events = [];

                foreach ($eventUser as $ev) {
                    array_push($events,Event::findOrFail($ev->event_id));
                }

                return response([
                    "success" => true,
                    "message" => "Bergabung dengan ".count($events)." Event",
                    "data" => $events]);
            }

            return response([
                "success" => false,
                "message" => "belum bergabung dengan event"]);
        }
        return response([
            "success" => false,
            "message" => "Invalid authenticate"]);        
    }


    public function storeJoin(Request $r,$id){
        $checkUser = User::where([
            "api_token" => $r->api_token])->get();
        $event = Event::findOrFail($id);

        if(count($checkUser) > 0 and $event){
            $eventUser  = EventUser::where([
                "user_id" => $checkUser[0]->id, "event_id" => $event->id ])->get();
            if(count($eventUser) > 0){

                return response([
                    "success" => true,
                    "message" => "Telah bergabung dengan event ini" ]);
            }else{
                $defEventUser = new EventUser;
                $defEventUser->user_id =$checkUser[0]->id;
                $defEventUser->event_id = $event->id;

                $defEventUser->save();


                $dataEventUsers = EventUser::orderBy('created_at','DESC')->get();


                return response([
                    "success" => true,
                    "message" => "Berhasil bergabung dengan event ini ",
                    "data" => $dataEventUsers]);

            }
        }
        return response([
            "success" => false,
            "message" => "Invalid authenticate"]);    
    }

    public function member($id){
        $event = Event::findOrFail($id);
        if($event){
            $eventUser = EventUser::where([
                "event_id" => $event->id])->get();

            $users = [];

            foreach($eventUser as $eu){
                array_push($users,["username" => User::findOrFail($eu->user_id)->username, "created_at" => $eu->created_at]);
            }

            return response([
                "success" => true,
                "data" => $users]);

        }
    }



    //
}
