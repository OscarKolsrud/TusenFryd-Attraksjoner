@extends('layouts.app')

@section('template_title')
    Legg til ny attraksjon
@endsection

@section('template_fastload_css')
@endsection

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-10 offset-lg-1">

                @include('panels.attraction.edit')

            </div>
        </div>
    </div>

@endsection

@section('footer_scripts')
@endsection
