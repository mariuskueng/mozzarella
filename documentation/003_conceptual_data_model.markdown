# Conceptual Data Model

## Overview

![ERD](figures/erd.png)

### Entity: User
A *user* of the app. He can be a member of one or more *lists*. He can also share a *list* with other *users*.

### Entity: List
A *list* with a given name and one or more *users* that stores and sorts several *items*.

### Entity: Item
An *item* has the following attributes: *title*, *amount*, *due date* and *completed*. *Completed* items are automaticall hidden in a *list* and visible on request.

## Operations

Actor			| Operation			| Arguments | Result
-------------	|-------------------|-----------|-------
User 			| Add item to list	| `item`    | `success` or `fail`
User 			| Remove item from list	| `item`    | `success` or `fail`
User 			| Change item title	| `item`    | Changes old `title` to new `title`
User 			| Tick item on list | `item` | Changes `completed` to `true`
User 			| Add amount to list	| `item`    | `success` or `fail`
User 			| Add due date to list	| `item`    | `success` or `fail`
User 			| Attach item to item	| `item`    | `success` or `fail`
User 			| Add user to list | `user` | `success` or `fail`
User			| Remove user from list | `user` | `success` or `fail`
User			| Login / Logout | `un/pw` | `Session ID`

