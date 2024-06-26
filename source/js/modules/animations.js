export default () => {

  document.addEventListener(`DOMContentLoaded`, function () {

    const body = document.querySelector(`.js-body`);
    body.classList.add(`loaded`);

    // title animation
    class SplitText {
      constructor(
          elementSelector
      ) {
        this._elementSelector = elementSelector;
        this._element = document.querySelector(this._elementSelector);
        this.prePareText();
      }

      createElement(letter) {
        const span = document.createElement(`span`);
        span.textContent = letter;
        return span;
      }

      prePareText() {
        if (!this._element) {
          return;
        }
        const text = this._element.textContent.trim().split(` `).filter((line) => line !== ``);

        const content = text.reduce((fragmentParent, word) => {
          const wordElement = Array.from(word).reduce((fragment, line) => {
            fragment.appendChild(this.createElement(line));
            return fragment;
          }, document.createDocumentFragment());
          const wordContainer = document.createElement(`span`);
          wordContainer.classList.add(`split__words`);
          wordContainer.appendChild(wordElement);
          fragmentParent.appendChild(wordContainer);
          return fragmentParent;
        }, document.createDocumentFragment());

        this._element.innerHTML = ``;
        this._element.appendChild(content);
      }

    }

    const targetsForSplit = [
      `.intro__title`,
      `.intro__date`,
      `.slider__item-title`,
      `.prizes__title`,
      `.rules__title`,
      `.game__title`,
    ];

    for (let target of targetsForSplit) {
      new SplitText(target);
    }

    // overlap
    const overlap = document.querySelector(`.overlap`);
    const prizesLink = document.querySelector(`[data-href="prizes"]`);

    function addOverlap(link) {
      link.addEventListener(`click`, (event) => {
        event.preventDefault();
        overlap.classList.add(`overlap--show`);
        setTimeout(() => {
          onAnimationComplete(link);
          overlap.classList.remove(`overlap--show`);
        }, 600);
      });
    }

    addOverlap(prizesLink);

    function onAnimationComplete(link) {
      window.location = link.href;
    }

    // footnote
    const rulesLink = document.querySelector(`[data-href="rules"]`);
    const prizeFootnote = document.querySelector(`.screen--prizes .screen__footer-note`);

    function transitionFootnote(link) {
      rulesLink.addEventListener(`click`, (event) => {
        event.preventDefault();
        prizeFootnote.classList.add(`fadeOut`);
        setTimeout(() => {
          onAnimationComplete(link);
          prizeFootnote.classList.remove(`fadeOut`);
        }, 500);
      });
    }

    transitionFootnote(rulesLink);

  });

};
