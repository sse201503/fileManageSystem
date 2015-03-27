<?php
echo md5(time().$_POST['username'].rand(1,99999));