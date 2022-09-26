## 1. App Initialization
*a) What is initialized and in what order?*

The starting point for front-end initialization is in index.ejs where the \<main\> HTML element with id="main" is defined and the app.js code is referenced via a script tag. The entry point for code is in src/front-end/typescript/index.ts where a reference to the \<main\> element is obtained, the app component is imported and the framework's `start` function is imported from src/front-end/typescript/lib/framework/index.tsx and executed with the app component, a debug flag and the \<main\> element being passed as parameters.

The heart of the initialization code is located in the framework's `start` function. Initialization happens beginning with the `start` function as follows:
1. The `app` component's `init` function is called which sets up some initial application level `State` as an immutable record.
2. Boiler plate sets up state and message subscription handling.
3. The `routeManager` is created with a call to Router.makeRouteManager which uses the routes defined in `app.router`
4. The `dispatch` function is defined which is central to message handling and updating state.
5. A `render` function is defined which executes the `ReactDom.render` function. This `render` function is the first function pushed into the `stateSubscriptions` array.
6. Functions are defined for notifying (aka executing) message and state subscription handlers.
7. `notifyStateSubscriptions()` is called which results in the `render` function mentioned in point 5 above being executed leading to rendering of the application.
8. A `stateManager` object is created which is a central object used for subscribing/unsubscribing state and message subscription handlers, fetching current state via `getState()` and queueing up state mutations via the `dispatch` function.
9. `Router.start()` is called, passing in the earlier mentioned `routeManager` object where several window event listeners are setup, the path and query parameters associated with the window location are then passed into a call to `routeManager.dispatchUrl()`, where a route is inferred, `dispatchRoute` is called and the route information is dispatched using the framework's `dispatch' function mentioned in point 5 above.

The framework's `start` function asynchrounously returns a `stateManager` object, then a function is defined which updates state of navigation menus and a window event listener created to run this function when the window is resized.

## 2. State Management
*a) How can a developer debug state in this app?*

When a developer sets the `NODE_ENV` variable to "development", the `start()` function in src/front-end/typescript/index.ts adds the `stateManager` object to the `window` as a global variable. A developer can debug state by setting a breakpoint and using the browser's developer tools to inspect the state. In the dev console, state can be retrieved with a call to `window.stateManager.getState()`.

*b) Describe what you consider to be the most important concepts that another developer needs to know so that they can understand state management within the context of this custom framework.* 

There are several key concepts with respect to understanding state management. One key concept is that state is immutable and state management is tightly controlled in a type safe manner. It's important to understand that state can only be updated using the `dispatch()` function associated with the stateManager object created in the framework's `start()` function. Ultimately, state gets updated by the `update()` function in individual componenets. It is also important to understand that state can be updated both synchronously and asyncronously. Syncronous updates of state are critical to ensure a good UI/UX experience by updating state on the UI thread. State and its management appears to be rather complex and seems to be both hierarchical and centralized. Components (children and parents) have unique state which is initialized in their own `init()` function and updated in their `update()` function, but the state of pages is also accessible through the `State' object (see src/front-end/typescript/app/types) via the state manager. There is also the concept of SharedState which looks like an object for storing centralized session information.

As tech lead I would create a document that attempts to clearly describe how state is managed, highlighing that state is hierarchical and immutable, managed through the stateManager object and how the state is updated through the stateManager.dispatch function. I would consider developing a very simple demo application that uses the framework in order to demonstrate state management in a simplified context. I'm a very visual person, so I would attempt to create some sort of flowchart or diagram to help explain the state management process.

## 3. View Rendering
*a) How is view rendered and what is the relationship between state and view in this custom framework?*

The 'base' HTML for the application is located at src/front-end/html/index.ejs where the application's \<main\> element is defined with id="main" and the app.js bundle is referenced in a \<script\> tag. The application's code gets a reference to the \<main\> element in src/front-end/typescript/index.ts. The application initializes, dispatches the route as read from window.location and the overall application view is rendered via the `render` function in framework/index.tsx. Child components have a `view` function that returns markup. This `view` function is invoked to render a component. The relationship between state and view in this application seems typical of a React application in that the view is used to display relevant state and that the view updates in response to changes in the state.

*b) How does this approach to view rendering compare to how other, more well-known frameworks approach view rendering?*

In other frameworks, such as React, a module commonly exports the view directly (eg React function components) or contains a `render` function (eg React class components) and the framework implcitly executes the render function returning the view. Such components are consumed in other markup as their own unique HTML element (eg. <MyComponent />). The framework used in this application requires you to explicitly call a component's `view` function. There seems to be a mix of referencing a component's view as `component.view` and `{Module_Name}.view`.

c) What are the trade-offs that come with this design approach?
The primary trade-off in my opinion is that diverging from other well known frameworks introduces another layer of complexity that requires additional training/learning for those trying to familiarize themselves with the code base.




