import groovy.xml.MarkupBuilder
import groovy.xml.XmlUtil

def body = '''\
<Records>
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

def inputXml = new XmlSlurper().parseText(body)
def writer = new StringWriter()
def builder = new MarkupBuilder(writer)
builder.setDoubleQuotes(true)

builder.Records {
    inputXml.Record.each { record ->
        def recordType = record.@Type.text()

        "${recordType}" {
            record.Field.each { field ->
                def fieldName  = field.FieldName.@Value.text()
                def fieldValue = field.FieldValue.@Value.text()

                "${fieldName}"(fieldValue)
            }
        }
    }
}

println "===== OUTPUT ====="
println writer.toString()
