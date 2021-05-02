import { DrdEntitySheetHelper } from "./DrdEntitySheetHelper";

export class DrdActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["DrDPlus", "sheet", "actor"],
          template: "systems/DrDPlus/templates/DrdActorSheet.html",
          width: 600,
          height: 600,
          tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
          scrollY: [".biography", ".items", ".attributes"],
          dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        } as BaseEntitySheet.Options);
      }

    /** @override */
    activateListeners(html) {
      super.activateListeners(html);

      // Everything below here is only needed if the sheet is editable
      if ( !this.options.editable ) return;

      // Add or Remove Attribute
      html.find(".attributes").on("click", ".attribute-control", DrdEntitySheetHelper.onClickAttributeControl.bind(this));
    }

  /** @override */
  _updateObject(event, formData) {
    formData = DrdEntitySheetHelper.updateAttributes(formData, this);
    return this.object.update(formData);
  }

  /** @override */
  getData() {
    const data = super.getData();
    DrdEntitySheetHelper.getAttributeData(data);
    return data;
  }
}