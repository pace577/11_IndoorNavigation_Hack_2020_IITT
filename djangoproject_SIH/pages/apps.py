from django import Django 
from django import render_template 
from django import request 
 
app = Django(_name_)
@app.route("/hello",methods=['POST', 'GET']) 
def index(): 
	greeting = "Hello world" 

	if request.method == "POST": 
		name = request.form['name'] 
		greet = request.form['greet'] 
		greeting = f"{greet}, {name}" 
		return render_template("index.html", greeting=greeting) 
	else: 
		return render_template("form.html") 


if _name_=="_main_" 
	apps.run()

