$(document).ready(function () {

$('head').append("<link rel='stylesheet' href='stylesheets/styleads.css' type='text/css' />");
  $('img').each(function (){





    if( $(this).width() >= 500 && $(this).height() >= 300  )
    {


      $( this).wrap( "<div class='inImage-warper'></div>" );



    $.post("../system.php",
    {
        url: 'http://' +  window.location.hostname  +  window.location.pathname + window.location.search
    },
    function(data, status){
      console.log(data);
      var adsArray =  JSON.parse(data);
      console.log(adsArray);

      for(var i =0 ; i < adsArray.length ; i++)
      {
        $('.inImage-warper').append("<div class='inImage-box' >  </div>  ");




        $('.inImage-warper ').children().last().css({
          left : ( $('.inImage-warper').width()/2 )  * i ,
          top :( $('.inImage-warper').height()/2 )  * i
        })




        $('.inImage-warper').children().last().append("<span  class='inImage-icon' >  </span>  ");
        $('.inImage-warper').children().last().children().first().append("<i class='fa fa-star' >  </i>  ");
        $('.inImage-warper ').children().last().append("<div class='ball ball-1' >  </div>  ");
        $('.inImage-warper ').children().last().append("<div class='ball ball-2' >  </div>  ");
        $('.inImage-warper ').children().last().append("<div class='ball ball-3' >  </div>  ");
        $('.inImage-warper ').children().last().append("<div class='ball ball-4' >  </div>  ");

      $('.inImage-warper ').children().last().append("<div class='inImage-ads'> </div>" )
      $('.inImage-warper').children().last().children().last().append("<span class='title'> "+adsArray[i][0][1] +"  </span>")
      $('.inImage-warper').children().last().children().last().append("<img src=   '" + "../"+ adsArray[i][0][2] +"'  />  ")

      $('.inImage-warper').children().last().children().last().append("<span class='content'> "+adsArray[i][0][3]  +" </span>")


      }



    });










/*
        $('.in-image-view').css('position' , 'relative');

        $('.in-image-view').wrap("<div class='in-image-warper'></div>");

        $('.in-image-warper').css('max-width' , '100%');

        $('.in-image-view').append("<i class='icon-thumbs-up'></i>");
        $('.icon-thumbs-up').css("position" , 'absolute');
        $('.icon-thumbs-up').css("top" , '0px');
        $('.icon-thumbs-up').css("left" , '0px');

*/
    }

  });





});
