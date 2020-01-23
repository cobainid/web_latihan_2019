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

        $headers = [
            "Access-Control-Allow-Origin" => "*",
            "Access-Control-Allow-Headers" => "Content-type,X-Authorazation,X-Requested-With"
        ];

        if($request->isMethod('OPTIONS')){
            return response()->json("{'methods':'OPTIONS'}",200,$headers);
        }

        $res = $next($request);

        foreach ($headers as $key => $value) {
            $res->header($key,$value);
        }

        return $res;
    }
}
