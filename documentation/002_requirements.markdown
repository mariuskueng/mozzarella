# Requirements

## Usecase Overview

![Use Cases](figures/use_cases.png)

### Usecase: Login with username and password

Use Case				| Login with username and password
--------------------|--------------
**Description** 		| Allows user to login with his username + password
**Actors**	   		| User
**Preconditions**	| Not logged in
**Basic Flow**		| User fills in username + password, clicks login
**Alt. Flow**			| None
**Postconditions**	| *User is logged in (has session token)*
**Notes**				| -

### Usecase: Logout

Use Case				| Logout
--------------------|--------------
**Description** 		| Logout user from running current session.
**Actors**	   		| User
**Preconditions**	| Logged in
**Basic Flow**		| User clicks logout button.
**Alt. Flow**			| -
**Postconditions**	| *User is logged out (session token removed)*
**Notes**				| -

### Usecase: Create new account

Use Case				| Create new account
--------------------|--------------
**Description** 		| A user creates a new account.
**Actors**	   		| User
**Preconditions**	| User doesn't have an account yet.
**Basic Flow**		| User clicks "create new account" button.
**Alt. Flow**			| User tries to login but no existing account was found.
**Postconditions**	| UC: Login
**Notes**				| -

### Usecase: Add new list

Use Case				| Add new list
--------------------|--------------
**Description** 		| A user creates a new list.
**Actors**	   		| User
**Preconditions**	| UC: Login
**Basic Flow**		| User clicks "add new list" button.
**Alt. Flow**			| -
**Postconditions**	| List is now added and visible to the user
**Notes**				| -

### Usecase: Invite user to existing list

Use Case				| Invite user to existing list
--------------------|--------------
**Description** 		| User shares a list with other users.
**Actors**	   		| User
**Preconditions**	| The invited user exists (username).
**Basic Flow**		| User clicks the "Share list" button and enters the username of a user.
**Alt. Flow**			| -
**Postconditions**	| List is now shared.
**Notes**				| -

### Usecase: Add item to list

Use Case				| Add item to list
--------------------|--------------
**Description** 		| A user adds a new item to an existing list.
**Actors**	   		| User
**Preconditions**	| UC: Login, UC: Add new list
**Basic Flow**		| User fills in the "new item" input field an submits it.
**Alt. Flow**			| User adds a **due date** and a **piece amount** to the new item.
**Postconditions**	| Item is now added to the existing list and visible to the user. Add amount of pieces to an existing item.
**Notes**				| -

### Usecase: Add due date to an existing item

Use Case				| Add due date to an existing item
--------------------|--------------
**Description** 		| A user adds a due date to an existing item.
**Actors**	   		| User
**Preconditions**	| UC: Login, UC: Add new item
**Basic Flow**		| User hovers over an item and clicks the "add due date (clock)" button
**Alt. Flow**			| User double clicks the current due date and changes it.
Due date can be null.
**Postconditions**	| -
**Notes**				| -

### Usecase: Add amount of pieces to an existing item

Use Case				| Add amount of pieces to an existing item
--------------------|--------------
**Description** 		| A user adds an amount of pieces to an existing item.
**Actors**	   		| User
**Preconditions**	| UC: Login, UC: Add new item
**Basic Flow**		| User clicks on the arrows on the amount element.
**Alt. Flow**			| If no amount is given, 1 is the default amount.
**Postconditions**	| -
**Notes**				| If the user adds a new item, a piece is automatically added with a reference to its item.

### Usecase: Add due date to a piece
Use Case				| Add due date to a piece
--------------------|--------------
**Description** 		| A user adds a due date to a piece of an item.
**Actors**	   		| User
**Preconditions**	| UC: Login, UC: Add new item
**Basic Flow**		| User opens item view and changes due date UC: Add due date to an existing item.
**Alt. Flow**			| -
**Postconditions**	| -
**Notes**				| -

### Usecase: Show notifications for over due items
Use Case				| Show notifications for over due items
--------------------|--------------
**Description** 		| The app shows the user which items are over due.
**Actors**	   		| Meteor (Backend)
**Preconditions**	| UC: Add new item
**Basic Flow**		| Meteor checks if any items of a user are over due and adds them to a separate lists where all over due items are visible.
**Alt. Flow**			| Meteor shows the number of over due items in the over due list title.
**Postconditions**	| -
**Notes**				| -

### Usecase: Sort items by due date
Use Case				| Sort items by due date
--------------------|--------------
**Description** 		| The app sorts all items in each list by its due date
**Actors**	   		| Meteor (Backend)
**Preconditions**	| UC: Add new item
**Basic Flow**		| Old items are on top, new items below.
**Alt. Flow**			| -
**Postconditions**	| -
**Notes**				| -
