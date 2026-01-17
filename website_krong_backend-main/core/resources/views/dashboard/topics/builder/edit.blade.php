<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-barstyle" content="black-translucent">
    <link rel="apple-touch-icon" href="{{ asset('assets/dashboard/images/logo.png') }}">
    <meta name="apple-mobile-web-app-title" content="Smartend">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="mobile-web-app-capable" content="yes">
    <link rel="shortcut icon" sizes="196x196" href="{{ asset('assets/dashboard/images/logo.png') }}">

    <title>✏️ {{ $title }}</title>
    
    <!-- Start of GrapeJS styles -->
    <link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="{{ asset('assets/dashboard/js/sweetalert/sweetalert.css') }}"> 
    <style>
        .gjs-one-bg{
            background: {{Helper::GeneralSiteSettings("style_color2")}};
        }
        .keditor-topbar {
            background: {{Helper::GeneralSiteSettings("style_color2")}};
        }
        .keditor-topbar-btn.active, .keditor-topbar-btn:hover {
            background: {{Helper::GeneralSiteSettings("style_color1")}};
            color: #fff !important;
        }
    </style>
</head>

<body class="{{ @Helper::currentLanguage()->direction }}">
    <div id="gjs"></div>

    <?php
    preg_match('/<style>(.*?)<\/style>/s', $content, $matches);
$css = $matches[1] ?? '';
$html = preg_replace('/<style>.*?<\/style>/s', '', $content);
    ?>
<script type="text/javascript" src="{{ asset('assets/keditor/plugins/jquery-1.11.3/jquery-1.11.3.min.js') }}"></script>


<!-- Start of Builder scripts -->
<script src="https://unpkg.com/grapesjs"></script>
<script src="https://cdn.jsdelivr.net/npm/grapesjs-blocks-basic@1.0.2/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/grapesjs-blocks-bootstrap4@0.2.5/dist/grapesjs-blocks-bootstrap4.min.js"></script>
<!-- End of Builder scripts -->

<script src="{{ asset('assets/dashboard/js/sweetalert/sweetalert.min.js') }}"></script>
<script type="text/javascript">
    var editor = grapesjs.init({
        container : '#gjs',
        plugins: ['grapesjs-blocks-bootstrap4','gjs-blocks-basic'],
        canvas: {
            styles: [
              'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
            ],
            scripts: [
              'https://code.jquery.com/jquery-3.3.1.slim.min.js',
              'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
              'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
            ],
        }
    });
    editor.Panels.addButton('options', {
        id: 'save-button',
        className: 'fa fa-save',
        command: 'save-command',
        attributes: { title: 'Save' },
    });
    editor.DomComponents.clear();
    editor.CssComposer.clear();

    localStorage.clear(); // Clear local storage
sessionStorage.clear(); // Clear session storage, if used

    // Set new content
    editor.setComponents(`{!! $html !!}`);
    editor.setStyle(`{!! $css !!}`);

    // Define save command
    editor.Commands.add('save-command', {
        run(editor) {
            const html = editor.getHtml();
            const css = `<style>${editor.getCss()}</style>`;
            const content = html + css;
            var xhr = $.ajax({
                type: "POST",
                url: "<?php echo route("keditorSave"); ?>",
                data: {
                    "_token": '{{ csrf_token() }}',
                    "topic_id": '{{ $Topic->id }}',
                    "html_content": content,
                    "lang": '{{ $lang }}',
                },
                success: function (result) {
                    var obj_result = jQuery.parseJSON(result);
                    if (obj_result.stat == 'success') {
                        swal({
                            title: obj_result.msg,
                            text: "",
                            html: true,
                            type: "success",
                            confirmButtonText: "{{ __("backend.close") }}",
                            confirmButtonColor: "#acacac",
                            timer: 5000,
                        });
                    } else {
                        swal({
                            title: obj_result.msg,
                            text: "",
                            html: true,
                            type: "error",
                            confirmButtonText: "{{ __("backend.close") }}",
                            confirmButtonColor: "#acacac",
                        });
                    }
                }
            });
        }
    });
</script>
</body>
</html>
