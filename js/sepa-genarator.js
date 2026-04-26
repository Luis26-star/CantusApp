export function generateSepaXML(mandateData, creditorName, creditorIBAN, creditorBIC) {

  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02">
<CstmrDrctDbtInitn>
  <GrpHdr>
    <MsgId>MSG-${Date.now()}</MsgId>
    <CreDtTm>${new Date().toISOString()}</CreDtTm>
    <NbOfTxs>${mandateData.length}</NbOfTxs>
    <InitgPty><Nm>${creditorName}</Nm></InitgPty>
  </GrpHdr>
  <PmtInf>
    <PmtInfId>PmtInfo-01</PmtInfId>
    <PmtMtd>DD</PmtMtd>
    <BtchBookg>true</BtchBookg>
    <ReqdColltnDt>${today}</ReqdColltnDt>
    <Cdtr><Nm>${creditorName}</Nm></Cdtr>
    <CdtrAcct><Id><IBAN>${creditorIBAN}</IBAN></Id></CdtrAcct>
    <CdtrAgt><FinInstnId><BIC>${creditorBIC}</BIC></FinInstnId></CdtrAgt>
`;

  mandateData.forEach((m) => {
    xml += `
    <DrctDbtTxInf>
      <PmtId>
        <EndToEndId>${m.mandate_reference}</EndToEndId>
      </PmtId>
      <InstdAmt Ccy="EUR">30.00</InstdAmt>
      <DrctDbtTx>
        <MndtRltdInf>
          <MndtId>${m.mandate_reference}</MndtId>
          <DtOfSgntr>${m.signed_at.split("T")[0]}</DtOfSgntr>
        </MndtRltdInf>
      </DrctDbtTx>
      <Dbtr><Nm>${m.name}</Nm></Dbtr>
      <DbtrAcct><Id><IBAN>${m.iban}</IBAN></Id></DbtrAcct>
      <DbtrAgt><FinInstnId><BIC>${m.bic}</BIC></FinInstnId></DbtrAgt>
    </DrctDbtTxInf>
`;
  });

  xml += `
  </PmtInf>
</CstmrDrctDbtInitn>
</Document>
`;

  return xml;
}


// 📥 Download Funktion
export function downloadXML(xml) {
  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sepa.xml";
  a.click();

  URL.revokeObjectURL(url);
}
