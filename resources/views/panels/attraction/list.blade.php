<div class="card">
    <div class="card-header">Attraksjoner</div>
    <div class="card-body">
        @forelse ($attractions as $attraction)
            @if($loop->first)
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Navn</th>
                        <th scope="col">Status</th>
                        <th scope="col">Endre status</th>
                        <th scope="col">Handlinger</th>
                    </tr>
                    </thead>
                    <tbody>
            @endif
                <tr>
                    <th scope="row">{{ $attraction->name }}</th>
                    <td>@if($attraction->open)<span class="badge badge-success">Åpen</span>@else<span class="badge badge-danger">Stengt</span>@endif</td>
                    <td>
                        <form action="{{ route('openingAttraction-put', ['slug' => $attraction->slug]) }}" method="post">
                            @csrf
                            @method('PUT')
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="open" id="open" value="1" @if($attraction->open)checked="checked"@endif>
                                <label class="form-check-label" for="inlineRadio1">Åpen</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="open" id="open" value="0" @if(!$attraction->open)checked="checked"@endif>
                                <label class="form-check-label" for="inlineRadio2">Stengt</label>
                            </div>
                            <button type="submit" class="btn btn-sm btn-primary">Lagre</button>
                        </form>
                    </td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Handlinger">
                            <a class="btn btn-sm btn-secondary" href="{{ route('editAttraction-view', ['slug' => $attraction->slug]) }}" role="button">Statusmeldinger</a>
                            <a class="btn btn-sm btn-primary" href="{{ route('editAttraction-view', ['slug' => $attraction->slug]) }}" role="button">Rediger</a>
                        </div>
                    </td>
                </tr>
                @if($loop->last)
                </tbody>
            </table>
                <div class="d-flex justify-content-center">
                    {{ $attractions->links() }}
                </div>
                @endif
        @empty
            <div class="text-center">
                Ingen attraksjoner registrert
            </div>
        @endforelse
    </div>
</div>
