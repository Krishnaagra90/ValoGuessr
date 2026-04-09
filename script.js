const API_URL = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";
let allAgents = [];
let currentAgent = null;
let score = 0;

const ultimateLines = {
    "Astra": "WORLD DIVIDED!",
    "Brimstone": "PREPARE FOR TAKEOVER!",
    "Clove": "NOT DEAD YET!",
    "Harbor": "I'LL LEAD THE WAY!",
    "Omen": "SCATTER!",
    "Viper": "WELCOME TO MY WORLD!",
    "Jett": "GET OUT OF MY WAY!",
    "Phoenix": "JOKE'S OVER, YOU'RE DEAD!",
    "Neon": "HEY! LET'S GO!",
    "Reyna": "THE HUNT BEGINS!",
    "Raze": "FIRE IN THE HOLE!",
    "Yoru": "WHO'S NEXT?",
    "Iso": "IT'S JUST YOU AND ME.",
    "Sova": "NOWHERE TO RUN!",
    "Breach": "OFF YOUR FEET!",
    "Skye": "SEEK THEM OUT!",
    "KAY/O": "YOU ARE POWERLESS!",
    "Fade": "FACE YOUR FEARS!",
    "Gekko": "OOH, MONSTER ON THE LOOSE!",
    "Chamber": "YOU WANT TO PLAY? LET'S PLAY!",
    "Cypher": "I KNOW EXACTLY WHERE YOU ARE.",
    "Killjoy": "YOU SHOULD RUN!",
    "Sage": "YOUR DUTY IS NOT OVER!",
    "Deadlock": "PULL THEM DOWN!",
    "Vyse": "YOU'RE TRAPPED!"
};

async function fetchGameData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allAgents = data.data.filter(agent => agent.isPlayableCharacter);
        loadNewQuestion();
    } catch (err) {
        document.getElementById('loading-state').innerText = "CONNECTION FAILED.";
    }
}

function loadNewQuestion() {
    document.getElementById('quiz-area').classList.remove('hidden');
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('agent-image').classList.add('hidden');
    document.getElementById('mystery-icon').classList.remove('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('feedback-message').innerText = "";
    document.getElementById('user-guess').value = "";
    document.getElementById('user-guess').disabled = false;

    currentAgent = allAgents[Math.floor(Math.random() * allAgents.length)];
    

    const ultLine = ultimateLines[currentAgent.displayName] || "ULTIMATE READY. IDENTIFY TARGET.";
    document.getElementById('hint-quote').innerText = `"${ultLine}"`;
    
    const roleSpan = document.getElementById('role-text');
    const roleName = currentAgent.role.displayName;
    roleSpan.innerText = roleName;
    roleSpan.className = ""; 
    roleSpan.classList.add(`color-${roleName.toLowerCase()}`);

    document.getElementById('agent-image').src = currentAgent.displayIcon;
}

function checkAnswer() {
    const guess = document.getElementById('user-guess').value.trim().toLowerCase();
    const actual = currentAgent.displayName.toLowerCase();

    if (guess === actual) {
        score++;
        document.getElementById('score-val').innerText = score;
        document.getElementById('feedback-message').innerText = `✅ CORRECT! IT'S ${currentAgent.displayName}.`;
        document.getElementById('feedback-message').className = "correct";
        revealAgent();
    } else {
        document.getElementById('feedback-message').innerText = "❌ Socho Ache se";
        document.getElementById('feedback-message').className = "wrong";
    }
}

function revealAgent() {
    document.getElementById('agent-image').classList.remove('hidden');
    document.getElementById('mystery-icon').classList.add('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('user-guess').disabled = true;
}

document.getElementById('submit-guess').addEventListener('click', checkAnswer);
document.getElementById('next-btn').addEventListener('click', loadNewQuestion);
document.getElementById('user-guess').addEventListener('keypress', (e) => {
    if(e.key === 'Enter') checkAnswer();
});

fetchGameData();