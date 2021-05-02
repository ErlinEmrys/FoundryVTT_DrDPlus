import { ATTRIBUTE_TYPES } from "../Constants";

export class DrdEntitySheetHelper {
    /**
   * Listen for click events on an attribute control to modify the composition of attributes in the sheet
   * @param {MouseEvent} event    The originating left click event
   * @private
   */
  static async onClickAttributeControl(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const action = a.dataset.action;

    // Perform create and delete actions.
    switch ( action ) {
      case "create":
        DrdEntitySheetHelper.createAttribute(event, this);
        break;
      case "delete":
        DrdEntitySheetHelper.deleteAttribute(event, this);
        break;
    }
  }

  /**
   * Create new attributes.
   * @param {MouseEvent} event    The originating left click event
   * @param {Object} app          The form application object.
   * @private
   */
  static async createAttribute(event, app) {
    const a = event.currentTarget;
    let dtype = a.dataset.dtype;
    const attrs = app.object.data.data.attributes;
    const form = app.form;

    // Determine the new attribute key attributes.
    let objKeys = Object.keys(attrs);
    let nk = Object.keys(attrs).length + 1;
    let newValue = `attr${nk}`;
    let newKey : any;
    newKey = document.createElement("div");
    while ( objKeys.includes(newValue) ) {
      ++nk;
      newValue = `attr${nk}`;
    };

    // Build options for construction HTML inputs.
    let htmlItems = {
      key: {
        type: "text",
        value: newValue
      }
    };

    // Build the form elements used to create the new attribute.
    newKey.innerHTML = DrdEntitySheetHelper.getAttributeHtml(htmlItems, nk);

    // Append the form element and submit the form.
    newKey = newKey.children[0];
    form.appendChild(newKey);
    await app._onSubmit(event);
  }

  /**
   * Delete an attribute.
   * @param {MouseEvent} event    The originating left click event
   * @param {Object} app          The form application object.
   * @private
   */
  static async deleteAttribute(event, app) {
    const a = event.currentTarget;
    const li = a.closest(".attribute");
    if ( li ) {
      li.parentElement.removeChild(li);
      await app._onSubmit(event);
    }
  }

  /**
   * Return HTML for a new attribute to be applied to the form for submission.
   *
   * @param {Object} items  Keyed object where each item has a "type" and "value" property.
   * @param {string} index  Numeric index or key of the new attribute.
   * @returns {string} Html string.
   */
  static getAttributeHtml(items, index) {
    // Initialize the HTML.
    let result = '<div>';
    // Iterate over the supplied keys and build their inputs.
    for (let [key, item] of Object.entries(items)) {
      let item2 : any;
      item2 = item;
      result = result + `<input name="data.attributes.attr${index}.${key}" value="${item2.value}"/>`;
    }
    // Close the HTML and return.
    return result + '</div>';
  }

  /**
   * Update attributes when updating an actor object.
   *
   * @param {Object} formData Form data object to modify keys and values for.
   * @returns {Object} updated formData object.
   */
  static updateAttributes(formData, entity) {
    // Handle the free-form attributes list
    const formAttrs = expandObject(formData).data.attributes || {};
    const attributes = Object.values(formAttrs).reduce((obj, v) => {
        let k = v["key"].trim();
        if ( /[\s\.]/.test(k) )  return ui.notifications.error("Attribute keys may not contain spaces or periods");
        delete v["key"];
        obj[k] = v;
        return obj;
    }, {});

    // Remove attributes which are no longer used
    for ( let k of Object.keys(entity.object.data.data.attributes) ) {
      if ( !attributes.hasOwnProperty(k) ) attributes[`-=${k}`] = null;
    }

    // Re-combine formData
    formData = Object.entries(formData).filter(e => !e[0].startsWith("data.attributes")).reduce((obj, e) => {
      obj[e[0]] = e[1];
      return obj;
    }, {_id: entity.object._id, "data.attributes": attributes});

    return formData;
  }

  static getAttributeData(data) {
    data.dtypes = ATTRIBUTE_TYPES;

    // Modify attributes on items.
    if ( data.items ) {
      data.items.forEach(item => {
        // Iterate over attributes.
        for ( let [k, v] of Object.entries(item.data.attributes) ) {
          let v2 : any;
          v2 = v;
            // Add label fallback.
            if ( !v2.label ) v2.label = k;
            // Add formula bool.
            if ( v2.dtype == "Formula" ) {
              v2.isFormula = true;
            }
            else {
              v2.isFormula = false;
            }
        }
      });
    }
  }
}