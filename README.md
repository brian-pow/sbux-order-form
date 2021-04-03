Originally was thinking of attempting some crazy CSS animations and showing different milk drinks (e.g., lattes / cappucinos) being constructed, but that will have to wait for another time...

Anyways, I settled on a glorified coffee drink order form that uses Starbucks-style cup markings to prompt the user through different drink options.

**TRY IT OUT HERE:** https://sbux-marker.netlify.app

**Main features:**

1. The user progresses through each option (not all are required)...can be as simple as just choosing one option.

2. The user can save the image of their completed visual form, or send a string containing their order information to a phone number of their choosing (using Twilio)

**The application contains the following components:**

**1) frontend-react**
Single-page React app that contains main functionality (as seen in images below).

**2) backend-express**
Simple Express API deployed on Heroku. Containes one functioning POST route that accepts an order object & phone number and sends an SMS message using a Twilio API.

**Screenshots:**

1. Sample selector.
2. Main view (partially filled out).
3. Save/send view.
   ![image](https://user-images.githubusercontent.com/42954670/101989659-9f7d0200-3c67-11eb-93c4-25410b0bf531.png)

4. Sample saved image...tripleshot latte, anyone?
   ![image](https://user-images.githubusercontent.com/42954670/101989792-6a24e400-3c68-11eb-9ef5-f6c6da3742b3.png)
