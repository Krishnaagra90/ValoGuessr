const AGENTAPI = "https://valorant-api.com/v1/agents?isPlayableCharacter=true";
async function getAgents() {
    try {
        document.getElementById('loading').style.display = 'block';
        const response = await fetch(AGENTAPI);
        const Agent_data = await response.json();
        const agents = Agent_data.data;
        renderAgents(agents);
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById('agent-container').innerHTML = "<p>Failed to load agents. Please try again.</p>";
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}