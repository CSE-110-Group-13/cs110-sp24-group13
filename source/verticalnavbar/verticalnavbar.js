class VerticalNavbar extends HTMLElement {
  constructor() {
    super();

    // Create a shadow dom, access it with this.shadowRoot
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // Link to Stylesheet
    const styles = document.createElement("style");
    styles.innerHTML = `
      #verticalNavbar {
        height: 100vh;
        width: 10vw;
        background-color: #F8F8F8;
        transition: transform 0.5s ease-in-out;
        transform: translateX(0vw);
        box-shadow: 0.1em 0em .5em rgba(0, 0, 0, 0.15); 
        border-top-right-radius: 0.8em;
        border-bottom-right-radius: 0.8em;
      }

      #verticalNavbar.close {
        transform: translateX(-6.5vw); 
      }

      #verticalNavbar.close a svg {
        visibility: hidden;
        transform: translateX(-2vw);
        transition: visibility 0.5s linear, transform 0.5s linear;
      }

      #verticalNavbar.close a span {
        visibility: hidden;
        transform: translateX(-2vw);
        transition: visibility 0.5s linear, transform 0.5s linear;
      }
      
      nav {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: 100%;
        /* gap: 3em; */
        gap: 6vh;
        /* padding-top: 1.5em; */
        padding-top: 3vh;
        margin: 0;
      }
      
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        /* gap: 0.3em; */
        gap: 0.6vh;
        font-family: 'Varela Round', sans-serif;
      }
      
      a svg {
        /* width: 2em; */
        width: 5vw;
        max-width: 2em; 
        /* height: auto; */
        height: 4vh;
        max-height: 2em;

      }
      
      a span {
        color: #000;
        /* font-size: 1em; */
        font-size: min(min(1em, 1.5vw), min(1em, 1.5vh));
        font-family: 'Varela Round';
      }
      
      #anchorToSettings {
        /* padding-top: 7em; */
        padding-top: 14vh;
      }

      #toggleButtonContainer {
        display: flex;
        width: 100%;
        justify-content: flex-end;
      }

      #toggleButton {
        width: 100%;
        text-align: right;
        cursor: pointer;
        color: #7C7C7C;
        font-weight: bold;
        /* font-size: 2em; */
        font-size: 4vh;
        padding: 0;
        margin: 0;
        /* padding-right: 0.45em; */
        padding-right: 0.8vw;
        border: none;
        background: none;
        box-sizing: border-box;
        transition: left 0.5s ease-in-out;
      }

      #toggleButton svg {
        /* width: 0.5em; */
        width: 2vw;
        max-width: 0.5em;
        /* height: auto; */
        height: 2.5vh;
        max-height: 2em;
      }
    `;

    // Attach element to shadow dom
    const navbarContainer = document.createElement("div");
    navbarContainer.id = "verticalNavbar";
    this.shadowRoot.appendChild(navbarContainer);

    // Create nav element to contain anchors to other pages
    const navbar = document.createElement("nav");
    navbarContainer.appendChild(navbar);

    // Create toggle button
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleButton";
    // toggleButton.textContent = "<";
    toggleButton.innerHTML = `<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M0.34363 6.98486L6.98426 0.344238C7.44324 -0.114746 8.18543 -0.114746 8.63953 0.344238L9.74304 1.44775C10.202 1.90674 10.202 2.64893 9.74304 3.10303L5.0409 7.81494L9.74793 12.522C10.2069 12.981 10.2069 13.7231 9.74793 14.1772L8.64441 15.2856C8.18543 15.7446 7.44324 15.7446 6.98914 15.2856L0.348513 8.64502C-0.115354 8.18604 -0.115354 7.44385 0.34363 6.98486Z" fill="black"/></svg>`;

    // Add event listener to open and close navbar
    toggleButton.addEventListener("click", () => {
      navbarContainer.classList.toggle("close");

      // update symbol and position
      if (navbarContainer.classList.contains("close")) {
        toggleButton.innerHTML = `<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.74865 6.98486L3.10803 0.344238C2.64905 -0.114746 1.90686 -0.114746 1.45276 0.344238L0.349241 1.44775C-0.109744 1.90674 -0.109744 2.64893 0.349241 3.10303L5.05139 7.81494L0.344358 12.522C-0.114627 12.981 -0.114627 13.7231 0.344358 14.1772L1.44787 15.2856C1.90686 15.7446 2.64905 15.7446 3.10315 15.2856L9.74377 8.64502C10.2076 8.18604 10.2076 7.44385 9.74865 6.98486Z" fill="black"/></svg>`;
        // toggleButton.textContent = ">";
        // toggleButton.style.left = "0%";
      } else {
        toggleButton.innerHTML = `<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M0.34363 6.98486L6.98426 0.344238C7.44324 -0.114746 8.18543 -0.114746 8.63953 0.344238L9.74304 1.44775C10.202 1.90674 10.202 2.64893 9.74304 3.10303L5.0409 7.81494L9.74793 12.522C10.2069 12.981 10.2069 13.7231 9.74793 14.1772L8.64441 15.2856C8.18543 15.7446 7.44324 15.7446 6.98914 15.2856L0.348513 8.64502C-0.115354 8.18604 -0.115354 7.44385 0.34363 6.98486Z" fill="black"/></svg>`;
        // toggleButton.textContent = "<";
        // toggleButton.style.left = "18%";
      }
    });
    // Append toggle button to navbar
    navbar.appendChild(toggleButton);

    // Create anchor elements
    const anchorToHome = document.createElement("a");
    anchorToHome.id = "anchorToHome";
    const anchorToFavorites = document.createElement("a");
    anchorToFavorites.id = "anchorToFavorites";
    const anchorToLibrary = document.createElement("a");
    anchorToLibrary.id = "anchorToLibrary";
    const anchorToCalendar = document.createElement("a");
    anchorToCalendar.id = "anchorToCalendar";
    const anchorToProjectList = document.createElement("a");
    anchorToProjectList.id = "anchorToProjectList";
    const anchorToSettings = document.createElement("a");
    anchorToSettings.id = "anchorToSettings";

    // Add href property to anchors
    anchorToHome.href = "../homepage/index.html";
    anchorToFavorites.href = "../favorites/favorites.html";
    anchorToLibrary.href = "../library/library.html";
    anchorToCalendar.href = "../calendar/calendar.html";
    anchorToProjectList.href = "../projectlist/projectlist.html";
    anchorToSettings.href = "../settings/settings.html";

    anchorToHome.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>`;
    anchorToFavorites.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>`;
    anchorToLibrary.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>`;
    anchorToCalendar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>`;
    anchorToProjectList.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>`;
    anchorToSettings.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>`;
    // Add text content to anchors
    const homeLabel = document.createElement("span");
    homeLabel.textContent = "Home";
    anchorToHome.appendChild(homeLabel);
    const favoritesLabel = document.createElement("span");
    favoritesLabel.textContent = "Favorites";
    anchorToFavorites.appendChild(favoritesLabel);
    const libraryLabel = document.createElement("span");
    libraryLabel.textContent = "Library";
    anchorToLibrary.appendChild(libraryLabel);
    const calendarLabel = document.createElement("span");
    calendarLabel.textContent = "Calendar";
    anchorToCalendar.appendChild(calendarLabel);
    const projectListLabel = document.createElement("span");
    projectListLabel.textContent = "Project List";
    anchorToProjectList.appendChild(projectListLabel);
    const settingsLabel = document.createElement("span");
    settingsLabel.textContent = "Settings";
    anchorToSettings.appendChild(settingsLabel);

    // Append anchors to navbar
    navbar.appendChild(anchorToHome);
    navbar.appendChild(anchorToFavorites);
    navbar.appendChild(anchorToLibrary);
    navbar.appendChild(anchorToCalendar);
    navbar.appendChild(anchorToProjectList);
    navbar.appendChild(anchorToSettings);

    this.shadowRoot.appendChild(styles);
    this.changeToCurrentPage();
  }

  /**
   * Function that will change the other icons to gray
   */
  changeToCurrentPage() {
    const currentPageAttributes = ["anchorToHome", "anchorToFavorites", "anchorToLibrary", "anchorToCalendar", "anchorToProjectList", "anchorToSettings"];
    const currentPage = this.getAttribute("currentPage");
    if (currentPageAttributes.includes(currentPage)) {
      currentPageAttributes.forEach((attribute) => {
        if (attribute !== currentPage) {
          this.shadowRoot.querySelector(`#${attribute} svg path`).style.fill = "gray";
        }
      });
    }
    else  {
      currentPageAttributes.forEach((attribute) => {
        if (attribute !== currentPage) {
          this.shadowRoot.querySelector(`#${attribute} svg path`).style.fill = "gray";
        }
      });
    }
  }
}

customElements.define('vertical-navbar', VerticalNavbar);