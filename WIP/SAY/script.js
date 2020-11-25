// ------------------------------------
// ------------------------------------

$( document ).ready(function() {
  $("h1").html("Say: View Glacier Park");
  $('div.move').each(function(i) {
    $(this).addClass('small-vibe' + i);
  });
  // $('div.move').each(function(i, obj) {
  //   $(this).removeClass('small-vibe' + i);
  //   $(this).addClass('big-vibe' + i);
  // });
  setTimeout(function() {
    $("h1").toggleClass('slide-in');
  }, 1000);
});

if (annyang) {
  annyang.addCallback('result', function() {
    console.log('soundstart');
    $('div.move').each(function(i, obj) {
      $(this).removeClass('big-vibe' + i);
    });
  });

  annyang.addCallback('end', function() {
    console.log('ended');
    //restart();
    $('div.move').each(function(i, obj) {
      $(this).removeClass('big-vibe' + i);
      $(this).addClass('small-vibe' + i);
    });
  });

  annyang.addCallback('result', function() {
    console.log('result');
    //restart();
    $('div.move').each(function(i, obj) {
      $(this).removeClass('big-vibe' + i);
      $(this).addClass('small-vibe' + i);
    });  
  });

  var commands = {
    '(view) glacier park': function() {
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: 'https://peterdoes.it/gnp-tmp/gallery.json?=',
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        beforeSend: function(){
          $("h1").html("Getting thumbnails...");
          $('.overlay, .loader').fadeIn('fast');
        },
        complete: function(){
          $('.overlay, .loader').fadeOut('fast');
          // setTimeout(function() {
          //   $("h1").html("Say: 'View Arches Park' ").toggleClass('slide-in')
          // }, 3000);
        },
        success: function(data, status) {
          $("h1").html("Success!");
          var imgList= "";
          $.each(data.images, function () {
            imgList += '<img src= "https://peterdoes.it/gnp-tmp/' + this.imgPath + '">';
          });
          $('#imgList').append(imgList);
        },
        error : function(jqXHR,textStatus,errorThrown) {
          $("h1").html("Error: " + textStatus + "<br> Response Code: " + jqXHR.status);
          $("h1").addClass('slide-in');
        }
      });


    },
  }; // commands
  annyang.addCommands(commands);
  annyang.start();
}