const defaultOptions = require("../model/DefaultOptions");

/**
 * This can be any contract but for the moment I assume that user can pass as many as texts by using below ways
 * 1.) node demo.js --text hello --text bye --text meoww 
 * OR
 * 2.) if they want to pass a single argument then it can be (separated by double pipes)
 * node demo.js --text "hello||bye||meoww"
 * @param {*} argv 
 */
const normalizeInput = (argv) => {
    // [TODO] even better would be to read these options from a JSON file 
    // this would be more robust and configurable way [I am not implementing it for the sake of simplicity]
    const keys = ['text', 'width', 'height', 'color', 'size'];
    const options = {};
    keys.forEach((key) => {
        // for text key we are assigning the array of inputs or default one if not provided by user
        if (key === 'text') {
            options[key] = Array.isArray(argv[key])
                ? argv[key]
                : (argv[key]?.split?.('||') || (console.warn('Text input is missing, we are using default value = ', defaultOptions.text), defaultOptions[key]));
        } else {
            // for other keys we are assigning the first item of array or default one if not provided by user
            // reason we don't want consumer to provide different values per image and distort the final mergedd image, we can do that if needed
            options[key] = Array.isArray(argv[key])
                ? argv[key][0]
                : (argv[key] || (console.warn(`${key} is missing, we are using default value = `, defaultOptions[key]), defaultOptions[key]));
        }
    });
    return options;
};

module.exports = normalizeInput;
