import { initializeFirebase, checkUserState, signOutUser, signInUser } from "./firebase/firebase.js";
import { elements, baseUrls } from "./models/base.js";

class Actor {
    constructor() {
        this.actor = '';
        this.json = {};
    }

    async getActor() {
        const api_url = baseUrls.api_url;

        //get actor id from url
        let params = (new URL(document.location)).searchParams;
        let actorId = params.get('actorId');
        let actor = params.get('actor')
        console.log(actorId);
        console.log(actor);

        let search_api = 'people' + '/' + actorId;
        const response = await fetch(api_url + search_api);
        this.json = await response.json();
        console.log(this.json);
        //this.actor = this.json.title;

        this.createActor();
    }

    createActor() {
        const picture_url = baseUrls.picture_url;
        let html = '';

        try {

            elements.actorImage.src = picture_url + 'original' + this.json.profile_path;
            elements.actorImage.alt = this.json.name;

            elements.knownFor.insertAdjacentHTML("beforeend", this.json.known_for_department);
            elements.gender.insertAdjacentHTML("beforeend", (this.json.gender === 1) ? 'Female' : 'Male')
            elements.birthday.insertAdjacentHTML("beforeend", (this.json.birthday) ? this.json.birthday : 'None')
            elements.placeOfBirth.insertAdjacentHTML("beforeend", (this.json.place_of_birth) ? this.json.place_of_birth : 'None')

            if (this.json.also_known_as) {
                this.json.also_known_as.forEach((el) => {
                    html = `
                            <li itemprop="additionalName">${el}</li>
                    `;
                    elements.alsoKnownAs.insertAdjacentHTML("beforeend", html)
                })
            }


        }
        catch (error) {
            console.error(error)
        }
    }

}

const actor = new Actor();

actor.getActor();