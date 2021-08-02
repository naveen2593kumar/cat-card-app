# cat-card-app

Make cat cards with cutomized messages and theme options.

# steps

- `npm install` to install required dependencies

# example

`@refer demo.js`

```js
const makeCatCard = require("./src/index");

makeCatCard();
```

# Some valid samples

```
node demo.js

node demo.js --c green --width 400 --height 400 --size 50 --text "Hey||Miss||Meoww"

node demo.js -c yellow --width 400 --height 400 --size 50 --text "Hey||Miss||Meoww"

node demo.js -c yellow --width 400 --height 400 --size 50 --text "Hey" --text "Miss" --text "Meoww"
```

`node demo.js (-c|--color <colorname>) (-w|--width <widthInnumber>) (-h|--height <heightInNumber>) (-s|--size <sizeInNumber>) (--text <text1> --text <text2> --text <text3>)`
`node demo.js (-c|--color <colorname>) (-w|--width <widthInnumber>) (-h|--height <heightInNumber>) (-s|--size <sizeInNumber>) (--text <text1||text2||text3>)`
