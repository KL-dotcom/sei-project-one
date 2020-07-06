# Kitty Food Dash

This project was developed as part of General Assembly's Software Engineering Immersive. This was the first project on the course to be built with HTML, CSS and JavaScript, completed solo over 8 days.

## Brief

Kitty Food Dash is based off of the classic arcade game Frogger. The game comprises of navigating Sammy the Kitty across a game board filled with enemies, in order to get him to the food bowls on the other side. There are two levels, each with their own style and difficulty.

## Technologies Used

* JavaScript
* HTML
* CSS
* Git
* GitHub

## Process

* The game grid is a two dimensional array, this was so the different directions of the individual game pieces and their collisions could be easily calculated. The movements of the game pieces are implemented through the adding and removing of classes to the individual divs in the grid.

* The game pieces were made using object oriented code, using class inheritance to make the multiple game pieces you can see on the board. This was because the non-playable pieces all have similar roles, and using constructors allowed my code to use the principles of DRY effectively.

* The effect of the player moving on and behind objects on the board is made by stacking backgrounds in CSS.

* There are two distinct styles between the two levels. The first level has a cute colour scheme and music with a slower pace of game play. The second level is a darker theme, this is to make a humourous contrast to the first level as well as content of the game. The rock-ish music and faster speeds of the enemy game pieces compliment this thematic change.

#### First Level Theme:

![Level 1 image](/assets/Level-1.png)

#### Second Level Theme:

![Level 2 image](/assets/Level-2.png)

* I based the timings of the different game pieces on the two levels on a version of Frogger available online (froggerclassic.appspot.com). I used this as a guide, as I wanted to make sure the game was challenging, but also not too difficult and could be won with a similar skillset.

## Key learnings

What I took away from the project is the importance of organisation in code. I left a lot of refactoring until the last minute, and it would have been better to refactor as I was working.

## Challenges and Wins

A big challenge was the movement of the non-playable game pieces on the board. I used `Date.now()` in order to pace out the movements in the individual entities' code, however this caused a "walking" type of effect with the enemies. This was solved by taking `Date.now()` out of the individual entities'and instead having it injected from the main game loop. This meant that all the game pieces were using the same `Date.now()` timestamp in order to work out their timings, and the movements improved as the "walking" effect disappeared. 

I'm really happy with how playable the game turned out, and how fun it is. I'm still enjoying playing the game months after making it, and a classmate even sent me a screenshot of his win after the project was finished.

## Future improvements

* I would like to add animation to the game pieces in order to smooth out the movements. The movements can be quite jerky and not very nice to look at, this can especially be seen on level 2 when the speed increases.

* It would be great to style the game more, so it looks more visually interesting.

## Deployment

This project was deployed using GitHub Pages:
https://kristenlittle.com/sei-project-one/