Getting Started
---
1. Run npm install to get packages (do this first!)
2. npm start to load the localhost and start dev

Firebase Deployment
--
1. Run npm run production to update the /dist
2. npm install -g firebase-tools
3. firebase deploy (you may have to provide firebase credentials)

Reccomended VS Code Extensions for Dev
---
- Auto Close Tag
- Auto Rename Tag
- Babel ES6/ES7
- Color Highlight
- ESlint
- HTML Snippets
- Instant Markdown (Get this to read and add to the .md's!)
- jsx
- Path Intellisense (Great for imports!)
- vscode-icons (my favorite)

Creating New Page
---
1. Create a folder under /components 
- An example would be "/contact"
2. Create a .js in the format "ContactPage.js"
3. Add them to routes.js
- <Route path = "contact" component={ContactPage} />
- Remember to  write an import at the top of routes.js and also export default ConmponentName; at the bottom of the .js
4. Finally, add a link to SidebarNav
-               <Link 
                    to = "games" 
                    style = {sidebarStyle.menuElement}>
                    Games
                </Link>

General Purpose Presentational Components
---
1. For general use components add them under /common
- An example would be "Footer.js"
2. Try to focus on making them dumb presentational components

Concepts
---
We are seperating and organizing our pages by folders and not by presentational vs. container
- Example "/about, /games" instead of "/containers /components"
- Component types can be boiled down to: general components, higher level containers (pages), Redux actions, Redux reducers
We want to minimize amount of class components and unnecessary stateful containers
We want to focus on creating dumb, presentational components that completely rely on props handed down

Settings
---
- .babelrc for adding more transpiling and ES6+ features
- .eslintrc for changing how strict syntax checking we prefer
- .firebaserc just contains our project name from our Firebase account
- .gitignore needs to ignore node_modules or else we'd be pushing 1000 file changes
- .firebase.json simply has the /dist folder indicated
- package.json has our dependencies (add more for importing new libraries)
- webpack.config for our different file loaders (add more if new file type is introduced!)

[Markdown Quick Reference](https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md)

UNMET PEER DEPENDENCIES?
---
1. rm -rf node_modules/
2. npm cache clean
3. npm install

How to access user info from Redux after user is logged in!!!
---
1. First add: import {connect} from 'react-redux'; to the top
2. Second add: import * as "   "Actions from '../actions/"   "Actions';  what actions you need which will be
3. Most Likely: import * as accountActions from '../actions/accountActions'; (fix the pathing however if problem)
4. Last Import: import {bindActionCreators} from 'redux';
5. Wrap the connect function: export default connect(mapStateToProps, null)("yourcomponenthere")
6. Add the mapping function: 
function mapStateToProps(state, ownProps) {
    return {
        accounts: state.accounts
        //this means i would like to access by this.props.accounts
        // the data within the state of our store named by root reducer
        // ownProps are the props of our component CoursesPage
    };
}
7. Congrats! Access the user object at anytime in your component by using this.props.accounts!

```javascript
How to make components:
//Use functional components if you dont need a state! This is highly preferred, dont make classes willy nilly
//functional component example!
const ExampleComponent = (props) => {
    return (
        <div>
            A component can only return one element so wrap everything in a div!
            A functional component has no state, only props! Props are handed in so you can access it with...
            {props.randomVariableYouGaveExampleComponent} <-- you can use js anytime you want with brackets
        </div>
    );
};

export default ExampleFooter;
```