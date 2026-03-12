import groovy.xml.MarkupBuilder
import groovy.xml.XmlUtil

def inputXml = '''\
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

// === VERSION A: With FieldFormat (matching source profile structure) ===
def parsed = new XmlSlurper().parseText(inputXml)
def writerA = new StringWriter()
def builderA = new MarkupBuilder(writerA)
builderA.setDoubleQuotes(true)

builderA.Records {
    parsed.Record.each { record ->
        def recordType = record.@Type.text()
        "${recordType}" {
            record.Field.each { field ->
                def fieldName  = field.FieldName.@Value.text()
                def fieldValue = field.FieldValue.@Value.text()
                "${fieldName}" {
                    mkp.yield(fieldValue)
                    field.children().each { child ->
                        def childName = child.name()
                        if (childName != "FieldName" && childName != "FieldValue") {
                            "${childName}"(Value: child.@Value.text())
                        }
                    }
                }
            }
        }
    }
}

println "===== VERSION A: With FieldFormat (raw) ====="
println writerA.toString()
println ""

// === VERSION B: Clean - only field values, no FieldFormat/DateFormat ===
parsed = new XmlSlurper().parseText(inputXml)
def writerB = new StringWriter()
def builderB = new MarkupBuilder(writerB)
builderB.setDoubleQuotes(true)

builderB.Records {
    parsed.Record.each { record ->
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

println "===== VERSION B: Clean, no FieldFormat (raw) ====="
println writerB.toString()
println ""
println "===== VERSION B: Serialized ====="
println XmlUtil.serialize(writerB.toString())
