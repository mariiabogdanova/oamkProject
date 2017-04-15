<?php
define('parentFile', 1);
require_once('db_include.php');
$adminid= $_POST["uid_simple"];
$atoken = $_POST["atoken_simple"];
$type = $_POST["typehere_simple"];
            if ((!empty($_FILES["uploadLogo_simple"])) && ($_FILES['uploadLogo_simple']['error'] == 0)) {
                $filename = basename($_FILES['uploadLogo_simple']['name']);
                $ext      = substr($filename, strrpos($filename, '.') + 1);
                if ((($ext == "jpg"||$ext == "JPG"||$ext == "JPEG"||$ext == "jpeg")&&($_FILES["uploadLogo_simple"]["type"] == "image/jpeg") ) || (($ext == "png" || $ext == "PNG") && ($_FILES["uploadLogo_simple"]["type"] == "image/png")) ) {
                    $url= ROOT."/assets/news_images/";
                $newname       = $url . '/' . preg_replace('/\s+/','_',$filename);
                    if (!file_exists($newname)) {
                        if ((move_uploaded_file($_FILES['uploadLogo_simple']['tmp_name'], $newname))) 
                              $outmsg="Logo uploaded successfully.";
						echo("Asdfafds");
                             ?>
                            <script src="../assets/js/jquery.min.js"></script>
                            <script>
                                $(function(){
                                 parent.afterLogoUpload("<?PHP echo $filename;?>","");
                                 parent.loadedlogos("Success","<?PHP echo $outmsg;?>");
                                })
                            </script>
                            <?PHP 
                        } 
					else {
							?>
							<script src="../assets/js/jquery.min.js"></script>
                            <script>
                                $(function(){
                             
                                parent.loadedlogos("Error","A problem occurred during file upload!");
                                })
                                
                            </script><?PHP
                        }
                    } else {?>
				<script src="../assets/js/jquery.min.js"></script>
                            <script>
                                $(function(){
                             
                                parent.loadedlogos("Error","You are submitting a file that already exists, please select another file.");
                                })
                                
                            </script>
				<?PHP
                    }
                } else {?>

<script src="../assets/js/jquery.min.js"></script>
                    <script>
                                $(function(){
                            
                                parent.loadedlogos("Error","You are submitting a file type that is not allowed.  The permitted file types are: .jpg, .jpeg, .png");
                                })
                                
                            </script>
<?PHP
                }
            
?>