export class DrdItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["DrDPlus", "sheet", "item"],
          template: "systems/DrDPlus/templates/DrdItemSheet.html",
          width: 520,
          height: 480,
          tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
          scrollY: [".attributes"],
        } as BaseEntitySheet.Options);
    }
}