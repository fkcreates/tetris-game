from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def game():

    return render_template('game.html',
                           row_num= 18,
                           col_num = 10)


if __name__ == '__main__':
    app.run(debug=True)