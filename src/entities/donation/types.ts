export type DonationPurpose = 'general' | 'program';
export type DonationPeriod = 'once' | 'month';
export type DonationStatus = 'pending' | 'succeeded' | 'canceled';

export type Donation = {
  id: string;
  amountKopecks: number;
  purpose: DonationPurpose;
  programId?: string;
  period: DonationPeriod;
  coverFee: boolean;
  donorName?: string;
  donorEmail?: string;
  message?: string;
  status: DonationStatus;
  createdAt: string;
};
