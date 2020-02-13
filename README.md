# frontend_develop_environment

## command

``` terminal
npm install

// start dev server and watch pug/css/js
npm run start

// mode development
npm run dev

// mode production
npm run build
```

## develop

- webpackでbundle
    - ES6(@babel/polyfill(async/await対応))
    - Sass
    - autoprefixerを自動生成
    - productionモードでcss/jsファイル圧縮
    - imageファイル圧縮
    - WebFont対応(woff/eot/ttf/svg)
    - media対応(mp4/webm/ogg)
    - jQueryに依存したライブラリに対応
- npm scriptsでタスクランナー
- jQuery
- Bootstrap
- font「NotoSansJP」設定
- fontawesomeのcssをnode_modulesで管理
- pugでHTMLコーディング
    - _include
    - index.pug
    - buildすると`_include`を削除
- cssファイル(smacss設計)
    - base
    - function
    - layout
    - mixin
    - module
    - responsive
    - state
    - variable
    - animation
    - font
- Lint
    - ESLint
    - StyleLint
    
## reference
- [stylelint.config.js](https://gist.github.com/buchiya4th/f4ca1be2ab98ee5a8098fa68a93e752c)
