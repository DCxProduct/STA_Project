<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Helper;

class ApiKeyCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
         // Get the 'Authorization' header
         $authorizationHeader = $request->header('Authorization');

         // Check if the header is in the correct format (Api-Key YOUR_API_KEY)
         if ($authorizationHeader) {
             $parts = explode(' ', $authorizationHeader); // Splitting "Api-Key YOUR_API_KEY"
             if (count($parts) == 2 && $parts[0] === 'Api-Key') {
                 $apiKey = $parts[1];  // The actual API key
 
                 // Compare with the stored API key
                 if ($apiKey !== Helper::GeneralWebmasterSettings("api_key")) {
                     return response()->json([
                         'code' => '-1',
                         'msg' => 'Authentication failed',
                     ], 500);
                 }
 
             } else {
                 return response()->json([
                     'code' => '-1',
                     'msg' => 'Invalid authorization format. Use "Api-Key YOUR_API_KEY"'
                 ], 400);
             }
         } else {
             return response()->json([
                 'code' => '-1',
                 'msg' => 'Authorization header is missing'
             ], 400);
         }
 
         return $next($request);
    }
}
