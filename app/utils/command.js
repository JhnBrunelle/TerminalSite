import Ember from "ember";

const cmd = {
    /**
     * Stores last callback to console
     */
    lastReturn: "",
    openModal : (component)=> {

    },
    /**
     * Commands which open links
     */
    openLink : (url)=> {
        const links = Ember.Object.create({
            "linkedin": "https://www.linkedin.com/in/johnbrunelleece/",
            "github": "https://github.com/JhnBrunelle"
        });

        if (url in links) {
            const win = window.open(links.get(url), '_blank');
            win.focus();
            cmd.callbackToPrint(`${url} opened!`);
        }
    },

    /**
     * Sets the last console return
     */
    callbackToPrint : (line)=> {
        cmd.lastReturn = line;
    },

    /**
     * Command routing
     */
    pushCommand : (input) => {

        const commandTypes = Ember.Object.create({
            "link": ['cd', 'open', 'github','linkedin'],
            "modal": ['projects', 'project', 'technologies']
        });
        cmd.openLink(input);
    }

}



export default cmd;
