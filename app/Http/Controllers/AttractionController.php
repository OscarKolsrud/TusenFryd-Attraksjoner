<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AttractionController extends Controller
{
    public function list(Request $request) {
        return view('pages.attraction.list', [
            'attractions' => Attraction::paginate(15)
        ]);
    }

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
        $validated['slug'] = Str::lower(Str::random(5))."-".Str::of($validated['name'])->slug('-');

        $attraction = Attraction::create($validated);

        return redirect()->route('editAttraction-view', ['slug' => $attraction->slug])->with(array('message' => 'Attraksjonen ble oppdatert', 'status' => 'success'));
    }

    public function editView($slug) {
        return view('pages.attraction.edit', [
            'attraction' => Attraction::where('slug', $slug)->firstOrFail()
        ]);
    }

    public function edit(Request $request, $slug) {
        //Validate the incoming data
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'read_more' => 'nullable|url',
            'open' => 'boolean',
            'opening_times_information' => 'nullable',
            'sort_order' => 'integer'
        ], []);

        $attraction = Attraction::where('slug', $slug)->firstOrFail();
        $attraction->update($validated);
        $attraction->save();

        return redirect()->route('editAttraction-view', ['slug' => $attraction->slug])->with(array('message' => 'Endringene ble lagret', 'status' => 'success'));
    }

    public function opening(Request $request, $slug) {
        //Validate the incoming data
        $validated = $request->validate([
            'open' => 'boolean',
        ], []);

        $attraction = Attraction::where('slug', $slug)->firstOrFail();
        $attraction->update($validated);
        $attraction->save();

        return redirect()->route('listAttraction')->with(array('message' => 'Åpningstiden for '. $attraction->name . ' ble oppdatert', 'status' => 'success'));
    }
}
