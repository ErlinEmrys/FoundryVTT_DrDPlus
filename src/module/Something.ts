import { DrdActor } from "./actors/DrdActor";
import { DrdActorSheet } from "./actors/DrdActorSheet";
import { DrdItem } from "./items/DrdItem";
import { DrdItemSheet } from "./items/DrdItemSheet";
import { ATTRIBUTE_TYPES } from "./Constants";

export const registerSettings = function() {
	
	// Define custom Entity classes
	CONFIG.Actor.entityClass = DrdActor;

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("DrDPlus", DrdActorSheet, { makeDefault: true });

	CONFIG.Item.entityClass = DrdItem;

	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("DrDPlus", DrdItemSheet, { makeDefault: true });

	CONFIG.ATTRIBUTE_TYPES = ATTRIBUTE_TYPES;
}
