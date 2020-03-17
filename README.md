# webFunnelSample

```
>> git clone https://github.com/JUkhan/webFunnelSample.git

>> cd webFunnelSample
```

### How to use web-funnel

```
 <web-funnel
            logo-img-path="/images/logo.png"
            api-url="http://localhost:3000"
            get-invitation-info="/getInvitationInfo"
            save-phone-number="/savePhoneNumber"
            map-api-key="AIzaSyCTGaIAe7IC5zYoEPFRMHVOKs5dIwAKlTE"
          ></web-funnel>
```

https://github.com/JUkhan/webFunnelSample/blob/master/webApp/views/invite.ejs#L16

https://github.com/JUkhan/webFunnelSample/blob/master/webApp/views/invite.ejs#L24

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
