<!DOCTYPE html>
<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
<head>
    <meta charset="utf-8"/>
    <meta name="description" content="Status attraksjoner"/>
    <meta name="viewport" content="width=device-width"/>
    <title>{{ $attraction->name }} | Tusenfryd</title>
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
</head>
<body
    class="html not-front not-logged-in page-node page-node- page-node-571 node-type-simple i18n-nb section-status-billettsalg">
<div class="pane-content">
    <h2 class="pane-title">{{ $attraction->name }}</h2>
    <b>Siste driftsmelding:</b><br>
    @isset($servicemessage)
        {{ $servicemessage->content ?? "Ikke tilgjengelig/Kortvarig stans" }} <br><br>
        Publisert: {{ \Carbon\Carbon::parse($servicemessage->created_at)->setTimezone('Europe/Oslo')->format('H:i d.m.Y') }}
    @endisset

    @empty($servicemessage)
        Ingen tilgjengelig
    @endempty
    <hr>
    <b>Åpningstid:</b><br>
    {{ $attraction->opening_times_information ?? 'Ikke tilgjengelig' }}
    <br><br><a href="{{ $attraction->read_more ?? "https://www.tusenfryd.no/se-og-gjore/attraksjoner" }}" target="_blank">Les mer</a>
</div>
</body>
