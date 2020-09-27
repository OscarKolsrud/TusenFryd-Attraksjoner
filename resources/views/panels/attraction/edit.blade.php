<div class="card">
    <div class="card-header">Rediger: {{ $attraction->name }}</div>
    <div class="card-body">
        <a href="{{ route('editAttraction-view', ['slug' => $attraction->slug]) }}" class="btn btn-primary">Tilbake til attraksjon</a>

        <hr>
        <form action="{{ route('editAttraction-put', ['slug' => $attraction->slug]) }}" method="post">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="nameInput">Attraksjonsnavn</label>
                <input type="text" class="form-control" id="nameInput" name="name" value="{{ old('name') ?? $attraction->name }}">
                @if ($errors->has('name'))
                    <span class="text-danger">{{ $errors->first('name') }}</span>
                @endif
            </div>
            <div class="form-group">
                <label for="descriptionInput">Beskrivelse</label>
                <textarea class="form-control" id="descriptionInput" rows="3" name="description">{{ old('description') ?? $attraction->description }}</textarea>
                @if ($errors->has('description'))
                    <span class="text-danger">{{ $errors->first('description') }}</span>
                @endif
            </div>
            <div class="form-group">
                <label for="read_moreInput">Ekstern lenke/Les mer lenke</label>
                <input type="text" class="form-control" id="read_moreInput" name="read_more" value="{{ old('read_more') ?? $attraction->read_more }}">
                @if ($errors->has('read_more'))
                    <span class="text-danger">{{ $errors->first('read_more') }}</span>
                @endif
            </div>
            <div class="form-group">
                <label for="openInput">Nåværende status</label>
                <select class="form-control" id="openInput" name="open">
                    <option value="1" {{ (old("open") == "1" || $attraction->open == "1" ? "selected":"") }}>Åpen</option>
                    <option value="0" {{ (old("open") == "0" || $attraction->open == "0" ? "selected":"") }}>Stengt</option>
                </select>
            </div>
            <div class="form-group">
                <label for="opening_times_informationInput">Åpningstid informasjontekst</label>
                <textarea class="form-control" id="opening_times_informationInput" rows="3" name="opening_times_information">{{ old('opening_times_information') ?? $attraction->opening_times_information }}</textarea>
                @if ($errors->has('opening_times_information'))
                    <span class="text-danger">{{ $errors->first('opening_times_information') }}</span>
                @endif
            </div>
            <div class="form-group">
                <label for="sort_orderInput">Sorteringstall (Standard: 10, Verdier med 0 vises ikke offentlig)</label>
                <input type="number" class="form-control" id="sort_orderInput" name="sort_order" value="{{ old('sort_order') ?? $attraction->sort_order }}">
                @if ($errors->has('sort_order'))
                    <span class="text-danger">{{ $errors->first('sort_order') }}</span>
                @endif
            </div>
            <button type="submit" class="btn btn-primary">Lagre</button>
        </form>
    </div>
</div>
