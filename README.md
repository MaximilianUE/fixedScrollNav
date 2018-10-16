# ↕️ fixedScrollNav
fixed scroll navigation that allows users to navigate between sections with simple and intuitive arrow buttons.
Oh and it will work in all browsers 😉💻
(Chrome, Safari, Edge, Firefox and IE11)


## ✨ Feature List:
* Vanilla ES6 Solution
* simple and intuitive
* flexable (can be used everywhere)
* smooth scrolling automatically gets polyfilled **only if needed**
* can be controled via keyboard (A11y ready)

## 🏗️ Setup

using yarn (recommended)  
`yarn add fixedScrollNav`

using npm  
`npm install fixedScrollNav`


## 👩‍💻 usage

### HTML
use `data-fixedScrollNav-section` to indicate which sections to scroll to.

```html
<section data-fixedScrollNav-section>
	[...]
</section>
<section data-fixedScrollNav-section>
	[...]
</section>
```

add the fixed navigation to your document (best at top/end)
```html
<div class="fixedScrollNav__container">
	<div class="fixedScrollNav__button fixedScrollNav__button--previous" title="go to previous section"></div>
	<div class="fixedScrollNav__button fixedScrollNav__button--next" title="go to next section"></div>
</div>
```

### JS
```js
import fixedScrollNav from 'fixedScrollNav';

fixedScrollNav.init(); //Initialize fixedScrollNav
```

### CSS
```css
@import '~fixedScrollNav/src/styles';
```


made with ♥️ by [Diverent2](https://twitter.com/diverent2)
