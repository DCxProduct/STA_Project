<iframe id="content-iframe" srcdoc='
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
</head>
<body>
    {!! $Topic->$details !!}
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
' style="width: 100%; height: 100%; border: none;"></iframe>

<script>
    const iframe = document.getElementById('content-iframe');

    iframe.onload = function() {
        const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
        const resizeObserver = new ResizeObserver(() => {
            iframe.style.height = iframeContent.body.scrollHeight + 'px';
        });
        resizeObserver.observe(iframeContent.body);
    };
</script>