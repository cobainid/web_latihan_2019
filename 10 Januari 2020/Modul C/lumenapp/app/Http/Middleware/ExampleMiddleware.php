<?php

namespace App\Http\Middleware;

use Closure;

class ExampleMiddleware
{

    public function handle($request, Closure $next)
    {
        $headers = [
            "Access-Control-Allow-Origin" => "*",
            "Access-Control-Allow-Headers" => "Content-type,X-Authorization,X-Requested-With"
            // "Access-Control-Allow-Origin" => "*",
        ];

        if($request->isMethod('OPTIONS')){
            return response()->json('["method":"OPTIONS"]',200,$headers);
        }

        $res = $next($request);

        foreach ($headers as $key => $value) {
            $res->header($key,$value);
        }

        return $res;
    }
}
