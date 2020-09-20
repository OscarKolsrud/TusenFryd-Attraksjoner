<div class="card">
    <div class="card-header">Legg til ny statusmelding: {{ $attraction->name }}</div>
    <div class="card-body">
        <a href="{{ url()->previous() }}" class="btn btn-primary">Tilbake</a>
        <form action="{{ route('serviceMsg-post', ['attraction' => $attraction->slug]) }}" method="post">
            @csrf
            <div class="form-group">
                <label for="descriptionInput">Statusmelding innhold</label>
                <textarea class="form-control" id="descriptionInput" rows="3" name="content">{{ old("content") ?? "" }}</textarea>
                @if ($errors->has('content'))
                    <span class="text-danger">{{ $errors->first('content') }}</span>
                @endif
            </div>
            <div class="form-group">
                <label for="expires_at">Utløper</label>
                <div class="row" id="expires_at">
                    <div class="col">
                        <label for="expires_at_weeks">Uker</label>
                        <input type="number" id="expires_at_weeks" name="expires_at_weeks" class="form-control" value="{{ old("expires_at_weeks") ?? "0" }}" min="0">
                    </div>
                    <div class="col">
                        <label for="expires_at_days">Dager</label>
                        <input type="number" id="expires_at_days" name="expires_at_days" class="form-control" value="{{ old("expires_at_days") ?? "0" }}" min="0">
                    </div>
                    <div class="col">
                        <label for="expires_at_hours">Timer</label>
                        <input type="number" id="expires_at_hours" name="expires_at_hours" class="form-control" value="{{ old("expires_at_hours") ?? "2" }}" min="0">
                    </div>
                </div>
                @if ($errors->has('expires_at_weeks') || $errors->has('expires_at_days') || $errors->has('expires_at_hours'))
                    <span class="text-danger">{{ $errors->first('expires_at_weeks') ?? $errors->first('expires_at_days') ?? $errors->first('expires_at_hours') }}</span>
                @endif
            </div>
            <div class="form-group">
                <label for="openInput">Oppdater attraksjonsstatus (Nåværende status:@if($attraction->open) Åpen @else
                        Stengt @endif)</label>
                <select class="form-control" id="openInput" name="open">
                    <option value="1" {{ (old("open") == "1" || $attraction->open == "1" ? "selected":"") }}>Åpen</option>
                    <option value="0" {{ (old("open") == "0" || $attraction->open == "0" ? "selected":"") }}>Stengt</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Legg til</button>
        </form>
    </div>
</div>
