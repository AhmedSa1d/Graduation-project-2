<?php

class Bootstrap {

    function __construct() {

        $page = isset($_GET['page']) ? $_GET['page'] : NULL;
        $page = trim($page);
        $page = explode('/', $page);

        // print_r($page);
        if (empty($page[0])) {
            require 'controller/index.php';
            $controller = new Index();
            $controller->index();
            return false;
        }

        $file = 'controller/' . $page[0] . '.php';
        if (file_exists($file)) {
            require $file;
        } else {
            $file2 = 'controller/error.php';
            require $file2;
            $controller = new Error();
            return FALSE;
        }

        $controller = new $page[0];
        $controller->LoadModel($page[0]);

        if (isset($url[2])) {
            if (method_exists($controller, $url[1])) {
                $controller->{$url[1]}($url[2]);
            } else {
                $this->error();
            }
        } else {
            if (isset($url[1])) {
                if (method_exists($controller, $url[1])) {
                    $controller->{$url[1]}();
                } else {
                    $this->error();
                }
            } else {
                $controller->index();
            }
        }
    }
    function error(){
        require 'controller/error.php';
        $controller=new Error();
        $controller->index();
        return FALSE;
    }

}
