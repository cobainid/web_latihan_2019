<?php

namespace App\Http\Controllers;


use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Event;

class EventController extends Controller
{

    public function __construct()
    {
        //
    }

    public function index(){
        return response([
            "success" => true,
            "data" => Event::orderBy('created_at','DESC')->get() ]);
    }

    public function show($id){
        $data = Event::findOrFail($id);

        if($data) {
            return response([
                "success" => true,
                "data" => $data ]);
        }
        return response([
            "success" => false,
            "message" => "Event tidak ditemukan" ]);
    }

    public function store(Request $r){
        try{
            $event = new Event;

            if($r->hasFile('image_url')){
                $fileName = Str::random(12).".".$r->image_url->getClientOriginalExtension();            
                $r->image_url->move('images',$fileName);
                $r->image_url = $fileName;
            }else {
                return response([
                    "success" => false,
                    "message" => "Data gagal ditambahkan"]);
            }

            $event->name = $r->name;
            $event->address = $r->address;
            $event->date = $r->date;
            $event->image_url = $r->image_url;
            $event->description = $r->description;


            $event->save();

            $events = Event::orderBy('created_at','DESC')->get();

            return response([
                "success" => true,
                "message" => "Data berhasil ditambahkan",
                "data" => $events ]);
        }catch(Exception $e){
            return response([
                "success" => true,
                "message" => "Data gagal ditambahkan" ]);
        }
    }

    public function update(Request $r , $id){
        try{
            $event =  Event::findOrFail($id);


            if($r->image_url != "undefined"){
                $fileName = Str::random(12).".".$r->image_url->getClientOriginalExtension();
                $r->image_url->move('images',$fileName);

                $r->image_url = $fileName;
            }else{
                $r->image_url = $event->image_url;
            }

            $event->name = $r->name;
            $event->address = $r->address;
            $event->date = $r->date;
            $event->image_url = $r->image_url;
            $event->description = $r->description;


            $event->save();

            $events = Event::orderBy('created_at','DESC')->get();


            return response([
                "success" => true,
                "message" => "Data berhasil diubah",
                "data" => $events]);
        }catch(Exception $e){
            return response([
                "success" => true,
                "message" => "Data gagal diubah" ]);
        }



    }


    public function destroy($id){
        try {
            $event = Event::findOrFail($id);

            $event->delete();

            $events = Event::orderBy('created_at','DESC')->get();

            return response([
                "success" => true,
                "message" => "Event berhasil dihapus",
                "data" => $events]);
        } catch (Exception $e) {
            return response([
                "success" => true,
                "message" => "Event gagal dihapus"]);
            
        }
    }


}
