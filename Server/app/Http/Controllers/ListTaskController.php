<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BoardList;

class ListTaskController extends Controller
{
    public function create(Request $request, BoardList $list)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description'
        ]);

        $task = new ListTask();
        $task->name = $validatedData['name'];
        $task->list()->associate($list);
        $task->save();

        return response()->json($task);
    }
}
