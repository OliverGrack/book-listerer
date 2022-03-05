# This is a project help you build userscript with webpack

Just [use this git repo as a template](https://github.com/Trim21/webpack-userscript-template/generate).

## **How does it work?**
This project is written in TypeScript, which is compiled to JavaScript. Using WebPack, all TypeScript
imports are concatinated into one large `.user.js` [UserScript](https://openuserjs.org/about/Userscript-Beginners-HOWTO) file, which is compatible with Tampermonkey. WebPack 
uses a plugin (`userscript-metadata-webpack-plugin`) to add a UserScript header 
(`// ==UserScript==`) to the top of the file. WebPack creates two versions in the `./build` folder: 
`dev.user.js` and `prod.user.js`. The main difference between these files is that the `dev.user.js`
file references the `prod.user.js` file in the `@require` tag using a `file://..` reference.

The `prod.user.js` file contains all the logic and gets recompiled every time a file is saved. 
Because Tampermonkey fetches the `prod.user.js` on each page load, the changes are directly visible 
in the browser after a refresh of the page. Please keep in mind that this only works in 
**Chrome**. Accessing local files through extensions using `file://..` is 
[not allowed](https://bugzilla.mozilla.org/show_bug.cgi?id=1266960) in FireFox. Unfortunately, 
this means that developing this script is only possible using Chrome (or any other browser that
allows local file access). Alternatives may be setting up a localhost static file server, but this 
introduces other difficulties. Please consider using Chrome before going this route.

When publishing this script for production, just copy the contents of the `prod.user.js` file to 
Tampermonkey. The `@require` tag to access local files is not included in the production version, 
because all the necessary code is included in the production file.
</br>
</br>
<hr>

## dev

1. Allow Tampermonkey's access to local file URIs [tampermonkey/faq](https://tampermonkey.net/faq.php?ext=dhdg#Q204)
2. install deps with `npm i` or `npm ci`.
3. `npm run dev` to start your development.
4. open `webpack-userscript-template/dist/index.dev.user.js` in your Chrome and install it with your userscript manager.

this userscript's meta contains `// @require file://path/to/dist/index.prod.user.js`,
it will run the code in `index.prod.user.js`,
which take [src/js/index.ts](./src/js/index.ts) as entry point.

every times you edit your metadata, you'll have to install it again,
because Tampermonkey don't read it from dist every times.

5. edit [src/js/index.ts](./src/js/index.ts) with es6, you can even import css or less files. You can use scss if you like.
6. go wo <https://www.example.com/> and open console, you'll see it's working.

livereload is default enabled, use [this chrome extension](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei)

## TypeScript

use typescript as normal, see [example](src/js/example.ts)

## dependencies

There are two ways to using a package on npm.

### UserScript way

like original UserScript way, you will need to add them to your [user script metadata's require section](./config/metadata.js#L13-L17) , and exclude them in [config/webpack.config.base.js](./config/webpack.config.base.js#L21-L25)

### Webpack way

just install a package and import it in your js file. webpack will pack them with in your final production js file.

## build

```bash
npm run build
```

`dist/index.prod.user.js` is the finally script. you can manually copy it to greaskfork for deploy.

## auto deploy

[github actions](./.github/workflows/deploy.yaml#L36) will deploy production userscript to gh-pages branch.

[example](https://github.com/Trim21/webpack-userscript-template/tree/gh-pages)

[deployed](https://trim21.github.io/webpack-userscript-template/)

You can auto use greskfork's auto update function.
