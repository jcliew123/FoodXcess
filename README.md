# Guide on getting the code to run
## Setup
1) Install the dependencies
```
pip install -r requirements.txt
```
2) Add your IP address into the ALLOWED_HOSTS in `FoodXcess\FoodXcess\settings.py`
```
ALLOWED_HOSTS = [*YourIPAddress*]
```
3) Run the following commands to set up the database
```
\FoodXcess>python manage.py makemigrations
\FoodXcess>python manage.py migrate
```
(For web application)

4)i) cd into `FoodXcess\frontend` and install the frontend dependencies
```
\frontend>npm install
```
4)ii) Run the compilation for once and Ctrl^C to exit
```
\frontend>npm run dev
```
(For mobile application)

5)i) cd into `FoodXcessNative\` and install frontend dependencies 
```
\FoodXcessNative>npm install
```
5)ii) Replace IPAdd with your IP Address in `FoodXcessNative\app\config.js`
```
export default IPAdd = 'http://*YourIPAddress*:8000';
```

*Note:\
Step 4 is for running the web application

Step 5 is for running the mobile application

---

## Web Application
1) Run the server
```
\FoodXcess>python manage.py runserver *IPAdd*:8000
```
2) Open up browser and go to `*YourIPAddress*:8000`

---

## Mobile Application
1) Run the server
```
\FoodXcess>python manage.py runserver *IPAdd*:8000
```
2) Open another command prompt and cd into `\FoodXcessNative` to run the following command
```
\FoodXcessNative>expo start
```
3) Follow the instruction shown to select how you want to run the app

---

## Object Detection model
Model has been successfully integrated into the server, but can't run due to hardware limitation. Hence, related code for AISearch has been commented out in the `FoodXcess\api\view.py`, `FoodXcess\frontend\src\components\Search\AISearch.js` and `FoodXcessNative\app\screens\AISearch.js`. The application will straight away redirects to the ingredient confirmation page instead.

Despite that, I have uploaded the trained model weights onto OneDrive(Can't figure out the hashing part). In order to do inference with the model, just download the frcnn.zip file and upload it onto the Inference Colab notebook. Run all the code in the notebook and upload image that you want to test into the test folder.


The link to the trained model: https://bham-my.sharepoint.com/personal/jcl992_student_bham_ac_uk/_layouts/15/guestaccess.aspx?guestaccesstoken=5iIr6wfMN59RP5nVaZ4Nsyj%2BLmJHeSy%2FkMLlZf%2BexhE%3D&docid=2_0c2e129e140f848cf975d8bc2f1ffe63d&rev=1&e=aoaqbd

The Colab notebook for running inference with trained model: https://colab.research.google.com/drive/11XbcmB2HWPpSRn4ppoibiOApFv3BJqmx?usp=sharing

The Colab notebook that I used to train the model: https://colab.research.google.com/drive/1EOm6AoQ7nequTIGUbD-KR80xwX48p9pT?usp=sharing