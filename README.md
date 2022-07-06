# MetaUniversity_CapstoneProject

## Project Description
- Allows users to customize and create lists of activities, grouped based on general categories. The user can also randomly generate an activity 
from the list based on a time parameter. The website will automatically add the activity to the user's calendar on the desired day and/or time. 

## Features
- Users can create profiles 
- users can view generated "playlists" based on set categories (Ex: time, allergen-free, vegetarian)
- Ability to create and customize list of activities
- Generate a random activity from a chosen list 
- Automatically add activity to user's calendar 
- Check calendar app to see what time scheduling the activity is possible

## Stretch features
- Add activity to the calendar of a group of people
- Determine when the activity can be added to the user's calendar given a specific day
- User has the option to share their activities with friends; friends can view them and add it to their calendar 
- Reccomend similar products 
  - create a similarity scale based on certain tags (ex: time, allergens)


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
