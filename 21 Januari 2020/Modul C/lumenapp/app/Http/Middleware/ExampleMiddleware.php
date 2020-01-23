<?php

namespace App\Http\Middleware;

use Closure;

class ExampleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $h = [
            "Access-Control-Allow-Origin" => "*",
            "Access-Control-Allow-Headers" => "Content-type,X-Authorization,X-Requested-With"
        ];

        if($request->isMethod('OPTIONS')){
                return response()->json("{'method':'OPTIONS'}",200,$h);
        }



        $res =  $next($request);


        foreach($h as $key => $val){
            $res->header($key,$val);
        }

        return $res;


    }
}
