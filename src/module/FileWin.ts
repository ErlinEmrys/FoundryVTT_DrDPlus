//export class Constants {
//    const ATTRIBUTE_TYPES = ["String", "Number", "Boolean", "Formula", "Resource"];
//}

export const preloadTemplates = async function() {
	const templatePaths = [
		// Add paths to "systems/DrDPlus/templates"
		"systems/DrDPlus/templates/parts/DrdAttributes.html",
	];

	return loadTemplates(templatePaths);
}

export const ATTRIBUTE_TYPES = ["String", "Number", "Boolean", "Formula", "Resource"];
