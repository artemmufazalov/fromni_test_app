//Types
import { TChannelsMeta } from './types';

export const channelsNames = [
	['telegram', 'Телеграм'],
	['whatsApp', 'WhatsApp'],
	['vk', 'Вконтакте'],
	['sms', 'СМС'],
];

const channelsMetaData: TChannelsMeta = {
	vk: {
		maxLength: 4096,
		buttons: {
			standart: {
				maxQuantity: 40,
				isLinkAllowed: true,
			},
			inline: {
				maxQuantity: 10,
				isLinkAllowed: true,
			},
		},
	},
	whatsApp: {
		maxLength: 1000,
		buttons: {
			standart: {
				maxQuantity: 10,
				maxLength: 20,
				isLinkAllowed: false,
			},
			inline: {
				maxQuantity: 3,
				maxLength: 20,
				isLinkAllowed: true,
				maxWithLink: 1,
			},
		},
	},
	telegram: {
		maxLength: 4096,
		buttons: {
			standart: {
				isLinkAllowed: false,
			},
			inline: {
				maxLength: 64,
				isLinkAllowed: true,
			},
		},
	},
	sms: {},
};

export default channelsMetaData;
