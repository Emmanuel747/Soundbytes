# SoundBytes

[Temporary] Project in development by a team of LSU early professionals.

## Todo

-   [x] Database.ts
    -   [x] getUser()
    -   [x] makeUser()
    -   [x] editUser()
-   [x] MediaStorage.ts
-   [x] FeedComposer.ts
-   [x] Authenticator.ts
-   [x] PostBuilder.ts

-   [x] Establish the user auth flow everywhere
-   [x] Return to useProtectedRoutes hook
-   [x] Flesh out the Post component
-   [x] Add following to Profile
-   [x] Create search bar in Profile

## Stretch

-   Delete posts (keep the data, but mark them as deleted)
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
