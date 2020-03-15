export interface FunnelState {
    phoneNumber: string;
    isValid: boolean;
    title1: string;
    title2: string;
    buttonText: string;
}
export declare class WebFunnel {
    /**
     * api base url
     */
    apiUrl: string;
    /**
     * api end point to get titles
     */
    getTitles: string;
    /**
     * api end point to save data (mobile number and user token number)
     */
    saveData: string;
    /**
     * logo image path
     */
    logoImgPath: string;
    state: FunnelState;
    submitForm: () => void;
    validatePhone: (event: any) => void;
    componentWillLoad(): void;
    render(): any;
}
