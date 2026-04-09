export type ApiResponse<D> = {
	success: boolean;
	message: string;
	data?: D;
};
