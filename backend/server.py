from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/score', methods=['POST'])
def score():
    data = request.json

    # Personality scoring (sum of Likert scale responses)
    personality_score = sum(data.get('personality', {}).values())

    # Interest scoring (sum of multiple-choice responses)
    interest_score = sum(data.get('interest', {}).values())

    # Verbal scoring (correct answers * 10)
    verbal_score = sum(1 for value in data.get('verbal', {}).values() if value) * 10

    # Total score
    total_score = personality_score + interest_score + verbal_score

    # Career suggestion logic
    if total_score > 80:
        career_suggestion = "Software Engineer"
    elif total_score > 60:
        career_suggestion = "Writer"
    else:
        career_suggestion = "Artist"

    return jsonify({
        'personality': personality_score,
        'interest': interest_score,
        'verbal': verbal_score,
        'total': total_score,
        'career_suggestion': career_suggestion
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
