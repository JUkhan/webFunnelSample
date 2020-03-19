(function($) {
  function loadMap(data) {
    var myLatLng = data.location;

    var map = new google.maps.Map(document.getElementById("map-container"), {
      zoom: 7,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: data.image
    });
  }
  function injectSDK(mapApiKey) {
    return new Promise(resolve => {
      window["mapInit"] = () => {
        resolve(true);
      };
      let script = document.createElement("script");
      script.id = "googleMaps";

      if (mapApiKey) {
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=" +
          mapApiKey +
          "&callback=mapInit";
      } else {
        script.src = "https://maps.googleapis.com/maps/api/js?callback=mapInit";
      }

      document.body.appendChild(script);
    });
  }
  function getToken() {
    return window.location.href.substr(
      window.location.href.lastIndexOf("/") + 1
    );
  }
  function renderForm(el) {
    var str = `<div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Phone number"
          />
        </div>
        <div class="form-group">
          <button
            type="button"
            disabled
            class="btn btn-primary btn-block"
          >
            Download
          </button>
        </div>
        <div class="text-center mt-4">
          <div>Your privacy and trust are our top priorities.</div>
          <div>We promise to never, ever sell your data.</div>
        </div>
      </div>`;
    var form = $(str);
    var btn = form.find("button");
    var input = form.find("input");
    var regex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

    input.on("keyup", function(el) {
      btn.attr("disabled", !regex.test(el.target.value));
    });
    btn.on("click", function() {
      el.submit({ phoneNumber: input.val(), token: getToken() });
    });
    setTimeout(() => {
      input.focus();
    }, 1000);

    el.append(form);
  }
  function renderGroup(el, data) {
    var str = ` <div>
      <p class="text-center font-weight-bold mt-2">${data.title1}</p>
      <p class="text-center">${data.title2}</p>
    </div>`;
    el.prepend($(str));
  }
  function renderReferral(el, data) {
    var str = `<div>
        <p class="text-centerx font-weight-bold mt-2">
          <img class="image" src=${data.image}></img>
          <span class="pl-2">${data.title1}</span>
        </p>
        <p id="map-container"></p>
        <p class="text-centerx">${data.title2}</p>
      </div>`;
    el.prepend($(str));
  }
  function renderEvent(el, data) {
    var str = `<div>
    <p class="text-center font-weight-bold mt-2">${data.title1}</p>
    <p>Other info goes here</p>
    <p class="text-center">${data.title2}</p>
  </div>`;
    el.prepend($(str));
  }
  $.fn.funnel = function(config) {
    var el = $(this);
    el.submit = config.submit || function() {};
    el.setData = function(data) {
      if (data.category === "group") {
        renderGroup(el, data);
      } else if (data.category === "referral") {
        renderReferral(el, data);
        injectSDK(config.mapApiKey).then(function() {
          loadMap(data);
        });
      } else if (data.category === "event") {
        renderEvent(el, data);
      }
    };
    renderForm(el);
    config.init && config.init(el, getToken());
  };
})(jQuery);
