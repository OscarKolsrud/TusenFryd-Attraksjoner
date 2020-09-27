<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attraction extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'read_more', 'open', 'opening_times_information', 'sort_order'];

    public function ServiceMessages()
    {
        return $this->hasMany('App\Models\ServiceMessage');
    }
}
