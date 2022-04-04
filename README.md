# Notify - SoundBytes

[Temporary] Project in development by a team of LSU early professionals.

## Todo

-   [ ] Database.ts
    -   [ ] getUser()
    -   [ ] makeUser()
    -   [ ] editUser()
-   [x] MediaStorage.ts
-   [x] FeedComposer.ts
-   [x] Authenticator.ts
-   [ ] PostBuilder.ts

-   [ ] Establish the user auth flow everywhere
-   [ ] Return to useProtectedRoutes hook
-   [ ] Flesh out the Post component
-   [ ] Add editing to Profile (this includes toggle following on other's profiles)
-   [ ] Create search bar in Profile

## Stretch

-   Delete posts (keep the data, but mark them as deleted)
-

## Database Structure

COLLECTION:

-   doc
    -   data

USERS:

-   usernames: { username: UID }
-   UID

    -   username
    -   profile picture link
    -   bio?
    -   posts: PID[]
    -   likedPosts: PID[]
    -   following: UID[]
    -   followers: UID[]

POSTS:

-   PID

    -   title // maybe
    -   creator uid
    -   audio file
    -   timestamp
    -   number of likes
    -   replies: PID[]
