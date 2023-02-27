import { sign } from 'jsonwebtoken';

export class RefreshToken {
  id: string;
  userId: number;
  ipAddress: string;
  userAgent: string;

  constructor(partial: Partial<RefreshToken>) {
    Object.assign(this, partial);
  }

  sign(): string {
    return sign({ id: this.id }, process.env.REFRESH_SECRET, {
      expiresIn: '7d',
    });
  }
}
