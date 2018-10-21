import {html, render, TemplateResult} from '../node_modules/lit-html/lit-html.js';
import {tableContent} from './tableContent.js';
import {tableMeta} from './tableMeta.js';
import {ActionViewModel, ButtonSpec, currentViewModel, MetaViewModel, TableViewModel, ViewModel} from './viewModel.js';

/** Active slides out menu for small screens. See side-menu.css */
let isActive = false;

/**
 * Draw the entire page for the given ViewModel. This is efficient because lit-html re-uses
 * unchanged portions of the DOM and stamps out novel DOM portions from templates in shadow DOM.
 */
export function drawPage(model: ViewModel) {
  // Outer structure from http://purecss.io/layouts/side-menu/
  render(
      html`<div id="layout" class=${activeClass('')}>
      <a href="#menu" id="menuLink" class=${activeClass('menu-link')} @click=${toggleActive}>
        <span></span>
      </a>

      <div id="menu" class=${activeClass('')}>
        <div class="pure-menu">
          <a class="pure-menu-heading" href="#">${model.heading}</a>

          <ul class="pure-menu-list">
            ${model.menu.map(m => html`
            <li class="pure-menu-item"><a href=${m.link} class="pure-menu-link">${m.item}</a></li>
            `)}
          </ul>
        </div>
      </div>

      <div id="main">
        <div class="header">
        <span>${model.feedback}</span>
          <h1>${model.title}</h1>
          <h2>${model.subtitle}</h2>
        </div>

        <div class="content" @click=${() => isActive && toggleActive()}>${content()}</div>
      </div>
    </div>
`,
      document.body);

  function content(): TemplateResult {
    switch (model.type) {
      case 'action':
        return actionContent((model as ActionViewModel).action);
      case 'meta':
        return tableMeta(model as MetaViewModel);
      case 'table':
      default:
        return tableContent(model as TableViewModel);
    }
  }

  function toggleActive() {
    isActive = !isActive;
    model.redrawPage();
  }
}

const activeClass = (classes: string) => isActive ? classes + ' active' : classes;

function actionContent({text, click}: ButtonSpec) {
  return html`<button class="pure-button pure-button-primary" @click=${click}>${text}</button>`;
}

export const redrawPage = () => drawPage(currentViewModel);
