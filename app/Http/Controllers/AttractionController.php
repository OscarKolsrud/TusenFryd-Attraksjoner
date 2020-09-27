<?php

namespace App\Http\Controllers;

use App\Models\Attraction;
use App\Models\ServiceMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AttractionController extends Controller
{
    public function publicListv1() {
        return view('iframes.v1.table', [
            'attractions' => Attraction::orderBy('sort_order', 'ASC')->get()
        ]);
    }

    public function driftsmeldingv1($attraction) {
        $attraction = Attraction::where('slug', $attraction)->firstOrFail();

        return view('iframes.v1.servicemessage', [
            'attraction' => $attraction,
            'servicemessage' => ServiceMessage::where('attraction_id', $attraction->id)->where('expires_at', '>=', Carbon::now()->toDateTimeString())->orderBy('id', 'DESC')->first()
        ]);
    }

    public function dashboard(Request $request) {
        return view('dashboard', [
            'attractions' => Attraction::orderBy('sort_order', 'ASC')->get()
        ]);
    }

    public function addView() {
        return view('attraction.add');
    }

    public function add(Request $request) {
        //Validate the incoming data
        $validated = $request->validate([
            'name' => 'required',
            'read_more' => 'nullable|url',
            'open' => 'boolean',
            'opening_times_information' => 'nullable',
            'sort_order' => 'integer'
        ], []);

        //Generate URL Friendly slug
        $validated['slug'] = Str::lower(Str::random(5))."-".Str::of($validated['name'])->slug('-');

        $attraction = Attraction::create($validated);

        return redirect()->route('editAttraction.get', ['slug' => $attraction->slug])->with(array('message' => 'Attraksjonen ble lagt til', 'status' => 'success'));
    }

    public function editView($slug) {
        return view('attraction.edit', [
            'attraction' => Attraction::where('slug', $slug)->firstOrFail()
        ]);
    }

    public function edit(Request $request, $slug) {
        //Validate the incoming data
        $validated = $request->validate([
            'name' => 'required',
            'read_more' => 'nullable|url',
            'open' => 'boolean',
            'opening_times_information' => 'nullable',
            'sort_order' => 'integer'
        ], []);

        $attraction = Attraction::where('slug', $slug)->firstOrFail();
        $attraction->update($validated);
        $attraction->save();

        return redirect()->route('editAttraction.get', ['slug' => $attraction->slug])->with(array('message' => 'Endringene ble lagret', 'status' => 'success'));
    }

    public function delete($slug) {
        Attraction::where('slug', $slug)->delete();

        return redirect()->route('dashboard')->with(array('message' => 'Attraksjonen ble slettet', 'status' => 'success'));
    }

    public function opening(Request $request, $slug) {
        //Validate the incoming data
        $validated = $request->validate([
            'open' => 'boolean',
        ], []);

        $attraction = Attraction::where('slug', $slug)->firstOrFail();
        $attraction->update($validated);
        $attraction->save();

        return redirect()->route('dashboard')->with(array('message' => 'Åpningen for '. $attraction->name . ' ble oppdatert', 'status' => 'success'));
    }
}
