document.addEventListener('DOMContentLoaded', function() {
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteForm = document.getElementById('note-form');
    const saveNoteBtn = document.getElementById('save-note-btn');
    const cancelNoteBtn = document.getElementById('cancel-note-btn');
    const notesContainer = document.getElementById('notes-container');
    const noteTitleInput = document.getElementById('note-title');
    const noteContent = document.querySelector('.note-content');
    const noteOverlay = document.getElementById('note-overlay');
    const closeOverlayBtn = document.getElementById('close-overlay');
    const noteTitleOverlay = document.getElementById('note-title-overlay');
    const noteContentOverlay = document.getElementById('note-content-overlay');
    const searchNotesInput = document.getElementById('search-notes');
    const sortTitleBtn = document.getElementById('sort-title-btn');
    const sortDateBtn = document.getElementById('sort-date-btn');

    let notes = [];

    function renderNotes() {
        notesContainer.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content.slice(0, 100)}...</p>
                <button class="view-note-btn">View</button>
                <button class="delete-note-btn">Delete</button>
            `;
            notesContainer.appendChild(noteElement);

            noteElement.querySelector('.view-note-btn').addEventListener('click', () => {
                noteTitleOverlay.textContent = note.title;
                noteContentOverlay.textContent = note.content;
                noteOverlay.style.display = 'flex';
            });

            noteElement.querySelector('.delete-note-btn').addEventListener('click', () => {
                deleteNote(note.id);
            });
        });
    }

    function saveNote() {
        const title = noteTitleInput.value.trim();
        const content = noteContent.innerText.trim();

        if (title && content) {
            const note = {
                id: Date.now(),
                title: title,
                content: content,
                date: new Date().toISOString()
            };
            notes.push(note);
            renderNotes();
            resetForm();
        }
    }

    function deleteNote(noteId) {
        notes = notes.filter(note => note.id !== noteId);
        renderNotes();
    }

    function resetForm() {
        noteTitleInput.value = '';
        noteContent.innerText = '';
        noteForm.style.display = 'none';
    }

    function filterNotes() {
        const searchText = searchNotesInput.value.toLowerCase();
        const filteredNotes = notes.filter(note => 
            note.title.toLowerCase().includes(searchText) || 
            note.content.toLowerCase().includes(searchText)
        );
        notesContainer.innerHTML = '';
        filteredNotes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content.slice(0, 100)}...</p>
                <button class="view-note-btn">View</button>
                <button class="delete-note-btn">Delete</button>
            `;
            notesContainer.appendChild(noteElement);

            noteElement.querySelector('.view-note-btn').addEventListener('click', () => {
                noteTitleOverlay.textContent = note.title;
                noteContentOverlay.textContent = note.content;
                noteOverlay.style.display = 'flex';
            });

            noteElement.querySelector('.delete-note-btn').addEventListener('click', () => {
                deleteNote(note.id);
            });
        });
    }

    function sortNotesByTitle() {
        notes.sort((a, b) => a.title.localeCompare(b.title));
        renderNotes();
    }

    function sortNotesByDate() {
        notes.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderNotes();
    }

    addNoteBtn.addEventListener('click', () => {
        noteForm.style.display = 'flex';
    });

    saveNoteBtn.addEventListener('click', saveNote);

    cancelNoteBtn.addEventListener('click', resetForm);

    closeOverlayBtn.addEventListener('click', () => {
        noteOverlay.style.display = 'none';
    });

    searchNotesInput.addEventListener('input', filterNotes);

    sortTitleBtn.addEventListener('click', sortNotesByTitle);

    sortDateBtn.addEventListener('click', sortNotesByDate);

    noteContent.addEventListener('paste', function(e) {
        e.preventDefault();
        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedText = clipboardData.getData('text/plain');
        document.execCommand('insertText', false, pastedText);
        noteContent.style.fontFamily = "Poppins, sans-serif";
        noteContent.style.fontWeight = "normal";
        noteContent.style.fontStyle = "normal";
    });

    noteForm.style.display = 'none';
    noteOverlay.style.display = 'none';

    renderNotes();
});
