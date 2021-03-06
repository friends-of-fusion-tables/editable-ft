import {html, TemplateResult} from '../node_modules/lit-html/lit-html';
/* Design notes
 *
 * The objective is editing Javascript objects with a presentation that can be progressively
 * improved.
 *
 * The fallback is a textarea with JSON string. The presentation can be enriched with render advice,
 * which is akin to JSON schema. Render advice supplies text for title and description as well as
 * enum values for choices, and constraints for validated input. The presentation can also be
 * delegated to a custom editor.
 *
 * An editor consist of an HTML element with bound callbacks for updating and change notification.
 * Formally, it is just a TemplateResult. The formal type for a factory of editors,
 * ValueEditorFactory, takes a value and the callbacks to produce the editor. The implementation
 * of a ValueEditorFactory is non-obvious for two reasons:
 *
 * First, factories may be called again, when the page is re-drawn. Stateful editors will break, if
 * we return an "equivalent", new editor rather than reusing the previously returned editor
 * instance. For the same reason it is also important to reuse factory instances.
 *
 * Second, it is possible that the true value to edit is different from the object bound in the
 * editor instance. Specifically, the value we wish to edit might be a string with structure that we
 * model as an object. This breaks when an editor merely updates the Javascript object in place and
 * omits the update callback. Everything will work just fine for real Javascript objects, but an
 * edited string value will remain unchanged.
 */
/**
 * Family of types to enrich the editor. Deliberately similar to JSON schema found in Fusion
 * Tables.
 */
export interface RenderAdvice {
  type: 'object'|'array'|'string'|'boolean'|'number';
  title?: string;
  description?: string;
  display?: boolean;
  readOnly?: boolean;
  default?: any;
  expanded?: boolean;
  customEditor?: ValueEditorFactory;
}
export interface ObjectRenderAdvice extends RenderAdvice {
  type: 'object';
  properties: {[key: string]: RenderAdvice};
}
export interface ArrayRenderAdvice extends RenderAdvice {
  type: 'array';
  items: RenderAdvice;
}
export interface StringRenderAdvice extends RenderAdvice {
  type: 'string';
  enum?: string[];
  pattern?: string;
  maxLength?: number;
  minLength?: number;
}

/**
 * A value editor is a TemplateResult with bound value, which is edited, and callbacks.
 * @param updateValue called with new value to update
 * @param onchange will be called after something changed
 * @param redraw requests re-render, for expanding and collapsing
 */
export type ValueEditorFactory =
    (value: any, updateValue: (v: any) => void, onchange: (e: Event) => void, redraw: () => void) =>
        TemplateResult;

/** A value editor factory for keeping values hidden. */
const HIDING_VALUE_EDITOR_FACTORY: ValueEditorFactory = () => html``;

/** Pseudo change event for removing an item from a list. */
const ITEM_REMOVED_EVENT = new Event('Item removed');

/** The basic value editor uses JSON.stringify and JSON.parse. */
const jsonTextarea: ValueEditorFactory = (value, updateValue, onchange) => html`
  <textarea class="pure-input-3-4" @change=${(e: Event) => {
  updateValue(JSON.parse((e.target as HTMLTextAreaElement).value));
  onchange(e);
}}>${JSON.stringify(value)}
  </textarea>`;

/** Creates special editors for string[], presented as one item per line. */
const linePerItem: ValueEditorFactory = (value, updateValue, onchange) => html`
  <textarea class="pure-input-1-2" @change=${(e: Event) => {
  updateValue((e.target as HTMLTextAreaElement).value.split('\n'));
  onchange(e);
}}>${(value || []).join('\n')}</textarea>`;

const checkbox: (advice: RenderAdvice) => ValueEditorFactory = advice =>
    (value, updateValue, onchange) => html`
  <input
    type="checkbox"
    class="pure-input"
    ?checked=${value}
    ?readOnly=${!!advice.readOnly}
    @change=${(e: Event) => {
      updateValue((e.target as HTMLInputElement).checked);
      onchange(e);
    }}>`;

const numberInput: (advice: RenderAdvice) => ValueEditorFactory = advice =>
    (value, updateValue, onchange) => html`
  <input
    type="text"
    class="pure-input-1-2"
    value=${value || advice.default || 0}
    ?readOnly=${!!advice.readOnly}
    pattern="^-?\d*\.?\d*$"
    @change=${(e: Event) => {
      updateValue(Number.parseFloat((e.target as HTMLInputElement).value));
      onchange(e);
    }}>`;

const textInput: (advice: StringRenderAdvice) => ValueEditorFactory = advice =>
    (value, updateValue, onchange) => html`
  <input
    type="text"
    class="pure-input-1-2"
    value=${value}
    ?readOnly=${!!advice.readOnly}
    pattern=${advice.pattern || '.*'}
    minlength=${advice.minLength || 0}
    maxlength=${advice.maxLength || 1000000}
    @change=${(e: Event) => {
      updateValue((e.target as HTMLInputElement).value);
      onchange(e);
    }}>`;

const selectInput: (advice: StringRenderAdvice) => ValueEditorFactory = advice =>
    (value, updateValue, onchange) => html`
  <select
    class="pure-input-1-2"
    ?readOnly=${!!advice.readOnly}
    @change=${(e: Event) => {
      updateValue((e.target as HTMLSelectElement).value);
      onchange(e);
    }}>
    ${(advice.enum || []).map(e => html`<option ?selected=${e === value}>${e}</option>`)}
  </select>`;

const stringInputFactory = (advice: StringRenderAdvice) =>
    advice.enum ? selectInput(advice) : textInput(advice);

/** The type of HTML wrappers, like collapsible editor and control group. */
type HtmlOperator = (html: TemplateResult, redraw: () => void) => TemplateResult;
type FactoryOperator = (f: ValueEditorFactory) => ValueEditorFactory;

/** Returns a FactoryOperator that applies the given HtmlOperator on a factory result. */
const asFactory: (op: HtmlOperator) => FactoryOperator = op => f =>
    (value, updateValue, onchange, redraw) => op(f(value, updateValue, onchange, redraw), redraw);

/**
 * Returns HTML for a group. In the context of pure-form-aligned, the title will be right aligned on
 * the left, then input, then the description in a smaller, muted font.
 */
const controlGroup: (adviceLike: {title?: string, description?: string}, extraMessage?: string) =>
    HtmlOperator = ({title, description}, extraMessage) => input => html`
  <div class="pure-control-group">
    <label>${title}</label>
    ${input}
    <span class="pure-form-message-inline pure-input-1-4">
      <p>${description}</p>${extraMessage || ''}
    </span>
  </div>`;

const controlGroupWithLinePerItemLegend = (advice: RenderAdvice) =>
    controlGroup(advice, 'Enter one item per line');

const inputListItem: (removeItem: () => void) => HtmlOperator = removeItem => input => html`
    <div class="pure-control-group">
      <label></label>${input}
      <span class="pure-button" style="border-radius:50%" @click=${removeItem}>
            &#x00D7;
      </span>
     </div>`;

const DOWN_TRIANGLE = html`&#9662;`;
const RIGHT_TRIANGLE = html`&#9656;`;
/**
 * Returns factory for HTML of a full width button that contains the given title and description.
 * The button toggles the visibility of some inner HTML.
 */
const collapsibleEditor: (advice: RenderAdvice) => HtmlOperator =
    ({title, description, expanded}) => (inner, redraw) => html`
<fieldset>
  <div class=${'pure-button pure-input-1' + (expanded ? ' pure-button-active' : '')} @click=${
        () => {
          expanded = !expanded;
          redraw();
        }}>
  ${title}
  <span class="pure-form-message-inline">${description}</span>
  ${expanded ? DOWN_TRIANGLE : RIGHT_TRIANGLE}
  </div>
  <span style=${expanded ? '' : 'display:none'}>
  ${inner}
  </span>
</fieldset>`;

/**
 * Returns factory for HTML of a full width button that contains the given title and description.
 * The button toggles the visibility of some inner HTML.
 */
const collapsibleListItemEditor: (advice: RenderAdvice, removeItem: () => void) => HtmlOperator =
    ({title, description, expanded}, removeItem) => (inner, redraw) => html`
<fieldset>
  <div class=${'pure-button pure-input-3-4' + (expanded ? ' pure-button-active' : '')} @click=${
        () => {
          expanded = !expanded;
          redraw();
        }}>
  ${title}
  <span class="pure-form-message-inline">${description}</span>
  ${expanded ? DOWN_TRIANGLE : RIGHT_TRIANGLE}
  </div><span class="pure-button" style="border-radius:50%" @click=${removeItem}>
            &#x00D7;
          </span>
  <span style=${expanded ? '' : 'display:none'}>
  ${inner}
  </span>
</fieldset>`;

/**
 * Returns a factory, for binding a value and callbacks backing an editor, which is a
 * TemplateResult.
 * @param advice to enhance the presentation with description and enum values and more.
 */
export function valueEditorFactory(advice: RenderAdvice): ValueEditorFactory {
  if (advice.display === false) {
    return HIDING_VALUE_EDITOR_FACTORY;
  }
  if (advice.customEditor) {
    return advice.customEditor;
  }
  switch (advice.type) {
    case 'object':
      return asFactory(collapsibleEditor(advice))(
          propertiesValueEditorFactory(advice as ObjectRenderAdvice));
    case 'array':
      const arrayAdvice = advice as ArrayRenderAdvice;
      if (arrayAdvice.items.type === 'string') {
        const itemAdvice = arrayAdvice.items as StringRenderAdvice;
        if (!itemAdvice.enum && !itemAdvice.pattern && !itemAdvice.readOnly) {
          return asFactory(controlGroupWithLinePerItemLegend(advice))(linePerItem);
        }
      }
      return arrayValueEditorFactory(arrayAdvice);
    default:
      return asFactory(controlGroup(advice))(inputFactory(advice));
  }

  function propertiesValueEditorFactory({properties}: ObjectRenderAdvice): ValueEditorFactory {
    const factory: {[key: string]: ValueEditorFactory} = {};
    const withFallbackTitle = (title: string, advice: RenderAdvice) =>
        advice.title ? advice : {...advice, title};
    Object.keys(properties)
        .forEach(k => factory[k] = valueEditorFactory(withFallbackTitle(k, properties[k])));
    return (value, updateValue, onchange, redraw) => {
      if (!value) value = {};
      const updateFor = (key: string) => (v: any) => {
        value[key] = v;
        updateValue(value);
      };
      const jsonWrapper: {[key: string]: HtmlOperator} = {};
      return html
      `${Object.keys(factory).map(k => factory[k](value[k], updateFor(k), onchange, redraw))}
       ${Object.keys(value).filter(k => !factory[k]).map(jsonFactory)}`;

      function jsonFactory(k: string): TemplateResult {
        const wrapper = jsonWrapper[k] || (jsonWrapper[k] = controlGroup({title: k}));
        return wrapper(jsonTextarea(value[k], updateFor(k), onchange, redraw), redraw);
      }
    };
  }

  function arrayValueEditorFactory(advice: ArrayRenderAdvice): ValueEditorFactory {
    const itemAdvice = advice.items;
    let i = 1;
    const headerAdvice = () =>
        itemAdvice.title ? itemAdvice : {...itemAdvice, title: itemAdvice.title || '#' + (i++)};
    const newHeader = (removeItem: () => void) =>
        collapsibleListItemEditor(headerAdvice(), removeItem);
    return asFactory(collapsibleEditor(advice))(arrayFactory(itemFactory(itemAdvice)));

    function itemFactory(itemAdvice: RenderAdvice): (removeItem: () => void) => ValueEditorFactory {
      switch (itemAdvice.type) {
        case 'object':
          const propertiesFactory = propertiesValueEditorFactory(itemAdvice as ObjectRenderAdvice);
          return removeItem => asFactory(newHeader(removeItem))(propertiesFactory);
        case 'array':
          const arrayItemFactory =
              arrayFactory(itemFactory((itemAdvice as ArrayRenderAdvice).items));
          return removeItem => asFactory(newHeader(removeItem))(arrayItemFactory);
        default:
          const factory = inputFactory(itemAdvice);
          return removeItem => asFactory(inputListItem(removeItem))(factory);
      }
    }

    function arrayFactory(itemFactory: (removeItem: () => void) => ValueEditorFactory):
        ValueEditorFactory {
      const editors: ValueEditorFactory[] = [];
      return (value, updateValue, onchange, redraw) => {
        return html`
        <fieldset>
          ${(value || []).map(itemEditor)}
          <div class="pure-control-group">
            <label></label>
            <span class="pure-button" style="border-radius:50%" @click=${newItem}>&#x002B;</span>
          </div>
        </fieldset>`;

        function itemEditor(item: any, i: number, a: any[]): TemplateResult {
          if (editors.length <= i) {
            editors[i] = itemFactory(() => remove(a, i));
          }
          return editors[i](item, (v: any) => updateAt(a, i, v), onchange, redraw);
        }

        function updateAt(a: any[], i: number, v: any) {
          a[i] = v;
          updateValue(a);
        }

        function remove(a: any[], i: number) {
          a.splice(i, 1);
          editors.splice(i, 1);
          updateValue(a);
          onchange(ITEM_REMOVED_EVENT);
          redraw();
        }

        function newItem(e: Event) {
          const v = itemAdvice.default || '';
          if (value) {
            value.push(v);
            updateValue(value);
          } else {
            updateValue([v]);
          }
          redraw();
          const target = e.target as HTMLElement;
          const inputElement = target.parentElement!.previousElementSibling!.firstElementChild!
                                   .nextElementSibling! as HTMLInputElement;
          inputElement.focus();
        }
      };
    }
  }
}

/** Returns a factory for the input-like element of the value editor. */
function inputFactory(advice: RenderAdvice): ValueEditorFactory {
  switch (advice.type) {
    case 'string':
      return stringInputFactory(advice as StringRenderAdvice);
    case 'number':
      return numberInput(advice);
    case 'boolean':
      return checkbox(advice);
    default:  // should never happen
      return jsonTextarea;
  }
}

/** Returns RenderAdvice corresponding to the JSON schema found in Fusion Tables. */
export function renderAdvice(schema: {[key: string]: any}, columns: string[]) {
  return renderAdviceFromResolvedSchema(resolveRefs());

  function resolveRefs() {
    // Resolves $ref value '#/foo/bar' by returning schema.foo.bar
    const resolve = (ref: string) =>
        ref.replace(/^#./, '').split('/').reduce((value: any, key) => value[key], schema);

    // Returns a deep copy with all $ref interpolated
    const resolveAll = (part: any) =>
        typeof part !== 'object' ? part : Object.keys(part).reduce(resolveField, part);

    return resolveAll(schema);

    // Resolves $ref in value of a specific field, or interpolates values if key is '$ref'
    function resolveField(object: {[key: string]: any}, key: string) {
      if (key !== '$ref') {
        object[key] = resolveAll(object[key]);
        return object;
      }
      const ref = object[key];
      delete object[key];
      return Object.assign({}, resolve(ref), object);
    }
  }

  function renderAdviceFromResolvedSchema(schema: {[key: string]: any}): RenderAdvice|undefined {
    if (schema.type) {
      switch (schema.type) {
        case 'object':
          if (schema.properties) {
            const properties: {[key: string]: RenderAdvice} = {};
            Object.keys(schema.properties).forEach(k => {
              const a = renderAdviceFromResolvedSchema(schema.properties[k]);
              if (a) {
                properties[k] = a;
              }
            });
            return {...schema, properties} as ObjectRenderAdvice;
          }
          break;
        case 'array':
          if (schema.items) {
            const items = renderAdviceFromResolvedSchema(schema.items);
            if (items) {
              return {...schema, items} as ArrayRenderAdvice;
            }
          }
          break;
        case 'string':
          return schema.enum && schema.enum.length === 1 && schema.enum[0] === '$columns' ?
              {...schema, type: 'string', 'enum': columns, 'default': columns[0]} as RenderAdvice :
              schema as RenderAdvice;
        case 'boolean':
        case 'number':
          return schema as RenderAdvice;
      }
    }
    return undefined;
  }
}
