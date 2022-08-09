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
Recipe Info
Column Name | Type | Description
--- | --- | --- 
name | string | name of recipe 
thumbnailUrl | string | recipe image link
totalTimeTier | Object | time tier (ex: under 30 minutes, under 1 hour)
totalTimeMinutes | Number |  recipe time in minutes
nutrition | Object | information about calories, sugar, carbs, fiber, protein, fat in recipe
instruction | aray | includes recipe directions and any appliances needed for each step 
tags | Array | includes general tags of recipe (ex: types of appliances, meals, time tiers, cooking styles)
description | string | describes the recipe
videeoUrl | string | link to the recipe video
recipeId | Number | id from Tasty API
ingredients | array | list of ingredients and their measurements 
ingredientsInfo | array | list of ingredeints, measurements in differnt measurement units
allergens | array | list of allergies found in the recipe

User Info
Column Name | Type | Description
--- | --- | --- 
idToken | string | user token to make changes to user's google account (specifically google calendar)
refreshToken | string | token that allows you to generate a new idToken after it expires without prompting the user to log in again
userLists | array | list of cookbooks user has created 
sub | string | user unique code to identify new or returning users 
name | string | user full name
firstName | string | user first name
email | string | user gmail 


## Endpoints
Tasty API (data intialization)
HTTP Verb | Name | Description | User Stories
--- | --- | --- | ---
GET | recipes/list|retrieves list of recipes based on queries |

Google Calendar API (add events)
HTTP Verb | Name | Description | User Stories
--- | --- | --- | ---
GET | [recpes/list](https://www.googleapis.com/calendar/v3/calendars/calendarId/events)|retrieves list of all events in a given calendar between a given time period|
POST | instructions can be found here: https://developers.google.com/calendar/api/guides/create-events#javascript | insert events based on user's chosen recipe

My API 
HTTP Verb | Name | Description
--- | --- | --- | ---
GET | http://localhost:3001/ | returns all recipes from the database grouped into predefined categories and subcategories
GET | http://localhost:3001/allrecipes/ | returns recipes from tasty API and adds it to the recipe database 
GET | http://localhost:3001/search/:searchInput | returns all recipes that correspond to the search input 
GET | http://localhost:3001/get-tokens/:code | returns user's google auth tokens to log in using google 
POST | http://localhost:3001/create-tokens | 
POST | http://localhost:3001/create-new-user-list
POST | http://localhost:3001/add-recipe-to-user-list
POST | http://localhost:3001/create-event

## Resources
- integrating google sign-in: https://developers.google.com/identity/sign-in/web/sign-in
- tasty api: https://rapidapi.com/apidojo/api/tasty/
- google calendar, getlist of events: https://developers.google.com/calendar/api/v3/reference/events/list#try-it
- google calendar, create event: https://developers.google.com/calendar/api/guides/create-events#javascript
