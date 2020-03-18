import {
  Component,
  Prop,
  h,
  State,
  Method,
  Event,
  EventEmitter
} from "@stencil/core";
//import { format } from "../../utils/utils";

export interface FunnelState {
  phoneNumber: string;
  isValid: boolean;
  title1: string;
  title2: string;
  image?: string;
  location?: { lat: number; lng: number };
  category?: "group" | "referral" | "event";
}

@Component({
  tag: "web-funnel",
  styleUrl: "web-funnel.css",
  shadow: false
})
export class WebFunnel {
  /**
   * api base url
   */
  @Prop() apiUrl: string;

  /**
   * api end point to get titles
   */
  @Prop() getInvitationInfo: string;

  /**
   * api end point to save data (mobile number and user token number)
   */
  @Prop() savePhoneNumber: string;

  /**
   * logo image path
   */
  @Prop() logoImgPath: string;

  // private getText(): string {
  //   return format(this.first, this.middle, this.last);
  // }
  @Prop() mapApiKey: string;

  @State() state: FunnelState = {
    phoneNumber: "",
    isValid: false,
    title1: "",
    title2: "",
    category: "group"
  };
  @Method()
  async setData(data: FunnelState) {
    this.state = { ...this.state, ...data };
    if (data.category === "referral") {
      this.injectSDK().then(() => {
        this.loadMap();
      });
    }
  }
  @Event({ eventName: "submitFunnel" }) submitFunnel: EventEmitter;
  submitForm = () => {
    if (!(this.apiUrl && this.savePhoneNumber)) {
      this.submitFunnel.emit({
        phoneNumber: this.state.phoneNumber,
        token: this.getToken()
      });
      return;
    }
    fetch(this.apiUrl + this.savePhoneNumber, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phoneNumber: this.state.phoneNumber,
        token: this.getToken()
      }),
      method: "post"
    })
      .then(res => res.json())
      .then(() => {
        window.location.href =
          "https://apps.apple.com/us/app/kickit-find-your-people/id1493314888?ls=1";
      })
      .catch(() => {
        alert("Please try again later.");
      });
  };

  validatePhone = (event: any) => {
    const val = event.target.value;
    this.state = {
      ...this.state,
      phoneNumber: val,
      isValid: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/.test(
        val
      )
    };
  };

  getToken() {
    return window.location.href.substr(
      window.location.href.lastIndexOf("/") + 1
    );
  }
  //componentWillLoad
  componentDidLoad() {
    if (!(this.apiUrl && this.getInvitationInfo)) return;
    fetch(
      this.apiUrl + this.getInvitationInfo + `/${this.getToken() || "group"}`
    )
      .then(res => res.json())
      .then(res => {
        this.state = { ...this.state, ...res };
        console.log(this.state);
        if (this.state.category === "referral") {
          this.injectSDK().then(() => {
            this.loadMap();
          });
        }
      });
  }

  Group() {
    return (
      <div>
        <p class="text-center font-weight-bold mt-2">{this.state.title1}</p>
        <p class="text-center">{this.state.title2}</p>
      </div>
    );
  }

  Referral() {
    return (
      <div>
        <p class="text-centerx font-weight-bold mt-2">
          <img class="image" src={this.state.image}></img>
          <span class="pl-2">{this.state.title1}</span>
        </p>
        <p id="map-container"></p>
        <p class="text-centerx">{this.state.title2}</p>
      </div>
    );
  }

  Event() {
    return (
      <div>
        <p class="text-center font-weight-bold mt-2">{this.state.title1}</p>
        <p>Other info goes here</p>
        <p class="text-center">{this.state.title2}</p>
      </div>
    );
  }

  getButtonText() {
    return this.state.category === "group"
      ? "DOWNLOAD"
      : this.state.category === "referral"
      ? "JOIN AND DOWNLOAD"
      : "RSVP AND DOWNLOAD";
  }

  render() {
    const invitationInfo =
      this.state.category === "group"
        ? this.Group()
        : this.state.category === "referral"
        ? this.Referral()
        : this.Event();
    return (
      <div>
        {this.logoImgPath && (
          <div class="text-center mt-2">
            <img src={this.logoImgPath} alt="logo" class="mb-2" />
          </div>
        )}
        {invitationInfo}

        <div>
          <div class="form-group">
            <input
              onInput={e => this.validatePhone(e)}
              value={this.state.phoneNumber}
              type="text"
              class="form-control"
              placeholder="Enter Phone number"
            />
          </div>
          <div class="form-group">
            <button
              onClick={this.submitForm}
              disabled={!this.state.isValid}
              type="button"
              class="btn btn-primary btn-block"
            >
              {this.getButtonText()}
            </button>
          </div>
        </div>
        <div class="text-center mt-4">
          <div>Your privacy and trust are our top priorities.</div>
          <div>We promise to never, ever sell your data.</div>
        </div>
      </div>
    );
  }

  loadMap() {
    var myLatLng = this.state.location;

    var map = new google.maps.Map(document.getElementById("map-container"), {
      zoom: 7,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: this.state.image
    });
  }
  mapsLoaded: boolean = false;
  componentDidUnload() {}
  injectSDK(): Promise<any> {
    return new Promise(resolve => {
      window["mapInit"] = () => {
        this.mapsLoaded = true;
        resolve(true);
      };
      let script = document.createElement("script");
      script.id = "googleMaps";

      if (this.mapApiKey) {
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=" +
          this.mapApiKey +
          "&callback=mapInit";
      } else {
        script.src = "https://maps.googleapis.com/maps/api/js?callback=mapInit";
      }

      document.body.appendChild(script);
    });
  }
}
