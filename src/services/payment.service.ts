import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PaymentService {
  private readonly apiUrl = 'https://dev-vanilla.edviron.com/erp';
  private readonly apiKey: string;
  private readonly pgKey: string;
  private readonly schoolId: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('API_KEY');
    const pgKey = this.configService.get<string>('PG_KEY');
    const schoolId = this.configService.get<string>('SCHOOL_ID');

    if (!apiKey || !pgKey || !schoolId) {
      throw new Error('Required environment variables are missing');
    }

    this.apiKey = apiKey;
    this.pgKey = pgKey;
    this.schoolId = schoolId;
  }

  private generateSign(payload: any): string {
    return jwt.sign(payload, this.pgKey);
  }

  async createPaymentRequest(amount: string, callbackUrl: string) {
    const payload = {
      school_id: this.schoolId,
      amount,
      callback_url: callbackUrl,
    };

    const sign = this.generateSign(payload);

    try {
      const response = await axios.post(
        `${this.apiUrl}/create-collect-request`,
        {
          ...payload,
          sign,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to create payment request: ${error.message}`);
    }
  }

  async checkPaymentStatus(collectRequestId: string) {
    const payload = {
      school_id: this.schoolId,
      collect_request_id: collectRequestId,
    };

    const sign = this.generateSign(payload);

    try {
      const response = await axios.get(
        `${this.apiUrl}/collect-request/${collectRequestId}`,
        {
          params: {
            school_id: this.schoolId,
            sign,
          },
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to check payment status: ${error.message}`);
    }
  }
} 