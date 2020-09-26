<div class="card">
    <div class="card-header">Rediger statusmelding</div>
    <div class="card-body">
        <a href="{{ route('editAttraction-view', ['slug' => $servicemessage->attraction->slug]) }}" class="btn btn-primary">Tilbake til attraksjon</a>
        <form action="{{ route('serviceMsg-put', ['messageid' => $servicemessage->id]) }}" method="post">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="descriptionInput">Innhold</label>
                <textarea class="form-control" id="descriptionInput" rows="3" name="content">{{ $servicemessage->content ?? old("content") }}</textarea>
                @if ($errors->has('content'))
                    <span class="text-danger">{{ $errors->first('content') }}</span>
                @endif
            </div>
            <button type="submit" class="btn btn-primary">Lagre</button>
        </form>
        <hr>
        <h3>Utløp</h3>
        <b>Status meldingen utløper: </b>{{ \Carbon\Carbon::parse($servicemessage->expires_at)->setTimezone('Europe/Oslo')->format('H:i d.m.Y') }}<br>
    </div>
</div>
