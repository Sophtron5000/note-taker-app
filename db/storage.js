const util = require('util');
const fs = require('fs');
const uuidv = require('uuid/v1');
const { parse } = require('path');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {

read() {
    return readFileAsync('db/db.json', JSON.stringify(note))
}

write() {
    return writeFileAsync('db/db.json', JSON.stringify(note))
}

getNotes() {
    return this.read().then((notes) => {
        let parsedNotes;
        try{
            parsedNotes = [].concat(JSON.parse(notes));
        }catch(err) {
            parsedNotes = [];
        }
        return parsedNotes;
    })
}


addNote(note) {
    const {title, text} = note;
    const newNote = {title, text, id: uuidv1()};

    return this.getNotes()
    .then((notes) => [ ...notes, newNote])
    .then((updatedNotes) => this.write(updatedNotes))
    .then(() => newNote)


}

}

module.exports = new Storage();