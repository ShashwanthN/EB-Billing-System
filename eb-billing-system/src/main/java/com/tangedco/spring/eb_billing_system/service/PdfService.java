package com.tangedco.spring.eb_billing_system.service;

import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.property.UnitValue;
import com.itextpdf.layout.property.TextAlignment;
import com.tangedco.spring.eb_billing_system.entity.Payment;
import com.tangedco.spring.eb_billing_system.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PdfService {

    private static final Logger logger = LoggerFactory.getLogger(PdfService.class);

    public byte[] generatePaymentReceipt(User user, List<Payment> payments) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(byteArrayOutputStream);
        com.itextpdf.kernel.pdf.PdfDocument pdfDoc = new com.itextpdf.kernel.pdf.PdfDocument(writer);
        Document document = new Document(pdfDoc, PageSize.A4);
        document.setMargins(36, 36, 36, 36);

        Paragraph title = new Paragraph("Tamilnadu Generation and Distribution Corporation Limited")
                .setBold()
                .setFontSize(16)
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);

        Paragraph subtitle = new Paragraph("E-Receipt")
                .setBold()
                .setFontSize(14)
                .setMarginBottom(20)
                .setTextAlignment(TextAlignment.CENTER);
        document.add(subtitle);

        for (Payment payment : payments) {
            if (payment == null) {
                logger.error("Payment object is null for userId: {}", user.getUserId());
                continue;
            }

            logger.debug("Generating receipt for payment: {}", payment);

            Table table = new Table(UnitValue.createPercentArray(new float[]{3, 7}));
            table.setWidth(UnitValue.createPercentValue(100));

            addCell(table, "Service No:");
            addCell(table, String.valueOf(payment.getServiceNo()));
            addCell(table, "Bill Amount:");
            addCell(table, String.valueOf(payment.getBill().getAmount()));
            addCell(table, "Receipt No:");
            addCell(table, payment.getReceiptNo());
            addCell(table, "Receipt Date:");
            addCell(table, payment.getReceiptDate().toString());
            addCell(table, "Amount Debited:");
            addCell(table, String.valueOf(payment.getAmountDebited()));
            addCell(table, "Bank Transaction No:");
            addCell(table, payment.getTransactionNo());
            addCell(table, "Bank Name:");
            addCell(table, payment.getBankName());
            addCell(table, "Card Type:");
            addCell(table, payment.getCardType());
            addCell(table, "User ID:");
            addCell(table, user.getUserId());
            addCell(table, "User Name:");
            addCell(table, user.getFirstName() + " " + user.getLastName());
            addCell(table, "Phone Number:");
            addCell(table, user.getPhoneNumber());
            addCell(table, "Email:");
            addCell(table, user.getEmail());
            addCell(table, "Connection Type:");
            addCell(table, payment.getBill().getMeterReading().getConnectionType());

            document.add(table);
            document.add(new Paragraph("\n"));
        }

        Paragraph footer = new Paragraph("Receipt issued subject to confirmation of Online payment credit in TANGEDCO's Bank account")
                .setFontSize(10)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginTop(20);
        document.add(footer);

        document.close();
        return byteArrayOutputStream.toByteArray();
    }

    private void addCell(Table table, String content) {
        Cell cell = new Cell().add(new Paragraph(content));
        cell.setPadding(5);
        table.addCell(cell);
    }
}
