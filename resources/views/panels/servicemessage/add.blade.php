<div class="card">
    <div class="card-header">Legg til ny statusmelding: {{ $attraction->name }}</div>
    <div class="card-body">
        <form action="{{ route('addAttraction-post') }}" method="post">
            @csrf
            <div class="form-group">
                <label for="descriptionInput">Statusmelding innhold</label>
                <textarea class="form-control" id="descriptionInput" rows="3" name="description"></textarea>
                @if ($errors->has('description'))
                    <span class="text-danger">{{ $errors->first('description') }}</span>
                @endif
            </div>
            <div class="form-group">
                <label for="openInput">Oppdater attraksjonsstatus</label>
                <select class="form-control" id="openInput" name="open">
                    <option value="1" {{ (old("open") == "1" ? "selected":"") }}>Åpen</option>
                    <option value="0" {{ (old("open") == "0" ? "selected":"") }}>Stengt</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Legg til</button>
        </form>
    </div>
</div>
