collections:

-   documents:

    -   data

USERS:

    - Usernames: [username: userID]
    - UserID

        - username
        - email
        - profile picture // maybe (avatar api)
        - bio // maybe
        - posts: [PostID]
        - following: [UID]
        - followers: [UID]

POSTS:

    - PostID

        - title // maybe
        - creator
        - audio file
        - timestamp
        - number of likes
        - replies: [PostID]
