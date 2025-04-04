document.addEventListener("DOMContentLoaded", () => {
    const legalKnowledge = {
        "rights": {
            "keywords": ["rights", "my rights", "what are my rights", "legal rights"],
            "response": "Everyone has fundamental rights protected by law. These typically include:<br><br>" +
                "• Right to equality and freedom from discrimination<br>" +
                "• Right to privacy<br>" +
                "• Right to a fair trial<br>" +
                "• Freedom of speech and expression<br>" +
                "• Property rights<br><br>" +
                "Specific rights depend on your jurisdiction and situation. Would you like information about a particular area of law?"
        },
        "arrest": {
            "keywords": ["arrest", "getting arrested", "police arrest", "what to do if arrested"],
            "response": "If you're arrested:<br><br>" +
                "1. Stay calm and don't resist<br>" +
                "2. You have the right to remain silent (say so clearly)<br>" +
                "3. Ask for a lawyer immediately<br>" +
                "4. Don't sign anything without legal advice<br>" +
                "5. You have the right to know why you're being arrested<br><br>" +
                "Remember, laws vary by location. This is general information only."
        },
        "eviction": {
            "keywords": ["eviction", "being evicted", "landlord evicting me", "rental rights"],
            "response": "Eviction laws vary by location, but generally:<br><br>" +
                "• Landlords must provide proper notice (usually 30 days)<br>" +
                "• They must have a valid legal reason (non-payment, lease violation)<br>" +
                "• They can't forcibly remove you without a court order<br>" +
                "• You may have rights to dispute the eviction<br><br>" +
                "Local tenant unions or legal aid can provide specific advice for your area."
        },
        "discrimination": {
            "keywords": ["discrimination", "work discrimination", "racial discrimination", "gender discrimination"],
            "response": "Discrimination based on race, gender, religion, disability, or other protected characteristics is illegal in many contexts, including:<br><br>" +
                "• Employment<br>" +
                "• Housing<br>" +
                "• Public accommodations<br>" +
                "• Education<br><br>" +
                "If you believe you've experienced discrimination, document everything and contact:<br>" +
                "• Equal Employment Opportunity Commission (EEOC) for workplace issues<br>" +
                "• Local human rights commission<br>" +
                "• A civil rights attorney"
        },
        "divorce": {
            "keywords": ["divorce", "getting divorced", "separation", "marriage dissolution"],
            "response": "Divorce processes vary by state/country but generally involve:<br><br>" +
                "1. Filing a petition<br>" +
                "2. Serving papers to spouse<br>" +
                "3. Negotiating settlement (assets, custody, support)<br>" +
                "4. Court approval<br><br>" +
                "Key considerations:<br>" +
                "• Child custody and support<br>" +
                "• Division of property/debts<br>" +
                "• Spousal support<br><br>" +
                "Consult a family law attorney for your specific situation."
        },
        "default": {
            "response": "I'm a legal information assistant. I can provide general information about:<br><br>" +
                "• Your legal rights<br>" +
                "• Common legal processes<br>" +
                "• Where to find legal help<br><br>" +
                "<strong>Important:</strong> I don't provide legal advice. For personal legal matters, please consult an attorney.<br><br>" +
                "Here are some common topics you might ask about:<br>" +
                "<div class='quick-reply' onclick='sendQuickReply(\"What are my rights if I'm arrested?\")'>Arrest rights</div>" +
                "<div class='quick-reply' onclick='sendQuickReply(\"How does eviction work?\")'>Eviction process</div>" +
                "<div class='quick-reply' onclick='sendQuickReply(\"What constitutes discrimination?\")'>Discrimination</div>" +
                "<div class='quick-reply' onclick='sendQuickReply(\"What are the steps for divorce?\")'>Divorce process</div>"
        }
    };

    // DOM Elements
    const chatbotLaunch = document.getElementById("chatbot-launch");
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");

    // Toggle Chatbot Visibility
    chatbotLaunch.addEventListener("click", () => {
        chatbotContainer.style.display = "flex";
        chatbotLaunch.style.display = "none";
        addBotMessage("Hello! I'm your Legal Justice Assistant. How can I help you today?");
    });

    chatbotClose.addEventListener("click", () => {
        chatbotContainer.style.display = "none";
        chatbotLaunch.style.display = "flex";
    });

    // Send Message Functionality
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInput.value = "";
            setTimeout(() => {
                generateBotResponse(message);
            }, 500);
        }
    }

    chatbotSend.addEventListener("click", sendMessage);
    chatbotInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // Quick Reply Function
    window.sendQuickReply = function (text) {
        addUserMessage(text);
        setTimeout(() => {
            generateBotResponse(text);
        }, 500);
    };

    // Add Message to Chat
    function addUserMessage(text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message user-message";
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addBotMessage(html) {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message bot-message";
        messageDiv.innerHTML = html;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Generate Bot Response
    function generateBotResponse(userInput) {
        userInput = userInput.toLowerCase();
        let responseFound = false;

        // Check for keywords using regex for exact matches
        for (const topic in legalKnowledge) {
            if (topic !== "default") {
                for (const keyword of legalKnowledge[topic].keywords) {
                    const regex = new RegExp(`\\b${keyword}\\b`, "i");
                    if (regex.test(userInput)) {
                        addBotMessage(legalKnowledge[topic].response);
                        responseFound = true;
                        return;
                    }
                }
            }
        }

        // Default response if no keyword matches
        if (!responseFound) addBotMessage(legalKnowledge.default.response);
    }
});

