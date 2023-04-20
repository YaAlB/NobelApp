# NobelApp React Native App

## Intro

This is the code repository for the NobelApp React Native app and it is aimed to build an application that allows users to search some data for Nobel prize awards.

### The following has been achieved

Real time update
Imperfect matches
And ordering results by quality of match

## Development Environment Setup

Using the React Native CLI [Development Environment](https://reactnative.dev/docs/environment-setup), setup your machine for Android (and iOS for macs).

The [yarn](https://classic.yarnpkg.com/en/docs/install/) package manager is also what we use instead of npm so make sure that is installed as well.

## Running the project

### Install Node Dependencies

In the root folder of the project run

```bash
yarn
```

### (iOS Only) Install CocoaPod Dependencies

If you are trying to run an iOS build you will also need to pull any pods as well using. Please make sure you are inside the `ios` folder in order to install the node_module and CocoaPod pods.

```bash
cd ios
pod install
```

### Building and running the app

```bash
# Start the React Native packager
yarn start

---
