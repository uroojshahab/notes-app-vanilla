import './style.css';

const noteForm = document.getElementById("noteForm");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesList.innerHTML = "";

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = "note";

    const p = document.createElement("p");
    p.textContent = note.text;
    p.contentEditable = false;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "note-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      if (editBtn.textContent === "Edit") {
        p.contentEditable = true;
        p.focus();
        editBtn.textContent = "Save";
      } else {
        p.contentEditable = false;
        note.text = p.textContent;
        saveNotes();
        renderNotes();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      notes = notes.filter((n) => n.id !== note.id);
      saveNotes();
      renderNotes();
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    li.appendChild(p);
    li.appendChild(buttonContainer);
    notesList.appendChild(li);
  });
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  if (text === "") return;

  const newNote = {
    id: Date.now(),
    text,
  };

  notes.push(newNote);
  saveNotes();
  renderNotes();
  noteInput.value = "";
});

renderNotes();


