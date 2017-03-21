<?php
$LIVE_SITE=false;
$LOCAL_SITE=true;
$STAGE_SITE=false;
$PRE_STAGE_SITE=false;
if($LIVE_SITE==true)
{ 
}else if($PRE_STAGE_SITE==true){

}
else if($STAGE_SITE==true)
{

}
else if($LOCAL_SITE==true)
{
defined( 'parentFile' ) or die( 'You Can Not Access This File' );
define( "DATABASE_SERVER", "localhost" );
define( "DATABASE_NAME", "menproject" );
define( "DATABASE_USERNAME", "root" );
define( "DATABASE_PASSWORD", "" );
define("USER_ROLE_ADMIN",10);
define("USER_ROLE_USERS",5);
define("ROOT",$_SERVER['DOCUMENT_ROOT']);
date_default_timezone_set('America/Los_Angeles'); 
}
define( "SMTP_ACCOUNT", "" );
define( "SMTP_PASSWORD", "");	
$mysql = @mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD) or die(mysql_error());
mysql_select_db( DATABASE_NAME );
require_once( 'common.php' );
?>