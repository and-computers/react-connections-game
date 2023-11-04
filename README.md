# Connections (React, Tailwind, Shadcn/ui)

This is a clone of the [NYT Connections Game](https://www.nytimes.com/games/connections). Which itself seems to be an unacknowledged clone of the British game [`Only Connect`](https://kotaku.com/new-york-times-connections-only-connect-puzzle-wordle-1850553072).

Anyways..

### [Click Here To Try Out The Demo](https://blackconnections.andcomputers.io/)

![Gif of Connections Gameplay](/docs/instructions-gif-connections.gif)

## To Run Locally:

```
cd react-connections-game
npm install
npm run dev
```

### Technology

- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Spring](https://www.react-spring.dev/) for a few animations
- [Shadcn/ui](https://ui.shadcn.com/) for primitive components
- Copied a number of utility functions from a [React Wordle Clone - cwackerfuss/react-wordle](https://github.com/cwackerfuss/react-wordle)
- Built with [Parcel](https://parceljs.org/)

### Code Organization

- Global state (game status, guesses, etc.) is handled using React's Context API. The provider components are in `src/providers`
- Components are in `src/components`
  - Primitive components imported from `shadcn/ui` library and lightly edited are in `src/components/ui`
  - The `Sparkles` component is taken from [Josh Comeau's article on creating animated sparkles in React.](https://www.joshwcomeau.com/react/animated-sparkles-in-react/).
- Helper functions for local storage, game statistics, and constants are in `src/lib`
  - The actual puzzle data for changing the content of each puzzle is in `src/lib/data.js`
- Custom hooks are in `src/hooks`
  - Both of these are code snippets taken from [Josh Comeau's Blog](https://www.joshwcomeau.com/snippets/)

#### Similar Projects

- [PuzzGrid](https://puzzgrid.com/about) which allows you to create your own games/puzzles, no code required.
- [Connections Generator by swellgarfo](https://www.reddit.com/r/NYTSpellingBee/comments/152i5cx/for_those_playing_nyt_connections_i_created_a/) which also allows you to create your own games/puzzles, no code required.

### Contributing

- Please fork and submit a PR if you'd like!

### Projects Built Using This Repo:

- _your fork here!_

_Want to add one to the list? Please make a pull request._

#### If you found this helpful or entertaining feel free to check out our other work!

- [Writings & Thoughts](https://andcomputers.io)
- [Black Wordle](https://blackwords.andcomputers.io)

##### If you'd like to support financially

- [One-Time Contribution via Stripe](https://buy.stripe.com/7sIg1Udac6xZegodQR)
