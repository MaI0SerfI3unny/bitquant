<?php

    class Proxy
    {
        public static $config = [];
        public static $curl;

        public static function setProxy() {
            $count = count( self::$config[ 'proxy' ]) -1;
            $index = random_int( 0, $count );

            $proxy = self::$config[ 'proxy' ][ $index ];
            $proxy_type = CURLPROXY_SOCKS5;

            switch ( $proxy[ 'type' ] ) {
                case __PROXY_SOCKS5:
                    $proxy_type = CURLPROXY_SOCKS5;
                    break;

                case __PROXY_HTTP :
                    $proxy_type = CURLPROXY_HTTP;
                    break;

                case __PROXY_HTTPS :
                    $proxy_type = CURLPROXY_HTTPS;
                    break;
            }

            curl_setopt( self::$curl, CURLOPT_PROXYTYPE, $proxy_type );
            curl_setopt( self::$curl, CURLOPT_PROXY, $proxy[ 'host' ] . ':' . $proxy[ 'port' ]);
            curl_setopt( self::$curl, CURLOPT_PROXYUSERPWD, $proxy[ 'login' ] . ':' . $proxy[ 'pass' ]);
        }

        public static function run() {

            self::$config = require_once __DIR__ . '/config.php';
            $json = file_get_contents('php://input');
            if ( $json == '' ) die( 'request error' );




            $json = json_decode( $json, true );
            $is_post = ( isset( $json[ 'request' ] ) AND $json[ 'request' ] == 'POST' );
            $debug   = ( isset( $json[ 'debug' ] ) AND $json[ 'debug' ] == true );

            $url = ( isset( $json[ 'url' ] ) AND $json[ 'url' ] != '' ) ? $json[ 'url' ] : false;
            if ( !$url ) die( 'url error' );

            $headers = (isset( $json[ 'headers' ] ) AND is_array( $json[ 'headers' ] )) ? $json[ 'headers' ] : [];
            $params  = (isset( $json[ 'params' ] )) ? $json[ 'params' ] : "";

            $_headers = [];
            foreach( $headers as $name => $value ) {
                 $_headers[] = $name . ': ' . $value;
            }
            $headers = $_headers;

            $options = [
                CURLOPT_RETURNTRANSFER => true,

                CURLOPT_HEADER         => (bool)$debug,
                CURLINFO_HEADER_OUT    => (bool)$debug,

                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_ENCODING       => "gzip",
                CURLOPT_USERAGENT      => static::$config[ 'agent' ],
                CURLOPT_AUTOREFERER    => true,
                CURLOPT_CONNECTTIMEOUT => 120,
                CURLOPT_TIMEOUT        => 120,
                CURLOPT_MAXREDIRS      => 10,
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_URL            => $url,
                CURLOPT_POST           => $is_post,
                CURLOPT_HTTPHEADER     => $headers,
                CURLOPT_COOKIEFILE     => __DIR__ . '/runtime/cookie.txt',
                CURLOPT_COOKIEJAR      => __DIR__ . '/runtime/cookie.txt',
            ];

            if ( $is_post ) {
                 $options[ CURLOPT_POSTFIELDS ] = $params;
            }

            curl_setopt( self::$curl, CURLOPT_VERBOSE, true);

            self::$curl = curl_init();
            curl_setopt_array( self::$curl, $options );

            self::setProxy();
            $response = curl_exec( self::$curl );
            $headers  = curl_getinfo( self::$curl, CURLINFO_HEADER_OUT);

            if ( $debug ) {
                 echo "REQUEST:\n";
                 print_r( $headers );

                 echo "\n";
                 print_r( $params );
                 echo "\n\n";
            }

            curl_close( self::$curl );

            if ( $debug ) {
                 echo "RESPONSE:\n";

                 var_dump( $response );
            } else {
                ob_end_flush();
            }

            die( $response );
        }
    }

    Proxy::run();