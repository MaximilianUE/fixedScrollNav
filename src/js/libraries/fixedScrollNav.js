import smoothscroll from "smoothscroll-polyfill";

class FixedScrollNav {
  constructor() {
    smoothscroll.polyfill(); //init polyfill

    //check if fixedScrollNav is needed in first place
    let isUsed = document.querySelector(".fixedScrollNav__container");
    if (isUsed) {
      this._detectScroll();

      this._init__goToPreviousSection();
      this._init__goToNextSection();

      this._toggleButtons();
    }

    //create namespace
    let DiverentTools = DiverentTools || {};
    DiverentTools.fixedScrollNav = this;
    //set scope to window
    window.DiverentTools = DiverentTools;
  }

  /**
   * finds active scrollSection and returns its index
   **/
  get currentSection_index() {
    let sections = document.querySelectorAll("[data-fixedScrollNav-section]");

    let activeSection_index = [...sections].findIndex(section => {
      let sectionTop = section.getBoundingClientRect().top;
      sectionTop = sectionTop - 1; //remove one pixel from detection range to ensure the correct section gets chosen
      let sectionHeight = section.getBoundingClientRect().height;

      if (
        sectionTop <= 0 && //---> within screen (top)
        sectionTop > -Math.abs(sectionHeight) //---> within screen (bottom)
      ) {
        return true;
      }
      return false;
    });
    return activeSection_index;
  }

  /** init button .fixedScrollNav__button--previous
   * add eventlistener [ will run scrollToPreviousSection() ]
   * add a11y features (accessibility)
   **/

  /**
   * add eventlisten for scrolling (manually or automatically) to _toggleButtons()
   **/
  _detectScroll() {
    //add eventlisten
    document.addEventListener("scroll", e => {
      this._toggleButtons();
    });
  }

  /**
   * check if first or last section are in focus and toggle buttons accordingly
   **/
  _toggleButtons() {
    let activeSection_index = this.currentSection_index;
    const scrollPreviousButton = document.querySelector(
      ".fixedScrollNav__button--previous"
    );
    const scrollNextButton = document.querySelector(
      ".fixedScrollNav__button--next"
    );

    let sections = document.querySelectorAll("[data-fixedScrollNav-section]");
    sections = [...sections];

    // scrollPreviousButton
    if (activeSection_index == 0) {
      scrollPreviousButton.classList.add("hide");
    } else {
      scrollPreviousButton.classList.remove("hide");
    }

    // scrollNextButton
    let amountOfSections = sections.length - 1;
    if (
      activeSection_index == amountOfSections || //last section is active
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight //document is at the bottom
    ) {
      scrollNextButton.classList.add("hide");
    } else {
      scrollNextButton.classList.remove("hide");
    }
  }

  scrollToPreviousSection() {
    let activeSection_index = this.currentSection_index;

    if (activeSection_index !== -1) {
      let sections = document.querySelectorAll("[data-fixedScrollNav-section]");
      sections = [...sections];

      let activeSection = sections[activeSection_index];
      let activeSectionTop = activeSection.getBoundingClientRect().top;

      if (activeSectionTop < -1) {
        //check if active section is NOT already at its beginning

        activeSection.scrollIntoView({
          //scroll to active sections beginning
          block: "start",
          behavior: "smooth"
        });
      } else {
        let previousSection = sections[activeSection_index - 1]; //active section - 1 = previous section
        if (previousSection) {
          previousSection.scrollIntoView({
            block: "start",
            behavior: "smooth"
          });
        }
      }
    }
  }

  /**
   * scrolls to next section if it exists
   **/
  scrollToNextSection() {
    let activeSection_index = this.currentSection_index;

    if (activeSection_index !== -1) {
      let sections = document.querySelectorAll("[data-fixedScrollNav-section]");
      sections = [...sections];

      let nextSection = sections[activeSection_index + 1]; //active section + 1 = next section

      if (nextSection) {
        nextSection.scrollIntoView({
          block: "start",
          behavior: "smooth"
        });
      }
    }
  }

  _init__goToPreviousSection() {
    const scrollPreviousButton = document.querySelector(
      ".fixedScrollNav__button--previous"
    );
    scrollPreviousButton.tabIndex = "0";
    scrollPreviousButton.setAttribute("role", "button");

    scrollPreviousButton.addEventListener("click", () => {
      this.scrollToPreviousSection();
    });
    scrollPreviousButton.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        this.scrollToPreviousSection();
      }
    });
  }

  /** init button .fixedScrollNav__button--next
   * ---------------------------------------------
   * add eventlistener [ will run scrollToNextSection() ]
   * add a11y features (accessibility)
   **/
  _init__goToNextSection() {
    const scrollNextButton = document.querySelector(
      ".fixedScrollNav__button--next"
    );
    scrollNextButton.tabIndex = "0";
    scrollNextButton.setAttribute("role", "button");

    scrollNextButton.addEventListener("click", () => {
      this.scrollToNextSection();
    });
    scrollNextButton.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        this.scrollToNextSection();
      }
    });
  }
}

//export module
export default FixedScrollNav;
