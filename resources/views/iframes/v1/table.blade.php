<!DOCTYPE html>
<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
<head>
    <meta charset="utf-8"/>
    <meta name="description" content="Status attraksjoner"/>
    <meta name="viewport" content="width=device-width"/>
    <title>Status Attraksjoner | Tusenfryd</title>
    <link type="text/css" rel="stylesheet"
          href="/sites/tusenfryd.no/files/css/css_jvzvLgmOcuAT2hi2Uw7AY7iB1WgZYE4bluDzbgKhQcs.css" media="all"/>
    <link type="text/css" rel="stylesheet"
          href="/sites/tusenfryd.no/files/css/css_c7WWF-M3FOUU1GY7ocDP7vWJbc2yI2lmXGRw1Hiwmbk.css" media="all"/>
    <link type="text/css" rel="stylesheet"
          href="/sites/tusenfryd.no/files/css/css_S61Du032h31FyLKfHl0FWONJpJwoAR-B4VGw3DNqazc.css" media="screen"/>
    <link type="text/css" rel="stylesheet"
          href="/sites/tusenfryd.no/files/css/css_CVofwQjLuCZqHsS3Q6YqJ3JPcCXn_rLk94HgBUAuziM.css" media="all"/>
    <link type="text/css" rel="stylesheet"
          href="/sites/tusenfryd.no/files/css/css_-NJM-BYS5FRkNRd-KhyXE0sptQth3KF621uuoULiUmk.css" media="all"/>
    <link type="text/css" rel="stylesheet"
          href="/sites/tusenfryd.no/files/css/css_VNaH3p4nkZuz4wils88YQ342kSzu1BOgIX-H2LdZlQ8.css" media="all"/>
    <link type="text/css" rel="stylesheet"
          href="/sites/tusenfryd.no/files/css/css_4R2_16c3H8v1-9yFlixgiv448ZSVqip2YbrJ0InqXGg.css" media="all"/>

    <!-- Remember to include jQuery :) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>

    <!-- jQuery Modal -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
</head>
<body
    class="html not-front not-logged-in page-node page-node- page-node-571 node-type-simple i18n-nb section-status-billettsalg">
<div class="pane-content">
    @forelse ($attractions as $attraction)
        @if($loop->first)
            <table border="1">
                <thead>
                <tr>
                    <th>Attraksjon</th>
                    <th>Nåværende status</th>
                    <th>Driftsmelding</th>
                </tr>
                </thead>
                <tbody>
                @endif
                <tr>
                    <td>{{ $attraction->name }}</td>
                    <td>@if($attraction->open)<span style="color:#16a085">Åpen</span>@else<span style="color:#e74c3c">Stengt</span>@endif</td>
                    <td><a href="{{ route('driftsmeldingv1', ['attraction' => $attraction->slug]) }}" rel="modal:open">@if($attraction->ServiceMessages()->where('expires_at', '>=', \Carbon\Carbon::now()->toDateTimeString())->orderBy('id', 'DESC')->get()->isNotEmpty()) Driftsmeldinger @else Les mer @endif</a></td>
                    <!--<td><span style="color:#e67e23">Lang kø</span></td>-->
                </tr>
                @if($loop->last)
                </tbody>
            </table>
            <p>Sist oppdatert: {{ \Carbon\Carbon::now()->setTimezone('Europe/Oslo')->format('H:i:s d.m.Y') }}</p>
        @endif
    @empty
        Attraksjonsstatus er klar til oppsett
    @endforelse

</div>
</body>
