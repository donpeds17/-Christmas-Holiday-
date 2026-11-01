
const modal = document.getElementById("songModal");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalAudio = document.getElementById("modalAudio");

    function writeString(dataView, offset, text) {
        for (let i = 0; i < text.length; i += 1) {
            dataView.setUint8(offset + i, text.charCodeAt(i));
        }
    }

    function createSilentAudioDataUri() {
        const sampleRate = 22050;
        const durationSeconds = 0.5;
        const totalSamples = Math.floor(sampleRate * durationSeconds);
        const dataLength = totalSamples * 2;
        const buffer = new ArrayBuffer(44 + dataLength);
        const view = new DataView(buffer);

        writeString(view, 0, "RIFF");
        view.setUint32(4, 36 + dataLength, true);
        writeString(view, 8, "WAVE");
        writeString(view, 12, "fmt ");
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, "data");
        view.setUint32(40, dataLength, true);

        for (let i = 44; i < buffer.byteLength; i += 2) {
            view.setInt16(i, 0, true);
        }

        let binary = "";
        const bytes = new Uint8Array(buffer);

        for (let i = 0; i < bytes.length; i += 1) {
            binary += String.fromCharCode(bytes[i]);
        }

        return "data:audio/wav;base64," + btoa(binary);
    }

    const fallbackAudioSource = createSilentAudioDataUri();

    function initializeSongMetadata() {
        const songs = document.querySelectorAll(".song");

        songs.forEach(function(song) {
            const title = song.querySelector(".song-title");
            const category = song.querySelector(".song-category");
            const audio = song.querySelector(".song-audio");
            const source = audio ? audio.querySelector("source") : null;

            if (title) {
                song.dataset.title = title.textContent.trim();
            }

            if (category) {
                song.dataset.category = category.textContent.trim();
            }

            if (audio && source) {
                song.dataset.audio = fallbackAudioSource;
                source.src = fallbackAudioSource;
                source.type = "audio/wav";
                audio.load();
            }
        });
    }

    initializeSongMetadata();

    // OPEN MODAL
    function showSong(songNumber) {

        let selectedSong;

        switch (songNumber) {

            case 1:
                selectedSong = document.getElementById("song-1");
                break;

            case 2:
                selectedSong = document.getElementById("song-2");
                break;

            case 3:
                selectedSong = document.getElementById("song-3");
                break;

            case 4:
                selectedSong = document.getElementById("song-4");
                break;

            case 5:
                selectedSong = document.getElementById("song-5");
                break;

            case 6:
                selectedSong = document.getElementById("song-6");
                break;

            case 7:
                selectedSong = document.getElementById("song-7");
                break;

            case 8:
                selectedSong = document.getElementById("song-8");
                break;

            case 9:
                selectedSong = document.getElementById("song-9");
                break;

            case 10:
                selectedSong = document.getElementById("song-10");
                break;

            default:
                alert("Invalid Christmas song number!");
                return;
        }

        const songTitle = selectedSong?.dataset.title || selectedSong?.querySelector(".song-title")?.textContent.trim() || "Christmas Song";
        const songCategory = selectedSong?.dataset.category || selectedSong?.querySelector(".song-category")?.textContent.trim() || "Holiday Music";
        const songAudio = selectedSong?.dataset.audio || fallbackAudioSource;

        // Load selected song information
        modalTitle.textContent = songTitle;
        modalCategory.textContent = songCategory;

        // Stop previous audio
        modalAudio.pause();
        modalAudio.currentTime = 0;

        // Load selected song audio
        modalAudio.src = songAudio;
        modalAudio.load();

        // Show modal
        modal.style.display = "flex";
    }

    // CLOSE MODAL
    function closeModal() {

        modalAudio.pause();
        modalAudio.currentTime = 0;

        modal.style.display = "none";
    }

    // CLOSE WHEN CLICKING OUTSIDE MODAL
    modal.addEventListener("click", function(event) {

        if (event.target === modal) {
            closeModal();
        }

    });

    // CLOSE USING ESCAPE KEY
    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closeModal();
        }

    });

    // Get greeting form elements
const greetingForm = document.getElementById("greetingForm");
const guestName = document.getElementById("guestName");
const guestComment = document.getElementById("guestComment");
const greetingList = document.getElementById("greetingList");

// Restore saved greetings from localStorage
let greetings = JSON.parse(
    localStorage.getItem("christmasGreetings")
) || [];

// Display greeting names and comments
function displayGreetings() {

    greetingList.innerHTML = "";

    greetings.forEach(function(greeting) {

        const greetingItem = document.createElement("div");
        greetingItem.className = "greeting-item";

        const name = document.createElement("strong");
        name.textContent = "🎅 " + greeting.name;

        const comment = document.createElement("p");
        comment.textContent = greeting.comment;

        greetingItem.appendChild(name);
        greetingItem.appendChild(comment);

        greetingList.appendChild(greetingItem);

    });
}

// Submit Christmas Greeting
greetingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const nameValue = guestName.value.trim();
    const commentValue = guestComment.value.trim();

    if (nameValue === "" || commentValue === "") {
        alert("Please enter your name and greeting!");
        return;
    }

    // Save new greeting
    const newGreeting = {
        name: nameValue,
        comment: commentValue
    };

    greetings.push(newGreeting);

    // Store greetings in localStorage
    localStorage.setItem(
        "christmasGreetings",
        JSON.stringify(greetings)
    );

    // Refresh greeting list
    displayGreetings();

    // Clear form
    greetingForm.reset();

    alert("Your Christmas greeting has been submitted!");

});

// Display saved greetings when page loads
displayGreetings();