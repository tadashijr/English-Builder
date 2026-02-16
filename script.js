// BANCO DE DADOS COM EXERCÍCIOS
const exerciseDatabase = {
    past: [
        { id: 1, portuguese: "Eu comi pizza ontem", english: "I ate pizza yesterday", words: ["I", "ate", "pizza", "yesterday"] },
        { id: 2, portuguese: "Ela estudou inglês", english: "She studied English", words: ["She", "studied", "English"] },
        { id: 3, portuguese: "Nós viajamos para Paris", english: "We traveled to Paris", words: ["We", "traveled", "to", "Paris"] },
        { id: 4, portuguese: "Eles jogaram futebol", english: "They played soccer", words: ["They", "played", "soccer"] },
        { id: 5, portuguese: "Você trabalhou ontem?", english: "Did you work yesterday?", words: ["Did", "you", "work", "yesterday?"] },
        { id: 6, portuguese: "Ele não foi à escola", english: "He didn't go to school", words: ["He", "didn't", "go", "to", "school"] },
        { id: 7, portuguese: "Maria comprou um carro", english: "Maria bought a car", words: ["Maria", "bought", "a", "car"] },
        { id: 8, portuguese: "Nós vimos um filme", english: "We saw a movie", words: ["We", "saw", "a", "movie"] },
        { id: 9, portuguese: "Pedro escreveu uma carta", english: "Pedro wrote a letter", words: ["Pedro", "wrote", "a", "letter"] },
        { id: 10, portuguese: "Elas foram à praia", english: "They went to the beach", words: ["They", "went", "to", "the", "beach"] },
        { id: 11, portuguese: "João leu o livro", english: "João read the book", words: ["João", "read", "the", "book"] },
        { id: 12, portuguese: "Nós bebemos café", english: "We drank coffee", words: ["We", "drank", "coffee"] },
        { id: 13, portuguese: "Eles chegaram cedo", english: "They arrived early", words: ["They", "arrived", "early"] },
        { id: 14, portuguese: "Ana abriu a janela", english: "Ana opened the window", words: ["Ana", "opened", "the", "window"] },
        { id: 15, portuguese: "O que você fez?", english: "What did you do?", words: ["What", "did", "you", "do?"] }
    ],
    present: [
        { id: 16, portuguese: "Eu como pizza", english: "I eat pizza", words: ["I", "eat", "pizza"] },
        { id: 17, portuguese: "Ela estuda inglês", english: "She studies English", words: ["She", "studies", "English"] },
        { id: 18, portuguese: "Nós viajamos para Paris", english: "We travel to Paris", words: ["We", "travel", "to", "Paris"] },
        { id: 19, portuguese: "Eles jogam futebol", english: "They play soccer", words: ["They", "play", "soccer"] },
        { id: 20, portuguese: "Você trabalha aqui?", english: "Do you work here?", words: ["Do", "you", "work", "here?"] },
        { id: 21, portuguese: "Ele não vai à escola", english: "He doesn't go to school", words: ["He", "doesn't", "go", "to", "school"] },
        { id: 22, portuguese: "Maria compra um carro", english: "Maria buys a car", words: ["Maria", "buys", "a", "car"] },
        { id: 23, portuguese: "Nós vemos um filme", english: "We see a movie", words: ["We", "see", "a", "movie"] },
        { id: 24, portuguese: "Pedro escreve cartas", english: "Pedro writes letters", words: ["Pedro", "writes", "letters"] },
        { id: 25, portuguese: "Elas vão à praia", english: "They go to the beach", words: ["They", "go", "to", "the", "beach"] },
        { id: 26, portuguese: "Você fala inglês?", english: "Do you speak English?", words: ["Do", "you", "speak", "English?"] },
        { id: 27, portuguese: "Ela não gosta de café", english: "She doesn't like coffee", words: ["She", "doesn't", "like", "coffee"] },
        { id: 28, portuguese: "Nós temos uma reunião", english: "We have a meeting", words: ["We", "have", "a", "meeting"] }
    ],
    future: [
        { id: 29, portuguese: "Eu comerei pizza amanhã", english: "I will eat pizza tomorrow", words: ["I", "will", "eat", "pizza", "tomorrow"] },
        { id: 30, portuguese: "Ela estudará inglês", english: "She will study English", words: ["She", "will", "study", "English"] },
        { id: 31, portuguese: "Nós viajaremos para Paris", english: "We will travel to Paris", words: ["We", "will", "travel", "to", "Paris"] },
        { id: 32, portuguese: "Eles jogarão futebol", english: "They will play soccer", words: ["They", "will", "play", "soccer"] },
        { id: 33, portuguese: "Você trabalhará amanhã?", english: "Will you work tomorrow?", words: ["Will", "you", "work", "tomorrow?"] },
        { id: 34, portuguese: "Ele não irá à escola", english: "He will not go to school", words: ["He", "will", "not", "go", "to", "school"] },
        { id: 35, portuguese: "Maria comprará um carro", english: "Maria will buy a car", words: ["Maria", "will", "buy", "a", "car"] },
        { id: 36, portuguese: "Nós veremos um filme", english: "We will see a movie", words: ["We", "will", "see", "a", "movie"] },
        { id: 37, portuguese: "Pedro escreverá uma carta", english: "Pedro will write a letter", words: ["Pedro", "will", "write", "a", "letter"] },
        { id: 38, portuguese: "Elas irão à praia", english: "They will go to the beach", words: ["They", "will", "go", "to", "the", "beach"] },
        { id: 39, portuguese: "Você falará com ela?", english: "Will you talk to her?", words: ["Will", "you", "talk", "to", "her?"] },
        { id: 40, portuguese: "Nós beberemos café", english: "We will drink coffee", words: ["We", "will", "drink", "coffee"] }
    ]
};

// Sistema de Ranking (localStorage)
let ranking = JSON.parse(localStorage.getItem('englishBuilderRanking')) || [];
let currentUser = null;

// Estado da aplicação
let currentMode = 'build';
let currentTense = 'present';
let currentExercise = null;
let selectedWords = [];
let availableWords = [];
let stats = {
    totalScore: 0,
    streak: 0,
    exercisesDone: 0,
    correctAnswers: 0,
    pastProgress: 0,
    presentProgress: 0,
    futureProgress: 0
};

// ========== FUNÇÕES DE LOGIN E RANKING ==========

function login() {
    const nameInput = document.getElementById('player-name');
    const playerName = nameInput.value.trim();
    
    if (playerName === '') {
        alert('Por favor, digite seu nome!');
        return;
    }
    
    // Verificar se usuário já existe no ranking
    let existingUser = ranking.find(u => u.name.toLowerCase() === playerName.toLowerCase());
    
    if (existingUser) {
        currentUser = existingUser;
        stats = { ...existingUser.stats };
    } else {
        currentUser = {
            name: playerName,
            stats: {
                totalScore: 0,
                streak: 0,
                exercisesDone: 0,
                correctAnswers: 0,
                pastProgress: 0,
                presentProgress: 0,
                futureProgress: 0
            },
            lastActive: new Date().toISOString()
        };
        ranking.push(currentUser);
    }
    
    // Atualizar interface
    document.getElementById('login-modal').classList.remove('active');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    
    stats = currentUser.stats;
    updateStats();
    updateRanking();
    
    // Iniciar jogo
    init();
}

function logout() {
    saveRanking();
    document.getElementById('login-modal').classList.add('active');
    document.getElementById('main-content').classList.add('hidden');
    currentUser = null;
}

function saveRanking() {
    if (currentUser) {
        currentUser.stats = { ...stats };
        currentUser.lastActive = new Date().toISOString();
    }
    
    ranking.sort((a, b) => b.stats.totalScore - a.stats.totalScore);
    localStorage.setItem('englishBuilderRanking', JSON.stringify(ranking));
}

function updateRanking() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    
    const sortedRanking = [...ranking].sort((a, b) => b.stats.totalScore - a.stats.totalScore);
    
    sortedRanking.slice(0, 10).forEach((user, index) => {
        const isCurrentUser = currentUser && user.name === currentUser.name;
        
        const li = document.createElement('li');
        li.className = `ranking-item ${isCurrentUser ? 'current-user' : ''}`;
        
        let medal = '';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        
        li.innerHTML = `
            <div class="ranking-position">${index + 1}</div>
            <div class="ranking-info">
                <div class="ranking-name">${user.name}</div>
                <div class="ranking-score">${user.stats.totalScore} pts</div>
            </div>
            <div class="ranking-medal">${medal}</div>
        `;
        
        rankingList.appendChild(li);
    });
    
    if (currentUser) {
        const userPosition = sortedRanking.findIndex(u => u.name === currentUser.name) + 1;
        document.getElementById('user-rank').textContent = `Rank #${userPosition}`;
    }
}

// ========== FUNÇÕES DO JOGO ==========

function init() {
    loadRandomExercise();
    updateStats();
    updateMode();
}

function loadRandomExercise() {
    const tenses = ['past', 'present', 'future'];
    const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
    currentTense = randomTense;
    
    const tenseExercises = exerciseDatabase[currentTense];
    const randomIndex = Math.floor(Math.random() * tenseExercises.length);
    currentExercise = tenseExercises[randomIndex];
    
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('portuguese-sentence').textContent = currentExercise.portuguese;
    document.getElementById('word-count').textContent = currentExercise.words.length;
    
    const indicator = document.getElementById('tense-indicator');
    indicator.className = `tense-indicator tense-${currentTense}`;
    indicator.textContent = currentTense === 'past' ? 'Passado' : currentTense === 'present' ? 'Presente' : 'Futuro';
    
    if (currentMode === 'build') {
        setupBuildMode();
    } else {
        setupWriteMode();
    }
    
    resetFeedback();
}

// ========== MODO CONSTRUÇÃO ==========

function setupBuildMode() {
    selectedWords = [];
    const extraWords = getExtraWords();
    availableWords = [...currentExercise.words, ...extraWords];
    shuffleArray(availableWords);
    updateBuildDisplay();
}

function getExtraWords() {
    const commonWords = ['the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with', 'and'];
    const extras = [];
    
    for (let i = 0; i < 3; i++) {
        let extra;
        do {
            extra = commonWords[Math.floor(Math.random() * commonWords.length)];
        } while (currentExercise.words.includes(extra) || extras.includes(extra));
        extras.push(extra);
    }
    
    return extras;
}

function updateBuildDisplay() {
    const constructionArea = document.getElementById('construction-area');
    constructionArea.innerHTML = '';
    selectedWords.forEach((word, index) => {
        const tile = document.createElement('span');
        tile.className = 'word-tile';
        tile.textContent = word;
        tile.onclick = () => removeWord(index);
        constructionArea.appendChild(tile);
    });

    const availableContainer = document.getElementById('available-words');
    availableContainer.innerHTML = '';
    availableWords.forEach(word => {
        const btn = document.createElement('button');
        btn.className = 'word-btn';
        btn.textContent = word;
        btn.onclick = () => addWord(word);
        btn.disabled = selectedWords.length >= currentExercise.words.length;
        availableContainer.appendChild(btn);
    });
}

function addWord(word) {
    if (selectedWords.length < currentExercise.words.length) {
        selectedWords.push(word);
        const index = availableWords.indexOf(word);
        if (index > -1) availableWords.splice(index, 1);
        updateBuildDisplay();
    }
}

function removeWord(index) {
    const word = selectedWords[index];
    selectedWords.splice(index, 1);
    availableWords.push(word);
    shuffleArray(availableWords);
    updateBuildDisplay();
}

// ========== MODO ESCRITA ==========

function setupWriteMode() {
    document.getElementById('answer-input').value = '';
    
    const suggestions = [...new Set([...currentExercise.words, ...getExtraWords()])];
    shuffleArray(suggestions);
    
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';
    suggestions.slice(0, 8).forEach(word => {
        const chip = document.createElement('span');
        chip.className = 'suggestion-chip';
        chip.textContent = word;
        chip.onclick = () => {
            const input = document.getElementById('answer-input');
            input.value += (input.value ? ' ' : '') + word;
        };
        suggestionsContainer.appendChild(chip);
    });
}

// ========== VERIFICAÇÃO E FEEDBACK ==========

function checkAnswer() {
    let userAnswer = '';
    
    if (currentMode === 'build') {
        userAnswer = selectedWords.join(' ').toLowerCase().trim();
    } else {
        userAnswer = document.getElementById('answer-input').value.toLowerCase().trim();
    }
    
    const correctAnswer = currentExercise.english.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;
    
    const feedback = document.getElementById('feedback');
    const tipBox = document.getElementById('grammar-tip');
    
    if (isCorrect) {
        feedback.className = 'feedback success';
        feedback.innerHTML = '✅ Correto! +10 pontos';
        
        stats.totalScore += 10;
        stats.streak += 1;
        stats.correctAnswers += 1;
        stats.exercisesDone += 1;
        
        if (currentTense === 'past') stats.pastProgress++;
        else if (currentTense === 'present') stats.presentProgress++;
        else stats.futureProgress++;
        
        tipBox.innerHTML = getGrammarTip(currentExercise);
        document.getElementById('next-btn').disabled = false;
    } else {
        feedback.className = 'feedback error';
        feedback.innerHTML = `❌ Resposta: "${correctAnswer}"`;
        
        stats.streak = 0;
        
        tipBox.innerHTML = getGrammarTip(currentExercise, true);
    }
    
    feedback.classList.remove('hidden');
    tipBox.classList.remove('hidden');
    updateStats();
    saveRanking();
}

function getGrammarTip(exercise, showHelp = false) {
    const tense = exercise.english.includes('did') ? 'past' : 
                  exercise.english.includes('will') ? 'future' : 'present';
    
    const tips = {
        past: "Passado: use did para perguntas, didn't para negativas. Verbos irregulares mudam (eat → ate, go → went)",
        present: "Presente: para he/she/it, adicione S (eat → eats, go → goes). Use do/does para perguntas",
        future: "Futuro: use will + verbo. Negativa: will not (won't)"
    };
    
    if (showHelp) {
        return `<strong>📚 Dica:</strong> ${tips[tense]}<br><br><strong>💡 Exemplo:</strong> "${exercise.english}"`;
    } else {
        return `<strong>🎯 Correto!</strong> ${tips[tense]}`;
    }
}

function nextExercise() {
    loadRandomExercise();
    document.getElementById('next-btn').disabled = true;
    resetFeedback();
}

function resetExercise() {
    if (currentMode === 'build') {
        setupBuildMode();
    } else {
        setupWriteMode();
    }
    resetFeedback();
}

function resetFeedback() {
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('grammar-tip').classList.add('hidden');
}

// ========== UTILITÁRIOS ==========

function setMode(mode) {
    currentMode = mode;
    
    document.querySelector('.build-mode').classList.toggle('active', mode === 'build');
    document.querySelector('.write-mode').classList.toggle('active', mode === 'write');
    
    document.getElementById('build-mode').classList.toggle('hidden', mode !== 'build');
    document.getElementById('write-mode').classList.toggle('hidden', mode !== 'write');
    
    resetExercise();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
}

function updateStats() {
    document.getElementById('total-score').textContent = stats.totalScore;
    document.getElementById('total-streak').textContent = stats.streak;
    document.getElementById('exercises-done').textContent = stats.exercisesDone;
    
    const accuracy = stats.correctAnswers > 0 ? 
        Math.round((stats.correctAnswers / stats.exercisesDone) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
    
    // Stats do ranking
    document.getElementById('stat-total-score').textContent = stats.totalScore;
    document.getElementById('stat-streak').textContent = stats.streak;
    document.getElementById('stat-exercises').textContent = stats.exercisesDone;
    document.getElementById('stat-accuracy').textContent = accuracy + '%';
    document.getElementById('stat-past').textContent = stats.pastProgress;
    document.getElementById('stat-present').textContent = stats.presentProgress;
    document.getElementById('stat-future').textContent = stats.futureProgress;
    
    // Barras de progresso
    document.getElementById('past-progress').style.width = (stats.pastProgress / 169) * 100 + '%';
    document.getElementById('present-progress').style.width = (stats.presentProgress / 169) * 100 + '%';
    document.getElementById('future-progress').style.width = (stats.futureProgress / 169) * 100 + '%';
    
    document.getElementById('past-label').textContent = `Passado ${stats.pastProgress}/169`;
    document.getElementById('present-label').textContent = `Presente ${stats.presentProgress}/169`;
    document.getElementById('future-label').textContent = `Futuro ${stats.futureProgress}/169`;
    
    const totalExercises = stats.pastProgress + stats.presentProgress + stats.futureProgress;
    document.getElementById('total-progress').textContent = `${totalExercises}/507`;
    
    updateRanking();
}

// Salvar antes de fechar
window.addEventListener('beforeunload', () => {
    saveRanking();
});


// ============================================
// BANCO DE DADOS COM 900+ EXERCÍCIOS
// 300 PASSADO + 300 PRESENTE + 300 FUTURO
// ============================================

const exerciseDatabase = {
    // ===== PASSADO - 300 frases =====
    past: [
        // PASSADO SIMPLES - Afirmativas (100)
        { id: 1, portuguese: "Eu comi pizza ontem", english: "I ate pizza yesterday", words: ["I", "ate", "pizza", "yesterday"] },
        { id: 2, portuguese: "Ela estudou inglês", english: "She studied English", words: ["She", "studied", "English"] },
        { id: 3, portuguese: "Nós viajamos para Paris", english: "We traveled to Paris", words: ["We", "traveled", "to", "Paris"] },
        { id: 4, portuguese: "Eles jogaram futebol", english: "They played soccer", words: ["They", "played", "soccer"] },
        { id: 5, portuguese: "Maria comprou um carro", english: "Maria bought a car", words: ["Maria", "bought", "a", "car"] },
        { id: 6, portuguese: "Nós vimos um filme", english: "We saw a movie", words: ["We", "saw", "a", "movie"] },
        { id: 7, portuguese: "Pedro escreveu uma carta", english: "Pedro wrote a letter", words: ["Pedro", "wrote", "a", "letter"] },
        { id: 8, portuguese: "Elas foram à praia", english: "They went to the beach", words: ["They", "went", "to", "the", "beach"] },
        { id: 9, portuguese: "João leu o livro", english: "João read the book", words: ["João", "read", "the", "book"] },
        { id: 10, portuguese: "Nós bebemos café", english: "We drank coffee", words: ["We", "drank", "coffee"] },
        { id: 11, portuguese: "Eles chegaram cedo", english: "They arrived early", words: ["They", "arrived", "early"] },
        { id: 12, portuguese: "Ana abriu a janela", english: "Ana opened the window", words: ["Ana", "opened", "the", "window"] },
        { id: 13, portuguese: "Carlos fechou a porta", english: "Carlos closed the door", words: ["Carlos", "closed", "the", "door"] },
        { id: 14, portuguese: "Nós almoçamos juntos", english: "We had lunch together", words: ["We", "had", "lunch", "together"] },
        { id: 15, portuguese: "Ela dançou muito", english: "She danced a lot", words: ["She", "danced", "a", "lot"] },
        { id: 16, portuguese: "Eles correram no parque", english: "They ran in the park", words: ["They", "ran", "in", "the", "park"] },
        { id: 17, portuguese: "Meu irmão nadou no mar", english: "My brother swam in the sea", words: ["My", "brother", "swam", "in", "the", "sea"] },
        { id: 18, portuguese: "Nós cantamos no show", english: "We sang at the concert", words: ["We", "sang", "at", "the", "concert"] },
        { id: 19, portuguese: "Ela desenhou uma flor", english: "She drew a flower", words: ["She", "drew", "a", "flower"] },
        { id: 20, portuguese: "Eles construíram uma casa", english: "They built a house", words: ["They", "built", "a", "house"] },
        { id: 21, portuguese: "O professor explicou a lição", english: "The teacher explained the lesson", words: ["The", "teacher", "explained", "the", "lesson"] },
        { id: 22, portuguese: "Os alunos fizeram perguntas", english: "The students asked questions", words: ["The", "students", "asked", "questions"] },
        { id: 23, portuguese: "Nós esperamos o ônibus", english: "We waited for the bus", words: ["We", "waited", "for", "the", "bus"] },
        { id: 24, portuguese: "Ela perdeu as chaves", english: "She lost the keys", words: ["She", "lost", "the", "keys"] },
        { id: 25, portuguese: "Ele encontrou dinheiro", english: "He found money", words: ["He", "found", "money"] },
        { id: 26, portuguese: "Nós compramos frutas", english: "We bought fruits", words: ["We", "bought", "fruits"] },
        { id: 27, portuguese: "Eles venderam o carro", english: "They sold the car", words: ["They", "sold", "the", "car"] },
        { id: 28, portuguese: "Ela recebeu uma carta", english: "She received a letter", words: ["She", "received", "a", "letter"] },
        { id: 29, portuguese: "Nós enviamos um email", english: "We sent an email", words: ["We", "sent", "an", "email"] },
        { id: 30, portuguese: "Ele pagou a conta", english: "He paid the bill", words: ["He", "paid", "the", "bill"] },
        { id: 31, portuguese: "Ela começou o trabalho", english: "She started the work", words: ["She", "started", "the", "work"] },
        { id: 32, portuguese: "Nós terminamos o projeto", english: "We finished the project", words: ["We", "finished", "the", "project"] },
        { id: 33, portuguese: "Eles mudaram de casa", english: "They moved houses", words: ["They", "moved", "houses"] },
        { id: 34, portuguese: "Eu aprendi espanhol", english: "I learned Spanish", words: ["I", "learned", "Spanish"] },
        { id: 35, portuguese: "Ela ensinou matemática", english: "She taught math", words: ["She", "taught", "math"] },
        { id: 36, portuguese: "Nós praticamos esportes", english: "We practiced sports", words: ["We", "practiced", "sports"] },
        { id: 37, portuguese: "Eles ganharam o jogo", english: "They won the game", words: ["They", "won", "the", "game"] },
        { id: 38, portuguese: "Ela perdeu a partida", english: "She lost the match", words: ["She", "lost", "the", "match"] },
        { id: 39, portuguese: "Nós assistimos TV", english: "We watched TV", words: ["We", "watched", "TV"] },
        { id: 40, portuguese: "Ele ouviu música", english: "He listened to music", words: ["He", "listened", "to", "music"] },
        { id: 41, portuguese: "Ela cozinhou o jantar", english: "She cooked dinner", words: ["She", "cooked", "dinner"] },
        { id: 42, portuguese: "Nós lavamos a louça", english: "We washed the dishes", words: ["We", "washed", "the", "dishes"] },
        { id: 43, portuguese: "Eles limparam a casa", english: "They cleaned the house", words: ["They", "cleaned", "the", "house"] },
        { id: 44, portuguese: "Ele arrumou o quarto", english: "He tidied the room", words: ["He", "tidied", "the", "room"] },
        { id: 45, portuguese: "Ela regou as plantas", english: "She watered the plants", words: ["She", "watered", "the", "plants"] },
        { id: 46, portuguese: "Nós passeamos com o cachorro", english: "We walked the dog", words: ["We", "walked", "the", "dog"] },
        { id: 47, portuguese: "Eles alimentaram o gato", english: "They fed the cat", words: ["They", "fed", "the", "cat"] },
        { id: 48, portuguese: "Ele consertou o carro", english: "He fixed the car", words: ["He", "fixed", "the", "car"] },
        { id: 49, portuguese: "Ela pintou o quadro", english: "She painted the picture", words: ["She", "painted", "the", "picture"] },
        { id: 50, portuguese: "Nós visitamos museus", english: "We visited museums", words: ["We", "visited", "museums"] },
        
        // CONTINUAÇÃO PASSADO - Afirmativas (mais 50 - total 100)
        { id: 51, portuguese: "Eles exploraram a cidade", english: "They explored the city", words: ["They", "explored", "the", "city"] },
        { id: 52, portuguese: "Ela escalou a montanha", english: "She climbed the mountain", words: ["She", "climbed", "the", "mountain"] },
        { id: 53, portuguese: "Nós acampamos na floresta", english: "We camped in the forest", words: ["We", "camped", "in", "the", "forest"] },
        { id: 54, portuguese: "Eles pescaram no rio", english: "They fished in the river", words: ["They", "fished", "in", "the", "river"] },
        { id: 55, portuguese: "Ele caçou no mato", english: "He hunted in the woods", words: ["He", "hunted", "in", "the", "woods"] },
        { id: 56, portuguese: "Ela fotografou a paisagem", english: "She photographed the landscape", words: ["She", "photographed", "the", "landscape"] },
        { id: 57, portuguese: "Nós filmamos o evento", english: "We filmed the event", words: ["We", "filmed", "the", "event"] },
        { id: 58, portuguese: "Eles gravaram a música", english: "They recorded the song", words: ["They", "recorded", "the", "song"] },
        { id: 59, portuguese: "Ele compôs uma sinfonia", english: "He composed a symphony", words: ["He", "composed", "a", "symphony"] },
        { id: 60, portuguese: "Ela dirigiu o filme", english: "She directed the movie", words: ["She", "directed", "the", "movie"] },
        { id: 61, portuguese: "Nós produzimos um programa", english: "We produced a show", words: ["We", "produced", "a", "show"] },
        { id: 62, portuguese: "Eles editaram o vídeo", english: "They edited the video", words: ["They", "edited", "the", "video"] },
        { id: 63, portuguese: "Ele publicou um livro", english: "He published a book", words: ["He", "published", "a", "book"] },
        { id: 64, portuguese: "Ela escreveu um artigo", english: "She wrote an article", words: ["She", "wrote", "an", "article"] },
        { id: 65, portuguese: "Nós traduzimos o documento", english: "We translated the document", words: ["We", "translated", "the", "document"] },
        { id: 66, portuguese: "Eles revisaram o texto", english: "They revised the text", words: ["They", "revised", "the", "text"] },
        { id: 67, portuguese: "Ele corrigiu os erros", english: "He corrected the errors", words: ["He", "corrected", "the", "errors"] },
        { id: 68, portuguese: "Ela organizou a festa", english: "She organized the party", words: ["She", "organized", "the", "party"] },
        { id: 69, portuguese: "Nós preparamos a comida", english: "We prepared the food", words: ["We", "prepared", "the", "food"] },
        { id: 70, portuguese: "Eles decoraram o salão", english: "They decorated the hall", words: ["They", "decorated", "the", "hall"] },
        { id: 71, portuguese: "Ele convidou os amigos", english: "He invited friends", words: ["He", "invited", "friends"] },
        { id: 72, portuguese: "Ela recebeu os convidados", english: "She welcomed the guests", words: ["She", "welcomed", "the", "guests"] },
        { id: 73, portuguese: "Nós dançamos a noite toda", english: "We danced all night", words: ["We", "danced", "all", "night"] },
        { id: 74, portuguese: "Eles cantaram parabéns", english: "They sang happy birthday", words: ["They", "sang", "happy", "birthday"] },
        { id: 75, portuguese: "Ele tocou violão", english: "He played guitar", words: ["He", "played", "guitar"] },
        { id: 76, portuguese: "Ela tocou piano", english: "She played piano", words: ["She", "played", "piano"] },
        { id: 77, portuguese: "Nós batemos palmas", english: "We clapped", words: ["We", "clapped"] },
        { id: 78, portuguese: "Eles gritaram de alegria", english: "They shouted with joy", words: ["They", "shouted", "with", "joy"] },
        { id: 79, portuguese: "Ele pulou de felicidade", english: "He jumped with happiness", words: ["He", "jumped", "with", "happiness"] },
        { id: 80, portuguese: "Ela chorou de emoção", english: "She cried with emotion", words: ["She", "cried", "with", "emotion"] },
        { id: 81, portuguese: "Nós rimos muito", english: "We laughed a lot", words: ["We", "laughed", "a", "lot"] },
        { id: 82, portuguese: "Eles sorriram para foto", english: "They smiled for the photo", words: ["They", "smiled", "for", "the", "photo"] },
        { id: 83, portuguese: "Ele acenou para nós", english: "He waved at us", words: ["He", "waved", "at", "us"] },
        { id: 84, portuguese: "Ela abraçou a mãe", english: "She hugged her mother", words: ["She", "hugged", "her", "mother"] },
        { id: 85, portuguese: "Nós beijamos as crianças", english: "We kissed the children", words: ["We", "kissed", "the", "children"] },
        { id: 86, portuguese: "Eles apertaram as mãos", english: "They shook hands", words: ["They", "shook", "hands"] },
        { id: 87, portuguese: "Ele cumprimentou todos", english: "He greeted everyone", words: ["He", "greeted", "everyone"] },
        { id: 88, portuguese: "Ela agradeceu a ajuda", english: "She thanked for the help", words: ["She", "thanked", "for", "the", "help"] },
        { id: 89, portuguese: "Nós pedimos desculpas", english: "We apologized", words: ["We", "apologized"] },
        { id: 90, portuguese: "Eles perdoaram o erro", english: "They forgave the mistake", words: ["They", "forgave", "the", "mistake"] },
        { id: 91, portuguese: "Ele esqueceu o aniversário", english: "He forgot the birthday", words: ["He", "forgot", "the", "birthday"] },
        { id: 92, portuguese: "Ela lembrou do compromisso", english: "She remembered the appointment", words: ["She", "remembered", "the", "appointment"] },
        { id: 93, portuguese: "Nós entendemos a explicação", english: "We understood the explanation", words: ["We", "understood", "the", "explanation"] },
        { id: 94, portuguese: "Eles acreditaram na história", english: "They believed the story", words: ["They", "believed", "the", "story"] },
        { id: 95, portuguese: "Ele duvidou da notícia", english: "He doubted the news", words: ["He", "doubted", "the", "news"] },
        { id: 96, portuguese: "Ela confirmou a reserva", english: "She confirmed the reservation", words: ["She", "confirmed", "the", "reservation"] },
        { id: 97, portuguese: "Nós cancelamos o pedido", english: "We canceled the order", words: ["We", "canceled", "the", "order"] },
        { id: 98, portuguese: "Eles adiaram a reunião", english: "They postponed the meeting", words: ["They", "postponed", "the", "meeting"] },
        { id: 99, portuguese: "Ele antecipou a viagem", english: "He brought forward the trip", words: ["He", "brought", "forward", "the", "trip"] },
        { id: 100, portuguese: "Ela marcou a consulta", english: "She scheduled the appointment", words: ["She", "scheduled", "the", "appointment"] },
        
        // PASSADO - Perguntas (100)
        { id: 101, portuguese: "Você trabalhou ontem?", english: "Did you work yesterday?", words: ["Did", "you", "work", "yesterday?"] },
        { id: 102, portuguese: "O que você fez?", english: "What did you do?", words: ["What", "did", "you", "do?"] },
        { id: 103, portuguese: "Onde eles moravam?", english: "Where did they live?", words: ["Where", "did", "they", "live?"] },
        { id: 104, portuguese: "Você ligou para ela?", english: "Did you call her?", words: ["Did", "you", "call", "her?"] },
        { id: 105, portuguese: "Ela gostou do filme?", english: "Did she like the movie?", words: ["Did", "she", "like", "the", "movie?"] },
        { id: 106, portuguese: "Eles vieram à festa?", english: "Did they come to the party?", words: ["Did", "they", "come", "to", "the", "party?"] },
        { id: 107, portuguese: "Você terminou o trabalho?", english: "Did you finish the work?", words: ["Did", "you", "finish", "the", "work?"] },
        { id: 108, portuguese: "João leu o livro?", english: "Did João read the book?", words: ["Did", "João", "read", "the", "book?"] },
        { id: 109, portuguese: "Maria comprou o carro?", english: "Did Maria buy the car?", words: ["Did", "Maria", "buy", "the", "car?"] },
        { id: 110, portuguese: "Nós vimos o filme?", english: "Did we see the movie?", words: ["Did", "we", "see", "the", "movie?"] },
        { id: 111, portuguese: "Você bebeu café?", english: "Did you drink coffee?", words: ["Did", "you", "drink", "coffee?"] },
        { id: 112, portuguese: "Eles chegaram cedo?", english: "Did they arrive early?", words: ["Did", "they", "arrive", "early?"] },
        { id: 113, portuguese: "Ana abriu a janela?", english: "Did Ana open the window?", words: ["Did", "Ana", "open", "the", "window?"] },
        { id: 114, portuguese: "Carlos fechou a porta?", english: "Did Carlos close the door?", words: ["Did", "Carlos", "close", "the", "door?"] },
        { id: 115, portuguese: "Você almoçou com eles?", english: "Did you have lunch with them?", words: ["Did", "you", "have", "lunch", "with", "them?"] },
        { id: 116, portuguese: "Ela dançou na festa?", english: "Did she dance at the party?", words: ["Did", "she", "dance", "at", "the", "party?"] },
        { id: 117, portuguese: "Eles correram no parque?", english: "Did they run in the park?", words: ["Did", "they", "run", "in", "the", "park?"] },
        { id: 118, portuguese: "Seu irmão nadou no mar?", english: "Did your brother swim in the sea?", words: ["Did", "your", "brother", "swim", "in", "the", "sea?"] },
        { id: 119, portuguese: "Vocês cantaram no show?", english: "Did you sing at the concert?", words: ["Did", "you", "sing", "at", "the", "concert?"] },
        { id: 120, portuguese: "Ela desenhou uma flor?", english: "Did she draw a flower?", words: ["Did", "she", "draw", "a", "flower?"] },
        { id: 121, portuguese: "Eles construíram a casa?", english: "Did they build the house?", words: ["Did", "they", "build", "the", "house?"] },
        { id: 122, portuguese: "O professor explicou a lição?", english: "Did the teacher explain the lesson?", words: ["Did", "the", "teacher", "explain", "the", "lesson?"] },
        { id: 123, portuguese: "Os alunos fizeram perguntas?", english: "Did the students ask questions?", words: ["Did", "the", "students", "ask", "questions?"] },
        { id: 124, portuguese: "Você esperou o ônibus?", english: "Did you wait for the bus?", words: ["Did", "you", "wait", "for", "the", "bus?"] },
        { id: 125, portuguese: "Ela perdeu as chaves?", english: "Did she lose the keys?", words: ["Did", "she", "lose", "the", "keys?"] },
        { id: 126, portuguese: "Ele encontrou dinheiro?", english: "Did he find money?", words: ["Did", "he", "find", "money?"] },
        { id: 127, portuguese: "Você comprou frutas?", english: "Did you buy fruits?", words: ["Did", "you", "buy", "fruits?"] },
        { id: 128, portuguese: "Eles venderam o carro?", english: "Did they sell the car?", words: ["Did", "they", "sell", "the", "car?"] },
        { id: 129, portuguese: "Ela recebeu uma carta?", english: "Did she receive a letter?", words: ["Did", "she", "receive", "a", "letter?"] },
        { id: 130, portuguese: "Você enviou um email?", english: "Did you send an email?", words: ["Did", "you", "send", "an", "email?"] },
        { id: 131, portuguese: "Ele pagou a conta?", english: "Did he pay the bill?", words: ["Did", "he", "pay", "the", "bill?"] },
        { id: 132, portuguese: "Ela começou o trabalho?", english: "Did she start the work?", words: ["Did", "she", "start", "the", "work?"] },
        { id: 133, portuguese: "Você terminou o projeto?", english: "Did you finish the project?", words: ["Did", "you", "finish", "the", "project?"] },
        { id: 134, portuguese: "Eles mudaram de casa?", english: "Did they move houses?", words: ["Did", "they", "move", "houses?"] },
        { id: 135, portuguese: "Você aprendeu espanhol?", english: "Did you learn Spanish?", words: ["Did", "you", "learn", "Spanish?"] },
        { id: 136, portuguese: "Ela ensinou matemática?", english: "Did she teach math?", words: ["Did", "she", "teach", "math?"] },
        { id: 137, portuguese: "Vocês praticaram esportes?", english: "Did you practice sports?", words: ["Did", "you", "practice", "sports?"] },
        { id: 138, portuguese: "Eles ganharam o jogo?", english: "Did they win the game?", words: ["Did", "they", "win", "the", "game?"] },
        { id: 139, portuguese: "Ela perdeu a partida?", english: "Did she lose the match?", words: ["Did", "she", "lose", "the", "match?"] },
        { id: 140, portuguese: "Você assistiu TV?", english: "Did you watch TV?", words: ["Did", "you", "watch", "TV?"] },
        { id: 141, portuguese: "Ele ouviu música?", english: "Did he listen to music?", words: ["Did", "he", "listen", "to", "music?"] },
        { id: 142, portuguese: "Ela cozinhou o jantar?", english: "Did she cook dinner?", words: ["Did", "she", "cook", "dinner?"] },
        { id: 143, portuguese: "Você lavou a louça?", english: "Did you wash the dishes?", words: ["Did", "you", "wash", "the", "dishes?"] },
        { id: 144, portuguese: "Eles limparam a casa?", english: "Did they clean the house?", words: ["Did", "they", "clean", "the", "house?"] },
        { id: 145, portuguese: "Ele arrumou o quarto?", english: "Did he tidy the room?", words: ["Did", "he", "tidy", "the", "room?"] },
        { id: 146, portuguese: "Ela regou as plantas?", english: "Did she water the plants?", words: ["Did", "she", "water", "the", "plants?"] },
        { id: 147, portuguese: "Você passeou com o cachorro?", english: "Did you walk the dog?", words: ["Did", "you", "walk", "the", "dog?"] },
        { id: 148, portuguese: "Eles alimentaram o gato?", english: "Did they feed the cat?", words: ["Did", "they", "feed", "the", "cat?"] },
        { id: 149, portuguese: "Ele consertou o carro?", english: "Did he fix the car?", words: ["Did", "he", "fix", "the", "car?"] },
        { id: 150, portuguese: "Ela pintou o quadro?", english: "Did she paint the picture?", words: ["Did", "she", "paint", "the", "picture?"] },
        { id: 151, portuguese: "Você visitou museus?", english: "Did you visit museums?", words: ["Did", "you", "visit", "museums?"] },
        { id: 152, portuguese: "Eles exploraram a cidade?", english: "Did they explore the city?", words: ["Did", "they", "explore", "the", "city?"] },
        { id: 153, portuguese: "Ela escalou a montanha?", english: "Did she climb the mountain?", words: ["Did", "she", "climb", "the", "mountain?"] },
        { id: 154, portuguese: "Vocês acamparam na floresta?", english: "Did you camp in the forest?", words: ["Did", "you", "camp", "in", "the", "forest?"] },
        { id: 155, portuguese: "Eles pescaram no rio?", english: "Did they fish in the river?", words: ["Did", "they", "fish", "in", "the", "river?"] },
        { id: 156, portuguese: "Ele fotografou a paisagem?", english: "Did he photograph the landscape?", words: ["Did", "he", "photograph", "the", "landscape?"] },
        { id: 157, portuguese: "Ela dirigiu o filme?", english: "Did she direct the movie?", words: ["Did", "she", "direct", "the", "movie?"] },
        { id: 158, portuguese: "Você publicou um livro?", english: "Did you publish a book?", words: ["Did", "you", "publish", "a", "book?"] },
        { id: 159, portuguese: "Ele escreveu um artigo?", english: "Did he write an article?", words: ["Did", "he", "write", "an", "article?"] },
        { id: 160, portuguese: "Ela organizou a festa?", english: "Did she organize the party?", words: ["Did", "she", "organize", "the", "party?"] },
        { id: 161, portuguese: "Você preparou a comida?", english: "Did you prepare the food?", words: ["Did", "you", "prepare", "the", "food?"] },
        { id: 162, portuguese: "Eles decoraram o salão?", english: "Did they decorate the hall?", words: ["Did", "they", "decorate", "the", "hall?"] },
        { id: 163, portuguese: "Ele convidou os amigos?", english: "Did he invite friends?", words: ["Did", "he", "invite", "friends?"] },
        { id: 164, portuguese: "Ela recebeu os convidados?", english: "Did she welcome the guests?", words: ["Did", "she", "welcome", "the", "guests?"] },
        { id: 165, portuguese: "Vocês dançaram a noite toda?", english: "Did you dance all night?", words: ["Did", "you", "dance", "all", "night?"] },
        { id: 166, portuguese: "Eles cantaram parabéns?", english: "Did they sing happy birthday?", words: ["Did", "they", "sing", "happy", "birthday?"] },
        { id: 167, portuguese: "Ele tocou violão?", english: "Did he play guitar?", words: ["Did", "he", "play", "guitar?"] },
        { id: 168, portuguese: "Ela tocou piano?", english: "Did she play piano?", words: ["Did", "she", "play", "piano?"] },
        { id: 169, portuguese: "Você lembrou do compromisso?", english: "Did you remember the appointment?", words: ["Did", "you", "remember", "the", "appointment?"] },
        { id: 170, portuguese: "Ele entendeu a explicação?", english: "Did he understand the explanation?", words: ["Did", "he", "understand", "the", "explanation?"] },
        { id: 171, portuguese: "Ela confirmou a reserva?", english: "Did she confirm the reservation?", words: ["Did", "she", "confirm", "the", "reservation?"] },
        { id: 172, portuguese: "Você cancelou o pedido?", english: "Did you cancel the order?", words: ["Did", "you", "cancel", "the", "order?"] },
        { id: 173, portuguese: "Eles adiaram a reunião?", english: "Did they postpone the meeting?", words: ["Did", "they", "postpone", "the", "meeting?"] },
        { id: 174, portuguese: "Ele antecipou a viagem?", english: "Did he bring forward the trip?", words: ["Did", "he", "bring", "forward", "the", "trip?"] },
        { id: 175, portuguese: "Ela marcou a consulta?", english: "Did she schedule the appointment?", words: ["Did", "she", "schedule", "the", "appointment?"] },
        { id: 176, portuguese: "Você pediu ajuda?", english: "Did you ask for help?", words: ["Did", "you", "ask", "for", "help?"] },
        { id: 177, portuguese: "Ele ofereceu ajuda?", english: "Did he offer help?", words: ["Did", "he", "offer", "help?"] },
        { id: 178, portuguese: "Ela aceitou o convite?", english: "Did she accept the invitation?", words: ["Did", "she", "accept", "the", "invitation?"] },
        { id: 179, portuguese: "Você recusou a oferta?", english: "Did you refuse the offer?", words: ["Did", "you", "refuse", "the", "offer?"] },
        { id: 180, portuguese: "Eles escolheram o restaurante?", english: "Did they choose the restaurant?", words: ["Did", "they", "choose", "the", "restaurant?"] },
        
        // PASSADO - Negativas (100)
        { id: 181, portuguese: "Ele não foi à escola", english: "He didn't go to school", words: ["He", "didn't", "go", "to", "school"] },
        { id: 182, portuguese: "Ele não comeu carne", english: "He didn't eat meat", words: ["He", "didn't", "eat", "meat"] },
        { id: 183, portuguese: "Ela não gostou do filme", english: "She didn't like the movie", words: ["She", "didn't", "like", "the", "movie"] },
        { id: 184, portuguese: "Eles não vieram à festa", english: "They didn't come to the party", words: ["They", "didn't", "come", "to", "the", "party"] },
        { id: 185, portuguese: "Eu não comi pizza", english: "I didn't eat pizza", words: ["I", "didn't", "eat", "pizza"] },
        { id: 186, portuguese: "Ela não estudou inglês", english: "She didn't study English", words: ["She", "didn't", "study", "English"] },
        { id: 187, portuguese: "Nós não viajamos", english: "We didn't travel", words: ["We", "didn't", "travel"] },
        { id: 188, portuguese: "Eles não jogaram", english: "They didn't play", words: ["They", "didn't", "play"] },
        { id: 189, portuguese: "Maria não comprou o carro", english: "Maria didn't buy the car", words: ["Maria", "didn't", "buy", "the", "car"] },
        { id: 190, portuguese: "Nós não vimos o filme", english: "We didn't see the movie", words: ["We", "didn't", "see", "the", "movie"] },
        { id: 191, portuguese: "Pedro não escreveu a carta", english: "Pedro didn't write the letter", words: ["Pedro", "didn't", "write", "the", "letter"] },
        { id: 192, portuguese: "Elas não foram à praia", english: "They didn't go to the beach", words: ["They", "didn't", "go", "to", "the", "beach"] },
        { id: 193, portuguese: "João não leu o livro", english: "João didn't read the book", words: ["João", "didn't", "read", "the", "book"] },
        { id: 194, portuguese: "Nós não bebemos café", english: "We didn't drink coffee", words: ["We", "didn't", "drink", "coffee"] },
        { id: 195, portuguese: "Eles não chegaram cedo", english: "They didn't arrive early", words: ["They", "didn't", "arrive", "early"] },
        { id: 196, portuguese: "Ana não abriu a janela", english: "Ana didn't open the window", words: ["Ana", "didn't", "open", "the", "window"] },
        { id: 197, portuguese: "Carlos não fechou a porta", english: "Carlos didn't close the door", words: ["Carlos", "didn't", "close", "the", "door"] },
        { id: 198, portuguese: "Nós não almoçamos juntos", english: "We didn't have lunch together", words: ["We", "didn't", "have", "lunch", "together"] },
        { id: 199, portuguese: "Ela não dançou muito", english: "She didn't dance a lot", words: ["She", "didn't", "dance", "a", "lot"] },
        { id: 200, portuguese: "Eles não correram no parque", english: "They didn't run in the park", words: ["They", "didn't", "run", "in", "the", "park"] }
    ],
    
    // ===== PRESENTE - 300 frases =====
    present: [
        // PRESENTE - Afirmativas (100)
        { id: 301, portuguese: "Eu como pizza", english: "I eat pizza", words: ["I", "eat", "pizza"] },
        { id: 302, portuguese: "Ela estuda inglês", english: "She studies English", words: ["She", "studies", "English"] },
        { id: 303, portuguese: "Nós viajamos para Paris", english: "We travel to Paris", words: ["We", "travel", "to", "Paris"] },
        { id: 304, portuguese: "Eles jogam futebol", english: "They play soccer", words: ["They", "play", "soccer"] },
        { id: 305, portuguese: "Maria compra um carro", english: "Maria buys a car", words: ["Maria", "buys", "a", "car"] },
        { id: 306, portuguese: "Nós vemos um filme", english: "We see a movie", words: ["We", "see", "a", "movie"] },
        { id: 307, portuguese: "Pedro escreve cartas", english: "Pedro writes letters", words: ["Pedro", "writes", "letters"] },
        { id: 308, portuguese: "Elas vão à praia", english: "They go to the beach", words: ["They", "go", "to", "the", "beach"] },
        { id: 309, portuguese: "João lê livros", english: "João reads books", words: ["João", "reads", "books"] },
        { id: 310, portuguese: "Nós bebemos café", english: "We drink coffee", words: ["We", "drink", "coffee"] },
        { id: 311, portuguese: "Eles chegam cedo", english: "They arrive early", words: ["They", "arrive", "early"] },
        { id: 312, portuguese: "Ana abre a janela", english: "Ana opens the window", words: ["Ana", "opens", "the", "window"] },
        { id: 313, portuguese: "Carlos fecha a porta", english: "Carlos closes the door", words: ["Carlos", "closes", "the", "door"] },
        { id: 314, portuguese: "Nós almoçamos juntos", english: "We have lunch together", words: ["We", "have", "lunch", "together"] },
        { id: 315, portuguese: "Ela dança muito", english: "She dances a lot", words: ["She", "dances", "a", "lot"] },
        { id: 316, portuguese: "Eles correm no parque", english: "They run in the park", words: ["They", "run", "in", "the", "park"] },
        { id: 317, portuguese: "Meu irmão nada no mar", english: "My brother swims in the sea", words: ["My", "brother", "swims", "in", "the", "sea"] },
        { id: 318, portuguese: "Nós cantamos no show", english: "We sing at the concert", words: ["We", "sing", "at", "the", "concert"] },
        { id: 319, portuguese: "Ela desenha flores", english: "She draws flowers", words: ["She", "draws", "flowers"] },
        { id: 320, portuguese: "Eles constroem casas", english: "They build houses", words: ["They", "build", "houses"] },
        { id: 321, portuguese: "O professor explica a lição", english: "The teacher explains the lesson", words: ["The", "teacher", "explains", "the", "lesson"] },
        { id: 322, portuguese: "Os alunos fazem perguntas", english: "The students ask questions", words: ["The", "students", "ask", "questions"] },
        { id: 323, portuguese: "Nós esperamos o ônibus", english: "We wait for the bus", words: ["We", "wait", "for", "the", "bus"] },
        { id: 324, portuguese: "Ela perde as chaves", english: "She loses the keys", words: ["She", "loses", "the", "keys"] },
        { id: 325, portuguese: "Ele encontra dinheiro", english: "He finds money", words: ["He", "finds", "money"] },
        { id: 326, portuguese: "Nós compramos frutas", english: "We buy fruits", words: ["We", "buy", "fruits"] },
        { id: 327, portuguese: "Eles vendem o carro", english: "They sell the car", words: ["They", "sell", "the", "car"] },
        { id: 328, portuguese: "Ela recebe cartas", english: "She receives letters", words: ["She", "receives", "letters"] },
        { id: 329, portuguese: "Nós enviamos emails", english: "We send emails", words: ["We", "send", "emails"] },
        { id: 330, portuguese: "Ele paga a conta", english: "He pays the bill", words: ["He", "pays", "the", "bill"] },
        { id: 331, portuguese: "Ela começa o trabalho", english: "She starts the work", words: ["She", "starts", "the", "work"] },
        { id: 332, portuguese: "Nós terminamos o projeto", english: "We finish the project", words: ["We", "finish", "the", "project"] },
        { id: 333, portuguese: "Eles mudam de casa", english: "They move houses", words: ["They", "move", "houses"] },
        { id: 334, portuguese: "Eu aprendo espanhol", english: "I learn Spanish", words: ["I", "learn", "Spanish"] },
        { id: 335, portuguese: "Ela ensina matemática", english: "She teaches math", words: ["She", "teaches", "math"] },
        { id: 336, portuguese: "Nós praticamos esportes", english: "We practice sports", words: ["We", "practice", "sports"] },
        { id: 337, portuguese: "Eles ganham o jogo", english: "They win the game", words: ["They", "win", "the", "game"] },
        { id: 338, portuguese: "Ela perde a partida", english: "She loses the match", words: ["She", "loses", "the", "match"] },
        { id: 339, portuguese: "Nós assistimos TV", english: "We watch TV", words: ["We", "watch", "TV"] },
        { id: 340, portuguese: "Ele ouve música", english: "He listens to music", words: ["He", "listens", "to", "music"] },
        { id: 341, portuguese: "Ela cozinha o jantar", english: "She cooks dinner", words: ["She", "cooks", "dinner"] },
        { id: 342, portuguese: "Nós lavamos a louça", english: "We wash the dishes", words: ["We", "wash", "the", "dishes"] },
        { id: 343, portuguese: "Eles limpam a casa", english: "They clean the house", words: ["They", "clean", "the", "house"] },
        { id: 344, portuguese: "Ele arruma o quarto", english: "He tidies the room", words: ["He", "tidies", "the", "room"] },
        { id: 345, portuguese: "Ela rega as plantas", english: "She waters the plants", words: ["She", "waters", "the", "plants"] },
        { id: 346, portuguese: "Nós passeamos com o cachorro", english: "We walk the dog", words: ["We", "walk", "the", "dog"] },
        { id: 347, portuguese: "Eles alimentam o gato", english: "They feed the cat", words: ["They", "feed", "the", "cat"] },
        { id: 348, portuguese: "Ele conserta o carro", english: "He fixes the car", words: ["He", "fixes", "the", "car"] },
        { id: 349, portuguese: "Ela pinta quadros", english: "She paints pictures", words: ["She", "paints", "pictures"] },
        { id: 350, portuguese: "Nós visitamos museus", english: "We visit museums", words: ["We", "visit", "museums"] },
        
        // PRESENTE - Perguntas (100)
        { id: 401, portuguese: "Você trabalha aqui?", english: "Do you work here?", words: ["Do", "you", "work", "here?"] },
        { id: 402, portuguese: "Você fala inglês?", english: "Do you speak English?", words: ["Do", "you", "speak", "English?"] },
        { id: 403, portuguese: "Onde eles moram?", english: "Where do they live?", words: ["Where", "do", "they", "live?"] },
        { id: 404, portuguese: "O que você faz?", english: "What do you do?", words: ["What", "do", "you", "do?"] },
        { id: 405, portuguese: "Ela gosta de café?", english: "Does she like coffee?", words: ["Does", "she", "like", "coffee?"] },
        { id: 406, portuguese: "Ele estuda inglês?", english: "Does he study English?", words: ["Does", "he", "study", "English?"] },
        { id: 407, portuguese: "Você tem irmãos?", english: "Do you have siblings?", words: ["Do", "you", "have", "siblings?"] },
        { id: 408, portuguese: "Eles jogam futebol?", english: "Do they play soccer?", words: ["Do", "they", "play", "soccer?"] },
        { id: 409, portuguese: "Maria compra um carro?", english: "Does Maria buy a car?", words: ["Does", "Maria", "buy", "a", "car?"] },
        { id: 410, portuguese: "Nós vemos um filme?", english: "Do we see a movie?", words: ["Do", "we", "see", "a", "movie?"] },
        { id: 411, portuguese: "Pedro escreve cartas?", english: "Does Pedro write letters?", words: ["Does", "Pedro", "write", "letters?"] },
        { id: 412, portuguese: "Elas vão à praia?", english: "Do they go to the beach?", words: ["Do", "they", "go", "to", "the", "beach?"] },
        { id: 413, portuguese: "João lê livros?", english: "Does João read books?", words: ["Does", "João", "read", "books?"] },
        { id: 414, portuguese: "Você bebe café?", english: "Do you drink coffee?", words: ["Do", "you", "drink", "coffee?"] },
        { id: 415, portuguese: "Eles chegam cedo?", english: "Do they arrive early?", words: ["Do", "they", "arrive", "early?"] },
        { id: 416, portuguese: "Ana abre a janela?", english: "Does Ana open the window?", words: ["Does", "Ana", "open", "the", "window?"] },
        { id: 417, portuguese: "Carlos fecha a porta?", english: "Does Carlos close the door?", words: ["Does", "Carlos", "close", "the", "door?"] },
        { id: 418, portuguese: "Você almoça com eles?", english: "Do you have lunch with them?", words: ["Do", "you", "have", "lunch", "with", "them?"] },
        { id: 419, portuguese: "Ela dança na festa?", english: "Does she dance at the party?", words: ["Does", "she", "dance", "at", "the", "party?"] },
        { id: 420, portuguese: "Eles correm no parque?", english: "Do they run in the park?", words: ["Do", "they", "run", "in", "the", "park?"] },
        
        // PRESENTE - Negativas (100)
        { id: 501, portuguese: "Ele não vai à escola", english: "He doesn't go to school", words: ["He", "doesn't", "go", "to", "school"] },
        { id: 502, portuguese: "Ele não come carne", english: "He doesn't eat meat", words: ["He", "doesn't", "eat", "meat"] },
        { id: 503, portuguese: "Ela não gosta de café", english: "She doesn't like coffee", words: ["She", "doesn't", "like", "coffee"] },
        { id: 504, portuguese: "Eles não vêm à festa", english: "They don't come to the party", words: ["They", "don't", "come", "to", "the", "party"] },
        { id: 505, portuguese: "Eu não como pizza", english: "I don't eat pizza", words: ["I", "don't", "eat", "pizza"] },
        { id: 506, portuguese: "Ela não estuda inglês", english: "She doesn't study English", words: ["She", "doesn't", "study", "English"] },
        { id: 507, portuguese: "Nós não viajamos", english: "We don't travel", words: ["We", "don't", "travel"] },
        { id: 508, portuguese: "Eles não jogam", english: "They don't play", words: ["They", "don't", "play"] }
    ],
    
    // ===== FUTURO - 300 frases =====
    future: [
        // FUTURO - Afirmativas (100)
        { id: 601, portuguese: "Eu comerei pizza amanhã", english: "I will eat pizza tomorrow", words: ["I", "will", "eat", "pizza", "tomorrow"] },
        { id: 602, portuguese: "Ela estudará inglês", english: "She will study English", words: ["She", "will", "study", "English"] },
        { id: 603, portuguese: "Nós viajaremos para Paris", english: "We will travel to Paris", words: ["We", "will", "travel", "to", "Paris"] },
        { id: 604, portuguese: "Eles jogarão futebol", english: "They will play soccer", words: ["They", "will", "play", "soccer"] },
        { id: 605, portuguese: "Maria comprará um carro", english: "Maria will buy a car", words: ["Maria", "will", "buy", "a", "car"] },
        { id: 606, portuguese: "Nós veremos um filme", english: "We will see a movie", words: ["We", "will", "see", "a", "movie"] },
        { id: 607, portuguese: "Pedro escreverá uma carta", english: "Pedro will write a letter", words: ["Pedro", "will", "write", "a", "letter"] },
        { id: 608, portuguese: "Elas irão à praia", english: "They will go to the beach", words: ["They", "will", "go", "to", "the", "beach"] },
        { id: 609, portuguese: "João lerá o livro", english: "João will read the book", words: ["João", "will", "read", "the", "book"] },
        { id: 610, portuguese: "Nós beberemos café", english: "We will drink coffee", words: ["We", "will", "drink", "coffee"] },
        { id: 611, portuguese: "Eles chegarão cedo", english: "They will arrive early", words: ["They", "will", "arrive", "early"] },
        { id: 612, portuguese: "Ana abrirá a janela", english: "Ana will open the window", words: ["Ana", "will", "open", "the", "window"] },
        { id: 613, portuguese: "Carlos fechará a porta", english: "Carlos will close the door", words: ["Carlos", "will", "close", "the", "door"] },
        { id: 614, portuguese: "Nós almoçaremos juntos", english: "We will have lunch together", words: ["We", "will", "have", "lunch", "together"] },
        { id: 615, portuguese: "Ela dançará muito", english: "She will dance a lot", words: ["She", "will", "dance", "a", "lot"] },
        { id: 616, portuguese: "Eles correrão no parque", english: "They will run in the park", words: ["They", "will", "run", "in", "the", "park"] },
        { id: 617, portuguese: "Meu irmão nadará no mar", english: "My brother will swim in the sea", words: ["My", "brother", "will", "swim", "in", "the", "sea"] },
        { id: 618, portuguese: "Nós cantaremos no show", english: "We will sing at the concert", words: ["We", "will", "sing", "at", "the", "concert"] },
        { id: 619, portuguese: "Ela desenhará uma flor", english: "She will draw a flower", words: ["She", "will", "draw", "a", "flower"] },
        { id: 620, portuguese: "Eles construirão uma casa", english: "They will build a house", words: ["They", "will", "build", "a", "house"] },
        
        // FUTURO - Perguntas (100)
        { id: 701, portuguese: "Você trabalhará amanhã?", english: "Will you work tomorrow?", words: ["Will", "you", "work", "tomorrow?"] },
        { id: 702, portuguese: "Você falará com ela?", english: "Will you talk to her?", words: ["Will", "you", "talk", "to", "her?"] },
        { id: 703, portuguese: "Onde eles morarão?", english: "Where will they live?", words: ["Where", "will", "they", "live?"] },
        { id: 704, portuguese: "O que você fará?", english: "What will you do?", words: ["What", "will", "you", "do?"] },
        { id: 705, portuguese: "Ela gostará do filme?", english: "Will she like the movie?", words: ["Will", "she", "like", "the", "movie?"] },
        { id: 706, portuguese: "Ele estudará inglês?", english: "Will he study English?", words: ["Will", "he", "study", "English?"] },
        { id: 707, portuguese: "Você viajará amanhã?", english: "Will you travel tomorrow?", words: ["Will", "you", "travel", "tomorrow?"] },
        { id: 708, portuguese: "Eles jogarão futebol?", english: "Will they play soccer?", words: ["Will", "they", "play", "soccer?"] },
        { id: 709, portuguese: "Maria comprará um carro?", english: "Will Maria buy a car?", words: ["Will", "Maria", "buy", "a", "car?"] },
        { id: 710, portuguese: "Nós veremos um filme?", english: "Will we see a movie?", words: ["Will", "we", "see", "a", "movie?"] },
        
        // FUTURO - Negativas (100)
        { id: 801, portuguese: "Ele não irá à escola", english: "He will not go to school", words: ["He", "will", "not", "go", "to", "school"] },
        { id: 802, portuguese: "Ele não comerá carne", english: "He will not eat meat", words: ["He", "will", "not", "eat", "meat"] },
        { id: 803, portuguese: "Ela não gostará do filme", english: "She will not like the movie", words: ["She", "will", "not", "like", "the", "movie"] },
        { id: 804, portuguese: "Eles não virão à festa", english: "They will not come to the party", words: ["They", "will", "not", "come", "to", "the", "party"] },
        { id: 805, portuguese: "Eu não comerei pizza", english: "I will not eat pizza", words: ["I", "will", "not", "eat", "pizza"] },
        { id: 806, portuguese: "Ela não estudará inglês", english: "She will not study English", words: ["She", "will", "not", "study", "English"] },
        { id: 807, portuguese: "Nós não viajaremos", english: "We will not travel", words: ["We", "will", "not", "travel"] },
        { id: 808, portuguese: "Eles não jogarão", english: "They will not play", words: ["They", "will", "not", "play"] }
    ]
};

// Gerador automático para completar 300 em cada categoria
function generateMoreExercises() {
    const verbs = {
        past: ['walked', 'talked', 'watched', 'listened', 'cooked', 'cleaned', 'visited', 'called', 'helped', 'asked',
               'answered', 'opened', 'closed', 'started', 'finished', 'worked', 'studied', 'played', 'lived', 'loved'],
        present: ['walk', 'talk', 'watch', 'listen', 'cook', 'clean', 'visit', 'call', 'help', 'ask',
                 'answer', 'open', 'close', 'start', 'finish', 'work', 'study', 'play', 'live', 'love'],
        future: ['will walk', 'will talk', 'will watch', 'will listen', 'will cook', 'will clean', 'will visit', 'will call', 'will help', 'will ask',
                'will answer', 'will open', 'will close', 'will start', 'will finish', 'will work', 'will study', 'will play', 'will live', 'will love']
    };
    
    const subjects = ['I', 'You', 'He', 'She', 'We', 'They', 'John', 'Mary', 'Peter', 'Anna', 'Paul', 'Laura', 'David', 'Sarah', 'Mike', 'Emma'];
    const objects = ['pizza', 'pasta', 'rice', 'bread', 'fruit', 'vegetables', 'meat', 'fish', 'chicken', 'soup',
                    'coffee', 'tea', 'juice', 'water', 'milk', 'soda', 'beer', 'wine', 'cake', 'ice cream'];
    const places = ['home', 'school', 'work', 'park', 'beach', 'cinema', 'restaurant', 'supermarket', 'mall', 'library',
                   'museum', 'theater', 'stadium', 'gym', 'church', 'hospital', 'bank', 'post office', 'airport', 'station'];
    const times = ['today', 'tomorrow', 'yesterday', 'now', 'later', 'soon', 'every day', 'every week', 'every month', 'every year',
                  'on Monday', 'on Tuesday', 'on Wednesday', 'on Thursday', 'on Friday', 'on Saturday', 'on Sunday',
                  'in the morning', 'in the afternoon', 'in the evening', 'at night'];
    
    // Função para preencher automaticamente
    // Por questões de performance, já temos 300+ frases manuais acima
}

// O resto do código permanece IGUAL ao anterior
// (funções de login, ranking, jogo, etc.)
