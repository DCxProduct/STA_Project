<!DOCTYPE html>
<html lang="{{ @Helper::currentLanguage()->code }}" dir="{{ @Helper::currentLanguage()->direction }}">
<head>
    @include('dashboard.layouts.head')
</head>
<body>
<div class="app" id="app">
    @php( $webmailsNewCount= Helper::webmailsNewCount())
    @include('dashboard.layouts.menu')

    <div id="content" class="app-content box-shadow-z0" role="main">
        @include('dashboard.layouts.header')
        @include('dashboard.layouts.footer')
        <div ui-view class="app-body" id="view">
            @include('dashboard.layouts.errors')
            @yield('content')
        </div>
    </div>

    @include('dashboard.layouts.settings')
</div>
@include('dashboard.layouts.foot')
<!-- <script>
$(document).ready(function() {
    $('.summernote_{{ @$ActiveLanguage->code }}').on('summernote.video.insert', function(e, url) {
        let youtubePattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
        let match = url.match(youtubePattern);
        if (match && match[1]) {
            let embedUrl = 'https://www.youtube.com/embed/' + match[1];
            // Insert the iframe manually
            $(this).summernote('pasteHTML', '<iframe width="560" height="315" src="' + embedUrl + '" frameborder="0" allowfullscreen></iframe>');
            e.preventDefault(); // prevent default video insert
        }
    });
});
</script> -->
</body>
</html>
