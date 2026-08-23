import { BROKER_HTTP_URL } from '../config';
import { delay } from '../utils/eda';
import {
	asRecord,
	CommandError,
	optionalString,
	requiredNumber,
} from '../utils/validation';

export async function captureCanvas(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const mode = optionalString(params, 'mode', 'fit');
	if (mode === 'fit') {
		await eda.dmt_EditorControl.zoomToAllPrimitives();
		await delay(150);
	}
	return uploadCurrentCanvas();
}

export async function captureRegion(
	params: Record<string, unknown>,
): Promise<Record<string, unknown>> {
	const region = asRecord(params.region, 'region');
	const x = requiredNumber(region, 'x');
	const y = requiredNumber(region, 'y');
	const width = requiredNumber(region, 'width');
	const height = requiredNumber(region, 'height');
	if (width <= 0 || height <= 0) {
		throw new CommandError('INVALID_REGION', 'width and height must be greater than zero');
	}
	await eda.dmt_EditorControl.zoomToRegion(x, x + width, y, y + height);
	await delay(150);
	return uploadCurrentCanvas();
}

async function uploadCurrentCanvas(): Promise<Record<string, unknown>> {
	const image = await eda.dmt_EditorControl.getCurrentRenderedAreaImage();
	if (!image) {
		throw new CommandError('CAPTURE_FAILED', 'No active EDA canvas could be captured');
	}
	const mediaType = image.type || 'image/png';
	const response = await eda.sys_ClientUrl.request(
		`${BROKER_HTTP_URL}/upload/image`,
		'POST',
		image,
		{ headers: { 'Content-Type': mediaType } },
	);
	if (!response.ok) {
		throw new CommandError(
			'IMAGE_UPLOAD_FAILED',
			`Backend returned HTTP ${response.status}`,
			await response.text(),
		);
	}
	const body = await response.json() as unknown;
	if (typeof body !== 'object' || body === null || typeof Reflect.get(body, 'url') !== 'string') {
		throw new CommandError('INVALID_UPLOAD_RESPONSE', 'Backend did not return an image URL');
	}
	return { image_url: Reflect.get(body, 'url'), expires_in: Reflect.get(body, 'expires_in') };
}

