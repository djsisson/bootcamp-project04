# bootcamp-project04

Requirements

1)  Created a page containing a form to leave a message and a list of all the messages that have been left.
2)  Styled the Page
3)  Created an API POST Route
4)  Created a Database
5)  Created an API GET Route
6)  Fetched Messages

Stretch Goals

7)  Added a delete Button to each message posted by the user only
8)  Added a set of reaction buttons to each message


Resources

W3. MDN, Stackoverflow, Google

I really had quite a few problems with async await, but i think in the end that is because i was using for each and not a for in, so it meant my code was trying to access data that it hadn't recieved yet, i still don't fully understand how to fix this.
apparently a .then(() => {}) should fix this, but i found things inside there would run before it had finished so i don't know.

I also felt my UI wasn't as good as previous projects.

Also i now know it was a terrible way to deal with reactions , on my local machine it was fine, but as soon as i run it on render i get huge delay due to each fetch request taking over .1 seconds. i really can't imagine how this is done in other sites, keeping track of which reaction each message has by each user, seems like a lot of data to store with each message, which is why i split it out.

I didn't get time to fix this, i had managed to experiment with json in queries which i think i could fix using this.

Also i didnt get time to add paged results so at the moment it only returns the last message the user has posted along with the next 10 or 9 if they have made a post.

overall i was quite pleased with my server code
not so much the rest.