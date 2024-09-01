// import styles from '@/styles/PdfTemplate.scss';

const PdfCode = (invoice: Invoice) => {
  return `
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }

            .invoice-container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            .invoice-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid #f4f4f4;
                padding-bottom: 20px;
                margin-bottom: 20px;
            }

            .invoice-header img {
                max-width: 150px;
            }

            .invoice-header h1 {
                font-size: 24px;
                color: #007bff;
                margin: 0;
            }

            .invoice-details {
                margin-bottom: 20px;
            }

            .invoice-details p {
                margin: 0;
                font-size: 16px;
                line-height: 1.5;
            }

            .invoice-details .order-id {
                margin-top: 10px;
                color: #666;
            }

            .invoice-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }

            .invoice-table th,
            .invoice-table td {
                text-align: left;
                padding: 10px;
                border-bottom: 1px solid #f4f4f4;
            }

            .invoice-table th {
                background-color: #f9f9f9;
                color: #333;
            }

            .invoice-summary {
                text-align: right;
                margin-bottom: 20px;
            }

            .invoice-summary p {
                font-size: 16px;
                margin: 0;
                line-height: 1.5;
            }

            .invoice-summary .total {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
            }

            .billing-payment-info {
                display: flex;
                justify-content: space-between;
                border-top: 2px solid #f4f4f4;
                padding-top: 20px;
                margin-top: 20px;
            }

            .billing-payment-info .section {
                width: 45%;
            }

            .billing-payment-info h4 {
                font-size: 18px;
                margin-bottom: 10px;
                color: #007bff;
            }

            .billing-payment-info p {
                margin: 0;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <div class="invoice-header">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/Netaji_Subhas_University_of_Technology.svg/150px-Netaji_Subhas_University_of_Technology.svg.png" alt="Company Name">
                <h1>Invoice</h1>
            </div>

            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Item Description</th>
                        ${invoice.invoiceType.includes('company') ? `<th>Hours</th>` : ''}
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                  ${invoice.items.map((item: any) => {
                    console.log(item);
                    if (!item.description) {
                      item = JSON.parse(item);
                    }
                    return ` <tr>
                        <td>${item.description}</td>
                          ${invoice.invoiceType.includes('company') ? `<td>${item.hours}</td>` : ''}
                    
                        <td>${item.price}</td>
                    </tr> `;
                  })}
                  
                </tbody>
            </table>

            <div class="invoice-summary">
                <p>Subtotal:  ₹${invoice.totalAmount}</p>
                <p>Tax (0%): ₹0.00</p>
                <p class="total">Total: ₹${invoice.totalAmount}</p>
            </div>

            <div class="billing-payment-info">
                <div class="section">
                    <h4>Billed From</h4>
                    <p>Name: ${invoice.fromName}<br>Address: ${invoice.fromAddress}<br>Phone: +91 ${
    invoice.fromPhone
  }</p>
                </div>
                <div class="section">
                    <h4>Billed To</h4>
                  <p>Name: ${invoice.toName}<br>Address: ${invoice.toAddress}<br>Phone: +91 ${
    invoice.toPhone
  }</p>
                </div>
            </div>
        </div>
    </body>
</html>
`;
};

export { PdfCode };
