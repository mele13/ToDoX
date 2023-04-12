<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // Display a listing of the resource
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    // Store a newly created resource in storage
    public function store(Request $request, $boardId, $taskListId)
    {
        // \Log::info('Request received for creating task', [
        //     'name' => $request->input('name'),
        //     'description' => $request->input('description'),
        //     'tasklist_id' => $taskListId,
        //     'state_id' => $request->input('state_id'),
        //     'selectedLabels' => $request->input('selectedLabels'),
        //     'due_date' => $request->input('start_date'),
        //     'start_date' => $request->input('due_date'),
        // ]);
        
        $validatedData = $request->validate([
            'username' => 'required|max:255',
            'password' => 'required|max:255',
            'email' => 'required|email|max:255',
        ]);
    
        $user = User::create([
            'username' => $validatedData['username'],
            'password' => bcrypt($validatedData['password']),
            'email' => $validatedData['email'],
        ]);

        // return response()->json($user, 201);
        return response()->json(['message' => 'User created'], 201);
    }

    // Display the specified resource
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    // Update the specified resource in storage
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());

        return response()->json($user);
    }

    // Remove the specified resource from storage
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        
        return response()->json(null, 204);
    }
}
