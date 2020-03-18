# webFunnelSample

```
>> git clone https://github.com/JUkhan/webFunnelSample.git

>> cd webFunnelSample
```

### How to use web-funnel ?

In the web-funnel all the attributes are optional. Suppose if you don't provide logo-img-path, image portion of web-funnel should be ignored(not render). If you don't provide api-url, there is a manual way to do this. Please follow the next example. This example is automatic you don't need to write any javascript.

```
 <web-funnel
            logo-img-path="/images/logo.png"
            api-url="http://localhost:3000"
            get-invitation-info="/getInvitationInfo"
            save-phone-number="/savePhoneNumber"
            map-api-key="AIzaSyCTGaIAe7IC5zYoEPFRMHVOKs5dIwAKlTE"
          ></web-funnel>

```

### Here is the manual way

web-funnel exposed a method named `setData({...})` and an event named `submitFunnel`. `setData` method used to pass data to the funnel from the outside world and `submitFunnel` event fired(with the value of phoneNumber and token) when user click on download button. Here is the example:

```
<web-funnel id="funnel"></web-funnel>

```

```js
window.onload = () => {
  var funnel = document.getElementById("funnel");

  fetch("http://localhost:3000/getInvitationInfo/token-group")
    .then(res => res.json())
    .then(data => funnel.setData(data));

  funnel.addEventListener("submitFunnel", ev => {
    console.log(ev.detail);
  });
};
```

https://github.com/JUkhan/webFunnelSample/blob/master/webApp/views/invite.ejs#L16

https://github.com/JUkhan/webFunnelSample/blob/master/webApp/views/invite.ejs#L24

[Live Example](https://codesandbox.io/s/web-funnel-w4jh4)

### Run api

```
>> cd api
>> npm i
>> node index.js
```

### Run webApp

```
>> cd webApp
>> npm i
>> node index.js
```

http://localhost:4000/invite/uuid-group

http://localhost:4000/invite/uuid-referral

http://localhost:4000/invite/uuid-event
