import { BROKER_HTTP_URL } from '../config';
import { delay } from '../utils/eda';
import { encodeBlobBase64 } from '../utils/base64';
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
	return uploadCurrentCanvas(params.inline === true);
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
	return uploadCurrentCanvas(params.inline === true);
}

async function uploadCurrentCanvas(inline: boolean): Promise<Record<string, unknown>> {
	const image = await eda.dmt_EditorControl.getCurrentRenderedAreaImage();
	if (!image) {
		throw new CommandError('CAPTURE_FAILED', 'No active EDA canvas could be captured');
	}
	const mediaType = image.type || 'image/png';
	if (inline) {
		const encoded = await encodeBlobBase64(image);
		return {
			data_base64: encoded.dataBase64,
			media_type: mediaType,
			size_bytes: encoded.sizeBytes,
		};
	}
	// Legacy HTTP upload fallback. Remove after the next major protocol version;
	// current MCP transports request inline Base64 through the WebSocket RPC.
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

