(function() {
  getTheaters = () => {
    $("#theaters").html("");
    $("#loading").show();
    const url = "http://localhost:3001/api/theaters/";
    const zip = $("#zip").val();
    // $.ajax({
    //   url: url + zip,
    //   type: "GET",
    //   dataType: "json",
    //   success: function(data) {
    //     console.log(data);
    //   }
    // });
    $.get(url + zip, data => {
      renderTheaters(JSON.parse(data).theaters);
    });
  };

  renderTheaters = theaters => {
    let fullMarkup = ``;
    if (theaters.length == 0) {
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
