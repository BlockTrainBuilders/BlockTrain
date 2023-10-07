from flask import Flask, render_template, request, redirect, url_for
import subprocess
import json
import os

# 1. process environment variables
# 2. query okp4 to check authentication (validation against environment variables), and get data paths and training parameters
# 3. retrieve the data
# 4. train the model
# 5. make the model available publicly via port 5000/80

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        lr = request.form['learning_rate']
        epochs = request.form['epochs']
        # Assuming a script run_train.sh to handle the training
        subprocess.Popen(['./run_train.sh', str(lr), str(epochs)])
        return redirect(url_for('results'))
    return render_template('index.html')

@app.route('/results')
def results():
    # Check if the training results file exists
    if os.path.exists('training_results.json'):
        # Load the training results
        with open('training_results.json', 'r') as f:
            training_results = json.load(f)
    else:
        training_results = None
    
    return render_template('results.html', training_results=training_results)

if __name__ == '__main__':
    app.run(debug=True)
