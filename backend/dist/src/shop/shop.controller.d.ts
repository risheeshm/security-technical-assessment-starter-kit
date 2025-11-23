export declare class ShopController {
    applyCoupon(body: {
        code: string;
        currentPrice: number;
    }): {
        newPrice: number;
        message: string;
    } | {
        message: string;
        newPrice?: undefined;
    };
    calculateTax(body: {
        amount: number;
    }): {
        tax: number;
        total: number;
    };
}
