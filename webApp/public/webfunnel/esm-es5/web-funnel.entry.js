import { r as registerInstance, h } from './core-a8ec883a.js';
var WebFunnel = /** @class */ (function () {
    function WebFunnel(hostRef) {
        var _this = this;
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
        this.submitForm = function () {
            console.log(_this.state);
        };
        this.validatePhone = function (event) {
            var val = event.target.value;
            _this.state = Object.assign(Object.assign({}, _this.state), { phoneNumber: val, isValid: /^\(\d+\)\s\d+-\d+$/.test(val) });
        };
    }
    WebFunnel.prototype.componentWillLoad = function () {
        var _this = this;
        fetch(this.apiUrl + this.getTitles + "/token101")
            .then(function (res) { return res.json(); })
            .then(function (res) {
            _this.state = Object.assign(Object.assign({}, _this.state), res);
        });
    };
    WebFunnel.prototype.render = function () {
        var _this = this;
        return (h("div", null, h("div", { class: "text-center mt-2" }, h("img", { src: this.logoImgPath, alt: "logo", class: "mb-2" })), h("p", { class: "text-center font-weight-bold mt-2" }, this.state.title1), h("p", { class: "text-center" }, this.state.title2), h("div", null, h("div", { class: "form-group" }, h("input", { onInput: function (e) { return _this.validatePhone(e); }, value: this.state.phoneNumber, type: "text", class: "form-control", placeholder: "Enter Phone number" })), h("div", { class: "form-group" }, h("button", { onClick: this.submitForm, disabled: !this.state.isValid, type: "button", class: "btn btn-primary btn-block" }, this.state.buttonText)))));
    };
    Object.defineProperty(WebFunnel, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return WebFunnel;
}());
export { WebFunnel as web_funnel };
