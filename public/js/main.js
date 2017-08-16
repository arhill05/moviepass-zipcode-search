$(function() {
  const loading = $('#loading'),
    theaters = $('#theaters'),
    btn = $('#go-button'),
    zip = $('#zip');

  let requesting = false;

  function getTheaters() {
    let zipcode = zip.val();
    if(!zipcode.length || this.disabled) { return; }

    this.disabled = true;

    theaters.html("");
    loading.show();

    $.get('http://mdudetm.com/moviepass/api/theaters/' + zipcode, renderTheaters).fail(renderError);
  };

  const renderError = (res) => {
    btn.prop('disabled', false);
    loading.hide();
    theaters.html(res.responseText + ' Please try again.');
  };

  const renderTheaters = (data) => {
    let theaterData = [];
    try {
      theaterData = JSON.parse(data).theaters;
    } catch (e) {
      console.error(e);
    }

    let fullMarkup = 'No results found';
    if (theaterData.length !== 0) {
      theaterData.forEach(theater => {
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

    theaters.html(fullMarkup);
    loading.hide();
    btn.prop('disabled', false);
  };

  loading.hide();
  btn.click(getTheaters);
  zip.keypress(function(e) {
    if (e.which === 13) {
      getTheaters.call(btn[0]);
    }
  });
})
