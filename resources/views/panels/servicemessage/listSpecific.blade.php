<div class="card">
    <div class="card-header">Statusmeldinger: {{ $attraction->name }}</div>
    <div class="card-body">
        <a href="{{ route('serviceMsgView', ['attraction' => $attraction->slug]) }}" class="btn btn-primary">Opprett ny statusmelding</a>
        @forelse ($servicemessages as $message)
            @if($loop->first)
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Innhold</th>
                            <th scope="col">Utløp</th>
                            <!--<th scope="col">Endre status</th>-->
                            <th scope="col">Handlinger</th>
                        </tr>
                        </thead>
                        <tbody>
                        @endif
                        <tr>
                            <th scope="row">{{ $message->content }}</th>
                            <td>{{ \Carbon\Carbon::parse($message->expires_at)->setTimezone('Europe/Oslo')->format('H:i d.m.Y') }}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Handlinger">
                                    <a class="btn btn-sm btn-primary" href="#" role="button">Rediger</a>
                                </div>
                            </td>
                        </tr>
                        @if($loop->last)
                        </tbody>
                    </table>
                </div>
            @endif
        @empty
            <div class="text-center">
                Ingen statusmeldinger for denne attraksjonen
            </div>
        @endforelse
            <a href="{{ url()->previous() }}" class="btn btn-primary">Tilbake</a>
    </div>
</div>
