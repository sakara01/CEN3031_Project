Group 96 {Lauren Escarcha, Karen Tong, Saloni Karanth, Justus Geslani}

USER STORIES:
1. As an internet user, I want a full screen map so that it's easier to navigate the application and to find coffee shops near me.
2. As a college student/coffee consumer, I want to find my exact location so that I can find coffee shops near me.
3. As a coffee consumer, I want to only see coffee shops so that it's easier to find the closest and farthest location in my area.


ISSUES WE PLANNED TO ADDRESS:
- Display map onto frontend
- Fix the map size to properly adjust to varying screen sizes
- Automatically find user location
- Find nearby coffee shops based on user’s location and store data in backend
- Display markers for user location and nearby shops (dynamically)


ISSUES SUCCESSFULLY COMPLETED:
- Deployed the map onto the screen using the API 
- Application automatically finds the user’s location and marks it on the map with a blue pin
- Found and properly stores an array of nearby coffee shops based on user’s location in the backend


ISSUES NOT (entirely) SUCCESSFULLY COMPLETED AND WHY:
- Map size is larger, but still needs to be automatically resized depending on the size of the device being used
    - We are still solving how to detect the user’s device screen size, which is needed for the application to properly adjust.
- Nearby coffee shop markers are shown, but hard-coded instead of dynamically found around the user’s location 
    - Requires implementation of a function in Angular to dynamically code nearby coffee shop markers based on user’s location
    - However, the backend can successfully request a nearby search from the Maps Places API and send the data to the frontend, which only needs to display the corresponding markers on the map.
    - We are still solving how to transfer the nearby coffee shop data (currently stored in the TypeScript file) to display markers on the map (currently deployed in the HTML file) - in other words, we are solving how to communicate data from one file/programming language to another file/programming language. 

LINKS TO VIDEOS:
- frontend: https://drive.google.com/file/d/13rcEbSWTMBgd-WO7jSg2gP3jZ8vjb4-T/view?usp=sharing
- backend: https://drive.google.com/file/d/1e6ix0xacadHHK7YAh4yBPIVB1fdEpLxa/view?usp=sharing 
