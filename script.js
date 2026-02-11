let form = document.querySelector("form");
let result = document.querySelector("#result");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getInfo(form.elements[0].value);
});

const getInfo = async (word) => {
     try {

        result.innerHTML = `<p>Searching Word......</p>`
    
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        let definitions = data[0].meanings[0].definitions[0];

        result.innerHTML = `
        <div id = "output" class = "dictionary-card" >
            <h2><b>Word: </b> ${data[0].word}</h2>
            <p class = "part" ><b>Part of Speech: </b> ${data[0].meanings[0].partOfSpeech}</p>
            <p><b>Phonetics: </b>${data[0].phonetics[0].text === undefined ? "Not Found" : data[0].phonetics[0].text}</p>
            <p><b>Meaning: </b> ${definitions.definition === undefined ? "Not Found" : definitions.definition}</p>
            <p><b>Example: </b> ${definitions.example === undefined ? "Not Found" : definitions.example}</p>
            <a href="${data[0].sourceUrls[0]}" target = "_blank">Read More</a>
            </div>
        `
            
        } catch (error) {
              result.innerHTML = `<p style="color:red; font-weight:bold;">
 Sorry, we couldn't find this word in the dictionary.
</p>
`

            
        }          

        
    
};



