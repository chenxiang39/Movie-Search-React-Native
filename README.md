# 571HW9
Must install Nodejs, yarn and Homebrew!!!!!!

[React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

### install

```bash
yarn install
npx pod-install

```

### run

```bash
npx react-native run-ios --simulator="iPhone 12 Pro"

```


### TroubleShoot

https://github.com/oblador/react-native-vector-icons/issues/1074

when install vector-icons

please remove duplicate reference fonts in "Copy Bundle Resources" 

https://github.com/dominicstop/react-native-ios-context-menu#112-xcode-build-error-undefined-symbol

build failed

please clear Library Search Paths and create new swift in project and Xcode will automatic create
