<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'list_id', 'state_id'];
    protected $table='task';

    // A Task belongs to a TaskList
    public function taskList()
    {
        return $this->belongsTo(TaskList::class, 'list_id');
    }

    // A task can have many states
    public function states()
    {
        return $this->belongsToMany(State::class, 'state_id');
    }
}
