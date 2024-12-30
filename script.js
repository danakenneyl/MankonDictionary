// Function to fetch and load the JSON file (staticaly loaded from GitHub Pages)
async function loadDictionaryData() {
    const response = await fetch('dictionary.json'); // This assumes the file is in the same directory as the HTML
    if (!response.ok) {
        throw new Error('Failed to load dictionary data');
    }
    return await response.json();
}

let dictionaryData = {};

// Load dictionary data when the page loads
loadDictionaryData().then(data => {
    dictionaryData = data;

    // Set up event listener after data is loaded
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchDictionary(e.target.value);
    });

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            document.getElementById('searchResults').classList.add('hidden');
        }
    });

}).catch(error => {
    console.error('Error loading dictionary data:', error);
});

function playAudio(audioFile) {
    const audio = new Audio(audioFile);
    audio.play();
}

function displayEntry(mankonWord) {
    const entry = dictionaryData.searchMankon[mankonWord];
    if (!entry) return;

    // Update word and part of speech
    document.getElementById('wordEntry').textContent = mankonWord;
    document.getElementById('posEntry').textContent = entry.partOfSpeech;
    
    // Add word audio click handler
    const wordAudioIcon = document.querySelector('.word-audio-icon');
    wordAudioIcon.onclick = () => playAudio(entry.wordAudioFiles[0]);
    
    // Update translation and definition
    document.getElementById('translationEntry').textContent = entry.translation.join(', ');
    document.getElementById('definitionEntry').textContent = entry.definition;
    
    // Clear and rebuild sentences
    const sentencesContainer = document.getElementById('sentencesContainer');
    sentencesContainer.innerHTML = '';
    
    // Add each sentence pair
    entry.sentencesMankon.forEach((sentence, index) => {
        const sentenceHTML = `
            <div class="entry__nested-box--sentence-example">${sentence}
                <img src="https://raw.githubusercontent.com/danakenneyl/MankonDictionary/main/speaker.png" 
                     alt="Speech Icon" 
                     width="20" 
                     onclick="playAudio('${entry.sentencesAudioFiles[index]}')"
                     style="cursor: pointer;">
            </div>
            <p>${entry.sentencesTranslation[index]}</p>
        `;
        sentencesContainer.innerHTML += sentenceHTML;
    });
}

function searchDictionary(query) {
    query = query.toLowerCase();
    const matches = dictionaryData.searchEnglish.filter(entry => 
        Object.keys(entry)[0].toLowerCase().includes(query)
    );
    
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';
    
    if (matches.length > 0) {
        resultsDiv.classList.remove('hidden');
        matches.forEach(match => {
            const englishWord = Object.keys(match)[0];
            const mankonWord = match[englishWord];
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.textContent = englishWord;
            div.onclick = () => {
                displayEntry(mankonWord);
                resultsDiv.classList.add('hidden');
                document.getElementById('searchInput').value = englishWord;
            };
            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.classList.add('hidden');
    }
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
    searchDictionary(e.target.value);
});

// Add keyboard event listener to search input
document.getElementById('searchInput').addEventListener('keydown', (e) => {
    const results = document.querySelectorAll('.search-result-item');
    const resultsDiv = document.getElementById('searchResults');
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (!resultsDiv.classList.contains('hidden')) {
                updateSelectedResult(Math.min(selectedIndex + 1, results.length - 1));
            }
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            if (!resultsDiv.classList.contains('hidden')) {
                updateSelectedResult(Math.max(selectedIndex - 1, 0));
            }
            break;
            
        case 'Enter':
            e.preventDefault();
            if (!resultsDiv.classList.contains('hidden')) {
                selectResult();
            }
            break;
            
        case 'Escape':
            resultsDiv.classList.add('hidden');
            break;
    }
});
// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        document.getElementById('searchResults').classList.add('hidden');
    }
});