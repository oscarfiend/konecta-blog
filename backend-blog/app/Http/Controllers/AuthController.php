<?php
namespace  App\Http\Controllers;

use App\Http\Requests\RegisterAuthRequest;
use App\User;
use Illuminate\Http\Request;
use  JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;

class  AuthController extends  Controller {

    public function __construct(JWTAuth $jwtAuth){
        $this->jwtAuth = $jwtAuth;
    }

    //variable para loguear al usuario despues de haberse registrado
    //en este caso no la usaremos
    public  $loginAfterSignUp = false;

    public  function  register(Request  $request) {
        $v = \Validator::make($request->all(), [
            'name' => 'required',
            'password' => 'required',
            'email'    => 'required|email|unique:users',
            'phone' => 'required',
            'role' => 'in:Administrador,Usuario',
        ]);
        if($v->fails()){
           return response()->json([
                'status' => 'error',
                'errors'=> $v->errors()
           ],400);
        }
        $user = new  User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        if($request->role){
            $user->role = $request->role;

        }
        $user->password = bcrypt($request->password);
            $user->save();
            return  response()->json([
                'status' => 'User created',
                'data' => $user
            ], 200);
 
    }

    public  function  login(Request  $request) {
        $input = $request->only('email', 'password');
        $jwt_token = null;
        try{
            if (!$jwt_token = JWTAuth::attempt($input)) {
                return  response()->json([
                    'status' => 'invalid_credentials',
                    'message' => 'Invalid username or password',
                ], 400);
            }
        }catch(JWTException $e){
            return response()->json([
                'status'=>'error_token',
            'message'=>'The token could not be created'],500);
        }

        return  response()->json([
            'status' => 'ok',
            'token' => $jwt_token,
            'user'=>Auth::user()
        ],200);
    }

    public  function  logout(Request  $request) {
        $this->validate($request, [
            'token' => 'required'
        ]);

        try {
            JWTAuth::invalidate($request->token);
            return  response()->json([
                'status' => 'ok',
                'message' => 'Successful logout'
            ]);
        } catch (JWTException  $exception) {
            return  response()->json([
                'status' => 'unknown_error',
                'message' => 'The session could not be closed'
            ], 500);
        }
    }

    public  function  getAuthUser(Request  $request) {
        $this->validate($request, [
            'token' => 'required'
        ]);

        $user = JWTAuth::authenticate($request->token);
        return  response()->json(['user' => $user]);
    }
}