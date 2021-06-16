# Corpus Bank 👓
Screenshots available below.

## Steps to reproduce:
  - git clone `https://github.com/nayemalam/corpus-search.git`
  - cd `corpus-search`
  - cd `backend` -> `yarn install` or `npm install`
  - cd .. -> cd `frontend` -> `yarn install` or `npm install`

### Running it locally:
** there are notably two ways to run this in dev mode, the steps are outlined below **
1. Easy way: runs everything (both backend and frontend)
    - in frontend folder, run `yarn dev` or `npm run dev`
2. Alternative way: run each backend and frontend spaces on 2 separate terminals
    - in backend folder, run `yarn start` or `npm run start`
    - in frontend folder run `yarn start` or `npm run start`

The app will run in development mode. <br/>
App available at: [http://localhost:3000](http://localhost:3000) to view it in the browser. <br/>
Local backend available at: [http://localhost:4000](http://localhost:4000) to view it in the browser. <br/>
The page will reload if you make edits. The backend will also reload if you make edits.
 #
#### What does this do?
- [x] Allows users to dynamically search for a word within the Ernest Hemingway (The Old Man and the Sea) text
- [x] Retrieves the top 3 most similar words related to the search query
- [x] Display search results in a list
- [x] Users can edit similar word(s)
- [x] Users can add any word(s)
- [x] Users can remove similar word(s)
- [x] Users can view the entire corpus
#
#### Additional features:
- There is a `View Entire Corpus` toggle button at the bottom of the page to display the entire corpus for reference
- Notification bar is added everytime a user adds, updates, removes word(s); if the word is already in the corpus, it will alert the user.
- Responsive design (can minimize window to see design adjust accordingly)
- "In-house" backend algo. to run similarity matching
#
#### Screenshots:
Frontend:

From this: 
![1](https://user-images.githubusercontent.com/25883629/122232634-611c0600-ce89-11eb-976b-5e15fb3ed9f0.png)

To this:
![2](https://user-images.githubusercontent.com/25883629/122232697-7002b880-ce89-11eb-86f8-8637a3c27a89.png)

To this:
![3](https://user-images.githubusercontent.com/25883629/122272454-925afd00-ceae-11eb-8744-367a418b3460.png)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#
# Full Stack Web Developer Challenge
## Task Description
Your task for this challenge is to create a small search engine comprising of two parts, a web-based user interface and a server component that exposes a REST API which provides search results retrieved from a corpus of text that will be provided to you in `corpus/hemingway.txt`.

Your submission will be evaluated for conforming to the specifications outlined below as well as code quality (maintainability, scalability, performance etc.). You are permitted to use any resources and libraries you wish, however, you should be able to justify design choices in your code.


## Requirements
The basic search engine should be capable of the following three operations.

1. Given a query consisting of a single word `w`, display the 3 most similar words in the search corpus according to some similarity metric of your choosing. You should return results even if `w` is not in the corpus.
2. Given a single word `w`, update the search corpus with `w`. The new word `w` should immediately be 
queryable.
3. Given a single word `w`, remove **_the most similar word_** to `w` in the corpus from further search results. 
### User Interface
The user interface should be a browser-based application developed using your JavaScript web framework of choice. It should support the three aforementioned operations. How this is done is completely up to you. Use your creativity and imagination to create a UI that will set your submission apart!

### REST API
The REST API can be implemented using whatever language and frameworks of your choosing. Again, like the UI, it needs to support the three operations listed above. How you choose to accomplish this task is up to you.

## Deliverables
To submit your challenge, fork this repository and provide the link to your forked repository.
You should also update this README to include instructions on how to run your search engine.
Tests are not mandatory but will be considered bonus points if you provide them.

This challenge should take a day at most. It is not expected to be a production ready application and thus will not be evaluated in such a context.

