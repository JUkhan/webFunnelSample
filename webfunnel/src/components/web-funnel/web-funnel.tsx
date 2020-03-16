import { Component, Prop, h, State } from "@stencil/core";
//import { format } from "../../utils/utils";
export interface FunnelState {
  phoneNumber: string;
  isValid: boolean;
  title1: string;
  title2: string;
  category?: "group" | "user" | "event";
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

  @State() state: FunnelState = {
    phoneNumber: "",
    isValid: false,
    title1: "",
    title2: ""
  };
  submitForm = () => {
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

  componentWillLoad() {
    fetch(this.apiUrl + this.getInvitationInfo + `/${this.getToken()}`)
      .then(res => res.json())
      .then(res => {
        this.state = { ...this.state, ...res };
        console.log(this.state);
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
        <p class="text-center font-weight-bold mt-2">{this.state.title1}</p>
        <p>Map goes here</p>
        <p class="text-center">{this.state.title2}</p>
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
      : this.state.category === "user"
      ? "JOIN AND DOWNLOAD"
      : "RSVP AND DOWNLOAD";
  }

  render() {
    const invitationInfo =
      this.state.category === "group"
        ? this.Group()
        : this.state.category === "user"
        ? this.Referral()
        : this.Event();
    return (
      <div>
        <div class="text-center mt-2">
          <img src={this.logoImgPath} alt="logo" class="mb-2" />
        </div>
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
}
