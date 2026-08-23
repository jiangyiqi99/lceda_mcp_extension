import { toPlainData } from '../utils/eda';
import { CommandError } from '../utils/validation';

export async function getProjectInfo(): Promise<Record<string, unknown>> {
	const project = await eda.dmt_Project.getCurrentProjectInfo();
	if (!project) {
		throw new CommandError('NO_ACTIVE_PROJECT', 'No active JLCEDA project');
	}
	const document = await eda.dmt_SelectControl.getCurrentDocumentInfo();
	return {
		project: toPlainData(project),
		active_document: toPlainData(document),
	};
}
