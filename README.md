# SoundBytes

Social media platform developed by a team of LSU early professionals.

## How to run

-   Run the command: `npm i && npm start`

## Stretch Goals

-   Delete posts (keep the data, but mark them as deleted)
-   Edit user details (like profile picture)
-   Auto play features

## Database Structure

COLLECTION:

-   doc
    -   data

USERS:

-   usernames: { username: UID }
-   UID

    -   username
    -   profile picture link
    -   posts: PID[]
    -   likedPosts: PID[]
    -   following: UID[]
    -   followers: UID[]

POSTS:

-   PID

    -   title
    -   creator uid
    -   audio file
    -   timestamp
    -   number of likes
    -   replies: PID[]
