export declare class RewardsController {
    private claimedRewards;
    claimReward(req: any): Promise<{
        message: string;
        amount?: undefined;
    } | {
        message: string;
        amount: number;
    }>;
}
