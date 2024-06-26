// editNote.js
import { 
    createNewNoteObject, 
    modifyNoteText, 
    modifyNoteDate, 
    modifyNoteTitle, 
    appendTagToNoteTags, 
    removeTagFromNoteTags,
    getNoteFromTable,
    modifyNoteLastEdited,
    deleteNoteFromTable,
  } from '../backend/NoteTable.js';

import {
	getProjectFromTable
} from '../backend/ProjectTable.js';

let NOTE_ID = "";
let NEW_NOTE = false;

window.addEventListener("DOMContentLoaded", init);

/**
 * Initializes the note editing process.
 * If a note ID is not set, creates a new note object.
 * If a note ID is set, populates the note with existing data.
 * Attaches an event listener to the save button.
 */
function init() {
	NOTE_ID = window.location.hash.substring(1);
	if (!NOTE_ID) {
		const newNote = createNewNoteObject("Default Text", new Date().toISOString().slice(0,10), new Date().toISOString().slice(0,10), "Default Title", "", "", []);
		NOTE_ID = newNote.noteID;
		NEW_NOTE = true;
		window.location.href = '../note/edit-note.html#' + NOTE_ID;
	} else {
		populateNote();
		populateTag();
		populateProjectTag();
	}
	attachSaveButtonListener();
	attachCancelButtonListener();
	const projectContainer = document.querySelector('.projectContainer');
	projectContainer.innerHTML = '<linked-project></linked-project>';
}

/**
 * Attaches an event listener to the save button.
 */
function attachSaveButtonListener() {
	document.querySelector('save-button button').addEventListener('click', saveNote);
}

/**
 * Attaches an event listener to the cancel button.
 */
function attachCancelButtonListener() {
	document.querySelector('cancel-button button').addEventListener('click', cancelEdit);
}

/**
 * Saves the current state of the note to the local storage.
 * Retrieves the note title, markdown content, and date from the DOM.
 * Modifies the note in the backend using the note ID.
 */
function saveNote() {
	const noteTitle = document.querySelector('.noteTitle input').value;
	const noteMarkdown = document.querySelector('markdown-editor').wysimark.getMarkdown();
	const noteDate = document.querySelector('.date input').value;
	const tagElements = document.querySelectorAll('.tagContainer li');
	// Modify the note
	modifyNoteTitle(NOTE_ID, noteTitle);
	modifyNoteText(NOTE_ID, noteMarkdown);
	modifyNoteDate(NOTE_ID, noteDate);
	modifyNoteLastEdited(NOTE_ID, new Date().toISOString().slice(0,10));

	const note = getNoteFromTable(NOTE_ID);
	const currentTags = note.tags;
	if (currentTags) {
		currentTags.forEach(tag => {
			removeTagFromNoteTags(NOTE_ID, tag);
		});
	}
	for(let i = 0; i < tagElements.length; i++) {
		const tag = tagElements[i].textContent;
		appendTagToNoteTags(NOTE_ID, tag);
	}

	window.location.href = './view-note.html#' + NOTE_ID;
}

/**
 * On canceling edit, go back to homepage
 */
function cancelEdit() {
    if (NEW_NOTE) {
        deleteNoteFromTable(NOTE_ID);
    }
    window.location.href = "../homepage/index.html";
}

/**
 * Populates the note with existing data from the backend.
 * Retrieves the note data using the note ID.
 * Sets the note title, markdown content, and date in the DOM.
 */
function populateNote() {
	const note = getNoteFromTable(NOTE_ID);
	document.querySelector('.noteTitle input').value = note.title;
	document.querySelector('markdown-editor').wysimark.setMarkdown(note.text);
	document.querySelector('.date input').value = note.date;
}

/**
 * Add tag to note
 */
function populateTag() {
	const note = getNoteFromTable(NOTE_ID);
	const tags = note.tags;
	const tagsContainer = document.querySelector('.tagContainer');
	tags.forEach(tag => {
		const newTag = document.createElement('li');
		newTag.textContent = tag;
		// Deleting tag
		let isClickedOnce = false;
		newTag.addEventListener('click', () => {
			if (!isClickedOnce) {
				newTag.style.backgroundColor = "#FF000F";
				setTimeout(() => {
					newTag.style.backgroundColor = "";
					isClickedOnce = false;
				}, 2000);
				isClickedOnce = true;
			}
			else {  
				newTag.remove();
			}
		});
		tagsContainer.appendChild(newTag);
	});
}

// Adding tags and populating the project tag
document.addEventListener('DOMContentLoaded', () => {
	const newTagForm = document.getElementById("newTag");
	const newTagInput = document.getElementById("newTagInput");
    // Add tag when enter is clicked
	newTagForm.addEventListener('submit', (event) => {
		event.preventDefault();
        const tag = newTagInput.value.trim();
		if (tag) {
			newTagInput.value = '';
			const tagsContainer = document.querySelector('.tagContainer');
			const newTag = document.createElement('li');
			newTag.textContent = tag;
			// Deleting tag
			let isClickedOnce = false;
			newTag.addEventListener('click', () => {
			    if (!isClickedOnce) {
				    newTag.style.backgroundColor = "#FF000F";
				    setTimeout(() => {
					    newTag.style.backgroundColor = "";
					    isClickedOnce = false;
				    }, 2000);
				    isClickedOnce = true;
			    }
			    else {  
					newTag.remove();
				}
            });
            tagsContainer.appendChild(newTag);
        }
	});
	// Add tag when click away from the screen
	document.addEventListener('click', (event) => {
		const isClickInside = newTagForm.contains(event.target);

		if(!isClickInside) {
			const tag = newTagInput.value.trim();
			if (tag) {
				newTagInput.value = '';
				const tagsContainer = document.querySelector('.tagContainer');
				const newTag = document.createElement('li');
				newTag.textContent = tag;
				// Deleting tag
				let isClickedOnce = false;
				newTag.addEventListener('click', () => {
					if (!isClickedOnce) {
						newTag.style.backgroundColor = "#FF000F";
						setTimeout(() => {
							newTag.style.backgroundColor = "";
							isClickedOnce = false;
						}, 2000);
						isClickedOnce = true;
					}
					else {  
							newTag.remove();
					}
                });
				tagsContainer.appendChild(newTag);
			}	
		}
	});

	document.addEventListener('projectChanged', () => {
		populateProjectTag();
	});
});

/**
 * Populates the project tag with existing data from the backend
 * Retrieves the note data using the note ID 
 * Retrieves the project data using the project ID from linkedProject
 */
 function populateProjectTag() {
	const linkProjectElement = document.getElementById("linkedProjectTag");
	const projectTagContainer = document.querySelector(".projectTagContainer");
	const note = getNoteFromTable(NOTE_ID);
	if(note.linkedProject === "") {
		projectTagContainer.classList.add("close");
		if(projectTagContainer.classList.contains("open")) {
			projectTagContainer.classList.remove("open");
		}
	}
	else {
		const project = getProjectFromTable(note.linkedProject);
		linkProjectElement.textContent = project.title;
		linkProjectElement.href = "../project/view-project.html" + "#" + note.linkedProject;
		// get priority
		const priority = document.getElementById("priority");
		if (project.priority === "high") {
			priority.style.backgroundColor = "#FF000F";
		}
		else if (project.priority === "medium") {
			priority.style.backgroundColor = "#FFD600";
		}
		else if (project.priority === "low") {
			priority.style.backgroundColor = "#0AB73B"
		}
		if (projectTagContainer.classList.contains("close")){
			projectTagContainer.classList.remove("close");
		}
		projectTagContainer.classList.add("open");
	}
}

export {
    populateTag
}