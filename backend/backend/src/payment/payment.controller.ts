import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('payment')
@ApiTags('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(@Body() createPaymentDto: any) {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @Post('webhook')
  async handleWebhook(@Body() webhookData: any) {
    return this.paymentService.handleWebhook(webhookData);
  }

  @Get('transactions')
  async getTransactions() {
    return this.paymentService.getTransactions();
  }

  @Get('transactions/school/:schoolId')
  async getTransactionsBySchool(@Param('schoolId') schoolId: string) {
    return this.paymentService.getTransactionsBySchool(schoolId);
  }

  @Get('transaction-status/:customOrderId')
  async getTransactionStatus(@Param('customOrderId') customOrderId: string) {
    return this.paymentService.getTransactionStatus(customOrderId);
  }
} 