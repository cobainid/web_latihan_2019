<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
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
        $data = Event::orderBy('created_at','DESC')->get();
        return response([
            "success" => true,
            "data" => $data]);
    }


    public function store(Request $r){

        // print_r($r->all());
        // exit();
        $fileName = Str::random(12).".".$r->image_url->getClientOriginalExtension();
        $r->image_url->move('images',$fileName);

        $r->image_url = $fileName;

        $event = new Event;
        $event->name = $r->name;
        $event->date = $r->date;
        $event->address = $r->address;
        $event->image_url = $r->image_url;
        $event->description = $r->description;
        
        $event->save();


        return response([
            "success" => true,
            "message" => "Event berhasil ditambahkan"]);


    }

    public function update(Request $r,$id){
        $event =  Event::findOrFail($id);
        // print_r($r->image_url);
        // exit();
        if($r->image_url != "undefined"){
            $fileName = Str::random(12).".".$r->image_url->getClientOriginalExtension();
            $r->image_url->move('images',$fileName);
        }else{
            $fileName = $event->image_url;
        }

        $r->image_url = $fileName;

        $event->name = $r->name;
        $event->date = $r->date;
        $event->address = $r->address;
        $event->image_url = $r->image_url;
        $event->description = $r->description;
        
        $event->update();


        return response([
            "success" => true,
            "message" => "Event berhasil diubah"]);
    }


    public function show($id){
        try{
            return response([
                "success" > true,
                "data" => Event::findOrFail($id)]);
        }catch(Exception $e){
            return response([
                "success" > false,
                "message" => "Data tidak ditemukan"]);
        }
    }


    public function destroy($id){
        try{
            $event = Event::findOrFail($id);

            $event->delete();

            return response([
                "success" => true,
                "message" => "Event Berhasil DIhapus"]);
        }catch(Exception $e){
            return response([
                "success" => false,
                "message" => "Event gagal dihapus"]);
        }
    }



}
