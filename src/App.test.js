// ****Example 6**** Testing Async Code
import * as React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import App from "./App";

import { api } from "./api";
jest.mock("./api");
//^in a typcial coding environment (like this one) you can mock the entire module using the above line
//so here we'll mock the entire directory in ./api with jest.mock("./api")
//just need to also import the module (line 7)
test("allows users to add items to their list", async () => {
  const todoText = "Learn spanish";
  api.createItem.mockResolvedValueOnce({ id: 123, text: todoText });

  // const { getByText, getByLabelText, findByText } = render(<App />);
  const { getByText, getByLabelText } = render(<App />);
  const input = getByLabelText("What needs to be done?");
  const button = getByText("Add #1");

  fireEvent.change(input, { target: { value: todoText } });
  fireEvent.click(button);

  await waitFor(() => getByText(todoText));
  // await findByText(todoText);

  expect(api.createItem).toBeCalledTimes(1);
  expect(api.createItem).toBeCalledWith(
    "/items",
    expect.objectContaining({ text: todoText })
  );

});



test("renders the correct content", () => {
  const { getByText, getByLabelText } = render(<App />);

  getByText("TODOs");
  getByLabelText("What needs to be done?");
  getByText("Add #1");
});

// test("allows users to add items to their list", () => {
//   const { getByText, getByLabelText } = render(<App />);
//   const input = getByLabelText("What needs to be done?");

//   fireEvent.change(input, { target: { value: "RTL Presentation Slides" } });
//   fireEvent.click(getByText("Add #1"));
//   getByText("RTL Presentation Slides");
//   getByText("Add #2");
// });
//often need async tests to do anything meaningful in a test:
//ie - interacting with a server or interacting with something that is happening outside
//the component
//Jest gives us some facilities for "mocking"
//we never want to hit an actual server in our tests (also here we don't have one)



//****Example 5**** Incorporatign React Testing Library */
// import * as React from "react";
// import { render, fireEvent } from "@testing-library/react";
// //^the render method is provided by react testing library so now we can use theirs
// //no need to define our own
// import * as userEvent from "@testing-library/user-event";

// import App from "./App";

// test("renders the correct content", () => {
//   const { getByText, getByLabelText } = render(<App />);
//   //now render is the method provided for us by react testing library out of the box

//   getByText("TODOs");s
//   getByLabelText("What needs to be done?");
//   getByText("Add #1");
// });

// test("allows users to add items to their list", () => {
//   //fireEvent/user experience tests
//   //1 - load app:
//   const { getByText, getByLabelText } = render(<App />);

//   //2 - get the element we will be interacting with:
//   const input = getByLabelText("What needs to be done?");
//   fireEvent.change(input, { target: { value: "RTL Presentation Slides" } });
//   //^call fireEvent whihc has a change method, to change we pass the element that we want to
//   //simulate the event on plus
//   fireEvent.click(getByText("Add #1"));
//   //^fire another event to click the button

//   getByText("RTL Presentation Slides");
//   //^then assert that the value we just attempted to add is present on the page
//   getByText("Add #2");
//   //also assert that our button corrected updated to now say "Add #2"
// });

//react Testing Library gives us a lot of things but the main thing is this render method
//that we'll use in virtually every test
//which takes a component as a parameter and returns getQueriesForElement(root)
//based on that component - basically leets us load our component into the
//virtual dom for testing and lets us call alot of other methods with it

//-fireEvent (from react testing library) lets us simulate user actions/events and check react components
//after an event
//can also user "@testing-library/user-event" that can be used for some specific user events - esp for simulating each keystroke


//****Example 4**** explaining react testing library
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import { getQueriesForElement } from "@testing-library/dom";

// import App from "./App";

// const render = (component) => {
//   const root = document.createElement("div");
//   ReactDOM.render(component, root);
//   //added flexibility for which component we want to call^
//   return getQueriesForElement(root);
// }

// test("renders the correct content", () => {
//   //this part we'll likely need for every test so we can abtract it out to it's
//   //own reusable method(`render` method above):
//   // const root = document.createElement("div");
//   // ReactDOM.render(<App />, root);

//   // const { getByText, getByLabelText } = getQueriesForElement(root);
//   //^(partially used in `render` method) thren redefined:
//   const { getByText, getByLabelText } = render(<App />);

//   getByText("TODOs");
//   getByLabelText("What needs to be done?");
//   getByText("Add #1");
// });



// //****Example 3****
// import * as React from "react";
// import * as ReactDOM from "react-dom";

// //reach for first tool from "Testign Library". First thing they wrote was React Testing Library but there is alot
// // as well that is not specific to react - ei traverse dom and get specific elements easily, verify that labels and inputs are connected correctly
// //this is encapusulated in the dom testing library - which we'll use on our way to using the react testing library
// //so we'll add a few methods in our next line:
// import { getQueriesForElement } from "@testing-library/dom";


// import App from "./App";

// test("renders the correct content", () => {
//   const root = document.createElement("div");
//   ReactDOM.render(<App />, root);

//   const { getByText, getByLabelText } = getQueriesForElement(root);

//   // expect(getByText("TODOs")).not.toBeNull();
//   // expect(getByLabelText("What needs to be done?")).not.toBeNull();
//   // expect(getByText("Add #1")).not.toBeNull();
//   //we can actually simplify the above methods. All of our `getBy..`s willl throw an error if they fail
//   //so we could skip the "assertion" around the meat of the test
//   //(so we can skip the `expect` and `not` `null` methods):
//   getByText("TODOs");
//   getByLabelText("What needs to be done?");
//   getByText("Add #1");
// });


//****Example 2****
// import * as React from "react";
// import * as ReactDOM from "react-dom";

// //reach for first tool from "Testign Library". First thing they wrote was React Testing Library but there is alot
// // as well that is not specific to react - ei traverse dom and get specific elements easily, verify that labels and inputs are connected correctly
// //this is encapusulated in the dom testing library - which we'll use on our way to using the react testing library
// //so we'll add a few methods in our next line:
// import { getQueriesForElement } from "@testing-library/dom";


// import App from "./App";

// test("renders the correct content", () => {
//   const root = document.createElement("div");
//   ReactDOM.render(<App />, root);
//   //can use getQueriesForElement in place of these in a more user imitating way
//   // a user would be looking for the text 'TODOs', not specifically an h1
//   //so we can think about testing from the USER's perspective

//   const { getByText, getByLabelText } = getQueriesForElement(root);
//   //we'll query the text itself using the methods `getBYText` and `getByLabelText`

//   // expect(root.querySelector("h1").textContent).toBe("TODOs");
//   expect(getByText("TODOs")).not.toBeNull();

//   // expect(root.querySelector("label").textContent).toBe("What needs to be done?");
//   expect(getByLabelText("What needs to be done?")).not.toBeNull();
//   //^this method will both find the label AND validate the contract that the label and the input have together -
//   //it will error if the label does not have a corresponding input or arialabel - which helps you address
//   // screen reader situations
// //got this error:
// //TestingLibraryElementError: Found a label with the text of: What needs to be done?, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.
// //this issue went unnoticed with our more naive approach above of just using the DOM apis

//   // expect(root.querySelector("button").textContent).toBe("Add #1");
//   expect(getByText("Add #1")).not.toBeNull();
// });

//so now we have a little cleaner, more descriptive test that also handles a few more situations &&
//really tests the user experience as opposed to the developer experience


//****Example 1**** - using Browswer apis
// import * as React from "react";
// import * as ReactDOM from "react-dom";

// import App from "./App";

// test("renders the correct content", () => {
//   //first step to test a react component: render the react component to the DOM
//   //thinking about how we render a React element anywhere, our first thing is to get a DOM element:
//   const root = document.createElement("div");
//   ReactDOM.render(<App />, root);
//   //^ we now have a React App rendered inside of a virtual DOM
//   //Jest uses somethign like a simulated browser environment - called JSdom - which has all the apis so you can call
//   // document and then it has the method `createElement` - then create gives you all
//   //those dom apis so you can create a "div" or other HTML elements

//   //use DOM APIs (querySelector) to make assertions
//   expect(root.querySelector("h1").textContent).toBe("TODOs");
//   expect(root.querySelector("label").textContent).toBe("What needs to be done?");
//   expect(root.querySelector("button").textContent).toBe("Add #1");
// });

//^in above test we simply:
  //1. render the component
  //2. Make sure tht=at there is an h1, label, and button with the specific content we want

//issues: very easy to get a false positive with a test like above - not checking anything related to screen readers right now
