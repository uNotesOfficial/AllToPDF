import { fileTypeFromBuffer } from 'file-type'

export default async (buffer: Buffer) => {
	const type = await fileTypeFromBuffer(buffer)

	switch (type?.ext) {
		case 'docx':
			//function that converts here
			break
		case 'pdf':
			//function that converts here
			break
		default:
			throw new Error('Unsupported file type')
	}
}
