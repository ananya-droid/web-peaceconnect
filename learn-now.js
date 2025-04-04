/* learn-now.js */
document.addEventListener("DOMContentLoaded", function() {
    // Module toggle functionality
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        module.addEventListener('click', function() {
            let details = this.querySelector('.module-details');
            details.style.display = (details.style.display === "block") ? "none" : "block";
        });
    });

    // Quiz functionality with Start Quiz prompt and 5 detailed questions
    const quizData = [
        {
            question: "What is the significance of the Right to Equality in everyday life?",
            options: [
                "It ensures equal treatment and opportunities in all sectors of life.",
                "It is merely a theoretical concept.",
                "It only applies to public services.",
                "It has minimal practical impact."
            ],
            answer: "It ensures equal treatment and opportunities in all sectors of life."
        },
        {
            question: "How can you access legal aid if you face discrimination or injustice?",
            options: [
                "Wait for the issue to resolve itself.",
                "Contact legal aid organizations or NGOs immediately.",
                "Ignore the situation.",
                "Only rely on personal connections."
            ],
            answer: "Contact legal aid organizations or NGOs immediately."
        },
        {
            question: "Which action best represents exercising your Right to Constitutional Remedies?",
            options: [
                "Approaching the courts to enforce your rights.",
                "Complaining to a friend.",
                "Posting on social media.",
                "Filing an informal complaint."
            ],
            answer: "Approaching the courts to enforce your rights."
        },
        {
            question: "If you experience unfair treatment at work, what is the recommended course of action?",
            options: [
                "Immediately resign without a word.",
                "Consult legal experts and file a complaint if needed.",
                "Ignore it to avoid conflict.",
                "Confront your employer aggressively."
            ],
            answer: "Consult legal experts and file a complaint if needed."
        },
        {
            question: "Why is being aware of your legal rights important in real-life scenarios?",
            options: [
                "It empowers you to protect your interests and take informed actions.",
                "It is only useful in academic discussions.",
                "It has little effect on personal safety.",
                "It is solely for legal professionals."
            ],
            answer: "It empowers you to protect your interests and take informed actions."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    const quizQuestionEl = document.getElementById("quiz-question");
    const quizOptionsEl = document.getElementById("quiz-options");
    const nextBtn = document.getElementById("next-btn");
    const startQuizBtn = document.getElementById("start-quiz-btn");
    const quizContentEl = document.getElementById("quiz-content");
    const quizResultEl = document.getElementById("quiz-result");
    const scoreTextEl = document.getElementById("score-text");
    const progressFillEl = document.getElementById("progress-fill");
    const encouragingMessageEl = document.getElementById("encouraging-message");

    startQuizBtn.addEventListener("click", function() {
        startQuizBtn.style.display = "none";
        quizContentEl.classList.remove("hidden");
        showQuestion();
    });

    function showQuestion() {
        // Clear previous options
        quizOptionsEl.innerHTML = "";
        // Display current question
        let qData = quizData[currentQuestion];
        quizQuestionEl.textContent = qData.question;
        // Display options
        qData.options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.addEventListener("click", function() {
                // Check answer and highlight
                if (option === qData.answer) {
                    btn.style.backgroundColor = "#28a745"; // green for correct
                    score++;
                } else {
                    btn.style.backgroundColor = "#dc3545"; // red for wrong
                }
                // Disable all options after answering
                const buttons = quizOptionsEl.querySelectorAll("button");
                buttons.forEach(b => b.disabled = true);
                // Show next button
                nextBtn.classList.remove("hidden");
            });
            quizOptionsEl.appendChild(btn);
        });
    }

    window.nextQuestion = function() {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
            nextBtn.classList.add("hidden");
        } else {
            // Quiz completed, show results
            quizContentEl.classList.add("hidden");
            quizResultEl.classList.remove("hidden");
            scoreTextEl.textContent = `Your Score: ${score} out of ${quizData.length} 🎯`;
            // Calculate percentage score for progress bar
            let percentage = (score / quizData.length) * 100;
            progressFillEl.style.width = `${percentage}%`;
            // Provide encouraging message based on score with emojis
            if (percentage === 100) {
                encouragingMessageEl.textContent = "Outstanding! You have perfect knowledge! 🌟👏";
            } else if (percentage >= 80) {
                encouragingMessageEl.textContent = "Great job! You're well informed! 👍😊";
            } else if (percentage >= 50) {
                encouragingMessageEl.textContent = "Good effort! Keep learning and you'll improve! 💪🙂";
            } else {
                encouragingMessageEl.textContent = "Don't worry, every expert was once a beginner. Keep studying and you'll get there! 📚🙌";
            }
        }
    };
});
