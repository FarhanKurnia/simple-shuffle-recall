// script.js

// 1. KONFIGURASI GAME
const CARD_DATA = [
    { rank: 'ace', suit: 'spades', name: 'Ace of Spades' },
    { rank: '2', suit: 'spades', name: '2 of Spades' },
    // { rank: '3', suit: 'spades', name: '3 of Spades' },
    // { rank: '4', suit: 'spades', name: '4 of Spades' },
    // { rank: '5', suit: 'spades', name: '5 of Spades' },
    // { rank: '6', suit: 'spades', name: '6 of Spades' },
    { rank: '7', suit: 'spades', name: '7 of Spades' },
    // { rank: '8', suit: 'spades', name: '8 of Spades' },
    { rank: '9', suit: 'spades', name: '9 of Spades' },
    // { rank: '10', suit: 'spades', name: '10 of Spades' },
    // { rank: 'queen', suit: 'spades', name: 'Queen of Spades' },
    // { rank: 'king', suit: 'spades', name: 'King of Spades' },
    // { rank: 'jack', suit: 'spades', name: 'Jack of Spades' },
    
    { rank: 'ace', suit: 'hearts', name: 'Ace of Hearts' },
    // { rank: '2', suit: 'hearts', name: '2 of Hearts' },
    { rank: '3', suit: 'hearts', name: '3 of Hearts' },
    // { rank: '4', suit: 'hearts', name: '4 of Hearts' },
    // { rank: '5', suit: 'hearts', name: '5 of Hearts' },
    // { rank: '6', suit: 'hearts', name: '6 of Hearts' },
    // { rank: '7', suit: 'hearts', name: '7 of Hearts' },
    // { rank: '8', suit: 'hearts', name: '8 of Hearts' },
    { rank: '9', suit: 'hearts', name: '9 of Hearts' },
    { rank: '10', suit: 'hearts', name: '10 of Hearts' },
    // { rank: 'queen', suit: 'hearts', name: 'Queen of Hearts' },
    { rank: 'king', suit: 'hearts', name: 'King of Hearts' },
    // { rank: 'jack', suit: 'hearts', name: 'Jack of Hearts' },
    
    { rank: 'ace', suit: 'diamonds', name: 'Ace of Diamonds' },
    // { rank: '2', suit: 'diamonds', name: '2 of Diamonds' },
    { rank: '3', suit: 'diamonds', name: '3 of Diamonds' },
    { rank: '4', suit: 'diamonds', name: '4 of Diamonds' },
    // { rank: '5', suit: 'diamonds', name: '5 of Diamonds' },
    // { rank: '6', suit: 'diamonds', name: '6 of Diamonds' },
    // { rank: '7', suit: 'diamonds', name: '7 of Diamonds' },
    // { rank: '8', suit: 'diamonds', name: '8 of Diamonds' },
    // { rank: '9', suit: 'diamonds', name: '9 of Diamonds' },
    // { rank: '10', suit: 'diamonds', name: '10 of Diamonds' },
    // { rank: 'queen', suit: 'diamonds', name: 'Queen of Diamonds' },
    // { rank: 'king', suit: 'diamonds', name: 'King of Diamonds' },
    { rank: 'jack', suit: 'diamonds', name: 'Jack of Diamonds' },
    
    // { rank: 'ace', suit: 'clubs', name: 'Ace of Clubs' },
    { rank: '2', suit: 'clubs', name: '2 of Clubs' },
    { rank: '3', suit: 'clubs', name: '3 of Clubs' },
    { rank: '4', suit: 'clubs', name: '4 of Clubs' },
    // { rank: '5', suit: 'clubs', name: '5 of Clubs' },
    // { rank: '6', suit: 'clubs', name: '6 of Clubs' },
    // { rank: '7', suit: 'clubs', name: '7 of Clubs' },
    // { rank: '8', suit: 'clubs', name: '8 of Clubs' },
    // { rank: '9', suit: 'clubs', name: '9 of Clubs' },
    // { rank: '10', suit: 'clubs', name: '10 of Clubs' },
    // { rank: 'queen', suit: 'clubs', name: 'Queen of Clubs' },
    // { rank: 'king', suit: 'clubs', name: 'King of Clubs' },
    // { rank: 'jack', suit: 'clubs', name: 'Jack of Clubs' },
];

const CARD_BACK_IMAGE = 'assets/img/cards/card_back.png'; // Path ke gambar punggung kartu
const CARD_IMAGE_PATH_PREFIX = 'assets/img/cards/'; // Folder tempat gambar kartu berada
const CARD_IMAGE_EXTENSION = '.png'; // Ekstensi file gambar kartu Anda

const MEMORIZE_TIME = 30; // Waktu Mengingat (detik)
const RECALL_TIME = 60;  // Waktu Menyusun (detik)

// 2. STATE PERMAINAN
let correctSequence = [];     
let playerSequence = [];      
let gamePhase = 'INIT';       
let timerInterval;
let timeRemaining;
let cardBeingDragged = null;  

let finalScore = 0;
let timeTakenToRecall = 0;    
let correctCardsCount = 0;    

// --- BARU: Variabel untuk melacak kartu yang dipilih untuk klik-klik ---
let selectedCard = null; 

// 3. ELEMEN DOM
const gamePhaseEl = document.getElementById('game-phase');
const timerEl = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const displayArea = document.getElementById('display-area');
const sortArea = document.getElementById('sort-area');
const sequenceDisplay = document.getElementById('sequence-display');
const sourceCardsEl = document.getElementById('source-cards');
const targetSlotsEl = document.getElementById('target-slots');
const submitButton = document.getElementById('submit-button');
const memorizeInstructionEl = document.getElementById('memorize-instruction');

// Elemen modal
const modal = document.getElementById('finish-modal');
const resultMessageEl = document.getElementById('result-message');
const finalTimeEl = document.getElementById('final-time');
const finalScoreEl = document.getElementById('final-score');
const restartModalButton = document.getElementById('restart-modal-button');


// 4. FUNGSI UTILITAS

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function createCardElement(cardData, indexInSequence = null, isDraggable = false, showCardFace = false) {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    
    let imageUrl = CARD_BACK_IMAGE; 
    if (showCardFace && cardData) {
        const fileName = `${cardData.rank}_of_${cardData.suit}${CARD_IMAGE_EXTENSION}`;
        imageUrl = CARD_IMAGE_PATH_PREFIX + fileName;
    }

    const imgEl = document.createElement('img');
    imgEl.src = imageUrl;
    imgEl.alt = cardData ? cardData.name : 'Card'; 
    cardEl.appendChild(imgEl);

    if (indexInSequence !== null) { 
        const indexSpan = document.createElement('span');
        indexSpan.classList.add('index-number');
        indexSpan.textContent = `${indexInSequence + 1}.`;
        cardEl.appendChild(indexSpan);
    }
    
    cardEl.dataset.name = cardData.name;
    cardEl.dataset.rank = cardData.rank;
    cardEl.dataset.suit = cardData.suit;
    
    if (isDraggable) {
        cardEl.setAttribute('draggable', true);
        cardEl.addEventListener('dragstart', handleDragStart);
    }

    return cardEl;
}

// ------------------------------------------------------------------
// A. FASE MENGINGAT 
// ------------------------------------------------------------------

function startMemorizingPhase() {
    gamePhase = 'MEMORIZING';
    gamePhaseEl.textContent = 'MENGINGAT';
    
    // Reset state
    finalScore = 0;
    timeTakenToRecall = 0;
    correctCardsCount = 0;
    selectedCard = null; 
    
    const shuffledData = [...CARD_DATA];
    shuffle(shuffledData);
    correctSequence = shuffledData; 
    
    sequenceDisplay.innerHTML = '';
    correctSequence.forEach((cardData, index) => {
        const cardEl = createCardElement(cardData, index, false, true); 
        sequenceDisplay.appendChild(cardEl);
    });

    displayArea.classList.remove('hidden');
    sortArea.classList.add('hidden');
    startButton.disabled = true;
    startButton.classList.add('hidden'); 
    submitButton.disabled = true; 

    timeRemaining = MEMORIZE_TIME;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            startRecallPhase();
        }
    }, 1000);
}

// ------------------------------------------------------------------
// B. FASE MENYUSUN KEMBALI (MODIFIKASI: Hapus Shuffle)
// ------------------------------------------------------------------

function startRecallPhase() {
    gamePhase = 'RECALL';
    gamePhaseEl.textContent = 'MENYUSUN KEMBALI';
    
    displayArea.classList.add('hidden'); 
    sortArea.classList.remove('hidden'); 
    memorizeInstructionEl.classList.add('hidden'); 

    sourceCardsEl.innerHTML = '';
    targetSlotsEl.innerHTML = '';
    playerSequence = Array(CARD_DATA.length).fill(null); 
    selectedCard = null; // Reset kartu yang dipilih

    // --- MODIFIKASI: Kartu Sumber TIDAK diacak untuk mempermudah pencarian ---
    const recallCardsData = CARD_DATA; 
    // --- AKHIR MODIFIKASI ---

    recallCardsData.forEach((cardData) => {
        const cardEl = createCardElement(cardData, null, true, true); 
        sourceCardsEl.appendChild(cardEl);
        
        // Listener Klik untuk Seleksi
        cardEl.addEventListener('click', handleCardClick); 
    });

    // Siapkan slot target
    for (let i = 0; i < CARD_DATA.length; i++) { 
        const slotEl = document.createElement('div');
        slotEl.classList.add('slot');
        slotEl.dataset.slotIndex = i;
        
        // Listener D&D untuk slot
        slotEl.addEventListener('dragover', handleDragOver);
        slotEl.addEventListener('drop', handleDrop);
        slotEl.addEventListener('dragenter', handleDragEnter);
        slotEl.addEventListener('dragleave', handleDragLeave);
        
        // Listener Klik untuk Penempatan/Pengembalian
        slotEl.addEventListener('click', handleSlotClick); 
        
        targetSlotsEl.appendChild(slotEl);
    }

    timeRemaining = RECALL_TIME;
    updateTimerDisplay();
    submitButton.disabled = false;
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            checkResult();
        }
    }, 1000);
}

// ------------------------------------------------------------------
// C. LOGIKA INTERAKSI KLIK-KLIK (BARU)
// ------------------------------------------------------------------

function clearCardSelection() {
    if (selectedCard) {
        selectedCard.classList.remove('selected-for-click');
        selectedCard = null;
    }
}

function handleCardClick() {
    const clickedCard = this; // Kartu di area sumber yang diklik

    // Jika kartu yang diklik sudah terpilih, batalkan pilihan (klik 1)
    if (selectedCard === clickedCard) {
        clearCardSelection();
    } 
    // Jika ada kartu lain yang terpilih, batalkan yang lama dan pilih yang baru
    else if (selectedCard) {
        clearCardSelection();
        selectedCard = clickedCard;
        selectedCard.classList.add('selected-for-click');
    } 
    // Jika tidak ada kartu terpilih, pilih kartu ini
    else {
        selectedCard = clickedCard;
        selectedCard.classList.add('selected-for-click');
    }
}

function handleSlotClick() {
    const clickedSlot = this; // Slot yang diklik
    const cardInSlot = clickedSlot.firstElementChild;

    // 1. Aksi Penempatan (Klik 2)
    if (selectedCard && !cardInSlot) {
        const cardToMove = selectedCard;
        const slotIndex = parseInt(clickedSlot.dataset.slotIndex);
        
        clickedSlot.appendChild(cardToMove);
        playerSequence[slotIndex] = cardToMove.dataset.name; 

        // Nonaktifkan D&D dan seleksi klik untuk kartu yang baru ditempatkan
        cardToMove.removeEventListener('dragstart', handleDragStart);
        cardToMove.removeAttribute('draggable'); 
        cardToMove.removeEventListener('click', handleCardClick); 
        
        // Cursor tetap pointer agar mengklik di slot berfungsi (klik 3 = kembali)
        cardToMove.style.cursor = 'pointer'; 

        // Hapus pilihan
        clearCardSelection();

    } 
    // 2. Aksi Pengembalian (Klik 2/3: Kartu di slot diklik)
    else if (cardInSlot && cardInSlot.classList.contains('card')) {
        const cardToReturn = cardInSlot;
        const slotIndex = parseInt(clickedSlot.dataset.slotIndex);

        sourceCardsEl.appendChild(cardToReturn);
        playerSequence[slotIndex] = null; 

        // Aktifkan kembali D&D dan seleksi klik untuk kartu di sumber
        cardToReturn.addEventListener('dragstart', handleDragStart);
        cardToReturn.setAttribute('draggable', true); 
        cardToReturn.addEventListener('click', handleCardClick);
        cardToReturn.style.cursor = 'grab'; 
        
        // Hapus pilihan jika kartu yang dikembalikan sedang terpilih (seharusnya sudah clear)
        if (selectedCard === cardToReturn) {
            clearCardSelection();
        }
    }
    // 3. Jika diklik tapi tidak ada kartu terpilih dan slot kosong, tidak melakukan apa-apa.
}


// ------------------------------------------------------------------
// D. LOGIKA DRAG AND DROP (MODIFIKASI: Sinkronisasi dengan Klik-Klik)
// ------------------------------------------------------------------

function handleDragStart(e) {
    cardBeingDragged = this;
    e.dataTransfer.setData('text/plain', this.dataset.name); 
    setTimeout(() => {
        this.classList.add('dragging');
        clearCardSelection(); // Hapus pilihan jika kartu di-drag
    }, 0);
}

function handleDragOver(e) {
    e.preventDefault(); 
    const slotEl = this;
    if (!slotEl.firstElementChild) {
        slotEl.classList.add('slot-hover');
    }
}

function handleDragEnter(e) {
    const slotEl = this;
    if (!slotEl.firstElementChild) {
        slotEl.classList.add('slot-hover');
    }
    if (cardBeingDragged) {
        cardBeingDragged.style.zIndex = '100'; 
    }
}

function handleDragLeave() {
    this.classList.remove('slot-hover');
    if (cardBeingDragged) {
        cardBeingDragged.style.zIndex = ''; 
    }
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('slot-hover');

    const slotEl = this;
    const slotIndex = parseInt(slotEl.dataset.slotIndex);
    
    if (slotEl.firstElementChild) {
        return; 
    }
    
    const cardToMove = cardBeingDragged;
    slotEl.appendChild(cardToMove);
    cardToMove.classList.remove('dragging'); 
    cardToMove.style.zIndex = ''; 

    playerSequence[slotIndex] = cardToMove.dataset.name; 

    // Nonaktifkan D&D dan seleksi klik (handleCardClick)
    cardToMove.removeEventListener('dragstart', handleDragStart);
    cardToMove.removeAttribute('draggable'); 
    cardToMove.removeEventListener('click', handleCardClick); 
    cardToMove.style.cursor = 'pointer'; 
    
    // Tidak perlu menambahkan listener 'click' terpisah. 
    // Klik pada kartu yang sekarang berada di slot akan memicu handleSlotClick pada slot parent-nya
    
    cardBeingDragged = null; 
    clearCardSelection(); // Pastikan tidak ada kartu yang terpilih setelah drop
}


// ------------------------------------------------------------------
// E. FUNGSI PENGEMBALIAN KARTU (handleReturnCard TIDAK DIGUNAKAN LAGI)
// ------------------------------------------------------------------
// Logika pengembalian kini sepenuhnya ditangani oleh handleSlotClick

/* Hapus fungsi handleReturnCard yang lama */


// ------------------------------------------------------------------
// F. PENGECEKAN HASIL DAN SKOR (TIDAK ADA PERUBAHAN)
// ------------------------------------------------------------------

function checkResult() {
    clearInterval(timerInterval);
    clearCardSelection();
    
    timeTakenToRecall = RECALL_TIME - timeRemaining; 
    if (timeTakenToRecall < 0) timeTakenToRecall = RECALL_TIME; 

    correctCardsCount = 0;
    for (let i = 0; i < correctSequence.length; i++) {
        if (playerSequence[i] === correctSequence[i].name) {
            correctCardsCount++;
        }
    }
    
    finalScore = 0;
    finalScore += correctCardsCount * 100; 
    
    if (correctCardsCount === CARD_DATA.length) { 
        const timeLeftBonus = timeRemaining * 10; 
        finalScore += timeLeftBonus;
        finalScore += 500; 
    }

    const isSuccess = (correctCardsCount === CARD_DATA.length);
    endGame(isSuccess, correctCardsCount, finalScore);
}

function endGame(isSuccess, correctCount, score) {
    if (isSuccess) {
        resultMessageEl.innerHTML = `Selamat! Anda berhasil mengingat semua urutan dengan benar!`;
        resultMessageEl.style.color = 'green';
    } else {
        resultMessageEl.innerHTML = `Anda berhasil menyusun ${correctCount} dari ${CARD_DATA.length} kartu dengan benar.`;
        resultMessageEl.style.color = 'red';
    }

    finalTimeEl.textContent = `${Math.floor(timeTakenToRecall / 60).toString().padStart(2, '0')}:${(timeTakenToRecall % 60).toString().padStart(2, '0')}`;
    finalScoreEl.textContent = score; 
    modal.style.display = 'block';

    startButton.disabled = false;
    startButton.classList.remove('hidden'); 
    submitButton.disabled = true;
}


// ------------------------------------------------------------------
// G. EVENT LISTENERS & INISIALISASI (TIDAK ADA PERUBAHAN)
// ------------------------------------------------------------------

startButton.addEventListener('click', startMemorizingPhase);
submitButton.addEventListener('click', checkResult);
restartModalButton.addEventListener('click', () => {
    window.location.reload(); 
});

document.addEventListener('DOMContentLoaded', () => {
    gamePhaseEl.textContent = 'SIAP';
    timerEl.textContent = '00:00';
    startButton.classList.remove('hidden'); 
});