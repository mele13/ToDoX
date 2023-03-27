<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    protected $table='state';

    // A Task can have one or more States
    public function task()
    {
        return $this->belongsToMany(Task::class);
    }
}