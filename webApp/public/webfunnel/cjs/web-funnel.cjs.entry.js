'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-43a6e2e5.js');

const WebFunnel = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        return (core.h("div", null, core.h("div", { class: "text-center mt-2" }, core.h("img", { src: this.logoImgPath, alt: "logo", class: "mb-2" })), core.h("p", { class: "text-center font-weight-bold mt-2" }, this.state.title1), core.h("p", { class: "text-center" }, this.state.title2), core.h("div", null, core.h("div", { class: "form-group" }, core.h("input", { onInput: e => this.validatePhone(e), value: this.state.phoneNumber, type: "text", class: "form-control", placeholder: "Enter Phone number" })), core.h("div", { class: "form-group" }, core.h("button", { onClick: this.submitForm, disabled: !this.state.isValid, type: "button", class: "btn btn-primary btn-block" }, this.state.buttonText)))));
    }
    static get style() { return ""; }
};

exports.web_funnel = WebFunnel;
