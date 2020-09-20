<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Attraction extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'read_more', 'open', 'opening_times_information', 'sort_order'];

    public function ServiceMessages()
    {
        return $this->hasMany('App\Models\Attraction');
    }

    public function ServiceMessagesActive()
    {
        return $this->hasMany('App\Models\Attraction')->where('created_at', '<=', Carbon::now()->subDays(2)->toDateTimeString());
    }
}
