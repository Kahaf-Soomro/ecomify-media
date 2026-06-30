<?php
header('Content-Type: application/json');
header('Cache-Control: no-cache');

 $dir = __DIR__;
 $files = [];

foreach (scandir($dir) as $f) {
    if (preg_match('/\.(jpe?g|png|webp|gif)$/i', $f)) {
        $files[] = 'public/reviews/' . $f;
    }
}

usort($files, function($a, $b) use ($dir) {
    return filemtime($dir . '/' . basename($b)) - filemtime($dir . '/' . basename($a));
});

echo json_encode($files);
