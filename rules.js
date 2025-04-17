class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData["Title"]);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData["InitialLocation"]);
    }
}

var locked = true;
var keyArray = [];

class Location extends Scene {
    create(key) {
        let locationData = key;

        if(locationData == "Exit") {
            if (locked == true){
                this.engine.show(this.engine.storyData["Locations"][locationData]["Locked"]["Body"]);
            } else {
                this.engine.show(this.engine.storyData["Locations"][locationData]["Unlocked"]["Body"]);
            }
        } else {
            this.engine.show(this.engine.storyData["Locations"][locationData]["Body"]);
        }
        
        if (this.engine.storyData["Locations"][locationData]["Key"] != undefined) {
            if (keyArray.includes(this.engine.storyData["Locations"][locationData]["Key"]) == false) {
                keyArray.push(this.engine.storyData["Locations"][locationData]["Key"]);
            }
        }

        if(keyArray.length == 5) {
            locked = false;
        }
        
        if(this.engine.storyData["Locations"][locationData]["Choices"] != undefined) {
            for(let choice of this.engine.storyData["Locations"][locationData]["Choices"]) {
                this.engine.addChoice(choice["Text"], choice);
            }
        } else if (locked == true){
            for(let choice of this.engine.storyData["Locations"][locationData]["Locked"]["Choices"]) {
                this.engine.addChoice(choice["Text"], choice);
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');