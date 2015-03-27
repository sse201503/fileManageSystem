<?php

$folder = md5(time().rand(1,99999));
            $url = "../upload/1314/";
            mkdir($url,0777);
            mkdir($url.$folder,0777);

?>