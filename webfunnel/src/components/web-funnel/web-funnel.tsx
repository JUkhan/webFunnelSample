import { Component, Prop, h, State } from "@stencil/core";
//import { format } from "../../utils/utils";
export interface FunnelState {
  phoneNumber: string;
  isValid: boolean;
  title1: string;
  title2: string;
  buttonText: string;
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
  @Prop() getTitles: string;

  /**
   * api end point to save data (mobile number and user token number)
   */
  @Prop() saveData: string;

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
    title2: "",
    buttonText: "Download"
  };
  submitForm = () => {
    console.log(this.state);
  };
  validatePhone = (event: any) => {
    const val = event.target.value;
    this.state = {
      ...this.state,
      phoneNumber: val,
      isValid: /^\(\d+\)\s\d+-\d+$/.test(val)
    };
  };
  componentWillLoad() {
    fetch(this.apiUrl + this.getTitles + `/token101`)
      .then(res => res.json())
      .then(res => {
        this.state = { ...this.state, ...res };
      });
  }
  render() {
    return (
      <div>
        <div class="text-center mt-2">
          <img src={this.logoImgPath} alt="logo" class="mb-2" />
        </div>
        <p class="text-center font-weight-bold mt-2">{this.state.title1}</p>
        <p class="text-center">{this.state.title2}</p>

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
              {this.state.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
