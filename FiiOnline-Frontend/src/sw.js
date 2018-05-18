importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');
workbox.precaching.precacheAndRoute([
  {
    "url": "app/app.component.html",
    "revision": "e6e5d8a6f8dbe48a7e0ca08fe3921443"
  },
  {
    "url": "app/app.component.scss",
    "revision": "f1fbaafe827da06a5a127b9608eab4bd"
  },
  {
    "url": "app/app.component.spec.ts",
    "revision": "1faabf002dc71946ef05d838692bfeb8"
  },
  {
    "url": "app/app.component.ts",
    "revision": "797a28fe7874a51cdbc4d35643c6bde6"
  },
  {
    "url": "app/app.module.ts",
    "revision": "139b280a74de3bc22c2597bfbd02e019"
  },
  {
    "url": "app/components/admin/upload-course/edit-course.component.ts",
    "revision": "8c9bc674ffae58d1e02636f9038d8868"
  },
  {
    "url": "app/components/admin/upload-course/upload-course.component.html",
    "revision": "11264d18e4408bfd2cfdab3f97423864"
  },
  {
    "url": "app/components/admin/upload-course/upload-course.component.scss",
    "revision": "aa98f5b2adff28d0f864173bea0d22d0"
  },
  {
    "url": "app/components/admin/upload-course/upload-course.component.spec.ts",
    "revision": "8d583d45479c793f81304889dd4b9747"
  },
  {
    "url": "app/components/admin/upload-course/upload-course.component.ts",
    "revision": "77c67bdb8ba14b287d5404065bf300d4"
  },
  {
    "url": "app/components/common/account-confirmation/account-confirmation.component.html",
    "revision": "f5e73634e96d70b9e2b55d34ea13f91c"
  },
  {
    "url": "app/components/common/account-confirmation/account-confirmation.component.scss",
    "revision": "4c3575e080fab430a9d44a72ccd3bcf1"
  },
  {
    "url": "app/components/common/account-confirmation/account-confirmation.component.spec.ts",
    "revision": "ba94e40cd717313223c97e8989fd2e8e"
  },
  {
    "url": "app/components/common/account-confirmation/account-confirmation.component.ts",
    "revision": "21d23d1cfbd351505fceec6f92357e30"
  },
  {
    "url": "app/components/common/courses-list/courses-list.component.html",
    "revision": "11972061124a29b9ade582455f9a2979"
  },
  {
    "url": "app/components/common/courses-list/courses-list.component.scss",
    "revision": "d42ebaff4f959e854c49cca2bfa4ad99"
  },
  {
    "url": "app/components/common/courses-list/courses-list.component.spec.ts",
    "revision": "faefba7dbf345de49754ce9ab9cc2130"
  },
  {
    "url": "app/components/common/courses-list/courses-list.component.ts",
    "revision": "18133f3af83add47b33c40169df5f6bd"
  },
  {
    "url": "app/components/common/courses-menu/courses-menu.component.html",
    "revision": "963737596a9247e2eabdb827f6f45769"
  },
  {
    "url": "app/components/common/courses-menu/courses-menu.component.scss",
    "revision": "1180c9ff22417724fd2c7dbf87ce0faa"
  },
  {
    "url": "app/components/common/courses-menu/courses-menu.component.spec.ts",
    "revision": "bebabd7ff10b7c322a218a644fada86b"
  },
  {
    "url": "app/components/common/courses-menu/courses-menu.component.ts",
    "revision": "e533f83117aa57bf3a3a3f8e3d6f5753"
  },
  {
    "url": "app/components/common/forgot-password/forgot-password.component.html",
    "revision": "70d6b3e73b17d485429eacbd676a68c8"
  },
  {
    "url": "app/components/common/forgot-password/forgot-password.component.scss",
    "revision": "f717cc27b659774a03498fb21765ebe0"
  },
  {
    "url": "app/components/common/forgot-password/forgot-password.component.spec.ts",
    "revision": "779fe904a8b8ea872fc5233caf37ccd1"
  },
  {
    "url": "app/components/common/forgot-password/forgot-password.component.ts",
    "revision": "bef4203bf25a02460dabb6deed3d8207"
  },
  {
    "url": "app/components/common/lesson-generic/lesson-generic.component.html",
    "revision": "69ff1784d956a51111a5b7e7836dbab2"
  },
  {
    "url": "app/components/common/lesson-generic/lesson-generic.component.scss",
    "revision": "454ebd280f1f1f6f1f4abc42354ac1a1"
  },
  {
    "url": "app/components/common/lesson-generic/lesson-generic.component.spec.ts",
    "revision": "344143bcc0d5a6ef45f8e9278c8e875c"
  },
  {
    "url": "app/components/common/lesson-generic/lesson-generic.component.ts",
    "revision": "b80a033ca036f7a7afcb5c90e3ca0c6b"
  },
  {
    "url": "app/components/common/lessons-list/lessons-list.component.html",
    "revision": "a56c1242c422d9e861300b1afd023860"
  },
  {
    "url": "app/components/common/lessons-list/lessons-list.component.scss",
    "revision": "6d4490baf44894d023e40ef5a3e61c95"
  },
  {
    "url": "app/components/common/lessons-list/lessons-list.component.spec.ts",
    "revision": "71e384651d3d229eecbae1163171cfc9"
  },
  {
    "url": "app/components/common/lessons-list/lessons-list.component.ts",
    "revision": "1bfe4efd21439bb5a37d8da951a76001"
  },
  {
    "url": "app/components/common/login/login.component.html",
    "revision": "10ff810d1e983cacd9f0cd7b301cbc5b"
  },
  {
    "url": "app/components/common/login/login.component.scss",
    "revision": "1625c013dbe710309a0427c4c9281278"
  },
  {
    "url": "app/components/common/login/login.component.spec.ts",
    "revision": "f6a61a4cb764b3162f167f6635872162"
  },
  {
    "url": "app/components/common/login/login.component.ts",
    "revision": "ba8bd8bf2f58c7586a9bbac6fc7347ed"
  },
  {
    "url": "app/components/common/material-generic/material-generic.component.html",
    "revision": "f1e1b444147f6edf3050ccf6552179bd"
  },
  {
    "url": "app/components/common/material-generic/material-generic.component.scss",
    "revision": "3f7deba2c3ec86d40c541e577e43fb55"
  },
  {
    "url": "app/components/common/material-generic/material-generic.component.spec.ts",
    "revision": "bdbd8bd3d83f222ee79804b5a4bac577"
  },
  {
    "url": "app/components/common/material-generic/material-generic.component.ts",
    "revision": "7209472ab1622057cc46da43a5fa8183"
  },
  {
    "url": "app/components/common/post/post.component.html",
    "revision": "934903007e78f0b312f01ac973b5443d"
  },
  {
    "url": "app/components/common/post/post.component.scss",
    "revision": "33fc7ec1b586b8c3648b65205b3488d9"
  },
  {
    "url": "app/components/common/post/post.component.spec.ts",
    "revision": "a0cd154a6aa799fe6fd93a99b7a98c0d"
  },
  {
    "url": "app/components/common/post/post.component.ts",
    "revision": "95083b21f46a513eb9c32f9b437e95bf"
  },
  {
    "url": "app/components/common/posts-list/posts-list.component.html",
    "revision": "dd584aa7cd467eaabdaf06b70bfd9cd7"
  },
  {
    "url": "app/components/common/posts-list/posts-list.component.scss",
    "revision": "25abc6c80c0c9fd0a5aff9f9e0157f0d"
  },
  {
    "url": "app/components/common/posts-list/posts-list.component.spec.ts",
    "revision": "0ab5393e6b7a772e858c613770f02392"
  },
  {
    "url": "app/components/common/posts-list/posts-list.component.ts",
    "revision": "dc8351403ad776af319211262eff4c4c"
  },
  {
    "url": "app/components/common/reset-password/reset-password.component.html",
    "revision": "ec2c023ec66045dad65e29071a5726e8"
  },
  {
    "url": "app/components/common/reset-password/reset-password.component.scss",
    "revision": "867de210fda1ccca9a604a2c8326b2cb"
  },
  {
    "url": "app/components/common/reset-password/reset-password.component.spec.ts",
    "revision": "1218c88195bc4cc813d2da1f876e06ec"
  },
  {
    "url": "app/components/common/reset-password/reset-password.component.ts",
    "revision": "47de033ae98181a23375b6fe5b539478"
  },
  {
    "url": "app/components/common/sidebar/sidebar.component.html",
    "revision": "d868d6d0d1138129d85f272da041553f"
  },
  {
    "url": "app/components/common/sidebar/sidebar.component.scss",
    "revision": "5b93699fa4b795ddbcae66dc260c1495"
  },
  {
    "url": "app/components/common/sidebar/sidebar.component.spec.ts",
    "revision": "c489abf975034204799b70ca800f1c9c"
  },
  {
    "url": "app/components/common/sidebar/sidebar.component.ts",
    "revision": "c3fad620e1a40a00388e23307ecb1034"
  },
  {
    "url": "app/components/common/user-register/user-register.component.html",
    "revision": "00b41e93b192d9fc1c66dc98e13deca0"
  },
  {
    "url": "app/components/common/user-register/user-register.component.scss",
    "revision": "5b669989f706e0f919de916e079a6119"
  },
  {
    "url": "app/components/common/user-register/user-register.component.spec.ts",
    "revision": "dde126dd85033b925b21985a8f5f9b36"
  },
  {
    "url": "app/components/common/user-register/user-register.component.ts",
    "revision": "fb9a422304a023448abf411094d376f1"
  },
  {
    "url": "app/components/common/Wrappers/mytab.component.ts",
    "revision": "86aac694247ad7da40cd68fa7cf3653d"
  },
  {
    "url": "app/components/professor/followers-list/followers-list.component.html",
    "revision": "4f7fba9bd43c16384d241be525e6b168"
  },
  {
    "url": "app/components/professor/followers-list/followers-list.component.scss",
    "revision": "3bbfe73e5cae5684842174018f05456f"
  },
  {
    "url": "app/components/professor/followers-list/followers-list.component.spec.ts",
    "revision": "b3bf0bbc4d616672c05a518ef672a449"
  },
  {
    "url": "app/components/professor/followers-list/followers-list.component.ts",
    "revision": "44088964080ac2da078a5bb491f79009"
  },
  {
    "url": "app/components/professor/upload-lesson/upload-lesson.component.html",
    "revision": "2fe6c38f880a697aee246dbdb2bf03b5"
  },
  {
    "url": "app/components/professor/upload-lesson/upload-lesson.component.scss",
    "revision": "8e2fcb1eccf314c1cd50d090b31a242a"
  },
  {
    "url": "app/components/professor/upload-lesson/upload-lesson.component.spec.ts",
    "revision": "3fb643b979fbbba14bd5d4e15130b85d"
  },
  {
    "url": "app/components/professor/upload-lesson/upload-lesson.component.ts",
    "revision": "9efa9851da3f2618ad5ef9302b74dbb0"
  },
  {
    "url": "app/components/professor/week/week.component.html",
    "revision": "7ac3a3c3ce01328a9e8266d56c696911"
  },
  {
    "url": "app/components/professor/week/week.component.scss",
    "revision": "59269191188423bebca96ada85a1ca94"
  },
  {
    "url": "app/components/professor/week/week.component.spec.ts",
    "revision": "840198230a0931fc282a3f1f82b14522"
  },
  {
    "url": "app/components/professor/week/week.component.ts",
    "revision": "497044059cf5bf1db6859a045d7c3a9b"
  },
  {
    "url": "app/models/changepassword.ts",
    "revision": "6d6354bca3080f0fc567c56bdee6f316"
  },
  {
    "url": "app/models/coursemodel.ts",
    "revision": "aefe9c71930c24fd43a004c423389285"
  },
  {
    "url": "app/models/credentials.ts",
    "revision": "7b0937259d762bff0fd9b2edf137b5ff"
  },
  {
    "url": "app/models/lessonmodel.ts",
    "revision": "7ee96b6b3d6db093c5ed1e9525a9ada9"
  },
  {
    "url": "app/models/postmodel.ts",
    "revision": "87183152ddad9f132475013eb09a1dc9"
  },
  {
    "url": "app/models/usermodel.ts",
    "revision": "31a67963b4454abfe963ceb9d0005378"
  },
  {
    "url": "app/models/weekmodel.ts",
    "revision": "fa08497358b9f6cbaa3c4f1a359b8e75"
  },
  {
    "url": "app/routing/app-routing.module.ts",
    "revision": "e834713bd20fbe5de2520f37912556c6"
  },
  {
    "url": "app/services/authentication.service.ts",
    "revision": "384f8bb3db5243003d57dc15aa24cddb"
  },
  {
    "url": "app/services/data.service.ts",
    "revision": "f323940d177fa12d074536e02a19268f"
  },
  {
    "url": "app/services/guards.service.ts",
    "revision": "187855720ed294c45b09f56bdd4a22aa"
  },
  {
    "url": "assets/img/Blueprint_Background.jpg",
    "revision": "60cf5bbca88b89b5473588cf02b5ee40"
  },
  {
    "url": "assets/img/BUILDING_LEFT.svg",
    "revision": "2bdae1d9f8c37d74e76895268668fec7"
  },
  {
    "url": "assets/img/BUILDING_RIGHT.svg",
    "revision": "d67434e20a8d8eb3521250bd0e588c12"
  },
  {
    "url": "assets/img/cladire_path.svg",
    "revision": "48cb3cdfb96e2d32da224ac60616a579"
  },
  {
    "url": "assets/img/fii.png",
    "revision": "0c55967caf01d8ff18e2a9e454e0b868"
  },
  {
    "url": "assets/img/logo_complet.png",
    "revision": "dc1caa8e10335a0b0d9d551cc04f8b31"
  },
  {
    "url": "assets/img/LOGO_FII_LIGHT.png",
    "revision": "099520d948a93b6c16bca51667d4b1f9"
  },
  {
    "url": "assets/img/logo_online.png",
    "revision": "085d1b168c41debb26777a808cc3ec61"
  },
  {
    "url": "assets/manifest/images/icons/icon-128x128.png",
    "revision": "e5e017339874d39172b57778005212ba"
  },
  {
    "url": "assets/manifest/images/icons/icon-144x144.png",
    "revision": "f1c53559bf6a59660cd6f1d98b7eb201"
  },
  {
    "url": "assets/manifest/images/icons/icon-152x152.png",
    "revision": "a45620954da3c66d0cc9e4ea46be2bcf"
  },
  {
    "url": "assets/manifest/images/icons/icon-192x192.png",
    "revision": "0653abead83eac45439aac862ae86bd9"
  },
  {
    "url": "assets/manifest/images/icons/icon-384x384.png",
    "revision": "f0fedbe3358621526005b57812dac023"
  },
  {
    "url": "assets/manifest/images/icons/icon-512x512.png",
    "revision": "f0fedbe3358621526005b57812dac023"
  },
  {
    "url": "assets/manifest/images/icons/icon-72x72.png",
    "revision": "8a10c2a8b667a7ef89add2cc55f3f11b"
  },
  {
    "url": "assets/manifest/images/icons/icon-96x96.png",
    "revision": "58b065bdc866f754b1a04987ad99d188"
  },
  {
    "url": "environments/environment.prod.ts",
    "revision": "b57156867b91845b1b4115a664e21b58"
  },
  {
    "url": "environments/environment.ts",
    "revision": "a1e9f1ef63cedb48ff301abfd7bb77d4"
  },
  {
    "url": "favicon.ico",
    "revision": "b9aa7c338693424aae99599bec875b5f"
  },
  {
    "url": "index.html",
    "revision": "0c1d6ee484350c466598754414823bae"
  },
  {
    "url": "main.ts",
    "revision": "067b7f93be4fcbf21789dfadd4f11f28"
  },
  {
    "url": "manifest.json",
    "revision": "bba1299e71f7d36b1f8b909356416e20"
  },
  {
    "url": "polyfills.ts",
    "revision": "4ec0004839b38f28268637a5bf0a4209"
  },
  {
    "url": "styles.scss",
    "revision": "da5a7f81b88087c4739586e60a142f4d"
  },
  {
    "url": "test.ts",
    "revision": "3ddc24a1929f2cfe1b835548aaaa54f3"
  },
  {
    "url": "tsconfig.app.json",
    "revision": "e451b2604ea0f3a057f16da3107da11c"
  },
  {
    "url": "tsconfig.spec.json",
    "revision": "31e6fd066bc52e228ab10003d8bea375"
  },
  {
    "url": "typings.d.ts",
    "revision": "dec45b6ead5c1deed3d6de0bb5ec4fcc"
  }
]);

workbox.routing.registerRoute(new RegExp('http://localhost:63944/'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(new RegExp('.+\.html$'), workbox.strategies.cacheFirst({
  cacheName: 'htmls-cache'
}));

// workbox.precache(['src/app/components/common/login/login.component.html']);
