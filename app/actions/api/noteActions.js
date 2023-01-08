const Note = require('../../db/models/note')

class NoteActions {
    
    async saveNote(req, res){
        const title = req.body.title;
        const body = req.body.body;
        const when = req.body.when;

        let note;
        try{
            note = new Note({title, body, when});
            await note.save();
        }catch(err){
            return res.status(422).json({message: err.message})
        }
        

        res.status(201).json(note);
    }

    // pobieranie wszystkich notatek
    async getAllNotes(req,res) {
        let doc;
        try {
            doc = await Note.find({});
        } catch(err){
            return res.status(500).json({message: err.message})
        }

        res.status(200).json(doc)
    }

    // pobranie jednej notatki
    async getNote(req,res) {
        const id = req.params.id
        const note = await Note.findOne({_id: id})
        res.status(200).json(note)
    }

    // aktualizowanie notatki
    async updateNote(req,res) {
        const id = req.params.id
        const title = req.body.title;
        const body = req.body.body;
        const when = req.body.when;

        const note = await Note.findOne({_id: id})
        note.title = title
        note.body = body
        note.when = when
        await note.save()

        res.status(201).json(note)
    }

    // usuwanie notatki
    async deleteNote(req,res) {
        const id = req.params.id
        await Note.deleteOne({_id: id})
        res.status(204).send();
    }

}

module.exports = new NoteActions();
