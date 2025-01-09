This bug occurs when using the Expo `Linking` API to handle deep links.  Sometimes, the `Linking.addEventListener` callback is not triggered, even though the deep link is opened correctly.  This leads to the app not reacting to the intended deep link and no data is passed to the app. This issue only occurs in the Android build.