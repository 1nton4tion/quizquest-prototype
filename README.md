# Quiz Quest App
## The frameworks/tools I chose and why

I used a few frameworks, some for aesthetic reasons, and some logistic.

1. **Vite:** This was logistically because I am most familiar with using Vite with React.ts. I felt that I could develop quickly by using the knoeledge I already knew, and also set up the environment quickly.

2. **RetroUI:** This was a component library I found online because I thought it looked cool for a simple game. By using a library, I knew that I could really quickly have consistent styling in all of my pages and components instead of worrying about making something custom that might not fit into the styling.

## How I structured the app and why

- The app has one main file "App.tsx" that handles most of the rendering logic. It stores a gamestate and based on that, chooses which screen to render. It passes the relevant state values to the screens that are being rendered.
```ts
export interface GameState {
    screen: Screen
    currentQuestion: number
    score: number
    answers: number[]
}
```
- In the components directory, it is also very simple. a directory for the library components `retroui/` and for my 4 different screen types `screens/`

- There is one file `types.ts` that stores the interfaces and types that I use, and a `data.ts` that stores the hardcoded questions, loading messages, and final messages (and emojis). 

- Overall, I have tried to maintain scalability so if there are more questions for example, everything will work.

## How did I use AI
### ChatGPT
I used chatgpt just for generation of messages.
```
give me a set of funny loading messages for a quiz game. format them as a typescript list of strings
```
```
ok now i have this export interface FinalMessage { normalizedScore: number, message: string, emoji: string } come up with some messages at the end depending on the normalised score ie. right/total.toFixed(1)
```

### Cursor
Most of the developing was done with cursor and I had a few main scenarios that I used it:

1. Initial setup (Plan Mode)

I gave cursor the overall context of the project, and the way I wanted the logic to work (state based, one file to choose what to render in the canvas). I asked it to set up the file system but very specifically not to populate the files, just to have some dummy data.

2. Guided ui development (Agent Mode)

example (I added my own interface and types already):
```
Ok now for the score screen. look at the data I have added and lets render it
```
example (I added the loading indicator I liked from the library and the message below)
```
I like the loading screen, but I want the loading indicator in the middle with the text below it, and the loading indicator to be fll width with as many dots as needed in the count
```

3. Debugging (agent/ask mode)
```
Ok so the feedback overlay is not showig the components behind it, and there is a border around it. make it full width and height
```
```
teh canvas has padding. can this extend over the padding?
```

4. Guided UI development again (agent mode)

I drew up a UI mock on a piece of paper and asked it to make it

## What I would improve if I had time

- Add a high score, this would be quite simple just with another value in the game state. I could store it in local storage or cookies too so I can display it in the title screen and after refresh
- Make it all responsive, have an alternate mobile UI without the canvas border and with the answers just stacked as a list
- Add a loading animation thats more relevant to the style (snake maybe)
- change the cursor and the context menu
- add a dark mode
- add sounds

