import {
	faFileAudio,
	faFileImage,
	faFileVideo,
	faFilePdf,
	faFileWord,
	faFilePowerpoint,
	faFileExcel,
	faFileAlt,
	faTable,
	faDatabase
} from '@fortawesome/free-solid-svg-icons';

const FILE_AUDIO = 'file-audio';
const FILE_IMAGE = 'file-image';
const FILE_VIDEO = 'file-video';
const FILE_PDF = 'file-pdf';
const FILE_POWERPOINT = 'file-powerpoint';
const FILE_WORD = 'file-word';
const FILE_EXCEL = 'file-excel';
const FILE_ALT = 'file-alt';
const FILE_TABLE = 'table';
const FILE_DATABASE = 'database';

const contentTypeIcons = {
	'audio/x-aiff': FILE_AUDIO,
	'image/gif': FILE_IMAGE,
	'image/x-icon': FILE_IMAGE,
	'image/jpeg': FILE_IMAGE,
	'image/jpg': FILE_IMAGE,
	'image/png': FILE_IMAGE,
	'image/svg+xml': FILE_IMAGE,
	'image/tiff': FILE_IMAGE,
	'video/quicktime': FILE_VIDEO,
	'video/mp4': FILE_VIDEO,
	'video/mpeg': FILE_VIDEO,
	'application/x-dvi': FILE_VIDEO,
	'video/x-msvideo': FILE_VIDEO,
	'application/pdf': FILE_PDF,
	'application/vnd.ms-powerpoint': FILE_POWERPOINT,
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': FILE_POWERPOINT,
	'application/msword': FILE_WORD,
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FILE_WORD,
	'application/vnd.ms-excel': FILE_EXCEL,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FILE_EXCEL,
	'text/rtf': FILE_ALT,
	'text/plain': FILE_ALT,
	'text/tab-separated-values': FILE_TABLE,
	'application/xml': FILE_DATABASE
};

const getGroupIcon = (contentTypeGroup) => {
	if (contentTypeGroup == FILE_AUDIO) return faFileAudio;
	if (contentTypeGroup == FILE_IMAGE) return faFileImage;
	if (contentTypeGroup == FILE_VIDEO) return faFileVideo;
	if (contentTypeGroup == FILE_PDF) return faFilePdf;
	if (contentTypeGroup == FILE_POWERPOINT) return faFilePowerpoint;
	if (contentTypeGroup == FILE_WORD) return faFileWord;
	if (contentTypeGroup == FILE_EXCEL) return faFileExcel;
	if (contentTypeGroup == FILE_ALT) return faFileAlt;
	if (contentTypeGroup == FILE_TABLE) return faTable;
	if (contentTypeGroup == FILE_DATABASE) return faDatabase;
};

export { contentTypeIcons, getGroupIcon };
