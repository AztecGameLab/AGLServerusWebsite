# Serverus

---

## Getting Started

* Development Tools
  * Install [Visual Studio Code](https://code.visualstudio.com/)
  * Install [Gitkraken](https://www.gitkraken.com/)
  * Install [Redux Dev Tools](https://github.com/gaearon/redux-devtools)

Relevant Plugins

* Auto Close Tag
* Auto Rename Tag
* Color Highlight
* HTML Snippets
* Path Intellisense
* Prettier - Code Formatter
* vscode-icons
* Code Spell Checker
* Reactjs code snippets

## Development Process

1.  Pull dev
2.  Create branch dev/ "task-feature"
3.  Commit changes locally
4.  Write unit tests
5.  Push and merge into dev on completion

```node
cd serverus
yarn
yarn dev
```

## Build Process

1.  Merge dev into master (new release)
2.  Run unit test suite

```node
cd serverus
firebase login
yarn build
rm -rf build/static/js/*.map
firebase deploy
```
