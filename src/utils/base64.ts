export async function encodeBlobBase64(blob: Blob): Promise<{
	dataBase64: string;
	sizeBytes: number;
}> {
	const bytes = new Uint8Array(await blob.arrayBuffer());
	let binary = '';
	const chunkSize = 0x8000;
	for (let offset = 0; offset < bytes.length; offset += chunkSize) {
		const chunk = bytes.subarray(offset, offset + chunkSize);
		binary += String.fromCharCode(...chunk);
	}
	return { dataBase64: btoa(binary), sizeBytes: bytes.byteLength };
}
