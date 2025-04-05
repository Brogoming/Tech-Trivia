# Tech Trivia
**Tech Trivia** is a jepardy like game where up to 3 teams compete by answering trivia questions, each question answered correctly by a team scores points depending on the question. 
## How to play
### Home Page
On the home page the host will set the parameters of the game by selecting the **Number of Teams** participating, editing each teams name, seting the amount of **Time per Question**, and **Selecting the Game Set** to play. There are 6 pre-made sets, each unique questions and categories that span across computer science and technology. Each set contains 30 questions, 5 questions per category. There is also an option to create a custom set which when selected will allow you to download a JavaScript file template for user to edit. After the file is edited properly you can upload the file back and select it as a new option. Once all the parameters are set you can now start the game. If there is a parameter not properly set a pop up will show up saying that you missed something.
### Board Page
As stated before, in the pre-made sets there are 6 categories with 5 questions each but if the user is using a custom set there can be how ever much categories and questions there can be, but be careful because if there are too many questions or categories it may mess with the styling on the page. At the bottom of the page is where the teams are located, each team starts with 0 points but as teh game goes on the scores will change. At any point if there was a mistake with assigning points the host may change a teams points but either clicking the arrows to go up 100 or down 100 or type in the score. The scores have to be whole numbers. At any point the host can go back to the home page by clicking the **home icon** in the top left corner or if they want to end the game early they can click **End Game** in the top right corner. How the game is played depends on the host but what would need to happen is the host will click on the question cell requested. 
#### Question Modal
A modal will pop up with the question card, a **Timer** button, a **No Answer** button, and buttons for each of the teams. The **Timer** button will start the timer and count down depending the time set on the hom page. The **No Answer** button makes it so if no one answers the question correctly no one gets any points. Each of the team buttons assigns points the team clicked based on the points of the question. If for some reason the host accidentally clicks the wrong cell they can close out of the modal. If a team button or **No Answer** button is clicked it disables the question cell so it can't be clicked again.
### Congrats Page
When the the game ends and the host clicks on the **End Game** button on the board page it'll take you to the congrats page that sorts the teams based on point and puts them on pedistols from the lowest team to the first place team. The host can click on the **home icon** to take them back to the home page.
## Languages
- JavaScript
- SvelteKit
- Tailwindcss
- HTML
- CSS
## Developers
- Kale Wetjen
- Robert Schwartz
- Dakota Gullicksen