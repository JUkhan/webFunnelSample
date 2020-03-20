(function($) {
  function loadMap(data) {
    var myLatLng = data.location;

    var map = new google.maps.Map(document.getElementById("map-container"), {
      zoom: 12,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var svg = `<svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g filter="url(#filter0_d)">
    <path d="M24 42.5C24 30.6259 33.6259 21 45.5 21C57.3741 21 67 30.6259 67 42.5C67 54.3741 57.3741 64 45.5 64H29.8636C26.6252 64 24 61.3748 24 58.1364V42.5Z" fill="white"/>
    </g>
    <circle cx="45.5" cy="42.5" r="18.5857" fill="url(#pattern0)" stroke="white" stroke-width="4"/>
    <defs>
    <filter id="filter0_d" x="0" y="0" width="91" height="91" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
    <feOffset dy="3"/>
    <feGaussianBlur stdDeviation="12"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0" transform="translate(0 -0.247664) scale(0.00934579)"/>
    </pattern>
    <image id="image0" width="107" height="160" xlink:href="{{imageData}}"/>
    </defs>
    </svg>
    `;
    toDataURL(data.image).then(res => {
      var icon = {
        // url: "/images/friendPin.svg"
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(svg.replace("{{imageData}}", res))
        //anchor: new google.maps.Point(25, 50),
        //scaledSize: new google.maps.Size(50, 50)
      };
      new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon
        //icon: data.image
      });
    });
  }
  const toDataURL = url =>
    fetch(url)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
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
    setButtonText(el, "DOWNLOAD");
    var str = ` <div>
      <p class="text-center font-weight-bold mt-2">${data.title1}</p>
      <p class="text-center">${data.title2}</p>
    </div>`;
    el.prepend($(str));
  }
  function renderReferral(el, data) {
    setButtonText(el, "JOIN AND DOWNLOAD");
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
    setButtonText(el, "RSVP AND DOWNLOAD");
    var str = `<div class="pt-2 container">
    <div class="event">
    <div class="text-right"><i class="${
      data.eventClass
    }"/></div><span class="font-weight-bold mt-2">${data.title1}</span>
    <i/><div><i class="address"/> <span>${data.address}<span></div>
    <i/><div class="mt-1"><i class="calender"/> <span>${data.date}</span></div>
    <i/><div>Going: ${data.images
      .map(i => `<img src="${i}" class="image p-1"/>`)
      .join("")}</div>
    </div>
    <p class="text-center">${data.title2}</p>
  </div>`;
    el.prepend($(str));
  }
  function setButtonText(el, str) {
    el.find("button").text(str);
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
