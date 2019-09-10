# Kagami React Native Starter

A Typescript + Expo based React Native Boilerplate.

## Overview

Based of [create-react-native-app](https://github.com/react-community/create-react-native-app) and further improved upon with:
- [x] [Typescript](https://www.typescriptlang.org/) 3
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [TsLint](https://palantir.github.io/tslint/) 5.1

### Build & Packaging

For handling packaging, the project uses [Yarn](https://yarnpkg.com).
With create-react-native-app at its base, building, serving and distribution is by default handled by [Expo](http://expo.io).

### Tests Structure

```
~/src/**/SomeComponent/..
.
+-- __tests__                           <== Jest will look for __tests__ folders under any component
|   +-- __mocks__                       <== tests related mocks of state or props
|   |   +-- SomeComponent.mock.ts
|   +-- __snapshots__                   <== enzyme generated folder containing component test snapshots
|   |   +-- ...
|   +-- SomeComponent.test.tsx
+-- SomeComponent.tsx
+-- SomeComponent.scss
```

### Remote Debugger

In order to use remote debugger on you local machine, you first need to install [React Native Deugger](https://github.com/jhen0409/react-native-debugger). If you're using Homebrew, you can quickly do it with
```
$ brew update && brew cask install react-native-debugger
``` 


### Scripts

- Setup :: `$ yarn install` 

- Development with [React Native Deugger](https://github.com/jhen0409/react-native-debugger)
- Development :: `$ yarn run buildAndStart`
- Android :: `$ yarn run buildRunAndroid`
- iOS :: `$ yarn run buildRunIOS`


- Lint :: `$ yarn run lint`
- Test :: `$ yarn run test`


- Bundle Android App :: `$ expo build:android`
- Bundle iOS App :: `$ expo build:ios`
- Fetch Expo-generated Android keystore :: `$ expo fetch:android:keystore`

## Using Redux

**Actions** and **Reducers** are separated and categorised based on the respective application features or sections they handle. Each respective set of those, along with a custom reducer **Middleware** used in order to handle **ANY** data manipulation required before dispatching an action.

All reducers are combined in and exported from `~/src/modules/index.ts`. Whenever a new reducer is created, it **MUST** be added to the mentioned file as well.

#### Coding Convention and Structure
1. **Actions** are handled by [redux-actions](https://github.com/redux-utilities/redux-actions) package and are exclusively a set of functions returning pure objects of type `{ type:string, payload:{ [ key:string ]:any } }` 

2. **Reducers** include their `initialState` and are handled by [redux-actions](https://github.com/redux-utilities/redux-actions). \
**Reducers must ONLY include plain instructions for state changes. NO operations must be performed inside a reducer, use a middleware instead!**

3. **Sagas** are utilized for **any** operations required before dispatching a Redux action. Most common use would be making an API request in order to fetch data before saving it in Redux state.

