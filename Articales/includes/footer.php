  <div id="footer">
            <div id="footer_left">
                <div id="logo2">
                    <p>ARTICLES</p>
                </div>
            </div>

            <div id="social">
                <img src="images/fc.png" id="fc"/>
                <img src="images/tw.png" id="tw"/>
                <img src="images/yt.png" id="yt"/>
                <i class="icon-thumbs-up"></i>
            </div>
            <div id="footer_cont">
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Write post</li>
                </ul>
                <div id="copyRights">
                    <p>Made with love
                     <span style="font-size:200%;color:red;">&hearts;</span>
                        Team ........ © 2016
                    </p>

                </div>
            </div>

        </div>
<?php
            //5. close database
	if(isset($connection))
	{
		mysql_close($connection);
	}

?>

  <script src="script/jquery-3.0.0.min.js"></script>

<script src="../js/main.js"></script>

    </body>
</html>
