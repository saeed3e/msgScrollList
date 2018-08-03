# Infinitely Scrolling Message				

## Demo link
https://saeed3e.github.io/msgScrollList/
	
## Features added
* Create web layout as per design.
* Fixed header/Navbar as required
* Swipe: User can dismiss any message by horizontal swipe in both the direction(left and right)
* Lazy loading of messages.
  * At starting 20 message get from API and when a user starts scrolling and reach at 15th message(or 6th message from last then next message hit will trigger to the server for next 20 messages) and it is going on.
* I have tested this demo by loading thousands of messages and it is working smoothly. Thanks to a DOM virtualization concept.

## Source Code documentation
	Write foolproof code comments for all the functions, classed and statements

## Tested devices
iPhone 6s(IOS), Motorola g4(Android), Readmi 5A

## Simulation mode testing:
On slow 3g, fast 3g and wifi connection.
Enable CPU throttling by 4x, 6x

## Third party library used 
React
React-Virtualized
Swipe

## Application size (gzip)
	Vendor.js → 65.3 kb
	App.js → 3.44 kb
	Style.css → 1.43 kb
	index.html → 614 bytes

## Design Process:
* As the main project’s requirement interface should work smoothly as the number of messages increase, So to achieve this I have used the DOM virtualization concept to minimize the DOM size even user download upto one million of messages 
* Enable lightweight swipe handler on message card for smooth swiping feel.
* Used React to render messages with the React-Virtualized library.
	
## Coding Approach
* In this project, I have showcased my coding skill by writing ES6 vanilla(core) JavaScript without using any fancy library.
* And the third party library which I have used in this project are also written in vanilla JavaScript.
* Showcase my coding skill how to achieve 60 FPS while animating some objects.
* Using the concept of 'Intersectionobserver API' to lazy load the images.
* Using class-based modular coding practice to write the code.
* I have used component-based architecture in this project using "Reactjs" as an open source library which uses the concept of "Virtual DOM".
* I have created separate components for each individual functionality to achieve reusability of a component.
* Create a Swipe component using “swipejs”, so that it can be used in “Reactjs” ecosystem as a declarative manner.
* In this project, I have showcased my coding skill how efficiently I can use open source third-party library to build the application.
	
e.g.  I have used some libraries to build the desired functionality.
	
 	“React” library to render the DOM
 	"List" gives the DOM Virtualization(windowing) concepts.
 	“AutoSizer" to automatically set height and width of the row/tuple.
	"InfiniteLoader React" to give the feature to load n numbers of records.


