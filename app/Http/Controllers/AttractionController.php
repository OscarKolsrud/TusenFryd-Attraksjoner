<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AttractionController extends Controller
{
    public function addView() {
        return view('pages.attraction.add');
    }

    public function add(Request $request) {
        //Validate the incoming data
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'read_more' => 'nullable|url',
            'open' => 'boolean',
            'opening_times_information' => 'nullable',
            'sort_order' => 'integer'
        ], []);

        //Generate URL Friendly slug
        $validated['slug'] = Str::of($validated['name'])->slug('-');

        $attraction = Attraction::create($validated);

        return redirect()->route('editAttraction-view', ['slug' => $attraction->slug]);
    }
}
