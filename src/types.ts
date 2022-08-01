export type TButtonTypes = 'standart' | 'inline';

export type TChannel = 'telegram' | 'vk' | 'whatsApp' | 'sms';

export interface IChannelButtonMeta {
	isLinkAllowed: boolean;
	maxQuantity?: number;
	maxLength?: number;
	maxWithLink?: number;
}

export interface ISingleChannelMeta {
	maxLength?: number;
	buttons?: Record<TButtonTypes, IChannelButtonMeta>;
}

export type TChannelsMeta = Record<TChannel, ISingleChannelMeta>;

export type TKeyboardButton = {
	id: string;
	type: 'standart' | 'inline';
	isLink?: boolean;
	message: string;
};

export type TChannelData = {
	message: string;
	buttons?: TKeyboardButton[];
};

export interface IForms {
	_id?: string;
	activeChannels: TChannel[];
	vk: TChannelData;
	telegram: TChannelData;
	whatsApp: TChannelData;
	sms: TChannelData;
}

export type TFetchStatus = 'idle' | 'pending' | 'success' | 'error';
