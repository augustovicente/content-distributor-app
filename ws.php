<?php
    // allowing apps
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Accept");
    // declarations
    function post($postData, $url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
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
        $res = file_get_contents("./canal.json");
        echo $res;
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
    else if($_GET["act"] === "save" && $_SERVER['REQUEST_METHOD'] === "GET")
    {
        $post = '{	
            "timestamp": "'.$_GET["timestamp"].'", 
            "user": "'.$_GET["user"].'", 
            "notify": "'.$_GET["notify"].'",
            "teste": "'.date_timestamp_get(new DateTime()).'"
        }';
        post($post, 'https://devborghesi-a4bb8.firebaseio.com/opened_notify.json');
    }
?>