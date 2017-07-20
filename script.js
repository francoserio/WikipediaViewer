$(document).ready(function() {
  var input = $('#textToSearch');

  function search() {
    
    var inputText = input.val();
    if (inputText == "") {
      document.getElementById("textToSearch").style.borderColor = "#FF0000";
      $('[data-toggle="tooltip"]').tooltip();
    } else {
      $('[data-toggle="tooltip"]').tooltip("hide");
      document.getElementById("textToSearch").style.borderColor = "#ccc";
      var apiurl = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=2&exlimit=max&gsrsearch=" + inputText + "&gsrprop=size%7Cwordcount%7Ctimestamp%7Csnippet&callback=?";
      $.ajax({
        type: "GET",
        url: apiurl,
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
          var iterate = data["query"]["pages"];
          var main = $("main");
          main.html("");
          for (var test in iterate) {
            var row = $("<div>", {
              "class": "row"
            });
            var well = $("<div>", {
              "class": "well"
            });
            var title = $("<h2>", {
              "class": "text-primary"
            });

            title.append(iterate[test]["title"]);

            var paragh = $("<h4>", {
              "class": "text-muted"
            });
            paragh.append(iterate[test]["extract"]);

            var paragh2 = $("<p>", {
              "style": "text-align:right"
            });

            var link = $("<a>", {
              "href": "https://en.wikipedia.org/wiki/?curid=" + iterate[test]["pageid"],
              "target": "_blank"
            });

            link.append("more info...");

            paragh2.append(link);

            if (iterate[test].hasOwnProperty("thumbnail")) {
              var photo = $("<div>", {
                "class": "right"
              });
              var source = iterate[test]["thumbnail"]["source"];
              photo.html("<img src='" + source + "'/>");
              well.prepend(photo);
            }
            well.append(title);
            well.append(paragh);
            well.append(paragh2);
            row.append(well);
            main.append(row);

            $("footer").css({
              "position": "static",
              "bottom": "0"
            });
          }

          $("#textToSearch").val("");
        }

      });
    }

  }

  $(function() {
    $("form").submit(function() {
      return false;
    });
  });

  $("#SearchButton").on("click", function() {
    search();
  });

  $("#textToSearch").keyup(function(event) {
    if (event.keyCode == 13) {
      search();
      // Do search
      event.preventDefault();

    }
  });

  if ($('#goTop').length) {
    var scrollTrigger = 2500, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#goTop').show();
            } else {
                $('#goTop').hide();
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#goTop').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}

});