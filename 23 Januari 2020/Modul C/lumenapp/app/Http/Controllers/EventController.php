<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\EventUser;
use App\Event;
use App\User;


class EventController extends Controller
{
    public function __construct()
    {
        //
    }


    public function index(){
        return response([
            "success" => true,
            "data"  => Event::orderBy('created_at','DESC')->get()]);
    }

    public function store(Request $r){
        try{
            if($r->hasFile('image_url')){
                $filename = Str::random(32).".".$r->image_url->getClientOriginalExtension();

                $r->image_url->move('images',$filename);

                $r->image_url =$filename;

            }

            $event = new Event;
            $event->name = $r->name;
            $event->address = $r->address;
            $event->date = $r->date;
            $event->image_url = $r->image_url;
            $event->description = $r->description; 

            $event->save();

            $data = Event::orderBy('created_at','DESC')->get();
            return response([
                "success" => true,
                "message" => "Event Berhasil ditambahkan",
                "data" => $data
            ]);
        }catch(Exception $e){
            return response([
                "success" => false,
                "message" => "Event gagal ditambahkan",
            ]);
        }
    }


    public function update(Request $r,$id){
        $event = Event::findOrFail($id);

        if($r->hasFile('image_url')){
            $filename = Str::random(32).".".$r->image_url->getClientOriginalExtension();

            $r->image_url->move('images',$filename);

            $r->image_url =$filename;

        }else{
            $r->image_url = $event->image_url;
        }

        // print_r($r->all());
        // exit();

        $event->name = $r->name;
        $event->address = $r->address;
        $event->date = $r->date;
        $event->image_url = $r->image_url;
        $event->description = $r->description; 

        $event->update();

        $data = Event::orderBy('created_at','DESC')->get();
        return response([
            "success" => true,
            "message" => "Event Berhasil diubah",
            "data" => $data
        ]);
    }


    public function show($id){

        $EventUser = EventUser::where([
            "event_id" => $id])->get();

        $mem = [];

        foreach($EventUser as $ev){
            array_push($mem,User::findOrFail($ev->user_id)->username);
        }

        return response(["success" => true,
            "data" => Event::findOrFail($id),
            "members" => $mem]);
    }

    public function destroy($id){
        try{
            $event = Event::findOrFail($id);

            $event->delete();

            $data = Event::orderBy('created_at','DESC')->get();

            return response([
                "success" =>true,
                "message" => "Event erhasil dihapus",
                "data" => $data]);
        }catch(Exception $e){
            return response([
                "success" =>false,
                "message" => "Event gagal dihapus"]);
        }

    }


    //
}
