(function() {
  getTheaters = () => {
    $("#theaters").html("");
    $("#loading").show();
    const url = "http://mdudetm.com/moviepass/api/theaters/";
    const zip = $("#zip").val();
    $.get(url + zip, data => {
      renderTheaters(JSON.parse(data).theaters);
    }).fail(function(){
      $("loading").hide();
      $("#theaters").html("Something went wrong :( <br/> Try it again soon.");
    });
  };

  renderTheaters = theaters => {
    let fullMarkup = ``;
    if (!theaters || theaters.length == 0) {
      fullMarkup = `No results found`;
    } else {
      theaters.forEach(theater => {
        let markup = `
        <div class="theater">
            <h3>${theater.name}</h3>
            <span class="theater-chain">${theater.theaterChainName}</span>
            <div class="theater-info">
                <p>${theater.address}</p>
                <p>${theater.city}, ${theater.state} ${theater.zip}</p>
                <p>Distance: ${theater.distance} mi</p>
            </div>
        </div>
        `;

        fullMarkup += markup;
      });
    }

    $("#theaters").html(fullMarkup);
    $("#loading").hide();
  };

  $("#loading").hide();
  $("#go-button").click(getTheaters);
  $("#zip").keypress(function(e) {
    if (e.which == 13) {
      getTheaters();
    }
  });
})();
