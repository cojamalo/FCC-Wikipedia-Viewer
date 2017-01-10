$('input').focus(function() {
  $('meta').attr("content","user-scalable=0");}
);

$('#submit').click(function(event) {
  event.preventDefault();
  document.activeElement.blur();
  $('meta').attr("content","user-scalable=1");
  $('.edges').css('margin', 'auto')
  $('.text').text('loading . . .');
  
  var q = $('#search-box1').val();
  
  $.ajax({
    type:"GET",
    dataType: "jsonp",
    data: {
      action: "query",
      generator: "search",
      gsrnamespace: "0",
      gsrlimit: "10",
      prop: "pageimages|extracts",
      pilimit: "max",
      exsentences: "1",
      exlimit: "max",      
      gsrsearch: q,
      format: "json"
    },
    url:"https://en.wikipedia.org/w/api.php?&exintro&explaintext",
    success: function(response) {
      $('.text').html('');
            
      var data = response.query.pages;
      var keys = Object.keys(data);
      
      var i = 0;                     //  set your counter to 1

      function myLoop() {           //  create a loop function
          setTimeout(function () {    //  call a 3s setTimeout when the loop is called
            if (data[keys[i]].hasOwnProperty('thumbnail')) {
        
              var img = data[keys[i]].thumbnail.source;
          
              var arr = img.split('px');
              arr[0] = arr[0].slice(0,-2);
                              
              img = arr[0] + "150px" + arr[1];
                
              $('.text').append('<div class="row hoverable edges clear slideInRight animated" id="'+i+'"><a href="https://en.wikipedia.org/wiki/'+ data[keys[i]].title +'" target="_blank"><div class="col s3 parent"><img src="'+img+'" class="vert"></div><div class="col s9"><h4>' + data[keys[i]].title +  '</h4><p>' + data[keys[i]].extract +  '</p></div></a></div>');
             
            }
        
            else {
              $('.text').append('<div class="row hoverable edges clear slideInRight animated" id="'+i+'"><a href="https://en.wikipedia.org/wiki/'+ data[keys[i]].title +'" target="_blank"><div class="col s3"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/150px-Wikipedia-logo-v2-en.svg.png"></div><div class="col s9"><h4>' + data[keys[i]].title +  '</h4><p>' + data[keys[i]].extract +  '</p></div></a></div>');
            }         //  your code here
            i++;                     //  increment the counter
            if (i < 11) {            //  if the counter < 10, call the loop function
               myLoop();             //  ..  again which will trigger another 
            } 
            
          }, 00)
      }
      myLoop();
      setTimeout(function() {
        $('.text').append('<p class="disamb">For more results, see <a href="https://en.wikipedia.org/wiki/'+q+'_(disambiguation)" target="_blank">'+q+' (disambiguation).</a></p>');
      }, 1000)
      
      var j = 0;
      function myLoopToo() {           //  create a loop function
          setTimeout(function () {
            $('#' + j).fadeTo(222,1);
            j++;                     //  increment the counter
            if (j < 11) {            //  if the counter < 10, call the loop function
               myLoopToo();             //  ..  again which will trigger another 
            }
          }, 222)
      }
      myLoopToo();
    /*  for (var i = 0; i < 10; i++) {
                
        if (data[keys[i]].hasOwnProperty('thumbnail')) {
        
          var img = data[keys[i]].thumbnail.source;
          
          var arr = img.split('px');
          arr[0] = arr[0].slice(0,-2);
                              
          img = arr[0] + "125px" + arr[1];
                
        $('.text').append('<div class="row hoverable edges"><a href="https://en.wikipedia.org/wiki/'+ data[keys[i]].title +'" target="_blank"><div class="col s3"><img src="'+img+'"></div><div class="col s9"><h4>' + data[keys[i]].title +  '</h4><p>' + data[keys[i]].extract +  '</p></div></a></div>');
                 
      }
        
        else {
          $('.text').append('<div class="row hoverable edges"><a href="https://en.wikipedia.org/wiki/'+ data[keys[i]].title +'" target="_blank"><div class="col s3"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wikipedia-logo-v2-en.svg/150px-Wikipedia-logo-v2-en.svg.png"></div><div class="col s9"><h4>' + data[keys[i]].title +  '</h4><p>' + data[keys[i]].extract +  '</p></div></a></div>');
        }
      }*/
    },
        
  }).done(function() { console.log('SUCCESS :)'); })
 .fail(function() { console.log('FAIL :('); })
 .always(function() { console.log('Doh, I\'m fired anyway'); });;
  
  
});



$('#random').click(function() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
});