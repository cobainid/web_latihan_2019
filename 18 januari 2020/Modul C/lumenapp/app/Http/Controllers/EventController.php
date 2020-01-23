<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\User;
use App\Event;
use App\EventUser;



class EventController extends Controller
{


    public function __construct()
    {
        //
    }

    public function index(){
        $Event = Event::orderBy('created_at','DESC')->get();

        return response([
            "success" => true,
            "data" => $Event
        ]);
    }

    public function store(Request $r){


        // return response($r->image_url);
        if($r->image_url != ""){
            $fileName = Str::random(32).".".$r->image_url->getClientOriginalExtension();
            $r->image_url->move('images',$fileName);
            $r->image_url = $fileName;
        }else {
            return response(["message" =>'image kosong']);
        }

        $event = new Event;
        $event->name = $r->name;
        $event->address = $r->address;
        $event->date = $r->date;
        // $event->image_url = $r->image_url;
        $event->image_url = $r->image_url;
        $event->description = $r->description;

        $event->save();

        return response([
            "success" => true,
            "message" => "Event berhasil ditambahkan"
        ]);
    }


    public function update(Request $r,$id){
        $event = Event::findOrFail($id);

        if($r->image_url != ""){
            $fileName = Str::random(32).".".$r->image_url->getClientOriginalExtension();
            $r->image_url->move('images',$fileName);
        }else {
            $fileName = $event->image_url;
        }


        $event->name = $r->name;
        $event->address = $r->address;
        $event->date = $r->date;
        // $event->image_url = $r->image_url;
        $event->image_url = $fileName;
        $event->description = $r->description;

        $event->update();

        return response([
            "success" => true,
            "message" => "Event berhasil diubah"
        ]);
    }



    public function show($id){
        $event = Event::findOrFail($id);

        return response([
            "success" => true,
            "data" => $event
        ]);
    }

    public function destroy($id){
        $event = Event::findOrFail($id);

        $event->delete();

        return response([
            "success" => true,
            "message" => "Event berhasil dihapus"
        ]);

    }


    public function member($id){
        $event = EventUser::where(["event_id" => $id])->get();
        if(count($event) > 0){
            $events = [];

            foreach ($event as $ev) {
                array_push($events,User::findOrFail($ev->user_id));
            }

            return response([
                "success" => true,
                "message" => count($events)." orang bergabung dengan Event ini",
                "data" => $events
            ]);
        }else {
            return response([
                "success" => false,
                "message" => "Belum ada yang bergabung dengan event ini"
            ]);
        }
    }

    //
}
