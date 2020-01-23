<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use App\User;


class AuthController extends Controller
{
    public function __construct()
    {
        //
    }


    public function register(Request $r){
        $checkUser = User::where([
            "username" => $r->username])->get();

        if(count($checkUser) > 0){
            return response([
                "success" => false,
                "message" => "Username telah digunakan"]);
        }else {
            $user  = new User;
            $user->username = $r->username;
            $user->password = Hash::make($r->password);
            $user->api_token = Str::random(64);
            $user->role_id = $r->role_id;

            $user->save();

            return response([
                "success" => true,
                "message" => "User berhasil ditambahkan"]);


        }
    }


    public function login(Request $r){
        $checkUser = User::where([
            "username" => $r->username])->get();

        if(count($checkUser) > 0){
            if(Hash::check($r->password,$checkUser[0]->password)){

                $checkUser[0]->api_token = Str::random(64);
                $checkUser[0]->update();


                return response([
                    "success" => true,
                    "data" => $checkUser[0]]);

            }
        }

        return response([
            "sucess" => false,
            "message" => "Username / password anda salah"]);



    }

    //
}
