const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
	const notes = loadNotes();
	//const duplicateNotes = notes.filter((note) => note.title === title);
	const duplicateNote = notes.find((note) => note.title === title);
	if (!duplicateNote) {
		notes.push({
			title,
			body,
		});
		saveNotes(notes);
		console.log(chalk.green.inverse("New note added!"));
	} else {
		console.log(chalk.red.inverse("NOTE TITLE TAKEN"));
	}
};

const removeNotes = (title) => {
	const notes = loadNotes();
	const notesToKeep = notes.filter((note) => note.title !== title);

	if (notes.length > notesToKeep.length) {
		console.log(chalk.green.inverse(title + " noteRemoved"));
		saveNotes(notesToKeep);
	} else {
		console.log(chalk.red.inverse("No note found"));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (e) {
		return [];
	}
};

const listNotes = () => {
	console.log(chalk.yellow.inverse("Your Notes "));
	const notes = loadNotes();
	notes.forEach((note) => console.log(chalk.blue.inverse(note.title)));
};

const readNotes = (title) => {
	const notes = loadNotes();
	const notesToDisplay = notes.find((note) => note.title === title);
	if (notesToDisplay) {
		console.log(chalk.blue.inverse(notesToDisplay.title));
		console.log(notesToDisplay.body);
	} else {
		console.log(chalk.red.inverse("No note found"));
	}
};

module.exports = {
	addNote,
	removeNotes,
	listNotes,
	readNotes,
};
