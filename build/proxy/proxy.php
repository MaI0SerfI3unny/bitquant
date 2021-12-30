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

            $url = $_REQUEST['_url'] ?? false;
            if ( !$url || $url == '' ) die( 'url invalid' );

            unset( $_GET[ '_url' ]);
            unset( $_POST[ '_url' ]);

            $debug = isset( $_REQUEST[ 'debug' ]);

            if ( count( $_GET ) != 0 ) {
                 $url .= '?' . http_build_query( $_GET );
            }

            self::$config = require_once __DIR__ . '/config.php';

            $is_post = $_SERVER[ 'REQUEST_METHOD' ] == 'POST';

            $headers = [
                'X-MBX-APIKEY: GaTI3Xvy99NoFZlbqU3jFqeHoM3An2pLRlDh6rOEl9KEVTaeAB7l3svidNFj4WNd',
            ];

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
                 $options[ CURLOPT_POSTFIELDS ] = $_POST;
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
                 print_r( $_POST );
            }

            curl_close( self::$curl );

            if ( $debug ) {
                 echo "RESPONSE:\n";
            } else {
                ob_end_flush();
            }

            die( $response );
        }
    }

    Proxy::run();