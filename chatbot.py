from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Predefined menu options and responses for consumer justice topics
consumer_justice_topics = {
    "1": "Consumer Rights",
    "2": "Filing a Complaint",
    "3": "Refund Policies",
    "4": "Warranty Issues",
    "5": "Consumer Protection Act"
}

# Predefined responses based on user selections
consumer_justice_qa = {
    "consumer rights": "Your consumer rights include the right to safety, the right to be informed, the right to choose, and the right to be heard.",
    "filing a complaint": "You can file a consumer complaint by visiting the official consumer protection website or contacting your local consumer forum. You must file within two years of the issue.",
    "refund policies": "If you receive a defective product, you are entitled to a refund or replacement under consumer protection laws. Contact the seller for more details.",
    "warranty issues": "Check the warranty period and contact the seller or manufacturer for repairs, replacements, or refunds during the warranty period.",
    "consumer protection act": "The Consumer Protection Act of 2019 protects consumers' rights and establishes a mechanism for resolving grievances."
}

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')  # Render the chatbot UI from an HTML template

# Chatbot route with menu and responses
@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json['message'].lower()

    # Greeting and menu display
    if "hello" in user_input or "hi" in user_input:
        response = (
            "Hello! Welcome to the Consumer Justice Chatbot.\n"

            "How can I assist you today?\n"

            "1. Consumer Rights\n"

            "2. Filing a Complaint\n"

            "3. Refund Policies\n"


            "4. Warranty Issues\n"
            
            "5. Consumer Protection Act\n"

            "Please type the number corresponding to your choice."
        )
        return jsonify({"response": response})

    # Check user selection from menu and provide the relevant information
    elif user_input in consumer_justice_topics:
        topic = consumer_justice_topics[user_input].lower()
        response = consumer_justice_qa.get(topic, "Sorry, I don't have information on that.")
        return jsonify({"response": response})

    # Handle any unrecognized input
    else:
        response = "Sorry, I don't understand. Please select a valid option from the menu."
        return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)

