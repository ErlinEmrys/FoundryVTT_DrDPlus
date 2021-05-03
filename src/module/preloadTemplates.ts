export class DrdTemplateFactory
{
	static preloadTemplates() {
		const templatePaths = [
			// Add paths to "systems/DrDPlus/templates"
			"systems/DrDPlus/templates/parts/DrdAttributes.html",
		];

		return loadTemplates(templatePaths);
	}
}