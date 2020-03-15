import { h } from "@stencil/core";
export class WebFunnel {
    constructor() {
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
        return (h("div", null,
            h("div", { class: "text-center mt-2" },
                h("img", { src: this.logoImgPath, alt: "logo", class: "mb-2" })),
            h("p", { class: "text-center font-weight-bold mt-2" }, this.state.title1),
            h("p", { class: "text-center" }, this.state.title2),
            h("div", null,
                h("div", { class: "form-group" },
                    h("input", { onInput: e => this.validatePhone(e), value: this.state.phoneNumber, type: "text", class: "form-control", placeholder: "Enter Phone number" })),
                h("div", { class: "form-group" },
                    h("button", { onClick: this.submitForm, disabled: !this.state.isValid, type: "button", class: "btn btn-primary btn-block" }, this.state.buttonText)))));
    }
    static get is() { return "web-funnel"; }
    static get originalStyleUrls() { return {
        "$": ["web-funnel.css"]
    }; }
    static get styleUrls() { return {
        "$": ["web-funnel.css"]
    }; }
    static get properties() { return {
        "apiUrl": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "api base url"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "getTitles": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "api end point to get titles"
            },
            "attribute": "get-titles",
            "reflect": false
        },
        "saveData": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "api end point to save data (mobile number and user token number)"
            },
            "attribute": "save-data",
            "reflect": false
        },
        "logoImgPath": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "logo image path"
            },
            "attribute": "logo-img-path",
            "reflect": false
        }
    }; }
    static get states() { return {
        "state": {}
    }; }
}
