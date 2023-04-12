<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request) // REV - confirm password missing
    {
        // $validator = Validator::make($request->all(), [
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => 'required|string|min:8|confirmed',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            // 'password' => bcrypt($request->input('password')),
            'password' => $request->input('password'),
        ]);

        return response()->json(['user' => $user], 201);
    }

    // Login as a user
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $credentials['email'])->first();

        // if (!$user || !Hash::check($credentials['password'], $user->password)) {
        if (!$user || $credentials['password'] !== $user->password) {
            // Bad credentials, return error
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        // Authentication successful, return token to redirect to home page
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token], 200);

        // if (Auth::attempt($credentials)) {
        //     // Authentication sucessful, return token to redirect to home page
        //     $user = Auth::user();
        //     $token = $user->createToken('authToken')->plainTextToken;

        //     return response()->json(['token' => $token], 200);
        // } else {
        //     // Bad credentials, return error
        //     return response()->json(['error' => 'Credenciales inválidas'], 401);
        // }
    }
}
