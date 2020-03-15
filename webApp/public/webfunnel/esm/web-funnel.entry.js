import { r as registerInstance, h } from './core-a8ec883a.js';

const WebFunnel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // private getText(): string {
        //   return format(this.first, this.middle, this.last);
        // }
        this.state = {
            phoneNumber: "",
            isValid: false,
            title1: "",
            title2: "",
            buttonText: "Download"
        };
        this.submitForm = () => {
            console.log(this.state);
        };
        this.validatePhone = (event) => {
            const val = event.target.value;
            this.state = Object.assign(Object.assign({}, this.state), { phoneNumber: val, isValid: /^\(\d+\)\s\d+-\d+$/.test(val) });
        };
    }
    componentWillLoad() {
        fetch(this.apiUrl + this.getTitles + `/token101`)
            .then(res => res.json())
            .then(res => {
            this.state = Object.assign(Object.assign({}, this.state), res);
        });
    }
    render() {
        return (h("div", null, h("div", { class: "text-center mt-2" }, h("img", { src: this.logoImgPath, alt: "logo", class: "mb-2" })), h("p", { class: "text-center font-weight-bold mt-2" }, this.state.title1), h("p", { class: "text-center" }, this.state.title2), h("div", null, h("div", { class: "form-group" }, h("input", { onInput: e => this.validatePhone(e), value: this.state.phoneNumber, type: "text", class: "form-control", placeholder: "Enter Phone number" })), h("div", { class: "form-group" }, h("button", { onClick: this.submitForm, disabled: !this.state.isValid, type: "button", class: "btn btn-primary btn-block" }, this.state.buttonText)))));
    }
    static get style() { return ""; }
};

export { WebFunnel as web_funnel };
