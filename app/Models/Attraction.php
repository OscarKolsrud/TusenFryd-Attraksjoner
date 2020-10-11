<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Attraction extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = ['name', 'slug', 'description', 'read_more', 'open', 'opening_times_information', 'sort_order'];

    public function ServiceMessages()
    {
        return $this->hasMany('App\Models\ServiceMessage');
    }
}
