# MetaUniversity_CapstoneProject

## Project Description
- Allows users to customize and create lists of activities, grouped based on general categories. The user can also randomly generate an activity 
from the list based on a time parameter. The website will automatically add the activity to the user's calendar on the desired day and/or time. 

## Core Features
- Search bar that filters recipes based on user input
- User can view automatically generated recipe lists based on set categories (Ex: time, type of meal)
- Users can view view recipe details such as instructions, ingredients, and total time
- User Login via google
  - Used authentication tool, OAuth2, with google api to allow users to log in with their google accounts
- Logged in users can…
  - create new lists
  - add recipes to their own list
  - Add either a chosen recipe or a randomly generated recipe (from specified category) to their google calendar given a start time
  - Determines the total time it takes to make a given recipe and updates the end time of the google calendar event automatically

## Stretch features
- Optimized search bar so that api calls are only made after the user stops typing for a certain amount of time
  - prevents the multiple unnecessary api calls from being made every time the user changes the search input
- Created allergen tags for all recipes based on common ingredeints that trigger the allergy

## Wireframe
- figma link: https://www.figma.com/file/nWtfnVrjReOwOW8wyMNfbq/Capstone-Project?node-id=0%3A1

## Data Model
Column Name | Type | Description
--- | --- | --- 
recipes | object | contains name, ingredient list, recipe instructions, video, picture, etc. 
userInfo | object | name, email, google calendar account


## Endpoints
Tasty API (data intialization)
HTTP Verb | Name | Description | User Stories
--- | --- | --- | ---
GET | recipes/list|retrieves list of recipes based on queries |
--- | --- | --- | ---

Google Calendar API (add events)
HTTP Verb | Name | Description | User Stories
--- | --- | --- | ---
GET | [recpes/list](https://www.googleapis.com/calendar/v3/calendars/calendarId/events)|retrieves list of all events in a given calendar between a given time period|
--- | --- | --- | ---
POST | instructions can be found here: https://developers.google.com/calendar/api/guides/create-events#javascript | insert events based on user's chosen activity|

## Resources
- integrating google sign-in: https://developers.google.com/identity/sign-in/web/sign-in
- tasty api: https://rapidapi.com/apidojo/api/tasty/
- google calendar, getlist of events: https://developers.google.com/calendar/api/v3/reference/events/list#try-it
- google calendar, create event: https://developers.google.com/calendar/api/guides/create-events#javascript
