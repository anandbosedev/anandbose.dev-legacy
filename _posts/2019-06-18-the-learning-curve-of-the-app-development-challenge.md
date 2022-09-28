---
layout: post
title: The learning curve of the app development challenge
published: true
date: '2019-06-18 06:20'
image: images/2019-06-18-the-learning-curve-of-the-app-development-challenge/1*FLno-Tmx3NOaGytfj0IvHg.jpeg
author: Anand Bose
category: Android Development
featured: true
---

The story of choices and challenges that led the development of a visually aesthetic weather app “Q Weather”.

Say hello to my new Android project [Q Weather, a visual weather application for Qatar cities and worldwide](https://play.google.com/store/apps/details?id=qa.applab.qweather&hl=en). I’m celebrating the release of the app in this month, and **_the best app ever I made in my career!_** It was such a fabulous experience, as I got the incredible opportunity to deep dive in the latest technologies for app development. Moreover, I learned the best practices, do’s and don’ts during the entire lifecycle of the app development. And, I’m very thankful to the company and my team mates for their valuable help and coordination.

When I started the development of the Q Weather application, I have been welcomed by a lot of technological choices. In order to develop a best performing application, every technological choice must be analyzed and finalized from the application’s point of view. It should be based on the perspective from the experience that should be delivered to the user on efficient and best possible way.

## Choose the battlefield

The day 1 started with the enumeration and comparison of different software development frameworks. At first, I have to choose one from cross platform technologies from **_Flutter, React Native_** or develop with native SDK for the platform**_._**

![](/images/2019-06-18-the-learning-curve-of-the-app-development-challenge/1*8a98UlYf36lX3_PR8yRFkQ.jpeg)

Flutter and React Native is good for developing cross platform projects, that consists of pages and navigations. The immensely popular React Native comes with the goodness of **_React framework_**, **_Redux_** for state management, and the scalability of **_Javascript_**. On the other hand, **_Flutter_** comes with a high performance rendering engine **_Skia_**, and **_Dart programming language_** is optimized for declarative UI development. Flutter has a wide collection of stateful and stateless widgets, that resembles the native counterparts.

Since the application has to deliver a lot of visual effects, I choose not to prefer React Native, because I will probably end up in writing plugins, thereby exposing myself to the native APIs. Flutter is a good choice at that time. It comes with a high performance rendering engine that ensures at least 60fps, is a good match. But I noticed the memory usage of Flutter is not that good, and sometimes Flutter bashed with “out of memory” errors. Later, I found that happened inside the framework, which I have no control over it. Also, both Flutter and React Native applications have their payload bundled to the app, so download size is larger than the native counterpart.

**_Finally, the decision was made — go with native development!_**

![](/images/2019-06-18-the-learning-curve-of-the-app-development-challenge/1*vb5Tgq-i3jgdUj6qHIFOpA.png)

## Choose the weapon

Android SDK came up with another choice of programming languages — whether I can use the shiny new Kotlin or prefer the traditional Java.

_I choose Kotlin simply because — **I love Kotlin!**_

![](/images/2019-06-18-the-learning-curve-of-the-app-development-challenge/1*YK5PLgDKciZ0J66Ilvb9wQ.png)

As the documentation says Kotlin is interoperable with Java, all of the Android APIs can be accessible from Kotlin also. The Kotlin standard library comes with a bunch of extension methods, that might be missing in Java or inaccessible due to `minApi` constraints. At first, it attracted me with type inference, null safety, expressiveness and convenience. The `kotlin-android-extensions` plugin automatically generates the delegates for binding views from XML to the code, that made me to forget the `findViewById` method entirely.

Later, I met the ultimate rockstar in Kotlin — the **_coroutines_**! I converted every blocking or asynchronous function to **_suspend functions_**, that looks and behaves exactly like normal functions, under a coroutine context. **_So, I can create multi-threaded application without bothering about threads!_** Basically, dispatchers of coroutines are thread pool executors, so I can achieve parallelism for an array of concurrent IO / networking operations, that made the operations like data synchronization faster than ever!

## Choose the strategy

Choosing a suitable architectural pattern is important for the present and future of any software project. The greatest minds in Google has engineered the pitfalls in existing Android SDK and API components, and they developed the Android Jetpack to solve them. Also, the architectural pattern has shifted from bare MVC to a combination of MVP and MVVM, and reduced the friction to a greater extent.

![](/images/2019-06-18-the-learning-curve-of-the-app-development-challenge/1*Ib0shjyBKuTK8TANmrprnw.png)

### LiveData and ViewModel

Architecture components loosely couples the underlying repository and the user interface. The data storage, manipulation and all business logic happens in the repository, and the changes will be made to reflect in the UI by the lifecycle aware streams called **_LiveData_**. The architecture components are powerful enough to mix and match different LiveData streams, like `map` and `switchMap` operators, MediatorLiveData and so on.

Survival of configuration changes were a nightmare for Android developers. Previously, a simple orientation change can reset the entire state of the activity, and drives them to do database query / REST API call again. Android activity consists of `onSaveInstanceState` and `onRestoreInstanceState`methods, but in most cases, that won’t help much. **_ViewModel_** solves this issue. It resides in the memory until the activity is completely destroyed. **_After the restart of the activity, ViewModel brings back the UI to the state where it left off._**

### Room Persistence Library

The another notable component is Room persistence library. Room is a SQLite backed data persistence library, that provides a solid structure for dealing with relational data store. In your application, Room brings DAOs (Data Access Objects) for querying, and storing data. Your SQL queries are validated during compile time and some code is generated to execute the query, read data and convert them to entity objects. Moreover, Room provides **_transactional database operations_**, that lets you combine multiple database operations to a single block. This has 2 advantages :- The observers will be notified only after successful transaction. If transaction fails, the database will be rolled back to its original state. Also, Room makes it easier for migrating database, when you push updates to your application.

The biggest advantage of using Jetpack components is they are very co-operative to each other. For example, Room library can query data in a worker thread and returns them as entity object collections. Instead of returning a data structure from the query method, you can modify it to return a LiveData, so the library itself manages to observe the data, and updates the UI accordingly if the data changes. **_This guarantees the data displayed in the UI is up to date with the backing store. That is a massive advantage!_**

### It’s all Kotlin.

Since the Kotlin is getting wildly popular among the Android developers, Google made the Jetpack library more Kotlin friendly. The bonus I got here is, I can write the SQL queries as suspend functions, so I can use them seamlessly in coroutines. That gives me the guarantee that the SQL queries will be executed in background thread, even if I call them in a main thread dispatcher. **_Hence, Kotlin Coroutines ensures that the main thread will NEVER blocked under any circumstances!_**

## Localization Challenge

![](/images/2019-06-18-the-learning-curve-of-the-app-development-challenge/1*C2DrcUDV5mEJ2uXZLn07Wg.jpeg)

The Arabic localization is a bit challenge for me, because this was my first application that I’m playing with bi-directional layouts and strings. According to the documentation, create another `strings.xml` file with exact keys and translated strings, and put it in another resource directory `values-ar`. Also, in layouts, make use `start` and `end` instead of `left` and `right` for ensuring the required layout for RTL languages.

What can I do for switching language directly from the application? Well, I have to build another context with different language configuration, and _recreate_ the activities. That drags me to the hell of most worst case — the state loss! The fragment manager also losses state, and begins from the home fragment. Total disaster.

The best and the fastest way of changing language is to replace all strings with the localized equivalent, and change the layout direction if necessary. This sounds awkward and heavy, but there is no way out. I simplified the approach by making use of architecture components.

In the application, there is a global singleton class that contains the configuration of the running app. Obviously, there is a `String locale` field. I refactored the field to `MutableLiveData<String>` and made the localization aware components observe to it. Whenever I want to switch the language, I just need to call `locale.postValue(langCode)`, the entire application flips without losing the state!

## Animations, animations and animations!

![](/images/2019-06-18-the-learning-curve-of-the-app-development-challenge/1*Op1OyFFZas3e_SgSqIfGpA.gif)

Animations poses crucial impact to the user experience. Q Weather app has some fine animations of cloud movement, rain, thunderstorm, snowfall and so on. I started with a custom view that draws rain drop particles based on physics and time. The clouds are images with alpha layers, are drawn using ImageViews. To move the cloud, I used `ViewPropertyAnimation` class and animated `translationX`property. But the result is, unfortunately, not came up to my expectation. The animation is too laggy, and even laggier during transition between weather states.

_The fact I learned is: Use a single view subclass for rendering all backstage animations. The `onDraw` method of the `View` class gives you a hardware accelerated canvas by default. Compute the positions of the elements and render them within the same canvas, and call `invalidate` after you finish drawing._

Please be careful not to perform memory allocations in `onDraw` or `onMeasure`methods. Because, `onDraw` and `onMeasure` methods are called frequently. The framework will call `onDraw` for rendering every frame, and `onMeasure` will be called during layout process. Hence, preallocate the required memory before layout and draw. Also, make use of primitive types instead of boxed types for performance, because boxed types are basically primitives wrapped in objects, boxing and unboxing operations will cost you performance penalties. If you are using Kotlin, be vary to use primitive array types such as `IntArray` or `FloatArray` instead of `Array<Int>` or `Array<Float>`.

## Wire up the navigation

Using fragment manager for navigation will be cumbersome when the project becomes bigger and more complex. Thanks to the navigation library, that brings iOS storyboards to Android! When you got a bunch of fragments, you can place them in the navigation storyboard, and wire up routes to create transitions between fragments. Also, it supports type-safe arguments to send them along with the route traversal, that makes the code less error prone.

## Deploy!

With a sudden spark of excitement, I got the command from the company — **“deploy the app to Google Play!”**. Instantly, I made a release build from Android Studio, and it has a size of 29 MB. That seems to be oversized a little bit.

I started digging deeper on better deployment practices, and I found these four techniques can reduce the size of the app:

-   Remove unused resources
-   Convert raster images to WebP (with Android Studio)
-   `minifyEnabled true`
-   Android app bundling and Dynamic delivery

Finally, the size of the app got reduced to **_5–7 MB_** range, depending upon the screen density. However, I choose not to split the string resources by language, because the app requires to change the language by the user. The ~7MB size is unbelievable, and installs within seconds!

---

## Give it a try!

Q Weather is available in Google Play and App Store for free. Here comes the link, you can try it out today.

App Store Link — [https://toappsto.re/qweather](https://toappsto.re/qweather)

Google Play Store — [https://play.google.com/store/apps/details?id=qa.applab.qweather](https://play.google.com/store/apps/details?id=qa.applab.qweather)

Peace ✌️