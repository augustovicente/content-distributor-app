<?php
    // allowing apps
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Accept");
    // declarations
    function post($postData, $url, $is_put)
    {
        $ch = curl_init();
        if($is_put)
        {
            curl_setopt($ch, CURLOPT_PUT, true);
        }
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        $headers = array(
            "Content-Type: application/json"
        );
        //Set the headers that we want our cURL client to use.
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        $response = curl_exec($ch);
        if($response === false)
        {
            return 'Curl error: ' . curl_error($ch);
        }
        else
        {
            curl_close($ch);
            return $response;
        }
    }
    if($_GET["act"] === "yt")
    {
        echo file_get_contents("./canal.json");
    }
    else if($_GET["act"] === "event")
    {
        $res = json_decode(file_get_contents("https://devborghesi-a4bb8.firebaseio.com/event.json"));
        foreach ($res as $index => $objVal)
        {
            $firstKey = $res->$index;
        }
        echo json_encode($firstKey);
    }
    else if($_GET["act"] === "config")
    {
        echo file_get_contents("https://devborghesi-a4bb8.firebaseio.com/config.json");
    }
    else if($_GET["act"] === "isAvaliation")
    {
        echo file_get_contents("https://devborghesi-a4bb8.firebaseio.com/config/iosAvaliation.json");
    }
    else if($_GET["act"] === "save" && $_SERVER['REQUEST_METHOD'] === "GET")
    {
        $post = '"'.$_GET["timestamp"].'"';
        post($post, 'https://devborghesi-a4bb8.firebaseio.com/opened_notify/'.$_GET["notify"].'.json', false);
    }
    else if($_GET["act"] === "token" && $_SERVER['REQUEST_METHOD'] === "GET")
    {
        $post = '"'.$_GET["token"].'"';
        echo post($post, 'https://devborghesi-a4bb8.firebaseio.com/tokens.json', false);
    }
?>