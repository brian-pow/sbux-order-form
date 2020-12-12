There's not a lot of background to this one...wanted to create something quick, and had coffee on my mind. Originally was thinking of attempting some crazy CSS animations and showing different milk drinks (e.g., lattes / cappucinos) being constructed, but maybe that will wait for another time...

Anyways, I settled on a glorified coffee drink order form that uses Starbucks-style cup markings to prompt the user through different drink options.

**Main features:**

1. The user progresses through each option (not all are required)...can be as simple as just choosing one option.

2. The user can save the image of their completed visual form, or send a string containing their order information to a phone number of their choosing, using Twilio

**The application contains the following components:**

**1) frontend-react**
This is a REST API deployed on AWS using the Serverless Framework. It exists to access and edit the master Google Sheets document and offers contains read and edit capabilities.

**2) backend-express**
This is a REST API deployed on AWS using the Serverless Framework. It exists to log information attached to each expense (e.g., type, description) in a DynamoDB database and offers read and edit capabilities.

**Screenshots:**

1. Landing page for application.
2. Expense logs.
3. New expense entry.
   ![image](https://user-images.githubusercontent.com/42954670/101989659-9f7d0200-3c67-11eb-93c4-25410b0bf531.png)

4. Sample Google Sheets layout.
   ![image](https://user-images.githubusercontent.com/42954670/101989673-b6235900-3c67-11eb-82cd-780664ec2c30.JPG)
