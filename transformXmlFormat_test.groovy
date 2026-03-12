import groovy.xml.XmlUtil

def inputXml = '''<Records>
    <Record Type="HDR">
      <Field>
        <FieldName Value="MessageType" />
        <FieldValue Value="INVOIC" />
        <FieldFormat Value="a..60" />
      </Field>
      <Field>
        <FieldName Value="MessageSeqNr" />
        <FieldValue Value="84992" />
        <FieldFormat Value="a..60" />
      </Field>
      <Field>
        <FieldName Value="INVOICE.IVC_Nr" />
        <FieldValue Value="702383313" />
        <FieldFormat Value="a..60" />
      </Field>
      <Field>
        <FieldName Value="INVOICE.IVC_Date" />
        <FieldValue Value="20250821" />
        <FieldFormat Value="a..60" />
        <DateFormat Value="102" />
      </Field>
    </Record>
    <Record Type="LIN">
      <Field>
        <FieldName Value="LineNr" />
        <FieldValue Value="001" />
        <FieldFormat Value="n..6" />
      </Field>
      <Field>
        <FieldName Value="ItemCode" />
        <FieldValue Value="ABC123" />
        <FieldFormat Value="an..35" />
      </Field>
    </Record>
</Records>'''

def parsed = new XmlSlurper().parseText(inputXml)
def writer = new StringWriter()
def builder = new groovy.xml.MarkupBuilder(writer)

builder.doubleQuotes = true
builder.mkp.xmlDeclaration(version: "1.0", encoding: "UTF-8")

builder.Records {
    parsed.Record.each { record ->
        def recordType = record.@Type.text()

        "$recordType" {
            record.Field.each { field ->
                def fieldName = field.FieldName.@Value.text()
                def fieldValue = field.FieldValue.@Value.text()

                "$fieldName" {
                    mkp.yield(fieldValue)

                    if (field.FieldFormat.size() > 0) {
                        FieldFormat(Value: field.FieldFormat.@Value.text())
                    }
                    if (field.DateFormat.size() > 0) {
                        DateFormat(Value: field.DateFormat.@Value.text())
                    }
                }
            }
        }
    }
}

println XmlUtil.serialize(writer.toString())
