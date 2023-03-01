//classes for the entry by author, and the words that are placed in the story
class Entry {
    constructor(author) {
        this.author = author;
        this.words = [];
    }
//pushes the words in to the api
    addWord(verb1, noun1, verbing1, pnoun1, adjective1, noun2, vehicle, 
        noun3, verb2, pnoun2, pnoun3, verb3, verbing2, pnoun4, adjective2, place, 
        verb4) {
            this.words.push(new Word(verb1, noun1, verbing1, pnoun1, adjective1, noun2, vehicle, 
                noun3, verb2, pnoun2, pnoun3, verb3, verbing2, pnoun4, adjective2, place, 
                verb4));
    }
}

class Word {
    constructor(verb1, noun1, verbing1, pnoun1, adjective1, noun2, vehicle, 
    noun3, verb2, pnoun2, pnoun3, verb3, verbing2, pnoun4, adjective2, place, 
    verb4) {
        this.verb1 = verb1;
        this.noun1 = noun1;
        this.verbing1 = verbing1;
        this.pnoun1 = pnoun1;
        this.adjective1 = adjective1;
        this.noun2 = noun2;
        this.vehicle = vehicle;
        this.noun3 = noun3;
        this.verb2 = verb2;
        this.pnoun2 = pnoun2;
        this.pnoun3 = pnoun3;
        this.verb3 = verb3;
        this.verbing2 = verbing2;
        this.pnoun4 = pnoun4;
        this.adjective2 = adjective2;
        this.place = place;
        this.verb4 = verb4;
    }
}

class MadLibs {
    static url = 'https://63f9ae4a897af748dcc1ec8f.mockapi.io/api/devkela/entries';

    static getAllEntries() {
        return $.get(this.url);
    }

    static getEntry(id) {
        return $.get(this.url + `/${id}`);
    }

    static createEntry(entry) {
        return $.post(this.url, entry);
    }

    static updateEntry(entry) {
        return $.ajax({
            url: this.url + `/${entry.id}`,
            dataType: 'json',
            data: JSON.stringify(entry),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteEntry(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

class DOMManager {
    static entries;

    static getAllEntries() {
        MadLibs.getAllEntries().then(entries => this.render(entries));
    }

    static createEntry(author) {
        MadLibs.createEntry(new Entry(author))
            .then(() => {
                return MadLibs.getAllEntries();
            })
            .then((entries) => this.render(entries));
    }

    static deleteEntry(id) {
        MadLibs.deleteEntry(id)
            .then(() => {
                return MadLibs.getAllEntries();
            })
            .then((entries) => this.render(entries));
    }

    static addWord(id) {
        for (let entry of this.entries) {
            if (entry.id == id) {
                entry.words.push(new Word($(`#${entry.id}-word-verb1`).val(),
                $(`#${entry.id}-word-noun1`).val(),
                $(`#${entry.id}-word-verbing1`).val(),
                $(`#${entry.id}-word-pnoun1`).val(),
                $(`#${entry.id}-word-adjective1`).val(),
                $(`#${entry.id}-word-noun2`).val(),
                $(`#${entry.id}-word-vehicle`).val(),
                $(`#${entry.id}-word-noun3`).val(),
                $(`#${entry.id}-word-verb2`).val(),
                $(`#${entry.id}-word-pnoun2`).val(),
                $(`#${entry.id}-word-pnoun3`).val(),
                $(`#${entry.id}-word-verb3`).val(),
                $(`#${entry.id}-word-verbing2`).val(),
                $(`#${entry.id}-word-pnoun4`).val(),
                $(`#${entry.id}-word-adjective2`).val(),
                $(`#${entry.id}-word-place`).val(),
                $(`#${entry.id}-word-verb4`).val()));
                MadLibs.updateEntry(entry)
                    .then(() => {
                        return MadLibs.getAllEntries();
                    })
                    .then((entries) => this.render(entries));
            } 
        }
    }
//this deletes the entry so you can play again
    static deleteWord(entryId, wordId) {
        for (let entry of this.entries) {
            if (entry.id == entryId) {
                for (let word of entry.words) {
                    if (word.id == wordId) {
                        entry.words.splice(entry.words.indexOf(word), 1);
                        MadLibs.updateEntry(entry)
                        .then(() => {
                            return MadLibs.getAllEntries();
                        })
                        .then((entries) => this.render(entries));
                    }
                }
            }
        }
    }
//rendering text, starting with author and words, ending with story
    static render(entries) {
        this.entries = entries;
        $('#app').empty();
        for (let entry of entries) {
            $('#app').prepend(
                `<div id="${entry.id}" class="card mx-5">
                    <div class="card-header mt-2">
                        <h4 class="text-center">Hi ${entry.author}, Enter Words</h4>
                    </div>
                        <div class="card-body">
                            <div class="form-group id="${entry.id}>
                                <input type="text" class="form-control" id="${entry.id}-word-verb1" placeholder="Verb">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" class="form-control" id="${entry.id}-word-noun1" placeholder="Noun">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" class="form-control" id="${entry.id}-word-verbing1" placeholder="Verb (ending in 'ing')">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-pnoun1" placeholder="Plural Noun">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-adjective1" placeholder="Adjective">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-noun2" placeholder="Noun">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-vehicle" placeholder="Vehicle">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-noun3" placeholder="Noun">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-verb2" placeholder="Verb">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-pnoun2" placeholder="Plural Noun">
                            </div>                    
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-pnoun3" placeholder="Plural Noun">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-verb3" placeholder="Verb">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-verbing2" placeholder="Verb (ending in 'ing')">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-pnoun4" placeholder="Plural Noun">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-adjective2" placeholder="Adjective">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-place" placeholder="Place">
                            </div>
                            <div class="form-group mt-2">
                                <input type="text" name="" class="form-control" id="${entry.id}-word-verb4" placeholder="Verb">
                            </div>
                        </div>
                        <div class="my-3 mx-auto">
                            <button class="btn btn-outline-secondary mr-2" onclick="DOMManager.deleteEntry('${entry.id}')">Remove</button>
                            <button class="btn btn-outline-secondary ml2" id="${entry.id}-new-word" onclick="DOMManager.addWord('${entry.id}')">Submit</button>
                        </div>                                                
                </div>`
            );
            for (let word of entry.words) {
                $(`#${entry.id}`).append(
                    `<div class="mt-3">
                    <div class="card-header text-center align-items-center mb-3">
                    <h2 class="storyTitle">A Visit to Olympic National Park</h2>
                    <p>(From I LOVE SEATTLE MAD LIBS - Copyright 2014 by Price Stern Sloan)</p>
                    </div>
                    <div class="px-5 py-2">
                    <p><strong>Husband: </strong>I'm so glad that we visited Seattle and will have some 
                    time to <span id="verb1-${word.id}"><strong> ${word.verb1} </strong></span> in Olympic National 
                    <span id="noun1-${word.id}"><strong> ${word.noun1} </strong></span>.<br>
                    <strong>Wife: </strong>Are you sure we're 
                    <span id="verbing1-${word.id}"><strong> ${word.verbing1} </strong></span> in the right 
                    direction? I haven't seen any <span id="pnoun1-${word.id}"><strong> ${word.pnoun1} </strong></span> 
                    for the park.<br><stong>Husband: </stong>Did you know that the park is one of the few 
                    <span id="adjective1-${word.id}"><strong> ${word.adjective1} </strong></span>
                    parks in the West with a/an <span id="noun2-${word.id}"><strong> ${word.noun2} </strong></span>
                    beach?<br><strong>Wife: </strong>I just don't trust the GPS in this 
                    <span id="vehicle-${word.id}"><strong> ${word.vehicle} </strong></span>. 
                    What did you do with the <span id="noun3-${word.id}"><strong> ${word.noun3} </strong></span> 
                    map? I want to take a look at it.<br><strong>Husband: </strong>We can 
                    <span id="verb2-${word.id}"><strong> ${word.verb2} </strong></span> 
                    the Hoh or Sol Duc <span id="pnoun2-${word.id}"><strong> ${word.pnoun2} </strong></span>, 
                    fish for <span id="pnoun3-${word.id}"><strong> ${word.pnoun3} </strong></span> 
                    in the Dickey River, and <span id="verb3-${word.id}"><strong> ${word.verb3} </strong></span>
                    on Lake Crescent.<br><strong>Wife: </strong>Well, we aren't going to do any of that unless you 
                    start <span id="verbing2-${word.id}"><strong> ${word.verbing2} </strong></span> 
                    in the direction of the park.<br><strong>Husband: </strong>And just think of the 
                    <span id="pnoun4-${word.id}"><strong> ${word.pnoun4} </strong></span> we 
                    can have in the <span id="adjective2-${word.id}"><strong> ${word.adjective2} </strong></span> 
                    meadows.<br><strong>Wife: </strong>I hate to tell you this, but we're heading toward (the) 
                    <span id="place-${word.id}"><strong> ${word.place} </strong></span>. Pull over right now. I'm going to 
                    <span id="verb4-${word.id}"><strong> ${word.verb4} </strong></span>.</p>
                    </div>
                    </div>`
                )
            }
        }
    }
}

    $('#create-new-entry').click(() => {
        DOMManager.createEntry($('#new-entry-author').val());
        $('#new-entry-author').val('');
    });
    
    DOMManager.getAllEntries();